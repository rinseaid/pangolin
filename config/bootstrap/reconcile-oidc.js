const CryptoJS = require("crypto-js");
const Database = require("better-sqlite3");

const requiredEnv = ["SERVER_SECRET", "OIDC_CLIENT_ID", "OIDC_CLIENT_SECRET"];
const missing = requiredEnv.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`Missing required OIDC environment values: ${missing.join(", ")}`);
  process.exit(1);
}

const db = new Database("/app/config/db/db.sqlite");
const serverSecret = process.env.SERVER_SECRET;
const encrypt = (value) => CryptoJS.AES.encrypt(value, serverSecret).toString();

const desired = {
  idpId: 1,
  orgId: "rinseaid",
  name: "Pocket ID",
  authUrl: "https://pocket-id.rinseaid.org/authorize",
  tokenUrl: "https://pocket-id.rinseaid.org/api/oidc/token",
  identifierPath: "email",
  emailPath: "email",
  namePath: "name",
  scopes: "openid email profile groups",
  roleMapping: "'Admin'",
  orgMapping: "`true`",
};

const reconcile = db.transaction(() => {
  const idp = db.prepare("SELECT idpId FROM idp WHERE idpId = ?").get(desired.idpId);
  const org = db.prepare("SELECT orgId FROM orgs WHERE orgId = ?").get(desired.orgId);
  const oidcConfig = db
    .prepare("SELECT idpOauthConfigId FROM idpOidcConfig WHERE idpId = ?")
    .get(desired.idpId);

  if (!idp || !org || !oidcConfig) {
    throw new Error("Pangolin setup is incomplete; expected idpId=1, org=rinseaid, and an OIDC config row");
  }

  db.prepare(`
    UPDATE idp
    SET name = ?, type = ?, autoProvision = ?, defaultRoleMapping = ?, defaultOrgMapping = ?
    WHERE idpId = ?
  `).run(desired.name, "oidc", 1, "'Member'", desired.orgMapping, desired.idpId);

  db.prepare(`
    UPDATE idpOidcConfig
    SET variant = ?, clientId = ?, clientSecret = ?, authUrl = ?, tokenUrl = ?,
        identifierPath = ?, emailPath = ?, namePath = ?, scopes = ?
    WHERE idpId = ?
  `).run(
    "oidc",
    encrypt(process.env.OIDC_CLIENT_ID),
    encrypt(process.env.OIDC_CLIENT_SECRET),
    desired.authUrl,
    desired.tokenUrl,
    desired.identifierPath,
    desired.emailPath,
    desired.namePath,
    desired.scopes,
    desired.idpId,
  );

  db.prepare(`
    UPDATE user
    SET email = username
    WHERE type = 'oidc'
      AND idpId = ?
      AND email IS NULL
      AND username LIKE '%@%'
  `).run(desired.idpId);

  const idpOrgUpdate = db.prepare(`
    UPDATE idpOrg
    SET roleMapping = ?, orgMapping = ?
    WHERE idpId = ? AND orgId = ?
  `).run(desired.roleMapping, desired.orgMapping, desired.idpId, desired.orgId);

  if (!idpOrgUpdate.changes) {
    db.prepare(`
      INSERT INTO idpOrg (idpId, orgId, roleMapping, orgMapping)
      VALUES (?, ?, ?, ?)
    `).run(desired.idpId, desired.orgId, desired.roleMapping, desired.orgMapping);
  }
});

try {
  reconcile();
  console.log("Pangolin OIDC configuration reconciled");
} finally {
  db.close();
}

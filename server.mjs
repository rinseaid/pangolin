
// patch __dirname
// import { fileURLToPath } from "url";
// import path from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// allow top level await
import { createRequire as topLevelCreateRequire } from "module";
const require = topLevelCreateRequire(import.meta.url);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  for (var name2 in all2)
    __defProp(target, name2, { get: all2[name2], enumerable: true });
};
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/deepmerge/dist/cjs.js
var require_cjs = __commonJS({
  "node_modules/deepmerge/dist/cjs.js"(exports, module) {
    "use strict";
    var isMergeableObject = function isMergeableObject2(value) {
      return isNonNullObject(value) && !isSpecial(value);
    };
    function isNonNullObject(value) {
      return !!value && typeof value === "object";
    }
    function isSpecial(value) {
      var stringValue = Object.prototype.toString.call(value);
      return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
    }
    var canUseSymbol = typeof Symbol === "function" && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
    function isReactElement(value) {
      return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
      return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
      return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
    }
    function defaultArrayMerge(target, source, options) {
      return target.concat(source).map(function(element) {
        return cloneUnlessOtherwiseSpecified(element, options);
      });
    }
    function getMergeFunction(key, options) {
      if (!options.customMerge) {
        return deepmerge;
      }
      var customMerge = options.customMerge(key);
      return typeof customMerge === "function" ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
      return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
        return Object.propertyIsEnumerable.call(target, symbol);
      }) : [];
    }
    function getKeys(target) {
      return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
      try {
        return property in object;
      } catch (_3) {
        return false;
      }
    }
    function propertyIsUnsafe(target, key) {
      return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
    }
    function mergeObject(target, source, options) {
      var destination = {};
      if (options.isMergeableObject(target)) {
        getKeys(target).forEach(function(key) {
          destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
        });
      }
      getKeys(source).forEach(function(key) {
        if (propertyIsUnsafe(target, key)) {
          return;
        }
        if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
          destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
        } else {
          destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
        }
      });
      return destination;
    }
    function deepmerge(target, source, options) {
      options = options || {};
      options.arrayMerge = options.arrayMerge || defaultArrayMerge;
      options.isMergeableObject = options.isMergeableObject || isMergeableObject;
      options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
      var sourceIsArray = Array.isArray(source);
      var targetIsArray = Array.isArray(target);
      var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
      if (!sourceAndTargetTypesMatch) {
        return cloneUnlessOtherwiseSpecified(source, options);
      } else if (sourceIsArray) {
        return options.arrayMerge(target, source, options);
      } else {
        return mergeObject(target, source, options);
      }
    }
    deepmerge.all = function deepmergeAll(array, options) {
      if (!Array.isArray(array)) {
        throw new Error("first argument should be an array");
      }
      return array.reduce(function(prev, next2) {
        return deepmerge(prev, next2, options);
      }, {});
    };
    var deepmerge_1 = deepmerge;
    module.exports = deepmerge_1;
  }
});

// server/db/index.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

// server/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  actions: () => actions,
  clients: () => clients,
  domains: () => domains,
  emailVerificationCodes: () => emailVerificationCodes,
  exitNodes: () => exitNodes,
  limitsTable: () => limitsTable,
  newtSessions: () => newtSessions,
  newts: () => newts,
  olmSessions: () => olmSessions,
  olms: () => olms,
  orgDomains: () => orgDomains,
  orgs: () => orgs,
  passwordResetTokens: () => passwordResetTokens,
  resourceAccessToken: () => resourceAccessToken,
  resourceOtp: () => resourceOtp,
  resourcePassword: () => resourcePassword,
  resourcePincode: () => resourcePincode,
  resourceRules: () => resourceRules,
  resourceSessions: () => resourceSessions,
  resourceWhitelist: () => resourceWhitelist,
  resources: () => resources,
  roleActions: () => roleActions,
  roleClients: () => roleClients,
  roleResources: () => roleResources,
  roleSites: () => roleSites,
  roles: () => roles,
  sessions: () => sessions,
  sites: () => sites,
  supporterKey: () => supporterKey,
  targets: () => targets,
  twoFactorBackupCodes: () => twoFactorBackupCodes,
  userActions: () => userActions,
  userClients: () => userClients,
  userInvites: () => userInvites,
  userOrgs: () => userOrgs,
  userResources: () => userResources,
  userSites: () => userSites,
  users: () => users,
  versionMigrations: () => versionMigrations
});
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
var domains = sqliteTable("domains", {
  domainId: text("domainId").primaryKey(),
  baseDomain: text("baseDomain").notNull(),
  configManaged: integer("configManaged", { mode: "boolean" }).notNull().default(false)
});
var orgs = sqliteTable("orgs", {
  orgId: text("orgId").primaryKey(),
  name: text("name").notNull()
});
var orgDomains = sqliteTable("orgDomains", {
  orgId: text("orgId").notNull().references(() => orgs.orgId, { onDelete: "cascade" }),
  domainId: text("domainId").notNull().references(() => domains.domainId, { onDelete: "cascade" })
});
var sites = sqliteTable("sites", {
  siteId: integer("siteId").primaryKey({ autoIncrement: true }),
  orgId: text("orgId").references(() => orgs.orgId, {
    onDelete: "cascade"
  }).notNull(),
  niceId: text("niceId").notNull(),
  exitNodeId: integer("exitNode").references(() => exitNodes.exitNodeId, {
    onDelete: "set null"
  }),
  name: text("name").notNull(),
  pubKey: text("pubKey"),
  subnet: text("subnet").notNull(),
  megabytesIn: integer("bytesIn"),
  megabytesOut: integer("bytesOut"),
  lastBandwidthUpdate: text("lastBandwidthUpdate"),
  type: text("type").notNull(),
  // "newt" or "wireguard"
  online: integer("online", { mode: "boolean" }).notNull().default(false),
  // exit node stuff that is how to connect to the site when it has a gerbil
  address: text("address"),
  // this is the address of the wireguard interface in gerbil
  endpoint: text("endpoint"),
  // this is how to reach gerbil externally - gets put into the wireguard config
  publicKey: text("pubicKey"),
  listenPort: integer("listenPort"),
  lastHolePunch: integer("lastHolePunch")
});
var resources = sqliteTable("resources", {
  resourceId: integer("resourceId").primaryKey({ autoIncrement: true }),
  siteId: integer("siteId").references(() => sites.siteId, {
    onDelete: "cascade"
  }).notNull(),
  orgId: text("orgId").references(() => orgs.orgId, {
    onDelete: "cascade"
  }).notNull(),
  name: text("name").notNull(),
  subdomain: text("subdomain"),
  fullDomain: text("fullDomain"),
  domainId: text("domainId").references(() => domains.domainId, {
    onDelete: "set null"
  }),
  ssl: integer("ssl", { mode: "boolean" }).notNull().default(false),
  blockAccess: integer("blockAccess", { mode: "boolean" }).notNull().default(false),
  sso: integer("sso", { mode: "boolean" }).notNull().default(true),
  http: integer("http", { mode: "boolean" }).notNull().default(true),
  protocol: text("protocol").notNull(),
  proxyPort: integer("proxyPort"),
  emailWhitelistEnabled: integer("emailWhitelistEnabled", { mode: "boolean" }).notNull().default(false),
  isBaseDomain: integer("isBaseDomain", { mode: "boolean" }),
  applyRules: integer("applyRules", { mode: "boolean" }).notNull().default(false)
});
var targets = sqliteTable("targets", {
  targetId: integer("targetId").primaryKey({ autoIncrement: true }),
  resourceId: integer("resourceId").references(() => resources.resourceId, {
    onDelete: "cascade"
  }).notNull(),
  ip: text("ip").notNull(),
  method: text("method"),
  port: integer("port").notNull(),
  internalPort: integer("internalPort"),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true)
});
var exitNodes = sqliteTable("exitNodes", {
  exitNodeId: integer("exitNodeId").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  address: text("address").notNull(),
  // this is the address of the wireguard interface in gerbil
  endpoint: text("endpoint").notNull(),
  // this is how to reach gerbil externally - gets put into the wireguard config
  publicKey: text("pubicKey").notNull(),
  listenPort: integer("listenPort").notNull(),
  reachableAt: text("reachableAt")
  // this is the internal address of the gerbil http server for command control
});
var users = sqliteTable("user", {
  userId: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  twoFactorEnabled: integer("twoFactorEnabled", { mode: "boolean" }).notNull().default(false),
  twoFactorSecret: text("twoFactorSecret"),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull().default(false),
  dateCreated: text("dateCreated").notNull(),
  serverAdmin: integer("serverAdmin", { mode: "boolean" }).notNull().default(false)
});
var newts = sqliteTable("newt", {
  newtId: text("id").primaryKey(),
  secretHash: text("secretHash").notNull(),
  dateCreated: text("dateCreated").notNull(),
  siteId: integer("siteId").references(() => sites.siteId, {
    onDelete: "cascade"
  })
});
var clients = sqliteTable("clients", {
  clientId: integer("id").primaryKey({ autoIncrement: true }),
  siteId: integer("siteId").references(() => sites.siteId, {
    onDelete: "cascade"
  }).notNull(),
  orgId: text("orgId").references(() => orgs.orgId, {
    onDelete: "cascade"
  }).notNull(),
  name: text("name").notNull(),
  pubKey: text("pubKey"),
  subnet: text("subnet").notNull(),
  megabytesIn: integer("bytesIn"),
  megabytesOut: integer("bytesOut"),
  lastBandwidthUpdate: text("lastBandwidthUpdate"),
  type: text("type").notNull(),
  // "olm"
  online: integer("online", { mode: "boolean" }).notNull().default(false),
  endpoint: text("endpoint"),
  lastHolePunch: integer("lastHolePunch")
});
var olms = sqliteTable("olms", {
  olmId: text("id").primaryKey(),
  secretHash: text("secretHash").notNull(),
  dateCreated: text("dateCreated").notNull(),
  clientId: integer("clientId").references(() => clients.clientId, {
    onDelete: "cascade"
  })
});
var twoFactorBackupCodes = sqliteTable("twoFactorBackupCodes", {
  codeId: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("userId").notNull().references(() => users.userId, { onDelete: "cascade" }),
  codeHash: text("codeHash").notNull()
});
var sessions = sqliteTable("session", {
  sessionId: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => users.userId, { onDelete: "cascade" }),
  expiresAt: integer("expiresAt").notNull()
});
var newtSessions = sqliteTable("newtSession", {
  sessionId: text("id").primaryKey(),
  newtId: text("newtId").notNull().references(() => newts.newtId, { onDelete: "cascade" }),
  expiresAt: integer("expiresAt").notNull()
});
var olmSessions = sqliteTable("clientSession", {
  sessionId: text("id").primaryKey(),
  olmId: text("olmId").notNull().references(() => olms.olmId, { onDelete: "cascade" }),
  expiresAt: integer("expiresAt").notNull()
});
var userOrgs = sqliteTable("userOrgs", {
  userId: text("userId").notNull().references(() => users.userId, { onDelete: "cascade" }),
  orgId: text("orgId").references(() => orgs.orgId, {
    onDelete: "cascade"
  }).notNull(),
  roleId: integer("roleId").notNull().references(() => roles.roleId),
  isOwner: integer("isOwner", { mode: "boolean" }).notNull().default(false)
});
var emailVerificationCodes = sqliteTable("emailVerificationCodes", {
  codeId: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("userId").notNull().references(() => users.userId, { onDelete: "cascade" }),
  email: text("email").notNull(),
  code: text("code").notNull(),
  expiresAt: integer("expiresAt").notNull()
});
var passwordResetTokens = sqliteTable("passwordResetTokens", {
  tokenId: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  userId: text("userId").notNull().references(() => users.userId, { onDelete: "cascade" }),
  tokenHash: text("tokenHash").notNull(),
  expiresAt: integer("expiresAt").notNull()
});
var actions = sqliteTable("actions", {
  actionId: text("actionId").primaryKey(),
  name: text("name"),
  description: text("description")
});
var roles = sqliteTable("roles", {
  roleId: integer("roleId").primaryKey({ autoIncrement: true }),
  orgId: text("orgId").references(() => orgs.orgId, {
    onDelete: "cascade"
  }).notNull(),
  isAdmin: integer("isAdmin", { mode: "boolean" }),
  name: text("name").notNull(),
  description: text("description")
});
var roleActions = sqliteTable("roleActions", {
  roleId: integer("roleId").notNull().references(() => roles.roleId, { onDelete: "cascade" }),
  actionId: text("actionId").notNull().references(() => actions.actionId, { onDelete: "cascade" }),
  orgId: text("orgId").notNull().references(() => orgs.orgId, { onDelete: "cascade" })
});
var userActions = sqliteTable("userActions", {
  userId: text("userId").notNull().references(() => users.userId, { onDelete: "cascade" }),
  actionId: text("actionId").notNull().references(() => actions.actionId, { onDelete: "cascade" }),
  orgId: text("orgId").notNull().references(() => orgs.orgId, { onDelete: "cascade" })
});
var roleSites = sqliteTable("roleSites", {
  roleId: integer("roleId").notNull().references(() => roles.roleId, { onDelete: "cascade" }),
  siteId: integer("siteId").notNull().references(() => sites.siteId, { onDelete: "cascade" })
});
var userSites = sqliteTable("userSites", {
  userId: text("userId").notNull().references(() => users.userId, { onDelete: "cascade" }),
  siteId: integer("siteId").notNull().references(() => sites.siteId, { onDelete: "cascade" })
});
var userClients = sqliteTable("userClients", {
  userId: text("userId").notNull().references(() => users.userId, { onDelete: "cascade" }),
  clientId: integer("clientId").notNull().references(() => clients.clientId, { onDelete: "cascade" })
});
var roleClients = sqliteTable("roleClients", {
  roleId: integer("roleId").notNull().references(() => roles.roleId, { onDelete: "cascade" }),
  clientId: integer("clientId").notNull().references(() => clients.clientId, { onDelete: "cascade" })
});
var roleResources = sqliteTable("roleResources", {
  roleId: integer("roleId").notNull().references(() => roles.roleId, { onDelete: "cascade" }),
  resourceId: integer("resourceId").notNull().references(() => resources.resourceId, { onDelete: "cascade" })
});
var userResources = sqliteTable("userResources", {
  userId: text("userId").notNull().references(() => users.userId, { onDelete: "cascade" }),
  resourceId: integer("resourceId").notNull().references(() => resources.resourceId, { onDelete: "cascade" })
});
var limitsTable = sqliteTable("limits", {
  limitId: integer("limitId").primaryKey({ autoIncrement: true }),
  orgId: text("orgId").references(() => orgs.orgId, {
    onDelete: "cascade"
  }).notNull(),
  name: text("name").notNull(),
  value: integer("value").notNull(),
  description: text("description")
});
var userInvites = sqliteTable("userInvites", {
  inviteId: text("inviteId").primaryKey(),
  orgId: text("orgId").notNull().references(() => orgs.orgId, { onDelete: "cascade" }),
  email: text("email").notNull(),
  expiresAt: integer("expiresAt").notNull(),
  tokenHash: text("token").notNull(),
  roleId: integer("roleId").notNull().references(() => roles.roleId, { onDelete: "cascade" })
});
var resourcePincode = sqliteTable("resourcePincode", {
  pincodeId: integer("pincodeId").primaryKey({
    autoIncrement: true
  }),
  resourceId: integer("resourceId").notNull().references(() => resources.resourceId, { onDelete: "cascade" }),
  pincodeHash: text("pincodeHash").notNull(),
  digitLength: integer("digitLength").notNull()
});
var resourcePassword = sqliteTable("resourcePassword", {
  passwordId: integer("passwordId").primaryKey({
    autoIncrement: true
  }),
  resourceId: integer("resourceId").notNull().references(() => resources.resourceId, { onDelete: "cascade" }),
  passwordHash: text("passwordHash").notNull()
});
var resourceAccessToken = sqliteTable("resourceAccessToken", {
  accessTokenId: text("accessTokenId").primaryKey(),
  orgId: text("orgId").notNull().references(() => orgs.orgId, { onDelete: "cascade" }),
  resourceId: integer("resourceId").notNull().references(() => resources.resourceId, { onDelete: "cascade" }),
  tokenHash: text("tokenHash").notNull(),
  sessionLength: integer("sessionLength").notNull(),
  expiresAt: integer("expiresAt"),
  title: text("title"),
  description: text("description"),
  createdAt: integer("createdAt").notNull()
});
var resourceSessions = sqliteTable("resourceSessions", {
  sessionId: text("id").primaryKey(),
  resourceId: integer("resourceId").notNull().references(() => resources.resourceId, { onDelete: "cascade" }),
  expiresAt: integer("expiresAt").notNull(),
  sessionLength: integer("sessionLength").notNull(),
  doNotExtend: integer("doNotExtend", { mode: "boolean" }).notNull().default(false),
  isRequestToken: integer("isRequestToken", { mode: "boolean" }),
  userSessionId: text("userSessionId").references(() => sessions.sessionId, {
    onDelete: "cascade"
  }),
  passwordId: integer("passwordId").references(
    () => resourcePassword.passwordId,
    {
      onDelete: "cascade"
    }
  ),
  pincodeId: integer("pincodeId").references(
    () => resourcePincode.pincodeId,
    {
      onDelete: "cascade"
    }
  ),
  whitelistId: integer("whitelistId").references(
    () => resourceWhitelist.whitelistId,
    {
      onDelete: "cascade"
    }
  ),
  accessTokenId: text("accessTokenId").references(
    () => resourceAccessToken.accessTokenId,
    {
      onDelete: "cascade"
    }
  )
});
var resourceWhitelist = sqliteTable("resourceWhitelist", {
  whitelistId: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  resourceId: integer("resourceId").notNull().references(() => resources.resourceId, { onDelete: "cascade" })
});
var resourceOtp = sqliteTable("resourceOtp", {
  otpId: integer("otpId").primaryKey({
    autoIncrement: true
  }),
  resourceId: integer("resourceId").notNull().references(() => resources.resourceId, { onDelete: "cascade" }),
  email: text("email").notNull(),
  otpHash: text("otpHash").notNull(),
  expiresAt: integer("expiresAt").notNull()
});
var versionMigrations = sqliteTable("versionMigrations", {
  version: text("version").primaryKey(),
  executedAt: integer("executedAt").notNull()
});
var resourceRules = sqliteTable("resourceRules", {
  ruleId: integer("ruleId").primaryKey({ autoIncrement: true }),
  resourceId: integer("resourceId").notNull().references(() => resources.resourceId, { onDelete: "cascade" }),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  priority: integer("priority").notNull(),
  action: text("action").notNull(),
  // ACCEPT, DROP
  match: text("match").notNull(),
  // CIDR, PATH, IP
  value: text("value").notNull()
});
var supporterKey = sqliteTable("supporterKey", {
  keyId: integer("keyId").primaryKey({ autoIncrement: true }),
  key: text("key").notNull(),
  githubUsername: text("githubUsername").notNull(),
  phrase: text("phrase"),
  tier: text("tier"),
  valid: integer("valid", { mode: "boolean" }).notNull().default(false)
});

// server/db/index.ts
import path2 from "path";
import fs from "fs/promises";

// server/lib/consts.ts
import path from "path";
import { fileURLToPath } from "url";
var APP_VERSION = "1.1.0";
var __FILENAME = fileURLToPath(import.meta.url);
var __DIRNAME = path.dirname(__FILENAME);
var APP_PATH = path.join("config");
var configFilePath1 = path.join(APP_PATH, "config.yml");
var configFilePath2 = path.join(APP_PATH, "config.yaml");

// server/db/index.ts
import { existsSync, mkdirSync } from "fs";
var location = path2.join(APP_PATH, "db", "db.sqlite");
var exists = await checkFileExists(location);
bootstrapVolume();
var sqlite = new Database(location);
var db = drizzle(sqlite, { schema: schema_exports });
var db_default = db;
async function checkFileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
function bootstrapVolume() {
  const appPath = APP_PATH;
  const dbDir = path2.join(appPath, "db");
  const logsDir = path2.join(appPath, "logs");
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
  }
  if (!existsSync(logsDir)) {
    mkdirSync(logsDir, { recursive: true });
  }
  const traefikDir = path2.join(appPath, "traefik");
  if (!existsSync(traefikDir)) {
    mkdirSync(traefikDir, { recursive: true });
  }
}

// server/auth/actions.ts
import { and, eq } from "drizzle-orm";
import createHttpError from "http-errors";

// server/types/HttpCode.ts
var HttpCode = /* @__PURE__ */ ((HttpCode2) => {
  HttpCode2[HttpCode2["CONTINUE"] = 100] = "CONTINUE";
  HttpCode2[HttpCode2["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
  HttpCode2[HttpCode2["PROCESSING"] = 102] = "PROCESSING";
  HttpCode2[HttpCode2["EARLY_HINTS"] = 103] = "EARLY_HINTS";
  HttpCode2[HttpCode2["OK"] = 200] = "OK";
  HttpCode2[HttpCode2["CREATED"] = 201] = "CREATED";
  HttpCode2[HttpCode2["ACCEPTED"] = 202] = "ACCEPTED";
  HttpCode2[HttpCode2["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
  HttpCode2[HttpCode2["NO_CONTENT"] = 204] = "NO_CONTENT";
  HttpCode2[HttpCode2["RESET_CONTENT"] = 205] = "RESET_CONTENT";
  HttpCode2[HttpCode2["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
  HttpCode2[HttpCode2["MULTI_STATUS"] = 207] = "MULTI_STATUS";
  HttpCode2[HttpCode2["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
  HttpCode2[HttpCode2["IM_USED"] = 226] = "IM_USED";
  HttpCode2[HttpCode2["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
  HttpCode2[HttpCode2["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
  HttpCode2[HttpCode2["FOUND"] = 302] = "FOUND";
  HttpCode2[HttpCode2["SEE_OTHER"] = 303] = "SEE_OTHER";
  HttpCode2[HttpCode2["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
  HttpCode2[HttpCode2["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
  HttpCode2[HttpCode2["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
  HttpCode2[HttpCode2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HttpCode2[HttpCode2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HttpCode2[HttpCode2["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
  HttpCode2[HttpCode2["FORBIDDEN"] = 403] = "FORBIDDEN";
  HttpCode2[HttpCode2["NOT_FOUND"] = 404] = "NOT_FOUND";
  HttpCode2[HttpCode2["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
  HttpCode2[HttpCode2["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
  HttpCode2[HttpCode2["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
  HttpCode2[HttpCode2["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
  HttpCode2[HttpCode2["CONFLICT"] = 409] = "CONFLICT";
  HttpCode2[HttpCode2["GONE"] = 410] = "GONE";
  HttpCode2[HttpCode2["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
  HttpCode2[HttpCode2["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
  HttpCode2[HttpCode2["CONTENT_TOO_LARGE"] = 413] = "CONTENT_TOO_LARGE";
  HttpCode2[HttpCode2["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
  HttpCode2[HttpCode2["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
  HttpCode2[HttpCode2["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
  HttpCode2[HttpCode2["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
  HttpCode2[HttpCode2["IM_A_TEAPOT"] = 418] = "IM_A_TEAPOT";
  HttpCode2[HttpCode2["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
  HttpCode2[HttpCode2["UNPROCESSABLE_CONTENT"] = 422] = "UNPROCESSABLE_CONTENT";
  HttpCode2[HttpCode2["LOCKED"] = 423] = "LOCKED";
  HttpCode2[HttpCode2["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
  HttpCode2[HttpCode2["TOO_EARLY"] = 425] = "TOO_EARLY";
  HttpCode2[HttpCode2["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
  HttpCode2[HttpCode2["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
  HttpCode2[HttpCode2["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
  HttpCode2[HttpCode2["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
  HttpCode2[HttpCode2["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
  HttpCode2[HttpCode2["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  HttpCode2[HttpCode2["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
  HttpCode2[HttpCode2["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
  HttpCode2[HttpCode2["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
  HttpCode2[HttpCode2["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
  HttpCode2[HttpCode2["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
  HttpCode2[HttpCode2["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
  HttpCode2[HttpCode2["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
  HttpCode2[HttpCode2["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
  HttpCode2[HttpCode2["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
  HttpCode2[HttpCode2["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
  return HttpCode2;
})(HttpCode || {});
var HttpCode_default = HttpCode;

// server/auth/actions.ts
var ActionsEnum = /* @__PURE__ */ ((ActionsEnum2) => {
  ActionsEnum2["createOrg"] = "createOrg";
  ActionsEnum2["getOrg"] = "getOrg";
  ActionsEnum2["updateOrg"] = "updateOrg";
  ActionsEnum2["deleteOrg"] = "deleteOrg";
  ActionsEnum2["createSite"] = "createSite";
  ActionsEnum2["deleteSite"] = "deleteSite";
  ActionsEnum2["getSite"] = "getSite";
  ActionsEnum2["listSites"] = "listSites";
  ActionsEnum2["updateSite"] = "updateSite";
  ActionsEnum2["createResource"] = "createResource";
  ActionsEnum2["deleteResource"] = "deleteResource";
  ActionsEnum2["getResource"] = "getResource";
  ActionsEnum2["listResources"] = "listResources";
  ActionsEnum2["updateResource"] = "updateResource";
  ActionsEnum2["createTarget"] = "createTarget";
  ActionsEnum2["deleteTarget"] = "deleteTarget";
  ActionsEnum2["getTarget"] = "getTarget";
  ActionsEnum2["listTargets"] = "listTargets";
  ActionsEnum2["updateTarget"] = "updateTarget";
  ActionsEnum2["createRole"] = "createRole";
  ActionsEnum2["deleteRole"] = "deleteRole";
  ActionsEnum2["getRole"] = "getRole";
  ActionsEnum2["listRoles"] = "listRoles";
  ActionsEnum2["updateRole"] = "updateRole";
  ActionsEnum2["inviteUser"] = "inviteUser";
  ActionsEnum2["removeUser"] = "removeUser";
  ActionsEnum2["listUsers"] = "listUsers";
  ActionsEnum2["listSiteRoles"] = "listSiteRoles";
  ActionsEnum2["listResourceRoles"] = "listResourceRoles";
  ActionsEnum2["setResourceUsers"] = "setResourceUsers";
  ActionsEnum2["setResourceRoles"] = "setResourceRoles";
  ActionsEnum2["listResourceUsers"] = "listResourceUsers";
  ActionsEnum2["listRoleResources"] = "listRoleResources";
  ActionsEnum2["addUserRole"] = "addUserRole";
  ActionsEnum2["getOrgUser"] = "getOrgUser";
  ActionsEnum2["setResourcePassword"] = "setResourcePassword";
  ActionsEnum2["setResourcePincode"] = "setResourcePincode";
  ActionsEnum2["setResourceWhitelist"] = "setResourceWhitelist";
  ActionsEnum2["getResourceWhitelist"] = "getResourceWhitelist";
  ActionsEnum2["generateAccessToken"] = "generateAccessToken";
  ActionsEnum2["deleteAcessToken"] = "deleteAcessToken";
  ActionsEnum2["listAccessTokens"] = "listAccessTokens";
  ActionsEnum2["createResourceRule"] = "createResourceRule";
  ActionsEnum2["deleteResourceRule"] = "deleteResourceRule";
  ActionsEnum2["listResourceRules"] = "listResourceRules";
  ActionsEnum2["updateResourceRule"] = "updateResourceRule";
  ActionsEnum2["createClient"] = "createClient";
  ActionsEnum2["deleteClient"] = "deleteClient";
  ActionsEnum2["listClients"] = "listClients";
  ActionsEnum2["listOrgDomains"] = "listOrgDomains";
  return ActionsEnum2;
})(ActionsEnum || {});
async function checkUserActionPermission(actionId, req) {
  const userId = req.user?.userId;
  if (!userId) {
    throw createHttpError(HttpCode_default.UNAUTHORIZED, "User not authenticated");
  }
  if (!req.userOrgId) {
    throw createHttpError(
      HttpCode_default.BAD_REQUEST,
      "Organization ID is required"
    );
  }
  try {
    let userOrgRoleId = req.userOrgRoleId;
    if (userOrgRoleId === void 0) {
      const userOrgRole = await db.select().from(userOrgs).where(
        and(
          eq(userOrgs.userId, userId),
          eq(userOrgs.orgId, req.userOrgId)
        )
      ).limit(1);
      if (userOrgRole.length === 0) {
        throw createHttpError(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        );
      }
      userOrgRoleId = userOrgRole[0].roleId;
    }
    const userActionPermission = await db.select().from(userActions).where(
      and(
        eq(userActions.userId, userId),
        eq(userActions.actionId, actionId),
        eq(userActions.orgId, req.userOrgId)
        // TODO: we cant pass the org id if we are not checking the org
      )
    ).limit(1);
    if (userActionPermission.length > 0) {
      return true;
    }
    const roleActionPermission = await db.select().from(roleActions).where(
      and(
        eq(roleActions.actionId, actionId),
        eq(roleActions.roleId, userOrgRoleId),
        eq(roleActions.orgId, req.userOrgId)
      )
    ).limit(1);
    return roleActionPermission.length > 0;
    return false;
  } catch (error) {
    console.error("Error checking user action permission:", error);
    throw createHttpError(
      HttpCode_default.INTERNAL_SERVER_ERROR,
      "Error checking action permission"
    );
  }
}

// server/setup/ensureActions.ts
import { eq as eq3, inArray } from "drizzle-orm";

// server/logger.ts
import "winston-daily-rotate-file";

// server/lib/config.ts
import fs2 from "fs";
import yaml from "js-yaml";
import { z as z2 } from "zod";
import { fromError } from "zod-validation-error";

// server/auth/passwordSchema.ts
import z from "zod";
var passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters long" }).max(128, { message: "Password must be at most 128 characters long" }).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~!`@#$%^&*()_\-+={}[\]|\\:;"'<>,.\/?]).*$/, {
  message: `Your password must meet the following conditions:
at least one uppercase English letter,
at least one lowercase English letter,
at least one digit,
at least one special character.`
});

// server/lib/stoi.ts
function stoi(val) {
  if (typeof val === "string") {
    return parseInt(val);
  } else {
    return val;
  }
}

// server/lib/config.ts
import { eq as eq2 } from "drizzle-orm";
var portSchema = z2.number().positive().gt(0).lte(65535);
var getEnvOrYaml = (envVar) => (valFromYaml) => {
  return process.env[envVar] ?? valFromYaml;
};
var configSchema = z2.object({
  app: z2.object({
    dashboard_url: z2.string().url().optional().pipe(z2.string().url()).transform((url) => url.toLowerCase()),
    log_level: z2.enum(["debug", "info", "warn", "error"]),
    save_logs: z2.boolean(),
    log_failed_attempts: z2.boolean().optional()
  }),
  domains: z2.record(
    z2.string(),
    z2.object({
      base_domain: z2.string().nonempty("base_domain must not be empty").transform((url) => url.toLowerCase()),
      cert_resolver: z2.string().optional(),
      prefer_wildcard_cert: z2.boolean().optional()
    })
  ).refine(
    (domains2) => {
      const keys = Object.keys(domains2);
      if (keys.length === 0) {
        return false;
      }
      return true;
    },
    {
      message: "At least one domain must be defined"
    }
  ),
  server: z2.object({
    external_port: portSchema.optional().transform(stoi).pipe(portSchema),
    internal_port: portSchema.optional().transform(stoi).pipe(portSchema),
    next_port: portSchema.optional().transform(stoi).pipe(portSchema),
    internal_hostname: z2.string().transform((url) => url.toLowerCase()),
    session_cookie_name: z2.string(),
    resource_access_token_param: z2.string(),
    resource_session_request_param: z2.string(),
    dashboard_session_length_hours: z2.number().positive().gt(0).optional().default(720),
    resource_session_length_hours: z2.number().positive().gt(0).optional().default(720),
    cors: z2.object({
      origins: z2.array(z2.string()).optional(),
      methods: z2.array(z2.string()).optional(),
      allowed_headers: z2.array(z2.string()).optional(),
      credentials: z2.boolean().optional()
    }).optional(),
    trust_proxy: z2.boolean().optional().default(true)
  }),
  traefik: z2.object({
    http_entrypoint: z2.string(),
    https_entrypoint: z2.string().optional(),
    additional_middlewares: z2.array(z2.string()).optional()
  }),
  gerbil: z2.object({
    start_port: portSchema.optional().transform(stoi).pipe(portSchema),
    base_endpoint: z2.string().optional().pipe(z2.string()).transform((url) => url.toLowerCase()),
    use_subdomain: z2.boolean(),
    subnet_group: z2.string(),
    block_size: z2.number().positive().gt(0),
    site_block_size: z2.number().positive().gt(0)
  }),
  newt: z2.object({
    block_size: z2.number().positive().gt(0),
    subnet_group: z2.string(),
    start_port: portSchema,
    site_block_size: z2.number().positive().gt(0)
  }),
  rate_limits: z2.object({
    global: z2.object({
      window_minutes: z2.number().positive().gt(0),
      max_requests: z2.number().positive().gt(0)
    }),
    auth: z2.object({
      window_minutes: z2.number().positive().gt(0),
      max_requests: z2.number().positive().gt(0)
    }).optional()
  }),
  email: z2.object({
    smtp_host: z2.string().optional(),
    smtp_port: portSchema.optional(),
    smtp_user: z2.string().optional(),
    smtp_pass: z2.string().optional(),
    smtp_secure: z2.boolean().optional(),
    smtp_tls_reject_unauthorized: z2.boolean().optional(),
    no_reply: z2.string().email().optional()
  }).optional(),
  users: z2.object({
    server_admin: z2.object({
      email: z2.string().email().optional().transform(getEnvOrYaml("USERS_SERVERADMIN_EMAIL")).pipe(z2.string().email()).transform((v2) => v2.toLowerCase()),
      password: passwordSchema.optional().transform(getEnvOrYaml("USERS_SERVERADMIN_PASSWORD")).pipe(passwordSchema)
    })
  }),
  flags: z2.object({
    require_email_verification: z2.boolean().optional(),
    disable_signup_without_invite: z2.boolean().optional(),
    disable_user_create_org: z2.boolean().optional(),
    allow_raw_resources: z2.boolean().optional(),
    allow_base_domain_resources: z2.boolean().optional(),
    allow_local_sites: z2.boolean().optional()
  }).optional()
});
var Config = class {
  constructor() {
    this.supporterData = null;
    this.supporterHiddenUntil = null;
    this.loadConfig();
  }
  loadConfig() {
    const loadConfig = (configPath) => {
      try {
        const yamlContent = fs2.readFileSync(configPath, "utf8");
        const config2 = yaml.load(yamlContent);
        return config2;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(
            `Error loading configuration file: ${error.message}`
          );
        }
        throw error;
      }
    };
    let environment;
    if (fs2.existsSync(configFilePath1)) {
      environment = loadConfig(configFilePath1);
    } else if (fs2.existsSync(configFilePath2)) {
      environment = loadConfig(configFilePath2);
    }
    if (process.env.APP_BASE_DOMAIN) {
      console.log(
        "You're using deprecated environment variables. Transition to the configuration file. https://docs.fossorial.io/"
      );
    }
    if (!environment) {
      throw new Error(
        "No configuration file found. Please create one. https://docs.fossorial.io/"
      );
    }
    const parsedConfig = configSchema.safeParse(environment);
    if (!parsedConfig.success) {
      const errors = fromError(parsedConfig.error);
      throw new Error(`Invalid configuration file: ${errors}`);
    }
    process.env.APP_VERSION = APP_VERSION;
    process.env.NEXT_PORT = parsedConfig.data.server.next_port.toString();
    process.env.SERVER_EXTERNAL_PORT = parsedConfig.data.server.external_port.toString();
    process.env.SERVER_INTERNAL_PORT = parsedConfig.data.server.internal_port.toString();
    process.env.FLAGS_EMAIL_VERIFICATION_REQUIRED = parsedConfig.data.flags?.require_email_verification ? "true" : "false";
    process.env.FLAGS_ALLOW_RAW_RESOURCES = parsedConfig.data.flags?.allow_raw_resources ? "true" : "false";
    process.env.SESSION_COOKIE_NAME = parsedConfig.data.server.session_cookie_name;
    process.env.EMAIL_ENABLED = parsedConfig.data.email ? "true" : "false";
    process.env.DISABLE_SIGNUP_WITHOUT_INVITE = parsedConfig.data.flags?.disable_signup_without_invite ? "true" : "false";
    process.env.DISABLE_USER_CREATE_ORG = parsedConfig.data.flags?.disable_user_create_org ? "true" : "false";
    process.env.RESOURCE_ACCESS_TOKEN_PARAM = parsedConfig.data.server.resource_access_token_param;
    process.env.RESOURCE_SESSION_REQUEST_PARAM = parsedConfig.data.server.resource_session_request_param;
    process.env.FLAGS_ALLOW_BASE_DOMAIN_RESOURCES = parsedConfig.data.flags?.allow_base_domain_resources ? "true" : "false";
    process.env.DASHBOARD_URL = parsedConfig.data.app.dashboard_url;
    this.checkSupporterKey().then(() => {
      console.log("Supporter key checked");
    }).catch((error) => {
      console.error("Error checking supporter key:", error);
    });
    this.rawConfig = parsedConfig.data;
  }
  getRawConfig() {
    return this.rawConfig;
  }
  getNoReplyEmail() {
    return this.rawConfig.email?.no_reply || this.rawConfig.email?.smtp_user;
  }
  getDomain(domainId) {
    return this.rawConfig.domains[domainId];
  }
  hideSupporterKey(days = 7) {
    const now = (/* @__PURE__ */ new Date()).getTime();
    if (this.supporterHiddenUntil && now < this.supporterHiddenUntil) {
      return;
    }
    this.supporterHiddenUntil = now + 1e3 * 60 * 60 * 24 * days;
  }
  isSupporterKeyHidden() {
    const now = (/* @__PURE__ */ new Date()).getTime();
    if (this.supporterHiddenUntil && now < this.supporterHiddenUntil) {
      return true;
    }
    return false;
  }
  async checkSupporterKey() {
    const [key] = await db_default.select().from(supporterKey).limit(1);
    if (!key) {
      return;
    }
    const { key: licenseKey, githubUsername } = key;
    const response2 = await fetch(
      "https://api.dev.fossorial.io/api/v1/license/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          licenseKey,
          githubUsername
        })
      }
    );
    if (!response2.ok) {
      this.supporterData = key;
      return;
    }
    const data = await response2.json();
    if (!data.data.valid) {
      this.supporterData = {
        ...key,
        valid: false
      };
      return;
    }
    this.supporterData = {
      ...key,
      tier: data.data.tier,
      valid: true
    };
    await db_default.update(supporterKey).set({
      tier: data.data.tier || null,
      phrase: data.data.cutePhrase || null,
      valid: true
    }).where(eq2(supporterKey.keyId, key.keyId));
  }
  getSupporterData() {
    return this.supporterData;
  }
};
var config = new Config();
var config_default = config;

// server/logger.ts
import * as winston from "winston";
import path3 from "path";
var hformat = winston.format.printf(
  ({ level, label, message, timestamp, stack, ...metadata }) => {
    let msg = `${timestamp} [${level}]${label ? `[${label}]` : ""}: ${message}`;
    if (stack) {
      msg += `
Stack: ${stack}`;
    }
    if (Object.keys(metadata).length > 0) {
      msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
  }
);
var transports2 = [new winston.transports.Console({})];
if (config_default.getRawConfig().app.save_logs) {
  transports2.push(
    new winston.transports.DailyRotateFile({
      filename: path3.join(APP_PATH, "logs", "pangolin-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d",
      createSymlink: true,
      symlinkName: "pangolin.log"
    })
  );
  transports2.push(
    new winston.transports.DailyRotateFile({
      filename: path3.join(APP_PATH, "logs", ".machinelogs-%DATE%.json"),
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "1d",
      createSymlink: true,
      symlinkName: ".machinelogs.json",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.json()
      )
    })
  );
}
var logger = winston.createLogger({
  level: config_default.getRawConfig().app.log_level.toLowerCase(),
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.splat(),
    winston.format.timestamp(),
    hformat
  ),
  transports: transports2
});
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", { error, stack: error.stack });
  process.exit(1);
});
process.on("unhandledRejection", (reason, _3) => {
  logger.error("Unhandled Rejection:", { reason });
});
var logger_default = logger;

// server/setup/ensureActions.ts
async function ensureActions() {
  const actionIds = Object.values(ActionsEnum);
  const existingActions = await db.select().from(actions).execute();
  const existingActionIds = existingActions.map((action) => action.actionId);
  const actionsToAdd = actionIds.filter(
    (id) => !existingActionIds.includes(id)
  );
  const actionsToRemove = existingActionIds.filter(
    (id) => !actionIds.includes(id)
  );
  const defaultRoles = await db.select().from(roles).where(eq3(roles.isAdmin, true)).execute();
  await db.transaction(async (trx) => {
    for (const actionId of actionsToAdd) {
      logger_default.debug(`Adding action: ${actionId}`);
      await trx.insert(actions).values({ actionId }).execute();
      if (defaultRoles.length != 0) {
        await trx.insert(roleActions).values(
          defaultRoles.map((role) => ({
            roleId: role.roleId,
            actionId,
            orgId: role.orgId
          }))
        ).execute();
      }
    }
    if (actionsToRemove.length > 0) {
      logger_default.debug(`Removing actions: ${actionsToRemove.join(", ")}`);
      await trx.delete(actions).where(inArray(actions.actionId, actionsToRemove)).execute();
      await trx.delete(roleActions).where(inArray(roleActions.actionId, actionsToRemove)).execute();
    }
  });
}
async function createAdminRole(orgId) {
  let roleId;
  await db.transaction(async (trx) => {
    const [insertedRole] = await trx.insert(roles).values({
      orgId,
      isAdmin: true,
      name: "Admin",
      description: "Admin role with the most permissions"
    }).returning({ roleId: roles.roleId }).execute();
    if (!insertedRole || !insertedRole.roleId) {
      throw new Error("Failed to create Admin role");
    }
    roleId = insertedRole.roleId;
    const actionIds = await trx.select().from(actions).execute();
    if (actionIds.length === 0) {
      logger_default.info("No actions to assign to the Admin role");
      return;
    }
    await trx.insert(roleActions).values(
      actionIds.map((action) => ({
        roleId,
        actionId: action.actionId,
        orgId
      }))
    ).execute();
  });
  if (!roleId) {
    throw new Error("Failed to create Admin role");
  }
  return roleId;
}

// server/setup/copyInConfig.ts
import { eq as eq4, ne } from "drizzle-orm";
async function copyInConfig() {
  const endpoint = config_default.getRawConfig().gerbil.base_endpoint;
  const listenPort = config_default.getRawConfig().gerbil.start_port;
  await db.transaction(async (trx) => {
    const rawDomains = config_default.getRawConfig().domains;
    const configDomains = Object.entries(rawDomains).map(
      ([key, value]) => ({
        domainId: key,
        baseDomain: value.base_domain.toLowerCase()
      })
    );
    const existingDomains = await trx.select().from(domains).where(eq4(domains.configManaged, true));
    const existingDomainKeys = new Set(
      existingDomains.map((d) => d.domainId)
    );
    const configDomainKeys = new Set(configDomains.map((d) => d.domainId));
    for (const existingDomain of existingDomains) {
      if (!configDomainKeys.has(existingDomain.domainId)) {
        await trx.delete(domains).where(eq4(domains.domainId, existingDomain.domainId)).execute();
      }
    }
    for (const { domainId, baseDomain } of configDomains) {
      if (existingDomainKeys.has(domainId)) {
        await trx.update(domains).set({ baseDomain }).where(eq4(domains.domainId, domainId)).execute();
      } else {
        await trx.insert(domains).values({ domainId, baseDomain, configManaged: true }).execute();
      }
    }
    const allOrgs = await trx.select().from(orgs);
    const existingOrgDomains = await trx.select().from(orgDomains);
    const existingOrgDomainSet = new Set(
      existingOrgDomains.map((od) => `${od.orgId}-${od.domainId}`)
    );
    const newOrgDomains = [];
    for (const org of allOrgs) {
      for (const domain of configDomains) {
        const key = `${org.orgId}-${domain.domainId}`;
        if (!existingOrgDomainSet.has(key)) {
          newOrgDomains.push({
            orgId: org.orgId,
            domainId: domain.domainId
          });
        }
      }
    }
    if (newOrgDomains.length > 0) {
      await trx.insert(orgDomains).values(newOrgDomains).execute();
    }
  });
  await db.transaction(async (trx) => {
    const allResources = await trx.select().from(resources).leftJoin(domains, eq4(domains.domainId, resources.domainId));
    for (const { resources: resource, domains: domain } of allResources) {
      if (!resource || !domain) {
        continue;
      }
      if (!domain.configManaged) {
        continue;
      }
      let fullDomain = "";
      if (resource.isBaseDomain) {
        fullDomain = domain.baseDomain;
      } else {
        fullDomain = `${resource.subdomain}.${domain.baseDomain}`;
      }
      await trx.update(resources).set({ fullDomain }).where(eq4(resources.resourceId, resource.resourceId));
    }
  });
  await db.update(exitNodes).set({ endpoint }).where(ne(exitNodes.endpoint, endpoint));
  await db.update(exitNodes).set({ listenPort }).where(ne(exitNodes.listenPort, listenPort));
}

// server/auth/sessions/app.ts
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { eq as eq5, inArray as inArray2 } from "drizzle-orm";
import { generateRandomString } from "@oslojs/crypto/random";
var SESSION_COOKIE_NAME = config_default.getRawConfig().server.session_cookie_name;
var SESSION_COOKIE_EXPIRES = 1e3 * 60 * 60 * config_default.getRawConfig().server.dashboard_session_length_hours;
var COOKIE_DOMAIN = "." + new URL(config_default.getRawConfig().app.dashboard_url).hostname;
function generateSessionToken() {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token2 = encodeBase32LowerCaseNoPadding(bytes);
  return token2;
}
async function createSession(token2, userId) {
  const sessionId = encodeHexLowerCase(
    sha256(new TextEncoder().encode(token2))
  );
  const session = {
    sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_COOKIE_EXPIRES).getTime()
  };
  await db_default.insert(sessions).values(session);
  return session;
}
async function validateSessionToken(token2) {
  const sessionId = encodeHexLowerCase(
    sha256(new TextEncoder().encode(token2))
  );
  const result = await db_default.select({ user: users, session: sessions }).from(sessions).innerJoin(users, eq5(sessions.userId, users.userId)).where(eq5(sessions.sessionId, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt) {
    await db_default.delete(sessions).where(eq5(sessions.sessionId, session.sessionId));
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt - SESSION_COOKIE_EXPIRES / 2) {
    session.expiresAt = new Date(
      Date.now() + SESSION_COOKIE_EXPIRES
    ).getTime();
    await db_default.transaction(async (trx) => {
      await trx.update(sessions).set({
        expiresAt: session.expiresAt
      }).where(eq5(sessions.sessionId, session.sessionId));
      await trx.update(resourceSessions).set({
        expiresAt: session.expiresAt
      }).where(eq5(resourceSessions.userSessionId, session.sessionId));
    });
  }
  return { session, user };
}
async function invalidateSession(sessionId) {
  try {
    await db_default.transaction(async (trx) => {
      await trx.delete(resourceSessions).where(eq5(resourceSessions.userSessionId, sessionId));
      await trx.delete(sessions).where(eq5(sessions.sessionId, sessionId));
    });
  } catch (e2) {
    logger_default.error("Failed to invalidate session", e2);
  }
}
async function invalidateAllSessions(userId) {
  try {
    await db_default.transaction(async (trx) => {
      const userSessions = await trx.select().from(sessions).where(eq5(sessions.userId, userId));
      await trx.delete(resourceSessions).where(
        inArray2(
          resourceSessions.userSessionId,
          userSessions.map((s2) => s2.sessionId)
        )
      );
      await trx.delete(sessions).where(eq5(sessions.userId, userId));
    });
  } catch (e2) {
    logger_default.error("Failed to all invalidate user sessions", e2);
  }
}
function serializeSessionCookie(token2, isSecure, expiresAt) {
  if (isSecure) {
    return `${SESSION_COOKIE_NAME}=${token2}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure; Domain=${COOKIE_DOMAIN}`;
  } else {
    return `${SESSION_COOKIE_NAME}=${token2}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/;`;
  }
}
function createBlankSessionTokenCookie(isSecure) {
  if (isSecure) {
    return `${SESSION_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure; Domain=${COOKIE_DOMAIN}`;
  } else {
    return `${SESSION_COOKIE_NAME}=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/;`;
  }
}
var random = {
  read(bytes) {
    crypto.getRandomValues(bytes);
  }
};
function generateId(length) {
  const alphabet6 = "abcdefghijklmnopqrstuvwxyz0123456789";
  return generateRandomString(random, alphabet6, length);
}
function generateIdFromEntropySize(size) {
  const buffer = crypto.getRandomValues(new Uint8Array(size));
  return encodeBase32LowerCaseNoPadding(buffer);
}

// server/auth/password.ts
import { hash, verify } from "@node-rs/argon2";
async function verifyPassword(password, hash2) {
  const validPassword = await verify(hash2, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
  return validPassword;
}
async function hashPassword(password) {
  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1
  });
  return passwordHash;
}

// server/setup/setupServerAdmin.ts
import { eq as eq6 } from "drizzle-orm";
import moment from "moment";
import { fromError as fromError2 } from "zod-validation-error";
async function setupServerAdmin() {
  const {
    server_admin: { email, password }
  } = config_default.getRawConfig().users;
  const parsed = passwordSchema.safeParse(password);
  if (!parsed.success) {
    throw Error(
      `Invalid server admin password: ${fromError2(parsed.error).toString()}`
    );
  }
  const passwordHash = await hashPassword(password);
  await db_default.transaction(async (trx) => {
    try {
      const [existing] = await trx.select().from(users).where(eq6(users.email, email));
      if (existing) {
        const passwordChanged = !await verifyPassword(
          password,
          existing.passwordHash
        );
        if (passwordChanged) {
          await trx.update(users).set({ passwordHash }).where(eq6(users.userId, existing.userId));
          await invalidateAllSessions(existing.userId);
          logger_default.info(`Server admin (${email}) password updated`);
        }
        if (existing.serverAdmin) {
          logger_default.info(`Server admin (${email}) already exists`);
          return;
        }
        await trx.update(users).set({ serverAdmin: false });
        await trx.update(users).set({
          serverAdmin: true
        }).where(eq6(users.email, email));
        logger_default.info(`Server admin (${email}) set`);
        return;
      }
      const userId = generateId(15);
      await trx.update(users).set({ serverAdmin: false });
      await db_default.insert(users).values({
        userId,
        email,
        passwordHash,
        dateCreated: moment().toISOString(),
        serverAdmin: true,
        emailVerified: true
      });
      logger_default.info(`Server admin (${email}) created`);
    } catch (e2) {
      logger_default.error(e2);
      trx.rollback();
    }
  });
}

// server/setup/clearStaleData.ts
import { lt } from "drizzle-orm";
async function clearStaleData() {
  try {
    await db.delete(sessions).where(lt(sessions.expiresAt, (/* @__PURE__ */ new Date()).getTime()));
  } catch (e2) {
    logger_default.warn("Error clearing expired sessions:", e2);
  }
  try {
    await db.delete(newtSessions).where(lt(newtSessions.expiresAt, (/* @__PURE__ */ new Date()).getTime()));
  } catch (e2) {
    logger_default.warn("Error clearing expired newtSessions:", e2);
  }
  try {
    await db.delete(emailVerificationCodes).where(lt(emailVerificationCodes.expiresAt, (/* @__PURE__ */ new Date()).getTime()));
  } catch (e2) {
    logger_default.warn("Error clearing expired emailVerificationCodes:", e2);
  }
  try {
    await db.delete(passwordResetTokens).where(lt(passwordResetTokens.expiresAt, (/* @__PURE__ */ new Date()).getTime()));
  } catch (e2) {
    logger_default.warn("Error clearing expired passwordResetTokens:", e2);
  }
  try {
    await db.delete(userInvites).where(lt(userInvites.expiresAt, (/* @__PURE__ */ new Date()).getTime()));
  } catch (e2) {
    logger_default.warn("Error clearing expired userInvites:", e2);
  }
  try {
    await db.delete(resourceAccessToken).where(lt(resourceAccessToken.expiresAt, (/* @__PURE__ */ new Date()).getTime()));
  } catch (e2) {
    logger_default.warn("Error clearing expired resourceAccessToken:", e2);
  }
  try {
    await db.delete(resourceSessions).where(lt(resourceSessions.expiresAt, (/* @__PURE__ */ new Date()).getTime()));
  } catch (e2) {
    logger_default.warn("Error clearing expired resourceSessions:", e2);
  }
  try {
    await db.delete(resourceOtp).where(lt(resourceOtp.expiresAt, (/* @__PURE__ */ new Date()).getTime()));
  } catch (e2) {
    logger_default.warn("Error clearing expired resourceOtp:", e2);
  }
}

// server/setup/index.ts
async function runSetupFunctions() {
  try {
    await copyInConfig();
    await setupServerAdmin();
    await ensureActions();
    await clearStaleData();
  } catch (error) {
    logger_default.error("Error running setup functions:", error);
    process.exit(1);
  }
}

// server/apiServer.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// server/middlewares/notFound.ts
import createHttpError2 from "http-errors";
function notFoundMiddleware(req, res, next2) {
  if (req.path.startsWith("/api")) {
    const message = `The requests url is not found - ${req.originalUrl}`;
    return next2(createHttpError2(HttpCode_default.NOT_FOUND, message));
  }
  return next2();
}

// server/middlewares/rateLimit.ts
import { rateLimit } from "express-rate-limit";
import createHttpError3 from "http-errors";
function rateLimitMiddleware({
  windowMin,
  max,
  type,
  skipCondition
}) {
  if (type === "IP_AND_PATH") {
    return rateLimit({
      windowMs: windowMin * 60 * 1e3,
      max,
      skip: skipCondition,
      keyGenerator: (req) => {
        return `${req.ip}-${req.path}`;
      },
      handler: (req, res, next2) => {
        const message = `Rate limit exceeded. You can make ${max} requests every ${windowMin} minute(s).`;
        logger_default.warn(
          `Rate limit exceeded for IP ${req.ip} on path ${req.path}`
        );
        return next2(
          createHttpError3(HttpCode_default.TOO_MANY_REQUESTS, message)
        );
      }
    });
  }
  return rateLimit({
    windowMs: windowMin * 60 * 1e3,
    max,
    skip: skipCondition,
    handler: (req, res, next2) => {
      const message = `Rate limit exceeded. You can make ${max} requests every ${windowMin} minute(s).`;
      logger_default.warn(`Rate limit exceeded for IP ${req.ip}`);
      return next2(createHttpError3(HttpCode_default.TOO_MANY_REQUESTS, message));
    }
  });
}

// server/middlewares/formatError.ts
var errorHandlerMiddleware = (error, req, res, next2) => {
  const statusCode = error.statusCode || HttpCode_default.INTERNAL_SERVER_ERROR;
  res?.status(statusCode).send({
    data: null,
    success: false,
    error: true,
    message: error.message || "Internal Server Error",
    status: statusCode,
    stack: process.env.ENVIRONMENT === "prod" ? null : error.stack
  });
};

// server/middlewares/verifySession.ts
import { eq as eq7 } from "drizzle-orm";
import createHttpError5 from "http-errors";

// server/auth/sessions/verifySession.ts
async function verifySession(req) {
  const res = await validateSessionToken(
    req.cookies[SESSION_COOKIE_NAME] ?? ""
  );
  return res;
}

// server/auth/unauthorizedResponse.ts
import createHttpError4 from "http-errors";
function unauthorized(msg) {
  return createHttpError4(HttpCode_default.UNAUTHORIZED, msg || "Unauthorized");
}

// server/middlewares/verifySession.ts
var verifySessionMiddleware = async (req, res, next2) => {
  const { session, user } = await verifySession(req);
  if (!session || !user) {
    return next2(unauthorized());
  }
  const existingUser = await db.select().from(users).where(eq7(users.userId, user.userId));
  if (!existingUser || !existingUser[0]) {
    return next2(
      createHttpError5(HttpCode_default.BAD_REQUEST, "User does not exist")
    );
  }
  req.user = existingUser[0];
  req.session = session;
  next2();
};

// server/middlewares/verifyUser.ts
import { eq as eq8 } from "drizzle-orm";
import createHttpError6 from "http-errors";
var verifySessionUserMiddleware = async (req, res, next2) => {
  const { session, user } = await verifySession(req);
  if (!session || !user) {
    if (config_default.getRawConfig().app.log_failed_attempts) {
      logger_default.info(`User session not found. IP: ${req.ip}.`);
    }
    return next2(unauthorized());
  }
  const existingUser = await db.select().from(users).where(eq8(users.userId, user.userId));
  if (!existingUser || !existingUser[0]) {
    if (config_default.getRawConfig().app.log_failed_attempts) {
      logger_default.info(`User session not found. IP: ${req.ip}.`);
    }
    return next2(
      createHttpError6(HttpCode_default.BAD_REQUEST, "User does not exist")
    );
  }
  req.user = existingUser[0];
  req.session = session;
  if (!existingUser[0].emailVerified && config_default.getRawConfig().flags?.require_email_verification) {
    return next2(
      createHttpError6(HttpCode_default.BAD_REQUEST, "Email is not verified")
      // Might need to change the response type?
    );
  }
  next2();
};

// server/middlewares/verifyOrgAccess.ts
import { and as and2, eq as eq9 } from "drizzle-orm";
import createHttpError7 from "http-errors";
async function verifyOrgAccess(req, res, next2) {
  const userId = req.user.userId;
  const orgId = req.params.orgId;
  if (!userId) {
    return next2(
      createHttpError7(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  if (!orgId) {
    return next2(
      createHttpError7(HttpCode_default.BAD_REQUEST, "Invalid organization ID")
    );
  }
  try {
    if (!req.userOrg) {
      const userOrgRes = await db.select().from(userOrgs).where(
        and2(eq9(userOrgs.userId, userId), eq9(userOrgs.orgId, orgId))
      );
      req.userOrg = userOrgRes[0];
    }
    if (!req.userOrg) {
      next2(
        createHttpError7(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    } else {
      req.userOrgRoleId = req.userOrg.roleId;
      req.userOrgId = orgId;
      return next2();
    }
  } catch (e2) {
    return next2(
      createHttpError7(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error verifying organization access"
      )
    );
  }
}

// server/middlewares/getUserOrgs.ts
import { eq as eq10 } from "drizzle-orm";
import createHttpError8 from "http-errors";
async function getUserOrgs(req, res, next2) {
  const userId = req.user?.userId;
  if (!userId) {
    return next2(
      createHttpError8(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  try {
    const userOrganizations = await db.select({
      orgId: userOrgs.orgId,
      roleId: userOrgs.roleId
    }).from(userOrgs).where(eq10(userOrgs.userId, userId));
    req.userOrgIds = userOrganizations.map((org) => org.orgId);
    next2();
  } catch (error) {
    next2(
      createHttpError8(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error retrieving user organizations"
      )
    );
  }
}

// server/middlewares/verifySiteAccess.ts
import { and as and3, eq as eq11 } from "drizzle-orm";
import createHttpError9 from "http-errors";
async function verifySiteAccess(req, res, next2) {
  const userId = req.user.userId;
  const siteId = parseInt(
    req.params.siteId || req.body.siteId || req.query.siteId
  );
  if (!userId) {
    return next2(
      createHttpError9(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  if (isNaN(siteId)) {
    return next2(createHttpError9(HttpCode_default.BAD_REQUEST, "Invalid site ID"));
  }
  try {
    const site = await db.select().from(sites).where(eq11(sites.siteId, siteId)).limit(1);
    if (site.length === 0) {
      return next2(
        createHttpError9(
          HttpCode_default.NOT_FOUND,
          `Site with ID ${siteId} not found`
        )
      );
    }
    if (!site[0].orgId) {
      return next2(
        createHttpError9(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          `Site with ID ${siteId} does not have an organization ID`
        )
      );
    }
    if (!req.userOrg) {
      const userOrgRole = await db.select().from(userOrgs).where(
        and3(
          eq11(userOrgs.userId, userId),
          eq11(userOrgs.orgId, site[0].orgId)
        )
      ).limit(1);
      req.userOrg = userOrgRole[0];
    }
    if (!req.userOrg) {
      return next2(
        createHttpError9(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    }
    const userOrgRoleId = req.userOrg.roleId;
    req.userOrgRoleId = userOrgRoleId;
    req.userOrgId = site[0].orgId;
    const roleSiteAccess = await db.select().from(roleSites).where(
      and3(
        eq11(roleSites.siteId, siteId),
        eq11(roleSites.roleId, userOrgRoleId)
      )
    ).limit(1);
    if (roleSiteAccess.length > 0) {
      return next2();
    }
    const userSiteAccess = await db.select().from(userSites).where(
      and3(eq11(userSites.userId, userId), eq11(userSites.siteId, siteId))
    ).limit(1);
    if (userSiteAccess.length > 0) {
      return next2();
    }
    return next2(
      createHttpError9(
        HttpCode_default.FORBIDDEN,
        "User does not have access to this site"
      )
    );
  } catch (error) {
    return next2(
      createHttpError9(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error verifying site access"
      )
    );
  }
}

// server/middlewares/verifyResourceAccess.ts
import { and as and4, eq as eq12 } from "drizzle-orm";
import createHttpError10 from "http-errors";
async function verifyResourceAccess(req, res, next2) {
  const userId = req.user.userId;
  const resourceId = req.params.resourceId || req.body.resourceId || req.query.resourceId;
  if (!userId) {
    return next2(
      createHttpError10(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  try {
    const resource = await db.select().from(resources).where(eq12(resources.resourceId, resourceId)).limit(1);
    if (resource.length === 0) {
      return next2(
        createHttpError10(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    if (!resource[0].orgId) {
      return next2(
        createHttpError10(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          `Resource with ID ${resourceId} does not have an organization ID`
        )
      );
    }
    if (!req.userOrg) {
      const userOrgRole = await db.select().from(userOrgs).where(
        and4(
          eq12(userOrgs.userId, userId),
          eq12(userOrgs.orgId, resource[0].orgId)
        )
      ).limit(1);
      req.userOrg = userOrgRole[0];
    }
    if (!req.userOrg) {
      return next2(
        createHttpError10(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    }
    const userOrgRoleId = req.userOrg.roleId;
    req.userOrgRoleId = userOrgRoleId;
    req.userOrgId = resource[0].orgId;
    const roleResourceAccess = await db.select().from(roleResources).where(
      and4(
        eq12(roleResources.resourceId, resourceId),
        eq12(roleResources.roleId, userOrgRoleId)
      )
    ).limit(1);
    if (roleResourceAccess.length > 0) {
      return next2();
    }
    const userResourceAccess = await db.select().from(userResources).where(
      and4(
        eq12(userResources.userId, userId),
        eq12(userResources.resourceId, resourceId)
      )
    ).limit(1);
    if (userResourceAccess.length > 0) {
      return next2();
    }
    return next2(
      createHttpError10(
        HttpCode_default.FORBIDDEN,
        "User does not have access to this resource"
      )
    );
  } catch (error) {
    return next2(
      createHttpError10(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error verifying resource access"
      )
    );
  }
}

// server/middlewares/verifyTargetAccess.ts
import { and as and6, eq as eq14 } from "drizzle-orm";
import createHttpError11 from "http-errors";

// server/auth/canUserAccessResource.ts
import { and as and5, eq as eq13 } from "drizzle-orm";
async function canUserAccessResource({
  userId,
  resourceId,
  roleId
}) {
  const roleResourceAccess = await db_default.select().from(roleResources).where(
    and5(
      eq13(roleResources.resourceId, resourceId),
      eq13(roleResources.roleId, roleId)
    )
  ).limit(1);
  if (roleResourceAccess.length > 0) {
    return true;
  }
  const userResourceAccess = await db_default.select().from(userResources).where(
    and5(
      eq13(userResources.userId, userId),
      eq13(userResources.resourceId, resourceId)
    )
  ).limit(1);
  if (userResourceAccess.length > 0) {
    return true;
  }
  return false;
}

// server/middlewares/verifyTargetAccess.ts
async function verifyTargetAccess(req, res, next2) {
  const userId = req.user.userId;
  const targetId = parseInt(req.params.targetId);
  if (!userId) {
    return next2(
      createHttpError11(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  if (isNaN(targetId)) {
    return next2(
      createHttpError11(HttpCode_default.BAD_REQUEST, "Invalid organization ID")
    );
  }
  const target = await db.select().from(targets).where(eq14(targets.targetId, targetId)).limit(1);
  if (target.length === 0) {
    return next2(
      createHttpError11(
        HttpCode_default.NOT_FOUND,
        `Target with ID ${targetId} not found`
      )
    );
  }
  const resourceId = target[0].resourceId;
  if (!resourceId) {
    return next2(
      createHttpError11(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        `Target with ID ${targetId} does not have a resource ID`
      )
    );
  }
  try {
    const resource = await db.select().from(resources).where(eq14(resources.resourceId, resourceId)).limit(1);
    if (resource.length === 0) {
      return next2(
        createHttpError11(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    if (!resource[0].orgId) {
      return next2(
        createHttpError11(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          `resource with ID ${resourceId} does not have an organization ID`
        )
      );
    }
    if (!req.userOrg) {
      const res2 = await db.select().from(userOrgs).where(
        and6(
          eq14(userOrgs.userId, userId),
          eq14(userOrgs.orgId, resource[0].orgId)
        )
      );
      req.userOrg = res2[0];
    }
    if (!req.userOrg) {
      next2(
        createHttpError11(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    } else {
      req.userOrgRoleId = req.userOrg.roleId;
      req.userOrgId = resource[0].orgId;
    }
    const resourceAllowed = await canUserAccessResource({
      userId,
      resourceId,
      roleId: req.userOrgRoleId
    });
    if (!resourceAllowed) {
      return next2(
        createHttpError11(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this resource"
        )
      );
    }
    next2();
  } catch (e2) {
    return next2(
      createHttpError11(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error verifying organization access"
      )
    );
  }
}

// server/middlewares/verifyRoleAccess.ts
import { and as and7, eq as eq15, inArray as inArray3 } from "drizzle-orm";
import createHttpError12 from "http-errors";
async function verifyRoleAccess(req, res, next2) {
  const userId = req.user?.userId;
  const singleRoleId = parseInt(
    req.params.roleId || req.body.roleId || req.query.roleId
  );
  if (!userId) {
    return next2(
      createHttpError12(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  const { roleIds } = req.body;
  const allRoleIds = roleIds || (isNaN(singleRoleId) ? [] : [singleRoleId]);
  if (allRoleIds.length === 0) {
    return next2();
  }
  try {
    const rolesData = await db.select().from(roles).where(inArray3(roles.roleId, allRoleIds));
    if (rolesData.length !== allRoleIds.length) {
      return next2(
        createHttpError12(
          HttpCode_default.NOT_FOUND,
          "One or more roles not found"
        )
      );
    }
    for (const role of rolesData) {
      const userOrgRole = await db.select().from(userOrgs).where(
        and7(
          eq15(userOrgs.userId, userId),
          eq15(userOrgs.orgId, role.orgId)
        )
      ).limit(1);
      if (userOrgRole.length === 0) {
        return next2(
          createHttpError12(
            HttpCode_default.FORBIDDEN,
            `User does not have access to organization for role ID ${role.roleId}`
          )
        );
      }
      req.userOrgId = role.orgId;
    }
    const orgId = req.userOrgId;
    if (!orgId) {
      return next2(
        createHttpError12(
          HttpCode_default.BAD_REQUEST,
          "Organization ID not found"
        )
      );
    }
    if (!req.userOrg) {
      const userOrg = await db.select().from(userOrgs).where(
        and7(eq15(userOrgs.userId, userId), eq15(userOrgs.orgId, orgId))
      ).limit(1);
      req.userOrg = userOrg[0];
      req.userOrgRoleId = userOrg[0].roleId;
    }
    return next2();
  } catch (error) {
    logger_default.error("Error verifying role access:", error);
    return next2(
      createHttpError12(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error verifying role access"
      )
    );
  }
}

// server/middlewares/verifyUserAccess.ts
import { and as and8, eq as eq16 } from "drizzle-orm";
import createHttpError13 from "http-errors";
async function verifyUserAccess(req, res, next2) {
  const userId = req.user.userId;
  const reqUserId = req.params.userId || req.body.userId || req.query.userId;
  if (!userId) {
    return next2(
      createHttpError13(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  if (!reqUserId) {
    return next2(createHttpError13(HttpCode_default.BAD_REQUEST, "Invalid user ID"));
  }
  try {
    if (!req.userOrg) {
      const res2 = await db.select().from(userOrgs).where(
        and8(
          eq16(userOrgs.userId, reqUserId),
          eq16(userOrgs.orgId, req.userOrgId)
        )
      ).limit(1);
      req.userOrg = res2[0];
    }
    if (!req.userOrg) {
      return next2(
        createHttpError13(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this user"
        )
      );
    }
    return next2();
  } catch (error) {
    return next2(
      createHttpError13(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error checking if user has access to this user"
      )
    );
  }
}

// server/middlewares/verifyAdmin.ts
import { and as and9, eq as eq17 } from "drizzle-orm";
import createHttpError14 from "http-errors";

// server/middlewares/verifySetResourceUsers.ts
import { and as and10, eq as eq18, inArray as inArray4 } from "drizzle-orm";
import createHttpError15 from "http-errors";
async function verifySetResourceUsers(req, res, next2) {
  const userId = req.user.userId;
  const userIds = req.body.userIds;
  if (!userId) {
    return next2(
      createHttpError15(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  if (!req.userOrg) {
    return next2(
      createHttpError15(
        HttpCode_default.FORBIDDEN,
        "User does not have access to this user"
      )
    );
  }
  if (!userIds) {
    return next2(createHttpError15(HttpCode_default.BAD_REQUEST, "Invalid user IDs"));
  }
  if (userIds.length === 0) {
    return next2();
  }
  try {
    const orgId = req.userOrg.orgId;
    const userOrgsData = await db.select().from(userOrgs).where(
      and10(
        inArray4(userOrgs.userId, userIds),
        eq18(userOrgs.orgId, orgId)
      )
    );
    if (userOrgsData.length !== userIds.length) {
      return next2(
        createHttpError15(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this user"
        )
      );
    }
    return next2();
  } catch (error) {
    return next2(
      createHttpError15(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error checking if user has access to this user"
      )
    );
  }
}

// server/middlewares/verifyUserInRole.ts
import createHttpError16 from "http-errors";

// server/middlewares/verifyAccessTokenAccess.ts
import { and as and11, eq as eq19 } from "drizzle-orm";
import createHttpError17 from "http-errors";
async function verifyAccessTokenAccess(req, res, next2) {
  const userId = req.user.userId;
  const accessTokenId = req.params.accessTokenId;
  if (!userId) {
    return next2(
      createHttpError17(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  const [accessToken] = await db.select().from(resourceAccessToken).where(eq19(resourceAccessToken.accessTokenId, accessTokenId)).limit(1);
  if (!accessToken) {
    return next2(
      createHttpError17(
        HttpCode_default.NOT_FOUND,
        `Access token with ID ${accessTokenId} not found`
      )
    );
  }
  const resourceId = accessToken.resourceId;
  if (!resourceId) {
    return next2(
      createHttpError17(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        `Access token with ID ${accessTokenId} does not have a resource ID`
      )
    );
  }
  try {
    const resource = await db.select().from(resources).where(eq19(resources.resourceId, resourceId)).limit(1);
    if (resource.length === 0) {
      return next2(
        createHttpError17(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    if (!resource[0].orgId) {
      return next2(
        createHttpError17(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          `Resource with ID ${resourceId} does not have an organization ID`
        )
      );
    }
    if (!req.userOrg) {
      const res2 = await db.select().from(userOrgs).where(
        and11(
          eq19(userOrgs.userId, userId),
          eq19(userOrgs.orgId, resource[0].orgId)
        )
      );
      req.userOrg = res2[0];
    }
    if (!req.userOrg) {
      next2(
        createHttpError17(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    } else {
      req.userOrgRoleId = req.userOrg.roleId;
      req.userOrgId = resource[0].orgId;
    }
    const resourceAllowed = await canUserAccessResource({
      userId,
      resourceId,
      roleId: req.userOrgRoleId
    });
    if (!resourceAllowed) {
      return next2(
        createHttpError17(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this resource"
        )
      );
    }
    next2();
  } catch (e2) {
    return next2(
      createHttpError17(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error verifying organization access"
      )
    );
  }
}

// server/middlewares/verifyClientAccess.ts
import { and as and12, eq as eq20 } from "drizzle-orm";
import createHttpError18 from "http-errors";
async function verifyClientAccess(req, res, next2) {
  const userId = req.user.userId;
  const clientId = parseInt(
    req.params.clientId || req.body.clientId || req.query.clientId
  );
  if (!userId) {
    return next2(
      createHttpError18(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  if (isNaN(clientId)) {
    return next2(createHttpError18(HttpCode_default.BAD_REQUEST, "Invalid client ID"));
  }
  try {
    const [client] = await db.select().from(clients).where(eq20(clients.clientId, clientId)).limit(1);
    if (!client) {
      return next2(
        createHttpError18(
          HttpCode_default.NOT_FOUND,
          `Client with ID ${clientId} not found`
        )
      );
    }
    if (!client.orgId) {
      return next2(
        createHttpError18(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          `Client with ID ${clientId} does not have an organization ID`
        )
      );
    }
    if (!req.userOrg) {
      const userOrgRole = await db.select().from(userOrgs).where(
        and12(
          eq20(userOrgs.userId, userId),
          eq20(userOrgs.orgId, client.orgId)
        )
      ).limit(1);
      req.userOrg = userOrgRole[0];
    }
    if (!req.userOrg) {
      return next2(
        createHttpError18(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    }
    const userOrgRoleId = req.userOrg.roleId;
    req.userOrgRoleId = userOrgRoleId;
    req.userOrgId = client.orgId;
    const [roleClientAccess] = await db.select().from(roleClients).where(
      and12(
        eq20(roleClients.clientId, clientId),
        eq20(roleClients.roleId, userOrgRoleId)
      )
    ).limit(1);
    if (roleClientAccess) {
      return next2();
    }
    const [userClientAccess] = await db.select().from(userClients).where(
      and12(
        eq20(userClients.userId, userId),
        eq20(userClients.clientId, clientId)
      )
    ).limit(1);
    if (userClientAccess) {
      return next2();
    }
    return next2(
      createHttpError18(
        HttpCode_default.FORBIDDEN,
        "User does not have access to this client"
      )
    );
  } catch (error) {
    return next2(
      createHttpError18(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error verifying site access"
      )
    );
  }
}

// server/middlewares/verifyUserIsServerAdmin.ts
import createHttpError19 from "http-errors";
async function verifyUserIsServerAdmin(req, res, next2) {
  const userId = req.user.userId;
  if (!userId) {
    return next2(
      createHttpError19(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  try {
    if (!req.user?.serverAdmin) {
      return next2(
        createHttpError19(
          HttpCode_default.FORBIDDEN,
          "User is not a server admin"
        )
      );
    }
    return next2();
  } catch (e2) {
    return next2(
      createHttpError19(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error verifying organization access"
      )
    );
  }
}

// server/routers/external.ts
import { Router as Router2 } from "express";

// server/routers/site/getSite.ts
import { z as z3 } from "zod";
import { eq as eq21, and as and13 } from "drizzle-orm";

// server/lib/response.ts
var response = (res, { data, success, error, message, status }) => {
  return res.status(status).send({
    data,
    success,
    error,
    message,
    status
  });
};
var response_default = response;

// server/routers/site/getSite.ts
import createHttpError20 from "http-errors";
import { fromError as fromError3 } from "zod-validation-error";
var getSiteSchema = z3.object({
  siteId: z3.string().optional().transform(stoi).pipe(z3.number().int().positive().optional()).optional(),
  niceId: z3.string().optional(),
  orgId: z3.string().optional()
}).strict();
async function query(siteId, niceId, orgId) {
  if (siteId) {
    const [res] = await db.select().from(sites).where(eq21(sites.siteId, siteId)).limit(1);
    return res;
  } else if (niceId && orgId) {
    const [res] = await db.select().from(sites).where(and13(eq21(sites.niceId, niceId), eq21(sites.orgId, orgId))).limit(1);
    return res;
  }
}
async function getSite(req, res, next2) {
  try {
    const parsedParams = getSiteSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError20(
          HttpCode_default.BAD_REQUEST,
          fromError3(parsedParams.error).toString()
        )
      );
    }
    const { siteId, niceId, orgId } = parsedParams.data;
    const site = await query(siteId, niceId, orgId);
    if (!site) {
      return next2(createHttpError20(HttpCode_default.NOT_FOUND, "Site not found"));
    }
    return response_default(res, {
      data: site,
      success: true,
      error: false,
      message: "Site retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError20(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/site/createSite.ts
import { z as z4 } from "zod";
import createHttpError21 from "http-errors";
import { eq as eq24, and as and15 } from "drizzle-orm";

// server/db/names.ts
import { join } from "path";
import { readFileSync } from "fs";
import { eq as eq22, and as and14 } from "drizzle-orm";
var dev = process.env.ENVIRONMENT !== "prod";
var file;
if (!dev) {
  file = join(__DIRNAME, "names.json");
} else {
  file = join("server/db/names.json");
}
var names = JSON.parse(readFileSync(file, "utf-8"));
async function getUniqueSiteName(orgId) {
  let loops = 0;
  while (true) {
    if (loops > 100) {
      throw new Error("Could not generate a unique name");
    }
    const name2 = generateName();
    const count7 = await db.select({ niceId: sites.niceId, orgId: sites.orgId }).from(sites).where(and14(eq22(sites.niceId, name2), eq22(sites.orgId, orgId)));
    if (count7.length === 0) {
      return name2;
    }
    loops++;
  }
}
async function getUniqueExitNodeEndpointName() {
  let loops = 0;
  const count7 = await db.select().from(exitNodes);
  while (true) {
    if (loops > 100) {
      throw new Error("Could not generate a unique name");
    }
    const name2 = generateName();
    for (const node of count7) {
      if (node.endpoint.includes(name2)) {
        loops++;
        continue;
      }
    }
    return name2;
  }
}
function generateName() {
  return (names.descriptors[Math.floor(Math.random() * names.descriptors.length)] + "-" + names.animals[Math.floor(Math.random() * names.animals.length)]).toLowerCase().replace(/\s/g, "-");
}

// server/routers/gerbil/peers.ts
import axios from "axios";
import { eq as eq23 } from "drizzle-orm";
async function addPeer(exitNodeId, peer) {
  const [exitNode] = await db_default.select().from(exitNodes).where(eq23(exitNodes.exitNodeId, exitNodeId)).limit(1);
  if (!exitNode) {
    throw new Error(`Exit node with ID ${exitNodeId} not found`);
  }
  if (!exitNode.reachableAt) {
    throw new Error(`Exit node with ID ${exitNodeId} is not reachable`);
  }
  try {
    const response2 = await axios.post(`${exitNode.reachableAt}/peer`, peer, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    logger_default.info("Peer added successfully:", response2.data.status);
    return response2.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
}
async function deletePeer(exitNodeId, publicKey) {
  const [exitNode] = await db_default.select().from(exitNodes).where(eq23(exitNodes.exitNodeId, exitNodeId)).limit(1);
  if (!exitNode) {
    throw new Error(`Exit node with ID ${exitNodeId} not found`);
  }
  if (!exitNode.reachableAt) {
    throw new Error(`Exit node with ID ${exitNodeId} is not reachable`);
  }
  try {
    const response2 = await axios.delete(`${exitNode.reachableAt}/peer?public_key=${encodeURIComponent(publicKey)}`);
    logger_default.info("Peer deleted successfully:", response2.data.status);
    return response2.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
}

// server/routers/site/createSite.ts
import { fromError as fromError4 } from "zod-validation-error";
import moment2 from "moment";
var createSiteParamsSchema = z4.object({
  orgId: z4.string()
}).strict();
var createSiteSchema = z4.object({
  name: z4.string().min(1).max(255),
  exitNodeId: z4.number().int().positive().optional(),
  // subdomain: z
  //     .string()
  //     .min(1)
  //     .max(255)
  //     .transform((val) => val.toLowerCase())
  //     .optional(),
  pubKey: z4.string().optional(),
  subnet: z4.string().optional(),
  newtId: z4.string().optional(),
  secret: z4.string().optional(),
  type: z4.enum(["newt", "wireguard", "local"])
}).strict();
async function createSite(req, res, next2) {
  try {
    const parsedBody = createSiteSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError21(
          HttpCode_default.BAD_REQUEST,
          fromError4(parsedBody.error).toString()
        )
      );
    }
    const { name: name2, type, exitNodeId, pubKey, subnet, newtId, secret } = parsedBody.data;
    const parsedParams = createSiteParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError21(
          HttpCode_default.BAD_REQUEST,
          fromError4(parsedParams.error).toString()
        )
      );
    }
    const { orgId } = parsedParams.data;
    if (!req.userOrgRoleId) {
      return next2(
        createHttpError21(HttpCode_default.FORBIDDEN, "User does not have a role")
      );
    }
    const niceId = await getUniqueSiteName(orgId);
    await db.transaction(async (trx) => {
      let newSite;
      if (exitNodeId) {
        if (!subnet) {
          return next2(
            createHttpError21(
              HttpCode_default.BAD_REQUEST,
              "Subnet is required for tunneled sites"
            )
          );
        }
        [newSite] = await trx.insert(sites).values({
          orgId,
          exitNodeId,
          name: name2,
          niceId,
          subnet,
          type,
          ...pubKey && type == "wireguard" && { pubKey }
        }).returning();
      } else {
        [newSite] = await trx.insert(sites).values({
          orgId,
          name: name2,
          niceId,
          type,
          subnet: "0.0.0.0/0"
        }).returning();
      }
      const adminRole = await trx.select().from(roles).where(and15(eq24(roles.isAdmin, true), eq24(roles.orgId, orgId))).limit(1);
      if (adminRole.length === 0) {
        return next2(
          createHttpError21(HttpCode_default.NOT_FOUND, `Admin role not found`)
        );
      }
      await trx.insert(roleSites).values({
        roleId: adminRole[0].roleId,
        siteId: newSite.siteId
      });
      if (req.userOrgRoleId != adminRole[0].roleId) {
        trx.insert(userSites).values({
          userId: req.user?.userId,
          siteId: newSite.siteId
        });
      }
      if (type == "newt") {
        const secretHash = await hashPassword(secret);
        await trx.insert(newts).values({
          newtId,
          secretHash,
          siteId: newSite.siteId,
          dateCreated: moment2().toISOString()
        });
      } else if (type == "wireguard") {
        if (!pubKey) {
          return next2(
            createHttpError21(
              HttpCode_default.BAD_REQUEST,
              "Public key is required for wireguard sites"
            )
          );
        }
        if (!exitNodeId) {
          return next2(
            createHttpError21(
              HttpCode_default.BAD_REQUEST,
              "Exit node ID is required for wireguard sites"
            )
          );
        }
        await addPeer(exitNodeId, {
          publicKey: pubKey,
          allowedIps: []
        });
      }
      return response_default(res, {
        data: newSite,
        success: true,
        error: false,
        message: "Site created successfully",
        status: HttpCode_default.CREATED
      });
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError21(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/site/deleteSite.ts
import { z as z10 } from "zod";
import { eq as eq36 } from "drizzle-orm";
import createHttpError26 from "http-errors";
import { fromError as fromError10 } from "zod-validation-error";

// server/routers/ws.ts
import { Router } from "express";
import { WebSocket, WebSocketServer } from "ws";
import { eq as eq35 } from "drizzle-orm";

// server/auth/sessions/newt.ts
import {
  encodeHexLowerCase as encodeHexLowerCase2
} from "@oslojs/encoding";
import { sha256 as sha2562 } from "@oslojs/crypto/sha2";
import { eq as eq25 } from "drizzle-orm";
var EXPIRES = 1e3 * 60 * 60 * 24 * 30;
async function createNewtSession(token2, newtId) {
  const sessionId = encodeHexLowerCase2(
    sha2562(new TextEncoder().encode(token2))
  );
  const session = {
    sessionId,
    newtId,
    expiresAt: new Date(Date.now() + EXPIRES).getTime()
  };
  await db_default.insert(newtSessions).values(session);
  return session;
}
async function validateNewtSessionToken(token2) {
  const sessionId = encodeHexLowerCase2(
    sha2562(new TextEncoder().encode(token2))
  );
  const result = await db_default.select({ newt: newts, session: newtSessions }).from(newtSessions).innerJoin(newts, eq25(newtSessions.newtId, newts.newtId)).where(eq25(newtSessions.sessionId, sessionId));
  if (result.length < 1) {
    return { session: null, newt: null };
  }
  const { newt, session } = result[0];
  if (Date.now() >= session.expiresAt) {
    await db_default.delete(newtSessions).where(eq25(newtSessions.sessionId, session.sessionId));
    return { session: null, newt: null };
  }
  if (Date.now() >= session.expiresAt - EXPIRES / 2) {
    session.expiresAt = new Date(
      Date.now() + EXPIRES
    ).getTime();
    await db_default.update(newtSessions).set({
      expiresAt: session.expiresAt
    }).where(eq25(newtSessions.sessionId, session.sessionId));
  }
  return { session, newt };
}

// server/auth/sessions/olm.ts
import {
  encodeHexLowerCase as encodeHexLowerCase3
} from "@oslojs/encoding";
import { sha256 as sha2563 } from "@oslojs/crypto/sha2";
import { eq as eq26 } from "drizzle-orm";
var EXPIRES2 = 1e3 * 60 * 60 * 24 * 30;
async function createOlmSession(token2, olmId) {
  const sessionId = encodeHexLowerCase3(
    sha2563(new TextEncoder().encode(token2))
  );
  const session = {
    sessionId,
    olmId,
    expiresAt: new Date(Date.now() + EXPIRES2).getTime()
  };
  await db_default.insert(olmSessions).values(session);
  return session;
}
async function validateOlmSessionToken(token2) {
  const sessionId = encodeHexLowerCase3(
    sha2563(new TextEncoder().encode(token2))
  );
  const result = await db_default.select({ olm: olms, session: olmSessions }).from(olmSessions).innerJoin(olms, eq26(olmSessions.olmId, olms.olmId)).where(eq26(olmSessions.sessionId, sessionId));
  if (result.length < 1) {
    return { session: null, olm: null };
  }
  const { olm, session } = result[0];
  if (Date.now() >= session.expiresAt) {
    await db_default.delete(olmSessions).where(eq26(olmSessions.sessionId, session.sessionId));
    return { session: null, olm: null };
  }
  if (Date.now() >= session.expiresAt - EXPIRES2 / 2) {
    session.expiresAt = new Date(
      Date.now() + EXPIRES2
    ).getTime();
    await db_default.update(olmSessions).set({
      expiresAt: session.expiresAt
    }).where(eq26(olmSessions.sessionId, session.sessionId));
  }
  return { session, olm };
}

// server/routers/newt/createNewt.ts
import { z as z5 } from "zod";
import createHttpError22 from "http-errors";
import { SqliteError } from "better-sqlite3";
import moment3 from "moment";
import { fromError as fromError5 } from "zod-validation-error";
var createNewtBodySchema = z5.object({});
var createNewtSchema = z5.object({
  newtId: z5.string(),
  secret: z5.string()
}).strict();
async function createNewt(req, res, next2) {
  try {
    const parsedBody = createNewtSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError22(
          HttpCode_default.BAD_REQUEST,
          fromError5(parsedBody.error).toString()
        )
      );
    }
    const { newtId, secret } = parsedBody.data;
    if (!req.userOrgRoleId) {
      return next2(
        createHttpError22(HttpCode_default.FORBIDDEN, "User does not have a role")
      );
    }
    const secretHash = await hashPassword(secret);
    await db_default.insert(newts).values({
      newtId,
      secretHash,
      dateCreated: moment3().toISOString()
    });
    const token2 = generateSessionToken();
    await createNewtSession(token2, newtId);
    return response_default(res, {
      data: {
        newtId,
        secret,
        token: token2
      },
      success: true,
      error: false,
      message: "Newt created successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    if (e2 instanceof SqliteError && e2.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return next2(
        createHttpError22(
          HttpCode_default.BAD_REQUEST,
          "A newt with that email address already exists"
        )
      );
    } else {
      console.error(e2);
      return next2(
        createHttpError22(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "Failed to create newt"
        )
      );
    }
  }
}

// server/routers/newt/getNewtToken.ts
import { eq as eq27 } from "drizzle-orm";
import createHttpError23 from "http-errors";
import { z as z6 } from "zod";
import { fromError as fromError6 } from "zod-validation-error";
var newtGetTokenBodySchema = z6.object({
  newtId: z6.string(),
  secret: z6.string(),
  token: z6.string().optional()
});
async function getNewtToken(req, res, next2) {
  const parsedBody = newtGetTokenBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError23(
        HttpCode_default.BAD_REQUEST,
        fromError6(parsedBody.error).toString()
      )
    );
  }
  const { newtId, secret, token: token2 } = parsedBody.data;
  try {
    if (token2) {
      const { session, newt } = await validateNewtSessionToken(token2);
      if (session) {
        if (config_default.getRawConfig().app.log_failed_attempts) {
          logger_default.info(
            `Newt session already valid. Newt ID: ${newtId}. IP: ${req.ip}.`
          );
        }
        return response_default(res, {
          data: null,
          success: true,
          error: false,
          message: "Token session already valid",
          status: HttpCode_default.OK
        });
      }
    }
    const existingNewtRes = await db_default.select().from(newts).where(eq27(newts.newtId, newtId));
    if (!existingNewtRes || !existingNewtRes.length) {
      return next2(
        createHttpError23(
          HttpCode_default.BAD_REQUEST,
          "No newt found with that newtId"
        )
      );
    }
    const existingNewt = existingNewtRes[0];
    const validSecret = await verifyPassword(
      secret,
      existingNewt.secretHash
    );
    if (!validSecret) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Newt id or secret is incorrect. Newt: ID ${newtId}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError23(HttpCode_default.BAD_REQUEST, "Secret is incorrect")
      );
    }
    const resToken = generateSessionToken();
    await createNewtSession(resToken, existingNewt.newtId);
    return response_default(res, {
      data: {
        token: resToken
      },
      success: true,
      error: false,
      message: "Token created successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    console.error(e2);
    return next2(
      createHttpError23(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to authenticate newt"
      )
    );
  }
}

// server/routers/newt/handleNewtRegisterMessage.ts
import { eq as eq28, and as and16, inArray as inArray5 } from "drizzle-orm";
var handleNewtRegisterMessage = async (context) => {
  const { message, client, sendToClient: sendToClient2 } = context;
  const newt = client;
  logger_default.info("Handling register newt message!");
  if (!newt) {
    logger_default.warn("Newt not found");
    return;
  }
  if (!newt.siteId) {
    logger_default.warn("Newt has no site!");
    return;
  }
  const siteId = newt.siteId;
  const { publicKey } = message.data;
  if (!publicKey) {
    logger_default.warn("Public key not provided");
    return;
  }
  const [site] = await db_default.select().from(sites).where(eq28(sites.siteId, siteId)).limit(1);
  if (!site || !site.exitNodeId) {
    logger_default.warn("Site not found or does not have exit node");
    return;
  }
  await db_default.update(sites).set({
    pubKey: publicKey
  }).where(eq28(sites.siteId, siteId)).returning();
  const [exitNode] = await db_default.select().from(exitNodes).where(eq28(exitNodes.exitNodeId, site.exitNodeId)).limit(1);
  if (site.pubKey && site.pubKey !== publicKey) {
    logger_default.info("Public key mismatch. Deleting old peer...");
    await deletePeer(site.exitNodeId, site.pubKey);
  }
  if (!site.subnet) {
    logger_default.warn("Site has no subnet");
    return;
  }
  await addPeer(site.exitNodeId, {
    publicKey,
    allowedIps: [site.subnet]
  });
  const allResources = await db_default.transaction(async (tx) => {
    const resourcesList = await tx.select({
      resourceId: resources.resourceId,
      subdomain: resources.subdomain,
      fullDomain: resources.fullDomain,
      ssl: resources.ssl,
      blockAccess: resources.blockAccess,
      sso: resources.sso,
      emailWhitelistEnabled: resources.emailWhitelistEnabled,
      http: resources.http,
      proxyPort: resources.proxyPort,
      protocol: resources.protocol
    }).from(resources).where(eq28(resources.siteId, siteId));
    const resourceIds = resourcesList.map((r2) => r2.resourceId);
    const allTargets = resourceIds.length > 0 ? await tx.select({
      resourceId: targets.resourceId,
      targetId: targets.targetId,
      ip: targets.ip,
      method: targets.method,
      port: targets.port,
      internalPort: targets.internalPort,
      enabled: targets.enabled
    }).from(targets).where(
      and16(
        inArray5(targets.resourceId, resourceIds),
        eq28(targets.enabled, true)
      )
    ) : [];
    return resourcesList.map((resource) => ({
      ...resource,
      targets: allTargets.filter(
        (target) => target.resourceId === resource.resourceId
      )
    }));
  });
  const { tcpTargets, udpTargets } = allResources.reduce(
    (acc, resource) => {
      if (!resource.targets?.length) return acc;
      const formattedTargets = resource.targets.filter(
        (target) => target?.internalPort && target?.ip && target?.port
      ).map(
        (target) => `${target.internalPort}:${target.ip}:${target.port}`
      );
      if (resource.protocol === "tcp") {
        acc.tcpTargets.push(...formattedTargets);
      } else {
        acc.udpTargets.push(...formattedTargets);
      }
      return acc;
    },
    { tcpTargets: [], udpTargets: [] }
  );
  return {
    message: {
      type: "newt/wg/connect",
      data: {
        endpoint: `${exitNode.endpoint}:${exitNode.listenPort}`,
        publicKey: exitNode.publicKey,
        serverIP: exitNode.address.split("/")[0],
        tunnelIP: site.subnet.split("/")[0],
        targets: {
          udp: udpTargets,
          tcp: tcpTargets
        }
      }
    },
    broadcast: false,
    // Send to all clients
    excludeSender: false
    // Include sender in broadcast
  };
};

// server/routers/newt/handleReceiveBandwidthMessage.ts
import { eq as eq29 } from "drizzle-orm";
var handleReceiveBandwidthMessage = async (context) => {
  const { message, client, sendToClient: sendToClient2 } = context;
  if (!message.data.bandwidthData) {
    logger_default.warn("No bandwidth data provided");
  }
  const bandwidthData = message.data.bandwidthData;
  if (!Array.isArray(bandwidthData)) {
    throw new Error("Invalid bandwidth data");
  }
  await db_default.transaction(async (trx) => {
    for (const peer of bandwidthData) {
      const { publicKey, bytesIn, bytesOut } = peer;
      const [client2] = await trx.select().from(clients).where(eq29(clients.pubKey, publicKey)).limit(1);
      if (!client2) {
        continue;
      }
      let online = client2.online;
      if (bytesIn > 0) {
        online = true;
      } else if (client2.lastBandwidthUpdate) {
        const lastBandwidthUpdate = new Date(
          client2.lastBandwidthUpdate
        );
        const currentTime = /* @__PURE__ */ new Date();
        const diff = currentTime.getTime() - lastBandwidthUpdate.getTime();
        if (diff < 3e5) {
          online = false;
        }
      }
      await trx.update(clients).set({
        megabytesOut: (client2.megabytesIn || 0) + bytesIn,
        megabytesIn: (client2.megabytesOut || 0) + bytesOut,
        lastBandwidthUpdate: (/* @__PURE__ */ new Date()).toISOString(),
        online
      }).where(eq29(clients.clientId, client2.clientId));
    }
  });
};

// server/routers/olm/handleOlmRegisterMessage.ts
import { eq as eq31 } from "drizzle-orm";

// server/routers/newt/peers.ts
import { eq as eq30 } from "drizzle-orm";
async function addPeer2(siteId, peer) {
  const [site] = await db_default.select().from(sites).where(eq30(sites.siteId, siteId)).limit(1);
  if (!site) {
    throw new Error(`Exit node with ID ${siteId} not found`);
  }
  const [newt] = await db_default.select().from(newts).where(eq30(newts.siteId, siteId)).limit(1);
  if (!newt) {
    throw new Error(`Newt not found for site ${siteId}`);
  }
  sendToClient(newt.newtId, {
    type: "newt/wg/peer/add",
    data: peer
  });
  logger_default.info(`Added peer ${peer.publicKey} to newt ${newt.newtId}`);
}
async function deletePeer2(siteId, publicKey) {
  const [site] = await db_default.select().from(sites).where(eq30(sites.siteId, siteId)).limit(1);
  if (!site) {
    throw new Error(`Exit node with ID ${siteId} not found`);
  }
  const [newt] = await db_default.select().from(newts).where(eq30(newts.siteId, siteId)).limit(1);
  if (!newt) {
    throw new Error(`Newt not found for site ${siteId}`);
  }
  sendToClient(newt.newtId, {
    type: "newt/wg/peer/remove",
    data: {
      publicKey
    }
  });
  logger_default.info(`Deleted peer ${publicKey} from newt ${newt.newtId}`);
}

// server/routers/olm/handleOlmRegisterMessage.ts
var handleOlmRegisterMessage = async (context) => {
  const { message, client: c2, sendToClient: sendToClient2 } = context;
  const olm = c2;
  logger_default.info("Handling register olm message!");
  if (!olm) {
    logger_default.warn("Olm not found");
    return;
  }
  if (!olm.clientId) {
    logger_default.warn("Olm has no site!");
    return;
  }
  const clientId = olm.clientId;
  const { publicKey } = message.data;
  if (!publicKey) {
    logger_default.warn("Public key not provided");
    return;
  }
  const [client] = await db_default.select().from(clients).where(eq31(clients.clientId, clientId)).limit(1);
  if (!client || !client.siteId) {
    logger_default.warn("Site not found or does not have exit node");
    return;
  }
  const [site] = await db_default.select().from(sites).where(eq31(sites.siteId, client.siteId)).limit(1);
  if (!site) {
    logger_default.warn("Site not found or does not have exit node");
    return;
  }
  if (!site.exitNodeId) {
    logger_default.warn("Site does not have exit node");
    return;
  }
  const [exitNode] = await db_default.select().from(exitNodes).where(eq31(exitNodes.exitNodeId, site.exitNodeId)).limit(1);
  sendToClient2(olm.olmId, {
    type: "olm/wg/holepunch",
    data: {
      serverPubKey: exitNode.publicKey
    }
  });
  if (!site.endpoint || !client.endpoint) {
    logger_default.warn("Site or client has no endpoint or listen port");
    return;
  }
  const now = (/* @__PURE__ */ new Date()).getTime() / 1e3;
  if (site.lastHolePunch && now - site.lastHolePunch > 6) {
    logger_default.warn("Site last hole punch is too old");
    return;
  }
  if (client.lastHolePunch && now - client.lastHolePunch > 6) {
    logger_default.warn("Client last hole punch is too old");
    return;
  }
  await db_default.update(clients).set({
    pubKey: publicKey
  }).where(eq31(clients.clientId, olm.clientId)).returning();
  if (client.pubKey && client.pubKey !== publicKey) {
    logger_default.info("Public key mismatch. Deleting old peer...");
    await deletePeer2(site.siteId, client.pubKey);
  }
  if (!site.subnet) {
    logger_default.warn("Site has no subnet");
    return;
  }
  await addPeer2(site.siteId, {
    publicKey,
    allowedIps: [client.subnet],
    endpoint: client.endpoint
  });
  return {
    message: {
      type: "olm/wg/connect",
      data: {
        endpoint: site.endpoint,
        publicKey: site.publicKey,
        serverIP: site.address.split("/")[0],
        tunnelIP: `${client.subnet.split("/")[0]}/${site.address.split("/")[1]}`
        // put the client ip in the same subnet as the site. TODO: Is this right? Maybe we need th make .subnet work properly!
      }
    },
    broadcast: false,
    // Send to all olms
    excludeSender: false
    // Include sender in broadcast
  };
};

// server/routers/olm/getOlmToken.ts
import { eq as eq32 } from "drizzle-orm";
import createHttpError24 from "http-errors";
import { z as z7 } from "zod";
import { fromError as fromError7 } from "zod-validation-error";
var olmGetTokenBodySchema = z7.object({
  olmId: z7.string(),
  secret: z7.string(),
  token: z7.string().optional()
});
async function getOlmToken(req, res, next2) {
  const parsedBody = olmGetTokenBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError24(
        HttpCode_default.BAD_REQUEST,
        fromError7(parsedBody.error).toString()
      )
    );
  }
  const { olmId, secret, token: token2 } = parsedBody.data;
  try {
    if (token2) {
      const { session, olm } = await validateOlmSessionToken(token2);
      if (session) {
        if (config_default.getRawConfig().app.log_failed_attempts) {
          logger_default.info(
            `Olm session already valid. Olm ID: ${olmId}. IP: ${req.ip}.`
          );
        }
        return response_default(res, {
          data: null,
          success: true,
          error: false,
          message: "Token session already valid",
          status: HttpCode_default.OK
        });
      }
    }
    const existingOlmRes = await db_default.select().from(olms).where(eq32(olms.olmId, olmId));
    if (!existingOlmRes || !existingOlmRes.length) {
      return next2(
        createHttpError24(
          HttpCode_default.BAD_REQUEST,
          "No olm found with that olmId"
        )
      );
    }
    const existingOlm = existingOlmRes[0];
    const validSecret = await verifyPassword(
      secret,
      existingOlm.secretHash
    );
    if (!validSecret) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Olm id or secret is incorrect. Olm: ID ${olmId}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError24(HttpCode_default.BAD_REQUEST, "Secret is incorrect")
      );
    }
    logger_default.debug("Creating new olm session token");
    const resToken = generateSessionToken();
    await createOlmSession(resToken, existingOlm.olmId);
    logger_default.debug("Token created successfully");
    return response_default(res, {
      data: {
        token: resToken
      },
      success: true,
      error: false,
      message: "Token created successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError24(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to authenticate olm"
      )
    );
  }
}

// server/routers/olm/createOlm.ts
import { z as z8 } from "zod";
import createHttpError25 from "http-errors";
import { SqliteError as SqliteError2 } from "better-sqlite3";
import moment4 from "moment";
import { fromError as fromError8 } from "zod-validation-error";
var createNewtBodySchema2 = z8.object({});
var createNewtSchema2 = z8.object({
  newtId: z8.string(),
  secret: z8.string()
}).strict();

// server/routers/olm/handleOlmRelayMessage.ts
import { eq as eq33 } from "drizzle-orm";
var handleOlmRelayMessage = async (context) => {
  const { message, client: c2, sendToClient: sendToClient2 } = context;
  const olm = c2;
  logger_default.info("Handling relay olm message!");
  if (!olm) {
    logger_default.warn("Olm not found");
    return;
  }
  if (!olm.clientId) {
    logger_default.warn("Olm has no site!");
    return;
  }
  const clientId = olm.clientId;
  const [client] = await db_default.select().from(clients).where(eq33(clients.clientId, clientId)).limit(1);
  if (!client || !client.siteId) {
    logger_default.warn("Site not found or does not have exit node");
    return;
  }
  const [site] = await db_default.select().from(sites).where(eq33(sites.siteId, client.siteId)).limit(1);
  if (!client) {
    logger_default.warn("Site not found or does not have exit node");
    return;
  }
  if (!client.pubKey) {
    logger_default.warn("Site or client has no endpoint or listen port");
    return;
  }
  if (!site.subnet) {
    logger_default.warn("Site has no subnet");
    return;
  }
  await deletePeer2(site.siteId, client.pubKey);
  await addPeer2(site.siteId, {
    publicKey: client.pubKey,
    allowedIps: [client.subnet],
    endpoint: ""
  });
  return {
    message: {
      type: "olm/wg/relay-success",
      data: {}
    },
    broadcast: false,
    // Send to all olms
    excludeSender: false
    // Include sender in broadcast
  };
};

// server/routers/newt/handleGetConfigMessage.ts
import { z as z9 } from "zod";
import { fromError as fromError9 } from "zod-validation-error";
import { eq as eq34, isNotNull } from "drizzle-orm";

// server/lib/ip.ts
function detectIpVersion(ip) {
  return ip.includes(":") ? 6 : 4;
}
function ipToBigInt(ip) {
  const version = detectIpVersion(ip);
  if (version === 4) {
    return ip.split(".").reduce((acc, octet) => {
      const num = parseInt(octet);
      if (isNaN(num) || num < 0 || num > 255) {
        throw new Error(`Invalid IPv4 octet: ${octet}`);
      }
      return BigInt.asUintN(64, (acc << BigInt(8)) + BigInt(num));
    }, BigInt(0));
  } else {
    let fullAddress = ip;
    if (ip.includes("::")) {
      const parts = ip.split("::");
      if (parts.length > 2) throw new Error("Invalid IPv6 address: multiple :: found");
      const missing = 8 - (parts[0].split(":").length + parts[1].split(":").length);
      const padding = Array(missing).fill("0").join(":");
      fullAddress = `${parts[0]}:${padding}:${parts[1]}`;
    }
    return fullAddress.split(":").reduce((acc, hextet) => {
      const num = parseInt(hextet || "0", 16);
      if (isNaN(num) || num < 0 || num > 65535) {
        throw new Error(`Invalid IPv6 hextet: ${hextet}`);
      }
      return BigInt.asUintN(128, (acc << BigInt(16)) + BigInt(num));
    }, BigInt(0));
  }
}
function bigIntToIp(num, version) {
  if (version === 4) {
    const octets = [];
    for (let i = 0; i < 4; i++) {
      octets.unshift(Number(num & BigInt(255)));
      num = num >> BigInt(8);
    }
    return octets.join(".");
  } else {
    const hextets = [];
    for (let i = 0; i < 8; i++) {
      hextets.unshift(Number(num & BigInt(65535)).toString(16).padStart(4, "0"));
      num = num >> BigInt(16);
    }
    let maxZeroStart = -1;
    let maxZeroLength = 0;
    let currentZeroStart = -1;
    let currentZeroLength = 0;
    for (let i = 0; i < hextets.length; i++) {
      if (hextets[i] === "0000") {
        if (currentZeroStart === -1) currentZeroStart = i;
        currentZeroLength++;
        if (currentZeroLength > maxZeroLength) {
          maxZeroLength = currentZeroLength;
          maxZeroStart = currentZeroStart;
        }
      } else {
        currentZeroStart = -1;
        currentZeroLength = 0;
      }
    }
    if (maxZeroLength > 1) {
      hextets.splice(maxZeroStart, maxZeroLength, "");
      if (maxZeroStart === 0) hextets.unshift("");
      if (maxZeroStart + maxZeroLength === 8) hextets.push("");
    }
    return hextets.map((h2) => h2 === "0000" ? "0" : h2.replace(/^0+/, "")).join(":");
  }
}
function cidrToRange(cidr) {
  const [ip, prefix] = cidr.split("/");
  const version = detectIpVersion(ip);
  const prefixBits = parseInt(prefix);
  const ipBigInt = ipToBigInt(ip);
  const maxPrefix = version === 4 ? 32 : 128;
  if (prefixBits < 0 || prefixBits > maxPrefix) {
    throw new Error(`Invalid prefix length for IPv${version}: ${prefix}`);
  }
  const shiftBits = BigInt(maxPrefix - prefixBits);
  const mask = BigInt.asUintN(version === 4 ? 64 : 128, (BigInt(1) << shiftBits) - BigInt(1));
  const start = ipBigInt & ~mask;
  const end = start | mask;
  return { start, end };
}
function findNextAvailableCidr(existingCidrs, blockSize, startCidr) {
  if (!startCidr && existingCidrs.length === 0) {
    return null;
  }
  const version = startCidr ? detectIpVersion(startCidr.split("/")[0]) : 4;
  startCidr = startCidr || (version === 4 ? "0.0.0.0/0" : "::/0");
  if (existingCidrs.length > 0 && existingCidrs.some((cidr) => detectIpVersion(cidr.split("/")[0]) !== version)) {
    throw new Error("All CIDRs must be of the same IP version");
  }
  const startCidrRange = cidrToRange(startCidr);
  const existingRanges = existingCidrs.map((cidr) => cidrToRange(cidr)).sort((a, b3) => a.start < b3.start ? -1 : 1);
  const maxPrefix = version === 4 ? 32 : 128;
  const blockSizeBigInt = BigInt(1) << BigInt(maxPrefix - blockSize);
  let current = startCidrRange.start;
  const maxIp = startCidrRange.end;
  for (let i = 0; i <= existingRanges.length; i++) {
    const nextRange = existingRanges[i];
    const alignedCurrent = current + (blockSizeBigInt - current % blockSizeBigInt) % blockSizeBigInt;
    if (alignedCurrent + blockSizeBigInt - BigInt(1) > maxIp) {
      return null;
    }
    if (!nextRange || alignedCurrent + blockSizeBigInt - BigInt(1) < nextRange.start) {
      return `${bigIntToIp(alignedCurrent, version)}/${blockSize}`;
    }
    if (nextRange.end >= startCidrRange.start && nextRange.start <= maxIp) {
      current = nextRange.end + BigInt(1);
    }
  }
  return null;
}
function isIpInCidr(ip, cidr) {
  const ipVersion = detectIpVersion(ip);
  const cidrVersion = detectIpVersion(cidr.split("/")[0]);
  if (ipVersion !== cidrVersion) {
    throw new Error("IP address and CIDR must be of the same version");
  }
  const ipBigInt = ipToBigInt(ip);
  const range = cidrToRange(cidr);
  return ipBigInt >= range.start && ipBigInt <= range.end;
}

// server/routers/newt/handleGetConfigMessage.ts
var inputSchema = z9.object({
  publicKey: z9.string(),
  port: z9.number().int().positive()
});
var handleGetConfigMessage = async (context) => {
  const { message, client, sendToClient: sendToClient2 } = context;
  const newt = client;
  logger_default.debug(JSON.stringify(message.data));
  logger_default.debug("Handling Newt get config message!");
  if (!newt) {
    logger_default.warn("Newt not found");
    return;
  }
  if (!newt.siteId) {
    logger_default.warn("Newt has no site!");
    return;
  }
  const parsed = inputSchema.safeParse(message.data);
  if (!parsed.success) {
    logger_default.error(
      "handleGetConfigMessage: Invalid input: " + fromError9(parsed.error).toString()
    );
    return;
  }
  const { publicKey, port } = message.data;
  const siteId = newt.siteId;
  const [siteRes] = await db_default.select().from(sites).where(eq34(sites.siteId, siteId));
  if (!siteRes) {
    logger_default.warn("handleGetConfigMessage: Site not found");
    return;
  }
  let site;
  if (!siteRes.address) {
    const address = await getNextAvailableSubnet();
    const [updateRes] = await db_default.update(sites).set({
      publicKey,
      address,
      listenPort: port
    }).where(eq34(sites.siteId, siteId)).returning();
    site = updateRes;
    logger_default.info(`Updated site ${siteId} with new WG Newt info`);
  } else {
    const [siteRes2] = await db_default.update(sites).set({
      publicKey,
      listenPort: port
    }).where(eq34(sites.siteId, siteId)).returning();
    site = siteRes2;
  }
  if (!site) {
    logger_default.error("handleGetConfigMessage: Failed to update site");
    return;
  }
  const clientsRes = await db_default.select().from(clients).where(eq34(clients.siteId, siteId));
  const now = (/* @__PURE__ */ new Date()).getTime() / 1e3;
  const peers = await Promise.all(
    clientsRes.filter((client2) => {
      if (client2.lastHolePunch && now - client2.lastHolePunch > 6) {
        logger_default.warn("Client last hole punch is too old");
        return;
      }
    }).map(async (client2) => {
      return {
        publicKey: client2.pubKey,
        allowedIps: [client2.subnet],
        endpoint: client2.endpoint
      };
    })
  );
  const configResponse = {
    ipAddress: site.address,
    peers
  };
  logger_default.debug("Sending config: ", configResponse);
  return {
    message: {
      type: "newt/wg/receive-config",
      // what to make the response type?
      data: {
        ...configResponse
      }
    },
    broadcast: false,
    // Send to all clients
    excludeSender: false
    // Include sender in broadcast
  };
};
async function getNextAvailableSubnet() {
  const existingAddresses = await db_default.select({
    address: sites.address
  }).from(sites).where(isNotNull(sites.address));
  const addresses = existingAddresses.map((a) => a.address).filter((a) => a);
  let subnet = findNextAvailableCidr(
    addresses,
    config_default.getRawConfig().newt.block_size,
    config_default.getRawConfig().newt.subnet_group
  );
  if (!subnet) {
    throw new Error("No available subnets remaining in space");
  }
  subnet = subnet.split(".").slice(0, 3).join(".") + ".1/" + subnet.split("/")[1];
  return subnet;
}

// server/routers/messageHandlers.ts
var messageHandlers = {
  "newt/wg/register": handleNewtRegisterMessage,
  "olm/wg/register": handleOlmRegisterMessage,
  "newt/wg/get-config": handleGetConfigMessage,
  "newt/receive-bandwidth": handleReceiveBandwidthMessage,
  "olm/wg/relay": handleOlmRelayMessage
};

// server/routers/ws.ts
var router = Router();
var wss = new WebSocketServer({ noServer: true });
var connectedClients = /* @__PURE__ */ new Map();
var addClient = (clientId, ws3, clientType) => {
  const existingClients = connectedClients.get(clientId) || [];
  existingClients.push(ws3);
  connectedClients.set(clientId, existingClients);
  logger_default.info(`Client added to tracking - ${clientType.toUpperCase()} ID: ${clientId}, Total connections: ${existingClients.length}`);
};
var removeClient = (clientId, ws3, clientType) => {
  const existingClients = connectedClients.get(clientId) || [];
  const updatedClients = existingClients.filter((client) => client !== ws3);
  if (updatedClients.length === 0) {
    connectedClients.delete(clientId);
    logger_default.info(`All connections removed for ${clientType.toUpperCase()} ID: ${clientId}`);
  } else {
    connectedClients.set(clientId, updatedClients);
    logger_default.info(`Connection removed - ${clientType.toUpperCase()} ID: ${clientId}, Remaining connections: ${updatedClients.length}`);
  }
};
var sendToClient = (clientId, message) => {
  const clients2 = connectedClients.get(clientId);
  if (!clients2 || clients2.length === 0) {
    logger_default.info(`No active connections found for Client ID: ${clientId}`);
    return false;
  }
  const messageString = JSON.stringify(message);
  clients2.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageString);
    }
  });
  return true;
};
var broadcastToAllExcept = (message, excludeClientId) => {
  connectedClients.forEach((clients2, clientId) => {
    if (clientId !== excludeClientId) {
      clients2.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }
  });
};
var verifyToken = async (token2, clientType) => {
  try {
    if (clientType === "newt") {
      const { session, newt } = await validateNewtSessionToken(token2);
      if (!session || !newt) {
        return null;
      }
      const existingNewt = await db_default.select().from(newts).where(eq35(newts.newtId, newt.newtId));
      if (!existingNewt || !existingNewt[0]) {
        return null;
      }
      return { client: existingNewt[0], session, clientType };
    } else {
      const { session, olm } = await validateOlmSessionToken(token2);
      if (!session || !olm) {
        return null;
      }
      const existingOlm = await db_default.select().from(olms).where(eq35(olms.olmId, olm.olmId));
      if (!existingOlm || !existingOlm[0]) {
        return null;
      }
      return { client: existingOlm[0], session, clientType };
    }
  } catch (error) {
    logger_default.error("Token verification failed:", error);
    return null;
  }
};
var setupConnection = (ws3, client, clientType) => {
  logger_default.info("Establishing websocket connection");
  if (!client) {
    logger_default.error("Connection attempt without client");
    return ws3.terminate();
  }
  ws3.client = client;
  ws3.clientType = clientType;
  const clientId = clientType === "newt" ? client.newtId : client.olmId;
  addClient(clientId, ws3, clientType);
  ws3.on("message", async (data) => {
    try {
      const message = JSON.parse(data.toString());
      if (!message.type || typeof message.type !== "string") {
        throw new Error("Invalid message format: missing or invalid type");
      }
      const handler = messageHandlers[message.type];
      if (!handler) {
        throw new Error(`Unsupported message type: ${message.type}`);
      }
      const response2 = await handler({
        message,
        senderWs: ws3,
        client: ws3.client,
        clientType: ws3.clientType,
        sendToClient,
        broadcastToAllExcept,
        connectedClients
      });
      if (response2) {
        if (response2.broadcast) {
          broadcastToAllExcept(response2.message, response2.excludeSender ? clientId : void 0);
        } else if (response2.targetClientId) {
          sendToClient(response2.targetClientId, response2.message);
        } else {
          ws3.send(JSON.stringify(response2.message));
        }
      }
    } catch (error) {
      logger_default.error("Message handling error:", error);
      ws3.send(JSON.stringify({
        type: "error",
        data: {
          message: error instanceof Error ? error.message : "Unknown error occurred",
          originalMessage: data.toString()
        }
      }));
    }
  });
  ws3.on("close", () => {
    removeClient(clientId, ws3, clientType);
    logger_default.info(`Client disconnected - ${clientType.toUpperCase()} ID: ${clientId}`);
  });
  ws3.on("error", (error) => {
    logger_default.error(`WebSocket error for ${clientType.toUpperCase()} ID ${clientId}:`, error);
  });
  logger_default.info(`WebSocket connection established - ${clientType.toUpperCase()} ID: ${clientId}`);
};
router.get("/ws", (req, res) => {
  res.status(200).send("WebSocket endpoint");
});
var handleWSUpgrade = (server) => {
  server.on("upgrade", async (request, socket, head) => {
    try {
      const url = new URL(request.url || "", `http://${request.headers.host}`);
      const token2 = url.searchParams.get("token") || request.headers["sec-websocket-protocol"] || "";
      let clientType = url.searchParams.get("clientType");
      if (!clientType) {
        clientType = "newt";
      }
      if (!token2 || !clientType || !["newt", "olm"].includes(clientType)) {
        logger_default.warn("Unauthorized connection attempt: invalid token or client type...");
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }
      const tokenPayload = await verifyToken(token2, clientType);
      if (!tokenPayload) {
        logger_default.warn("Unauthorized connection attempt: invalid token...");
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }
      wss.handleUpgrade(request, socket, head, (ws3) => {
        setupConnection(ws3, tokenPayload.client, tokenPayload.clientType);
      });
    } catch (error) {
      logger_default.error("WebSocket upgrade error:", error);
      socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
      socket.destroy();
    }
  });
};

// server/routers/site/deleteSite.ts
var deleteSiteSchema = z10.object({
  siteId: z10.string().transform(Number).pipe(z10.number().int().positive())
}).strict();
async function deleteSite(req, res, next2) {
  try {
    const parsedParams = deleteSiteSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError26(
          HttpCode_default.BAD_REQUEST,
          fromError10(parsedParams.error).toString()
        )
      );
    }
    const { siteId } = parsedParams.data;
    const [site] = await db.select().from(sites).where(eq36(sites.siteId, siteId)).limit(1);
    if (!site) {
      return next2(
        createHttpError26(
          HttpCode_default.NOT_FOUND,
          `Site with ID ${siteId} not found`
        )
      );
    }
    await db.transaction(async (trx) => {
      if (site.pubKey) {
        if (site.type == "wireguard") {
          await deletePeer(site.exitNodeId, site.pubKey);
        } else if (site.type == "newt") {
          const [deletedNewt] = await trx.delete(newts).where(eq36(newts.siteId, siteId)).returning();
          if (deletedNewt) {
            const payload = {
              type: `newt/terminate`,
              data: {}
            };
            sendToClient(deletedNewt.newtId, payload);
            await trx.delete(newtSessions).where(eq36(newtSessions.newtId, deletedNewt.newtId));
          }
        }
      }
      await trx.delete(sites).where(eq36(sites.siteId, siteId));
    });
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Site deleted successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError26(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/site/updateSite.ts
import { z as z11 } from "zod";
import { eq as eq37 } from "drizzle-orm";
import createHttpError27 from "http-errors";
import { fromError as fromError11 } from "zod-validation-error";
var updateSiteParamsSchema = z11.object({
  siteId: z11.string().transform(Number).pipe(z11.number().int().positive())
}).strict();
var updateSiteBodySchema = z11.object({
  name: z11.string().min(1).max(255).optional()
  // subdomain: z
  //     .string()
  //     .min(1)
  //     .max(255)
  //     .transform((val) => val.toLowerCase())
  //     .optional()
  // pubKey: z.string().optional(),
  // subnet: z.string().optional(),
  // exitNode: z.number().int().positive().optional(),
  // megabytesIn: z.number().int().nonnegative().optional(),
  // megabytesOut: z.number().int().nonnegative().optional(),
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});
async function updateSite(req, res, next2) {
  try {
    const parsedParams = updateSiteParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError27(
          HttpCode_default.BAD_REQUEST,
          fromError11(parsedParams.error).toString()
        )
      );
    }
    const parsedBody = updateSiteBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError27(
          HttpCode_default.BAD_REQUEST,
          fromError11(parsedBody.error).toString()
        )
      );
    }
    const { siteId } = parsedParams.data;
    const updateData = parsedBody.data;
    const updatedSite = await db.update(sites).set(updateData).where(eq37(sites.siteId, siteId)).returning();
    if (updatedSite.length === 0) {
      return next2(
        createHttpError27(
          HttpCode_default.NOT_FOUND,
          `Site with ID ${siteId} not found`
        )
      );
    }
    return response_default(res, {
      data: updatedSite[0],
      success: true,
      error: false,
      message: "Site updated successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError27(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/site/listSites.ts
import { and as and17, count, eq as eq38, inArray as inArray6, or as or4, sql as sql2 } from "drizzle-orm";
import createHttpError28 from "http-errors";
import { z as z12 } from "zod";
import { fromError as fromError12 } from "zod-validation-error";
var listSitesParamsSchema = z12.object({
  orgId: z12.string()
}).strict();
var listSitesSchema = z12.object({
  limit: z12.string().optional().default("1000").transform(Number).pipe(z12.number().int().positive()),
  offset: z12.string().optional().default("0").transform(Number).pipe(z12.number().int().nonnegative())
});
function querySites(orgId, accessibleSiteIds) {
  return db.select({
    siteId: sites.siteId,
    niceId: sites.niceId,
    name: sites.name,
    pubKey: sites.pubKey,
    subnet: sites.subnet,
    megabytesIn: sites.megabytesIn,
    megabytesOut: sites.megabytesOut,
    orgName: orgs.name,
    type: sites.type,
    online: sites.online
  }).from(sites).leftJoin(orgs, eq38(sites.orgId, orgs.orgId)).where(
    and17(
      inArray6(sites.siteId, accessibleSiteIds),
      eq38(sites.orgId, orgId)
    )
  );
}
async function listSites(req, res, next2) {
  try {
    const parsedQuery = listSitesSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError28(
          HttpCode_default.BAD_REQUEST,
          fromError12(parsedQuery.error)
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const parsedParams = listSitesParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError28(
          HttpCode_default.BAD_REQUEST,
          fromError12(parsedParams.error)
        )
      );
    }
    const { orgId } = parsedParams.data;
    if (orgId && orgId !== req.userOrgId) {
      return next2(
        createHttpError28(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    }
    const accessibleSites = await db.select({
      siteId: sql2`COALESCE(${userSites.siteId}, ${roleSites.siteId})`
    }).from(userSites).fullJoin(roleSites, eq38(userSites.siteId, roleSites.siteId)).where(
      or4(
        eq38(userSites.userId, req.user.userId),
        eq38(roleSites.roleId, req.userOrgRoleId)
      )
    );
    const accessibleSiteIds = accessibleSites.map((site) => site.siteId);
    const baseQuery = querySites(orgId, accessibleSiteIds);
    let countQuery = db.select({ count: count() }).from(sites).where(
      and17(
        inArray6(sites.siteId, accessibleSiteIds),
        eq38(sites.orgId, orgId)
      )
    );
    const sitesList = await baseQuery.limit(limit).offset(offset);
    const totalCountResult = await countQuery;
    const totalCount = totalCountResult[0].count;
    return response_default(res, {
      data: {
        sites: sitesList,
        pagination: {
          total: totalCount,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Sites retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError28(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/site/listSiteRoles.ts
import { z as z13 } from "zod";
import { eq as eq39 } from "drizzle-orm";
import createHttpError29 from "http-errors";
import { fromError as fromError13 } from "zod-validation-error";
var listSiteRolesSchema = z13.object({
  siteId: z13.string().transform(Number).pipe(z13.number().int().positive())
}).strict();

// server/routers/site/pickSiteDefaults.ts
import { eq as eq40 } from "drizzle-orm";
import createHttpError30 from "http-errors";
async function pickSiteDefaults(req, res, next2) {
  try {
    const nodes = await db.select().from(exitNodes);
    if (nodes.length === 0) {
      return next2(
        createHttpError30(HttpCode_default.NOT_FOUND, "No exit nodes available")
      );
    }
    const exitNode = nodes[0];
    const sitesQuery = await db.select({
      subnet: sites.subnet
    }).from(sites).where(eq40(sites.exitNodeId, exitNode.exitNodeId));
    let subnets = sitesQuery.map((site) => site.subnet);
    subnets.push(
      exitNode.address.replace(
        /\/\d+$/,
        `/${config_default.getRawConfig().gerbil.site_block_size}`
      )
    );
    const newSubnet = findNextAvailableCidr(
      subnets,
      config_default.getRawConfig().gerbil.site_block_size,
      exitNode.address
    );
    if (!newSubnet) {
      return next2(
        createHttpError30(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "No available subnets"
        )
      );
    }
    const newtId = generateId(15);
    const secret = generateId(48);
    return response_default(res, {
      data: {
        exitNodeId: exitNode.exitNodeId,
        address: exitNode.address,
        publicKey: exitNode.publicKey,
        name: exitNode.name,
        listenPort: exitNode.listenPort,
        endpoint: exitNode.endpoint,
        // subnet: `${newSubnet.split("/")[0]}/${config.getRawConfig().gerbil.block_size}`, // we want the block size of the whole subnet
        subnet: newSubnet,
        newtId,
        newtSecret: secret
      },
      success: true,
      error: false,
      message: "Organization retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError30(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/org/getOrg.ts
import { z as z14 } from "zod";
import { eq as eq41 } from "drizzle-orm";
import createHttpError31 from "http-errors";
var getOrgSchema = z14.object({
  orgId: z14.string()
}).strict();
async function getOrg(req, res, next2) {
  try {
    const parsedParams = getOrgSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError31(
          HttpCode_default.BAD_REQUEST,
          parsedParams.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { orgId } = parsedParams.data;
    const org = await db.select().from(orgs).where(eq41(orgs.orgId, orgId)).limit(1);
    if (org.length === 0) {
      return next2(
        createHttpError31(
          HttpCode_default.NOT_FOUND,
          `Organization with ID ${orgId} not found`
        )
      );
    }
    return response_default(res, {
      data: {
        org: org[0]
      },
      success: true,
      error: false,
      message: "Organization retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError31(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/org/createOrg.ts
import { z as z29 } from "zod";
import { eq as eq56 } from "drizzle-orm";
import createHttpError46 from "http-errors";
import { fromError as fromError28 } from "zod-validation-error";

// server/routers/role/addRoleAction.ts
import { z as z15 } from "zod";
import createHttpError32 from "http-errors";
import { eq as eq42 } from "drizzle-orm";
import { fromError as fromError14 } from "zod-validation-error";
var addRoleActionParamSchema = z15.object({
  roleId: z15.string().transform(Number).pipe(z15.number().int().positive())
}).strict();
var addRoleActionSchema = z15.object({
  actionId: z15.string()
}).strict();

// server/routers/resource/setResourceRoles.ts
import { z as z16 } from "zod";
import createHttpError33 from "http-errors";
import { fromError as fromError15 } from "zod-validation-error";
import { eq as eq43, and as and18, ne as ne2 } from "drizzle-orm";
var setResourceRolesBodySchema = z16.object({
  roleIds: z16.array(z16.number().int().positive())
}).strict();
var setResourceRolesParamsSchema = z16.object({
  resourceId: z16.string().transform(Number).pipe(z16.number().int().positive())
}).strict();
async function setResourceRoles(req, res, next2) {
  try {
    const parsedBody = setResourceRolesBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError33(
          HttpCode_default.BAD_REQUEST,
          fromError15(parsedBody.error).toString()
        )
      );
    }
    const { roleIds } = parsedBody.data;
    const parsedParams = setResourceRolesParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError33(
          HttpCode_default.BAD_REQUEST,
          fromError15(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const adminRole = await db.select().from(roles).where(
      and18(
        eq43(roles.name, "Admin"),
        eq43(roles.orgId, req.userOrg.orgId)
      )
    ).limit(1);
    if (!adminRole.length) {
      return next2(
        createHttpError33(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "Admin role not found"
        )
      );
    }
    if (roleIds.includes(adminRole[0].roleId)) {
      return next2(
        createHttpError33(
          HttpCode_default.BAD_REQUEST,
          "Admin role cannot be assigned to resources"
        )
      );
    }
    await db.transaction(async (trx) => {
      await trx.delete(roleResources).where(
        and18(
          eq43(roleResources.resourceId, resourceId),
          ne2(roleResources.roleId, adminRole[0].roleId)
          // delete all but the admin role
        )
      );
      const newRoleResources = await Promise.all(
        roleIds.map(
          (roleId) => trx.insert(roleResources).values({ roleId, resourceId }).returning()
        )
      );
      return response_default(res, {
        data: {},
        success: true,
        error: false,
        message: "Roles set for resource successfully",
        status: HttpCode_default.CREATED
      });
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError33(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/role/addRoleSite.ts
import { z as z17 } from "zod";
import createHttpError34 from "http-errors";
import { eq as eq44 } from "drizzle-orm";
import { fromError as fromError16 } from "zod-validation-error";
var addRoleSiteParamsSchema = z17.object({
  roleId: z17.string().transform(Number).pipe(z17.number().int().positive())
}).strict();
var addRoleSiteSchema = z17.object({
  siteId: z17.string().transform(Number).pipe(z17.number().int().positive())
}).strict();

// server/routers/role/createRole.ts
import { z as z18 } from "zod";
import createHttpError35 from "http-errors";
import { fromError as fromError17 } from "zod-validation-error";
import { eq as eq45, and as and19 } from "drizzle-orm";
var createRoleParamsSchema = z18.object({
  orgId: z18.string()
}).strict();
var createRoleSchema = z18.object({
  name: z18.string().min(1).max(255),
  description: z18.string().optional()
}).strict();
var defaultRoleAllowedActions = [
  "getOrg" /* getOrg */,
  "getResource" /* getResource */,
  "listResources" /* listResources */
];
async function createRole(req, res, next2) {
  try {
    const parsedBody = createRoleSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError35(
          HttpCode_default.BAD_REQUEST,
          fromError17(parsedBody.error).toString()
        )
      );
    }
    const roleData = parsedBody.data;
    const parsedParams = createRoleParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError35(
          HttpCode_default.BAD_REQUEST,
          fromError17(parsedParams.error).toString()
        )
      );
    }
    const { orgId } = parsedParams.data;
    const allRoles = await db.select({
      roleId: roles.roleId,
      name: roles.name
    }).from(roles).leftJoin(orgs, eq45(roles.orgId, orgs.orgId)).where(and19(eq45(roles.name, roleData.name), eq45(roles.orgId, orgId)));
    if (allRoles.length > 0) {
      return next2(
        createHttpError35(
          HttpCode_default.BAD_REQUEST,
          "Role with that name already exists"
        )
      );
    }
    await db.transaction(async (trx) => {
      const newRole = await trx.insert(roles).values({
        ...roleData,
        orgId
      }).returning();
      await trx.insert(roleActions).values(
        defaultRoleAllowedActions.map((action) => ({
          roleId: newRole[0].roleId,
          actionId: action,
          orgId
        }))
      ).execute();
      return response_default(res, {
        data: newRole[0],
        success: true,
        error: false,
        message: "Role created successfully",
        status: HttpCode_default.CREATED
      });
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError35(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/role/deleteRole.ts
import { z as z19 } from "zod";
import { eq as eq46 } from "drizzle-orm";
import createHttpError36 from "http-errors";
import { fromError as fromError18 } from "zod-validation-error";
var deleteRoleSchema = z19.object({
  roleId: z19.string().transform(Number).pipe(z19.number().int().positive())
}).strict();
var deelteRoleBodySchema = z19.object({
  roleId: z19.string().transform(Number).pipe(z19.number().int().positive())
}).strict();
async function deleteRole(req, res, next2) {
  try {
    const parsedParams = deleteRoleSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError36(
          HttpCode_default.BAD_REQUEST,
          fromError18(parsedParams.error).toString()
        )
      );
    }
    const parsedBody = deelteRoleBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError36(
          HttpCode_default.BAD_REQUEST,
          fromError18(parsedBody.error).toString()
        )
      );
    }
    const { roleId } = parsedParams.data;
    const { roleId: newRoleId } = parsedBody.data;
    if (roleId === newRoleId) {
      return next2(
        createHttpError36(
          HttpCode_default.BAD_REQUEST,
          `Cannot delete a role and assign the same role`
        )
      );
    }
    const role = await db.select().from(roles).where(eq46(roles.roleId, roleId)).limit(1);
    if (role.length === 0) {
      return next2(
        createHttpError36(
          HttpCode_default.NOT_FOUND,
          `Role with ID ${roleId} not found`
        )
      );
    }
    if (role[0].isAdmin) {
      return next2(
        createHttpError36(
          HttpCode_default.FORBIDDEN,
          `Cannot delete a Admin role`
        )
      );
    }
    const newRole = await db.select().from(roles).where(eq46(roles.roleId, newRoleId)).limit(1);
    if (newRole.length === 0) {
      return next2(
        createHttpError36(
          HttpCode_default.NOT_FOUND,
          `Role with ID ${newRoleId} not found`
        )
      );
    }
    await db.transaction(async (trx) => {
      await trx.update(userOrgs).set({ roleId: newRoleId }).where(eq46(userOrgs.roleId, roleId));
      await trx.delete(roles).where(eq46(roles.roleId, roleId));
    });
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Role deleted successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError36(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/role/getRole.ts
import { z as z20 } from "zod";
import { eq as eq47 } from "drizzle-orm";
import createHttpError37 from "http-errors";
import { fromError as fromError19 } from "zod-validation-error";
var getRoleSchema = z20.object({
  roleId: z20.string().transform(Number).pipe(z20.number().int().positive())
}).strict();

// server/routers/role/listRoleActions.ts
import { z as z21 } from "zod";
import { eq as eq48 } from "drizzle-orm";
import createHttpError38 from "http-errors";
import { fromError as fromError20 } from "zod-validation-error";
var listRoleActionsSchema = z21.object({
  roleId: z21.string().transform(Number).pipe(z21.number().int().positive())
}).strict();

// server/routers/role/listRoleResources.ts
import { z as z22 } from "zod";
import { eq as eq49 } from "drizzle-orm";
import createHttpError39 from "http-errors";
import { fromError as fromError21 } from "zod-validation-error";
var listRoleResourcesSchema = z22.object({
  roleId: z22.string().transform(Number).pipe(z22.number().int().positive())
}).strict();

// server/routers/role/listRoles.ts
import { z as z23 } from "zod";
import createHttpError40 from "http-errors";
import { sql as sql3, eq as eq50 } from "drizzle-orm";
import { fromError as fromError22 } from "zod-validation-error";
var listRolesParamsSchema = z23.object({
  orgId: z23.string()
}).strict();
var listRolesSchema = z23.object({
  limit: z23.string().optional().default("1000").transform(Number).pipe(z23.number().int().nonnegative()),
  offset: z23.string().optional().default("0").transform(Number).pipe(z23.number().int().nonnegative())
});
async function queryRoles(orgId, limit, offset) {
  return await db.select({
    roleId: roles.roleId,
    orgId: roles.orgId,
    isAdmin: roles.isAdmin,
    name: roles.name,
    description: roles.description,
    orgName: orgs.name
  }).from(roles).leftJoin(orgs, eq50(roles.orgId, orgs.orgId)).where(eq50(roles.orgId, orgId)).limit(limit).offset(offset);
}
async function listRoles(req, res, next2) {
  try {
    const parsedQuery = listRolesSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError40(
          HttpCode_default.BAD_REQUEST,
          fromError22(parsedQuery.error).toString()
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const parsedParams = listRolesParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError40(
          HttpCode_default.BAD_REQUEST,
          fromError22(parsedParams.error).toString()
        )
      );
    }
    const { orgId } = parsedParams.data;
    let countQuery = db.select({ count: sql3`cast(count(*) as integer)` }).from(roles).where(eq50(roles.orgId, orgId));
    const rolesList = await queryRoles(orgId, limit, offset);
    const totalCountResult = await countQuery;
    const totalCount = totalCountResult[0].count;
    return response_default(res, {
      data: {
        roles: rolesList,
        pagination: {
          total: totalCount,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Roles retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError40(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/role/listRoleSites.ts
import { z as z24 } from "zod";
import { eq as eq51 } from "drizzle-orm";
import createHttpError41 from "http-errors";
import { fromError as fromError23 } from "zod-validation-error";
var listRoleSitesSchema = z24.object({
  roleId: z24.string().transform(Number).pipe(z24.number().int().positive())
}).strict();

// server/routers/role/removeRoleAction.ts
import { z as z25 } from "zod";
import { and as and20, eq as eq52 } from "drizzle-orm";
import createHttpError42 from "http-errors";
import { fromError as fromError24 } from "zod-validation-error";
var removeRoleActionParamsSchema = z25.object({
  roleId: z25.string().transform(Number).pipe(z25.number().int().positive())
}).strict();
var removeRoleActionSchema = z25.object({
  actionId: z25.string()
}).strict();

// server/routers/role/removeRoleResource.ts
import { z as z26 } from "zod";
import { and as and21, eq as eq53 } from "drizzle-orm";
import createHttpError43 from "http-errors";
import { fromError as fromError25 } from "zod-validation-error";
var removeRoleResourceParamsSchema = z26.object({
  roleId: z26.string().transform(Number).pipe(z26.number().int().positive())
}).strict();
var removeRoleResourceSchema = z26.object({
  resourceId: z26.string().transform(Number).pipe(z26.number().int().positive())
}).strict();

// server/routers/role/removeRoleSite.ts
import { z as z27 } from "zod";
import { and as and22, eq as eq54 } from "drizzle-orm";
import createHttpError44 from "http-errors";
import { fromError as fromError26 } from "zod-validation-error";
var removeRoleSiteParamsSchema = z27.object({
  roleId: z27.string().transform(Number).pipe(z27.number().int().positive())
}).strict();
var removeRoleSiteSchema = z27.object({
  siteId: z27.string().transform(Number).pipe(z27.number().int().positive())
}).strict();

// server/routers/role/updateRole.ts
import { z as z28 } from "zod";
import { eq as eq55 } from "drizzle-orm";
import createHttpError45 from "http-errors";
import { fromError as fromError27 } from "zod-validation-error";
var updateRoleParamsSchema = z28.object({
  roleId: z28.string().transform(Number).pipe(z28.number().int().positive())
}).strict();
var updateRoleBodySchema = z28.object({
  name: z28.string().min(1).max(255).optional(),
  description: z28.string().optional()
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});

// server/routers/org/createOrg.ts
var createOrgSchema = z29.object({
  orgId: z29.string(),
  name: z29.string().min(1).max(255)
}).strict();
var MAX_ORGS = 5;
async function createOrg(req, res, next2) {
  try {
    if (config_default.getRawConfig().flags?.disable_user_create_org) {
      if (!req.user?.serverAdmin) {
        return next2(
          createHttpError46(
            HttpCode_default.FORBIDDEN,
            "Only server admins can create organizations"
          )
        );
      }
    }
    const parsedBody = createOrgSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError46(
          HttpCode_default.BAD_REQUEST,
          fromError28(parsedBody.error).toString()
        )
      );
    }
    const userOrgIds = req.userOrgIds;
    if (userOrgIds && userOrgIds.length > MAX_ORGS) {
      return next2(
        createHttpError46(
          HttpCode_default.FORBIDDEN,
          `Maximum number of organizations reached.`
        )
      );
    }
    const { orgId, name: name2 } = parsedBody.data;
    const orgExists = await db.select().from(orgs).where(eq56(orgs.orgId, orgId)).limit(1);
    if (orgExists.length > 0) {
      return next2(
        createHttpError46(
          HttpCode_default.CONFLICT,
          `Organization with ID ${orgId} already exists`
        )
      );
    }
    let error = "";
    let org = null;
    await db.transaction(async (trx) => {
      const allDomains = await trx.select().from(domains).where(eq56(domains.configManaged, true));
      const newOrg = await trx.insert(orgs).values({
        orgId,
        name: name2
      }).returning();
      if (newOrg.length === 0) {
        error = "Failed to create organization";
        trx.rollback();
        return;
      }
      org = newOrg[0];
      const roleId = await createAdminRole(newOrg[0].orgId);
      if (!roleId) {
        error = "Failed to create Admin role";
        trx.rollback();
        return;
      }
      await trx.insert(orgDomains).values(
        allDomains.map((domain) => ({
          orgId: newOrg[0].orgId,
          domainId: domain.domainId
        }))
      );
      await trx.insert(userOrgs).values({
        userId: req.user.userId,
        orgId: newOrg[0].orgId,
        roleId,
        isOwner: true
      });
      const memberRole = await trx.insert(roles).values({
        name: "Member",
        description: "Members can only view resources",
        orgId
      }).returning();
      await trx.insert(roleActions).values(
        defaultRoleAllowedActions.map((action) => ({
          roleId: memberRole[0].roleId,
          actionId: action,
          orgId
        }))
      );
    });
    if (!org) {
      return next2(
        createHttpError46(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "Failed to createo org"
        )
      );
    }
    if (error) {
      return next2(createHttpError46(HttpCode_default.INTERNAL_SERVER_ERROR, error));
    }
    return response_default(res, {
      data: org,
      success: true,
      error: false,
      message: "Organization created successfully",
      status: HttpCode_default.CREATED
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError46(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/org/deleteOrg.ts
import { z as z30 } from "zod";
import { eq as eq57 } from "drizzle-orm";
import createHttpError47 from "http-errors";
import { fromError as fromError29 } from "zod-validation-error";
var deleteOrgSchema = z30.object({
  orgId: z30.string()
}).strict();
async function deleteOrg(req, res, next2) {
  try {
    const parsedParams = deleteOrgSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError47(
          HttpCode_default.BAD_REQUEST,
          fromError29(parsedParams.error).toString()
        )
      );
    }
    const { orgId } = parsedParams.data;
    const hasPermission = await checkUserActionPermission(
      "deleteOrg" /* deleteOrg */,
      req
    );
    if (!hasPermission) {
      return next2(
        createHttpError47(
          HttpCode_default.FORBIDDEN,
          "User does not have permission to perform this action"
        )
      );
    }
    const [org] = await db.select().from(orgs).where(eq57(orgs.orgId, orgId)).limit(1);
    if (!org) {
      return next2(
        createHttpError47(
          HttpCode_default.NOT_FOUND,
          `Organization with ID ${orgId} not found`
        )
      );
    }
    const orgSites = await db.select().from(sites).where(eq57(sites.orgId, orgId)).limit(1);
    await db.transaction(async (trx) => {
      if (sites) {
        for (const site of orgSites) {
          if (site.pubKey) {
            if (site.type == "wireguard") {
              await deletePeer(site.exitNodeId, site.pubKey);
            } else if (site.type == "newt") {
              const [deletedNewt] = await trx.delete(newts).where(eq57(newts.siteId, site.siteId)).returning();
              if (deletedNewt) {
                const payload = {
                  type: `newt/terminate`,
                  data: {}
                };
                sendToClient(deletedNewt.newtId, payload);
                await trx.delete(newtSessions).where(
                  eq57(
                    newtSessions.newtId,
                    deletedNewt.newtId
                  )
                );
              }
            }
          }
          logger_default.info(`Deleting site ${site.siteId}`);
          await trx.delete(sites).where(eq57(sites.siteId, site.siteId));
        }
      }
      await trx.delete(orgs).where(eq57(orgs.orgId, orgId));
    });
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Organization deleted successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError47(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "An error occurred..."
      )
    );
  }
}

// server/routers/org/updateOrg.ts
import { z as z31 } from "zod";
import { eq as eq58 } from "drizzle-orm";
import createHttpError48 from "http-errors";
import { fromError as fromError30 } from "zod-validation-error";
var updateOrgParamsSchema = z31.object({
  orgId: z31.string()
}).strict();
var updateOrgBodySchema = z31.object({
  name: z31.string().min(1).max(255).optional()
  // domain: z.string().min(1).max(255).optional(),
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});
async function updateOrg(req, res, next2) {
  try {
    const parsedParams = updateOrgParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError48(
          HttpCode_default.BAD_REQUEST,
          fromError30(parsedParams.error).toString()
        )
      );
    }
    const parsedBody = updateOrgBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError48(
          HttpCode_default.BAD_REQUEST,
          fromError30(parsedBody.error).toString()
        )
      );
    }
    const { orgId } = parsedParams.data;
    const updateData = parsedBody.data;
    const updatedOrg = await db.update(orgs).set(updateData).where(eq58(orgs.orgId, orgId)).returning();
    if (updatedOrg.length === 0) {
      return next2(
        createHttpError48(
          HttpCode_default.NOT_FOUND,
          `Organization with ID ${orgId} not found`
        )
      );
    }
    return response_default(res, {
      data: updatedOrg[0],
      success: true,
      error: false,
      message: "Organization updated successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError48(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/org/listOrgs.ts
import { z as z32 } from "zod";
import createHttpError49 from "http-errors";
import { sql as sql4, inArray as inArray7 } from "drizzle-orm";
var listOrgsSchema = z32.object({
  limit: z32.string().optional().default("1000").transform(Number).pipe(z32.number().int().positive()),
  offset: z32.string().optional().default("0").transform(Number).pipe(z32.number().int().nonnegative())
});
async function listOrgs(req, res, next2) {
  try {
    const parsedQuery = listOrgsSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError49(
          HttpCode_default.BAD_REQUEST,
          parsedQuery.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const userOrgIds = req.userOrgIds;
    if (!userOrgIds || userOrgIds.length === 0) {
      return response_default(res, {
        data: {
          orgs: [],
          pagination: {
            total: 0,
            limit,
            offset
          }
        },
        success: true,
        error: false,
        message: "No organizations found for the user",
        status: HttpCode_default.OK
      });
    }
    const organizations = await db.select().from(orgs).where(inArray7(orgs.orgId, userOrgIds)).limit(limit).offset(offset);
    const totalCountResult = await db.select({ count: sql4`cast(count(*) as integer)` }).from(orgs).where(inArray7(orgs.orgId, userOrgIds));
    const totalCount = totalCountResult[0].count;
    return response_default(res, {
      data: {
        orgs: organizations,
        pagination: {
          total: totalCount,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Organizations retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError49(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "An error occurred..."
      )
    );
  }
}

// server/routers/org/checkId.ts
import { z as z33 } from "zod";
import { eq as eq59 } from "drizzle-orm";
import createHttpError50 from "http-errors";
import { fromError as fromError31 } from "zod-validation-error";
var getOrgSchema2 = z33.object({
  orgId: z33.string()
}).strict();
async function checkId(req, res, next2) {
  try {
    const parsedQuery = getOrgSchema2.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError50(
          HttpCode_default.BAD_REQUEST,
          fromError31(parsedQuery.error).toString()
        )
      );
    }
    const { orgId } = parsedQuery.data;
    const org = await db.select().from(orgs).where(eq59(orgs.orgId, orgId)).limit(1);
    if (org.length > 0) {
      return response_default(res, {
        data: {},
        success: true,
        error: false,
        message: "Organization ID already exists",
        status: HttpCode_default.OK
      });
    }
    return response_default(res, {
      data: {},
      success: true,
      error: false,
      message: "Organization ID is available",
      status: HttpCode_default.NOT_FOUND
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError50(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "An error occurred..."
      )
    );
  }
}

// server/routers/org/getOrgOverview.ts
import { z as z34 } from "zod";
import { and as and23, count as count2, eq as eq60, inArray as inArray8 } from "drizzle-orm";
import createHttpError51 from "http-errors";
var getOrgParamsSchema = z34.object({
  orgId: z34.string()
}).strict();
async function getOrgOverview(req, res, next2) {
  try {
    const parsedParams = getOrgParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError51(
          HttpCode_default.BAD_REQUEST,
          parsedParams.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { orgId } = parsedParams.data;
    const org = await db.select().from(orgs).where(eq60(orgs.orgId, orgId)).limit(1);
    if (org.length === 0) {
      return next2(
        createHttpError51(
          HttpCode_default.NOT_FOUND,
          `Organization with ID ${orgId} not found`
        )
      );
    }
    if (!req.userOrg) {
      return next2(
        createHttpError51(HttpCode_default.UNAUTHORIZED, "User not authenticated")
      );
    }
    const allSiteIds = await db.select({
      siteId: sites.siteId
    }).from(sites).where(eq60(sites.orgId, orgId));
    const [{ numSites }] = await db.select({ numSites: count2() }).from(userSites).where(
      and23(
        eq60(userSites.userId, req.userOrg.userId),
        inArray8(
          userSites.siteId,
          allSiteIds.map((site) => site.siteId)
        )
      )
    );
    const allResourceIds = await db.select({
      resourceId: resources.resourceId
    }).from(resources).where(eq60(resources.orgId, orgId));
    const [{ numResources }] = await db.select({ numResources: count2() }).from(userResources).where(
      and23(
        eq60(userResources.userId, req.userOrg.userId),
        inArray8(
          userResources.resourceId,
          allResourceIds.map((resource) => resource.resourceId)
        )
      )
    );
    const [{ numUsers }] = await db.select({ numUsers: count2() }).from(userOrgs).where(eq60(userOrgs.orgId, orgId));
    const [role] = await db.select().from(roles).where(eq60(roles.roleId, req.userOrg.roleId));
    return response_default(res, {
      data: {
        orgName: org[0].name,
        orgId: org[0].orgId,
        userRoleName: role.name,
        numSites,
        numUsers,
        numResources,
        isAdmin: role.name === "Admin",
        isOwner: req.userOrg?.isOwner || false
      },
      success: true,
      error: false,
      message: "Organization overview retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError51(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/getResource.ts
import { z as z35 } from "zod";
import { eq as eq61 } from "drizzle-orm";
import createHttpError52 from "http-errors";
import { fromError as fromError32 } from "zod-validation-error";
var getResourceSchema = z35.object({
  resourceId: z35.string().transform(Number).pipe(z35.number().int().positive())
}).strict();
async function getResource(req, res, next2) {
  try {
    const parsedParams = getResourceSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError52(
          HttpCode_default.BAD_REQUEST,
          fromError32(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const [resp] = await db.select().from(resources).where(eq61(resources.resourceId, resourceId)).leftJoin(sites, eq61(sites.siteId, resources.siteId)).limit(1);
    const resource = resp.resources;
    const site = resp.sites;
    if (!resource) {
      return next2(
        createHttpError52(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    return response_default(res, {
      data: {
        ...resource,
        siteName: site?.name
      },
      success: true,
      error: false,
      message: "Resource retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError52(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/createResource.ts
import { z as z37 } from "zod";
import createHttpError53 from "http-errors";
import { eq as eq62, and as and24 } from "drizzle-orm";
import { fromError as fromError33 } from "zod-validation-error";

// server/lib/schemas.ts
import { z as z36 } from "zod";
var subdomainSchema = z36.string().regex(
  /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9-_]+$/,
  "Invalid subdomain format"
).min(1, "Subdomain must be at least 1 character long").transform((val) => val.toLowerCase());

// server/routers/resource/createResource.ts
var createResourceParamsSchema = z37.object({
  siteId: z37.string().transform(stoi).pipe(z37.number().int().positive()),
  orgId: z37.string()
}).strict();
var createHttpResourceSchema = z37.object({
  name: z37.string().min(1).max(255),
  subdomain: z37.string().optional().transform((val) => val?.toLowerCase()),
  isBaseDomain: z37.boolean().optional(),
  siteId: z37.number(),
  http: z37.boolean(),
  protocol: z37.string(),
  domainId: z37.string()
}).strict().refine(
  (data) => {
    if (data.subdomain) {
      return subdomainSchema.safeParse(data.subdomain).success;
    }
    return true;
  },
  { message: "Invalid subdomain" }
).refine(
  (data) => {
    if (!config_default.getRawConfig().flags?.allow_base_domain_resources) {
      if (data.isBaseDomain) {
        return false;
      }
    }
    return true;
  },
  {
    message: "Base domain resources are not allowed"
  }
);
var createRawResourceSchema = z37.object({
  name: z37.string().min(1).max(255),
  siteId: z37.number(),
  http: z37.boolean(),
  protocol: z37.string(),
  proxyPort: z37.number().int().min(1).max(65535)
}).strict().refine(
  (data) => {
    if (!config_default.getRawConfig().flags?.allow_raw_resources) {
      if (data.proxyPort !== void 0) {
        return false;
      }
    }
    return true;
  },
  {
    message: "Proxy port cannot be set"
  }
);
async function createResource(req, res, next2) {
  try {
    const parsedParams = createResourceParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError53(
          HttpCode_default.BAD_REQUEST,
          fromError33(parsedParams.error).toString()
        )
      );
    }
    const { siteId, orgId } = parsedParams.data;
    if (!req.userOrgRoleId) {
      return next2(
        createHttpError53(HttpCode_default.FORBIDDEN, "User does not have a role")
      );
    }
    const org = await db.select().from(orgs).where(eq62(orgs.orgId, orgId)).limit(1);
    if (org.length === 0) {
      return next2(
        createHttpError53(
          HttpCode_default.NOT_FOUND,
          `Organization with ID ${orgId} not found`
        )
      );
    }
    if (typeof req.body.http !== "boolean") {
      return next2(
        createHttpError53(HttpCode_default.BAD_REQUEST, "http field is required")
      );
    }
    const { http } = req.body;
    if (http) {
      return await createHttpResource(
        { req, res, next: next2 },
        { siteId, orgId }
      );
    } else {
      return await createRawResource(
        { req, res, next: next2 },
        { siteId, orgId }
      );
    }
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError53(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}
async function createHttpResource(route, meta) {
  const { req, res, next: next2 } = route;
  const { siteId, orgId } = meta;
  const parsedBody = createHttpResourceSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError53(
        HttpCode_default.BAD_REQUEST,
        fromError33(parsedBody.error).toString()
      )
    );
  }
  const { name: name2, subdomain, isBaseDomain, http, protocol, domainId } = parsedBody.data;
  const [orgDomain] = await db.select().from(orgDomains).where(
    and24(eq62(orgDomains.orgId, orgId), eq62(orgDomains.domainId, domainId))
  ).leftJoin(domains, eq62(orgDomains.domainId, domains.domainId));
  if (!orgDomain || !orgDomain.domains) {
    return next2(
      createHttpError53(
        HttpCode_default.NOT_FOUND,
        `Domain with ID ${parsedBody.data.domainId} not found`
      )
    );
  }
  const domain = orgDomain.domains;
  let fullDomain = "";
  if (isBaseDomain) {
    fullDomain = domain.baseDomain;
  } else {
    fullDomain = `${subdomain}.${domain.baseDomain}`;
  }
  logger_default.debug(`Full domain: ${fullDomain}`);
  const existingResource = await db.select().from(resources).where(eq62(resources.fullDomain, fullDomain));
  if (existingResource.length > 0) {
    return next2(
      createHttpError53(
        HttpCode_default.CONFLICT,
        "Resource with that domain already exists"
      )
    );
  }
  let resource;
  await db.transaction(async (trx) => {
    const newResource = await trx.insert(resources).values({
      siteId,
      fullDomain,
      domainId,
      orgId,
      name: name2,
      subdomain,
      http,
      protocol,
      ssl: true,
      isBaseDomain
    }).returning();
    const adminRole = await db.select().from(roles).where(and24(eq62(roles.isAdmin, true), eq62(roles.orgId, orgId))).limit(1);
    if (adminRole.length === 0) {
      return next2(
        createHttpError53(HttpCode_default.NOT_FOUND, `Admin role not found`)
      );
    }
    await trx.insert(roleResources).values({
      roleId: adminRole[0].roleId,
      resourceId: newResource[0].resourceId
    });
    if (req.userOrgRoleId != adminRole[0].roleId) {
      await trx.insert(userResources).values({
        userId: req.user?.userId,
        resourceId: newResource[0].resourceId
      });
    }
    resource = newResource[0];
  });
  if (!resource) {
    return next2(
      createHttpError53(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to create resource"
      )
    );
  }
  return response_default(res, {
    data: resource,
    success: true,
    error: false,
    message: "Http resource created successfully",
    status: HttpCode_default.CREATED
  });
}
async function createRawResource(route, meta) {
  const { req, res, next: next2 } = route;
  const { siteId, orgId } = meta;
  const parsedBody = createRawResourceSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError53(
        HttpCode_default.BAD_REQUEST,
        fromError33(parsedBody.error).toString()
      )
    );
  }
  const { name: name2, http, protocol, proxyPort } = parsedBody.data;
  const existingResource = await db.select().from(resources).where(
    and24(
      eq62(resources.protocol, protocol),
      eq62(resources.proxyPort, proxyPort)
    )
  );
  if (existingResource.length > 0) {
    return next2(
      createHttpError53(
        HttpCode_default.CONFLICT,
        "Resource with that protocol and port already exists"
      )
    );
  }
  let resource;
  await db.transaction(async (trx) => {
    const newResource = await trx.insert(resources).values({
      siteId,
      orgId,
      name: name2,
      http,
      protocol,
      proxyPort
    }).returning();
    const adminRole = await db.select().from(roles).where(and24(eq62(roles.isAdmin, true), eq62(roles.orgId, orgId))).limit(1);
    if (adminRole.length === 0) {
      return next2(
        createHttpError53(HttpCode_default.NOT_FOUND, `Admin role not found`)
      );
    }
    await trx.insert(roleResources).values({
      roleId: adminRole[0].roleId,
      resourceId: newResource[0].resourceId
    });
    if (req.userOrgRoleId != adminRole[0].roleId) {
      await trx.insert(userResources).values({
        userId: req.user?.userId,
        resourceId: newResource[0].resourceId
      });
    }
    resource = newResource[0];
  });
  if (!resource) {
    return next2(
      createHttpError53(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to create resource"
      )
    );
  }
  return response_default(res, {
    data: resource,
    success: true,
    error: false,
    message: "Non-http resource created successfully",
    status: HttpCode_default.CREATED
  });
}

// server/routers/resource/deleteResource.ts
import { z as z38 } from "zod";
import { eq as eq64 } from "drizzle-orm";
import createHttpError54 from "http-errors";
import { fromError as fromError34 } from "zod-validation-error";

// server/routers/newt/targets.ts
function addTargets(newtId, targets4, protocol) {
  const payloadTargets = targets4.map((target) => {
    return `${target.internalPort ? target.internalPort + ":" : ""}${target.ip}:${target.port}`;
  });
  const payload = {
    type: `newt/${protocol}/add`,
    data: {
      targets: payloadTargets
    }
  };
  sendToClient(newtId, payload);
}
function removeTargets(newtId, targets4, protocol) {
  const payloadTargets = targets4.map((target) => {
    return `${target.internalPort ? target.internalPort + ":" : ""}${target.ip}:${target.port}`;
  });
  const payload = {
    type: `newt/${protocol}/remove`,
    data: {
      targets: payloadTargets
    }
  };
  sendToClient(newtId, payload);
}

// server/routers/target/helpers.ts
import { eq as eq63 } from "drizzle-orm";
var currentBannedPorts = [];
async function pickPort(siteId) {
  const resourcesRes = await db.query.resources.findMany({
    where: eq63(resources.siteId, siteId)
  });
  let targetIps = [];
  let targetInternalPorts = [];
  await Promise.all(
    resourcesRes.map(async (resource) => {
      const targetsRes = await db.query.targets.findMany({
        where: eq63(targets.resourceId, resource.resourceId)
      });
      targetsRes.forEach((target) => {
        targetIps.push(`${target.ip}/32`);
        if (target.internalPort) {
          targetInternalPorts.push(target.internalPort);
        }
      });
    })
  );
  let internalPort2;
  for (let i = 0; i < 1e3; i++) {
    internalPort2 = Math.floor(Math.random() * 25535) + 4e4;
    if (!targetInternalPorts.includes(internalPort2) && !currentBannedPorts.includes(internalPort2)) {
      break;
    }
  }
  currentBannedPorts.push(internalPort2);
  return { internalPort: internalPort2, targetIps };
}
async function getAllowedIps(siteId) {
  const resourcesRes = await db.query.resources.findMany({
    where: eq63(resources.siteId, siteId)
  });
  const targetIps = await Promise.all(
    resourcesRes.map(async (resource) => {
      const targetsRes = await db.query.targets.findMany({
        where: eq63(targets.resourceId, resource.resourceId)
      });
      return targetsRes.map((target) => `${target.ip}/32`);
    })
  );
  return targetIps.flat();
}

// server/routers/resource/deleteResource.ts
var deleteResourceSchema = z38.object({
  resourceId: z38.string().transform(Number).pipe(z38.number().int().positive())
}).strict();
async function deleteResource(req, res, next2) {
  try {
    const parsedParams = deleteResourceSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError54(
          HttpCode_default.BAD_REQUEST,
          fromError34(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const targetsToBeRemoved = await db.select().from(targets).where(eq64(targets.resourceId, resourceId));
    const [deletedResource] = await db.delete(resources).where(eq64(resources.resourceId, resourceId)).returning();
    if (!deletedResource) {
      return next2(
        createHttpError54(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    const [site] = await db.select().from(sites).where(eq64(sites.siteId, deletedResource.siteId)).limit(1);
    if (!site) {
      return next2(
        createHttpError54(
          HttpCode_default.NOT_FOUND,
          `Site with ID ${deletedResource.siteId} not found`
        )
      );
    }
    if (site.pubKey) {
      if (site.type == "wireguard") {
        await addPeer(site.exitNodeId, {
          publicKey: site.pubKey,
          allowedIps: await getAllowedIps(site.siteId)
        });
      } else if (site.type == "newt") {
        const [newt] = await db.select().from(newts).where(eq64(newts.siteId, site.siteId)).limit(1);
        removeTargets(newt.newtId, targetsToBeRemoved, deletedResource.protocol);
      }
    }
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Resource deleted successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError54(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/updateResource.ts
import { z as z39 } from "zod";
import { eq as eq65, and as and25 } from "drizzle-orm";
import createHttpError55 from "http-errors";
import { fromError as fromError35 } from "zod-validation-error";
var updateResourceParamsSchema = z39.object({
  resourceId: z39.string().transform(Number).pipe(z39.number().int().positive())
}).strict();
var updateHttpResourceBodySchema = z39.object({
  name: z39.string().min(1).max(255).optional(),
  subdomain: subdomainSchema.optional().transform((val) => val?.toLowerCase()),
  ssl: z39.boolean().optional(),
  sso: z39.boolean().optional(),
  blockAccess: z39.boolean().optional(),
  emailWhitelistEnabled: z39.boolean().optional(),
  isBaseDomain: z39.boolean().optional(),
  applyRules: z39.boolean().optional(),
  domainId: z39.string().optional()
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
}).refine(
  (data) => {
    if (data.subdomain) {
      return subdomainSchema.safeParse(data.subdomain).success;
    }
    return true;
  },
  { message: "Invalid subdomain" }
).refine(
  (data) => {
    if (!config_default.getRawConfig().flags?.allow_base_domain_resources) {
      if (data.isBaseDomain) {
        return false;
      }
    }
    return true;
  },
  {
    message: "Base domain resources are not allowed"
  }
);
var updateRawResourceBodySchema = z39.object({
  name: z39.string().min(1).max(255).optional(),
  proxyPort: z39.number().int().min(1).max(65535).optional()
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
}).refine(
  (data) => {
    if (!config_default.getRawConfig().flags?.allow_raw_resources) {
      if (data.proxyPort !== void 0) {
        return false;
      }
    }
    return true;
  },
  { message: "Cannot update proxyPort" }
);
async function updateResource(req, res, next2) {
  try {
    const parsedParams = updateResourceParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError55(
          HttpCode_default.BAD_REQUEST,
          fromError35(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const [result] = await db.select().from(resources).where(eq65(resources.resourceId, resourceId)).leftJoin(orgs, eq65(resources.orgId, orgs.orgId));
    const resource = result.resources;
    const org = result.orgs;
    if (!resource || !org) {
      return next2(
        createHttpError55(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    if (resource.http) {
      return await updateHttpResource(
        {
          req,
          res,
          next: next2
        },
        {
          resource,
          org
        }
      );
    } else {
      return await updateRawResource(
        {
          req,
          res,
          next: next2
        },
        {
          resource,
          org
        }
      );
    }
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError55(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}
async function updateHttpResource(route, meta) {
  const { next: next2, req, res } = route;
  const { resource, org } = meta;
  const parsedBody = updateHttpResourceBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError55(
        HttpCode_default.BAD_REQUEST,
        fromError35(parsedBody.error).toString()
      )
    );
  }
  const updateData = parsedBody.data;
  if (updateData.domainId) {
    const [existingDomain] = await db.select().from(orgDomains).where(
      and25(
        eq65(orgDomains.orgId, org.orgId),
        eq65(orgDomains.domainId, updateData.domainId)
      )
    ).leftJoin(domains, eq65(orgDomains.domainId, domains.domainId));
    if (!existingDomain) {
      return next2(
        createHttpError55(HttpCode_default.NOT_FOUND, `Domain not found`)
      );
    }
  }
  const domainId = updateData.domainId || resource.domainId;
  const subdomain = updateData.subdomain || resource.subdomain;
  const [domain] = await db.select().from(domains).where(eq65(domains.domainId, domainId));
  const isBaseDomain = updateData.isBaseDomain !== void 0 ? updateData.isBaseDomain : resource.isBaseDomain;
  let fullDomain = null;
  if (isBaseDomain) {
    fullDomain = domain.baseDomain;
  } else if (subdomain && domain) {
    fullDomain = `${subdomain}.${domain.baseDomain}`;
  }
  if (fullDomain) {
    const [existingDomain] = await db.select().from(resources).where(eq65(resources.fullDomain, fullDomain));
    if (existingDomain && existingDomain.resourceId !== resource.resourceId) {
      return next2(
        createHttpError55(
          HttpCode_default.CONFLICT,
          "Resource with that domain already exists"
        )
      );
    }
  }
  const updatePayload = {
    ...updateData,
    fullDomain
  };
  const updatedResource = await db.update(resources).set(updatePayload).where(eq65(resources.resourceId, resource.resourceId)).returning();
  if (updatedResource.length === 0) {
    return next2(
      createHttpError55(
        HttpCode_default.NOT_FOUND,
        `Resource with ID ${resource.resourceId} not found`
      )
    );
  }
  return response_default(res, {
    data: updatedResource[0],
    success: true,
    error: false,
    message: "HTTP resource updated successfully",
    status: HttpCode_default.OK
  });
}
async function updateRawResource(route, meta) {
  const { next: next2, req, res } = route;
  const { resource } = meta;
  const parsedBody = updateRawResourceBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError55(
        HttpCode_default.BAD_REQUEST,
        fromError35(parsedBody.error).toString()
      )
    );
  }
  const updateData = parsedBody.data;
  if (updateData.proxyPort) {
    const proxyPort = updateData.proxyPort;
    const existingResource = await db.select().from(resources).where(
      and25(
        eq65(resources.protocol, resource.protocol),
        eq65(resources.proxyPort, proxyPort)
      )
    );
    if (existingResource.length > 0 && existingResource[0].resourceId !== resource.resourceId) {
      return next2(
        createHttpError55(
          HttpCode_default.CONFLICT,
          "Resource with that protocol and port already exists"
        )
      );
    }
  }
  const updatedResource = await db.update(resources).set(updateData).where(eq65(resources.resourceId, resource.resourceId)).returning();
  if (updatedResource.length === 0) {
    return next2(
      createHttpError55(
        HttpCode_default.NOT_FOUND,
        `Resource with ID ${resource.resourceId} not found`
      )
    );
  }
  return response_default(res, {
    data: updatedResource[0],
    success: true,
    error: false,
    message: "Non-http Resource updated successfully",
    status: HttpCode_default.OK
  });
}

// server/routers/resource/listResources.ts
import { z as z40 } from "zod";
import createHttpError56 from "http-errors";
import { sql as sql5, eq as eq66, or as or5, inArray as inArray9, and as and26, count as count3 } from "drizzle-orm";
var listResourcesParamsSchema = z40.object({
  siteId: z40.string().optional().transform(stoi).pipe(z40.number().int().positive().optional()),
  orgId: z40.string().optional()
}).strict().refine((data) => !!data.siteId !== !!data.orgId, {
  message: "Either siteId or orgId must be provided, but not both"
});
var listResourcesSchema = z40.object({
  limit: z40.string().optional().default("1000").transform(Number).pipe(z40.number().int().nonnegative()),
  offset: z40.string().optional().default("0").transform(Number).pipe(z40.number().int().nonnegative())
});
function queryResources(accessibleResourceIds, siteId, orgId) {
  if (siteId) {
    return db.select({
      resourceId: resources.resourceId,
      name: resources.name,
      fullDomain: resources.fullDomain,
      ssl: resources.ssl,
      siteName: sites.name,
      siteId: sites.niceId,
      passwordId: resourcePassword.passwordId,
      pincodeId: resourcePincode.pincodeId,
      sso: resources.sso,
      whitelist: resources.emailWhitelistEnabled,
      http: resources.http,
      protocol: resources.protocol,
      proxyPort: resources.proxyPort
    }).from(resources).leftJoin(sites, eq66(resources.siteId, sites.siteId)).leftJoin(
      resourcePassword,
      eq66(resourcePassword.resourceId, resources.resourceId)
    ).leftJoin(
      resourcePincode,
      eq66(resourcePincode.resourceId, resources.resourceId)
    ).where(
      and26(
        inArray9(resources.resourceId, accessibleResourceIds),
        eq66(resources.siteId, siteId)
      )
    );
  } else if (orgId) {
    return db.select({
      resourceId: resources.resourceId,
      name: resources.name,
      ssl: resources.ssl,
      fullDomain: resources.fullDomain,
      siteName: sites.name,
      siteId: sites.niceId,
      passwordId: resourcePassword.passwordId,
      sso: resources.sso,
      pincodeId: resourcePincode.pincodeId,
      whitelist: resources.emailWhitelistEnabled,
      http: resources.http,
      protocol: resources.protocol,
      proxyPort: resources.proxyPort
    }).from(resources).leftJoin(sites, eq66(resources.siteId, sites.siteId)).leftJoin(
      resourcePassword,
      eq66(resourcePassword.resourceId, resources.resourceId)
    ).leftJoin(
      resourcePincode,
      eq66(resourcePincode.resourceId, resources.resourceId)
    ).where(
      and26(
        inArray9(resources.resourceId, accessibleResourceIds),
        eq66(resources.orgId, orgId)
      )
    );
  }
}
async function listResources(req, res, next2) {
  try {
    const parsedQuery = listResourcesSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError56(
          HttpCode_default.BAD_REQUEST,
          parsedQuery.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const parsedParams = listResourcesParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError56(
          HttpCode_default.BAD_REQUEST,
          parsedParams.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { siteId, orgId } = parsedParams.data;
    if (orgId && orgId !== req.userOrgId) {
      return next2(
        createHttpError56(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    }
    const accessibleResources = await db.select({
      resourceId: sql5`COALESCE(${userResources.resourceId}, ${roleResources.resourceId})`
    }).from(userResources).fullJoin(
      roleResources,
      eq66(userResources.resourceId, roleResources.resourceId)
    ).where(
      or5(
        eq66(userResources.userId, req.user.userId),
        eq66(roleResources.roleId, req.userOrgRoleId)
      )
    );
    const accessibleResourceIds = accessibleResources.map(
      (resource) => resource.resourceId
    );
    let countQuery = db.select({ count: count3() }).from(resources).where(inArray9(resources.resourceId, accessibleResourceIds));
    const baseQuery = queryResources(accessibleResourceIds, siteId, orgId);
    const resourcesList = await baseQuery.limit(limit).offset(offset);
    const totalCountResult = await countQuery;
    const totalCount = totalCountResult[0].count;
    return response_default(res, {
      data: {
        resources: resourcesList,
        pagination: {
          total: totalCount,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Resources retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError56(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/listResourceRoles.ts
import { z as z41 } from "zod";
import { eq as eq67 } from "drizzle-orm";
import createHttpError57 from "http-errors";
import { fromError as fromError36 } from "zod-validation-error";
var listResourceRolesSchema = z41.object({
  resourceId: z41.string().transform(Number).pipe(z41.number().int().positive())
}).strict();
async function query2(resourceId) {
  return await db.select({
    roleId: roles.roleId,
    name: roles.name,
    description: roles.description,
    isAdmin: roles.isAdmin
  }).from(roleResources).innerJoin(roles, eq67(roleResources.roleId, roles.roleId)).where(eq67(roleResources.resourceId, resourceId));
}
async function listResourceRoles(req, res, next2) {
  try {
    const parsedParams = listResourceRolesSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError57(
          HttpCode_default.BAD_REQUEST,
          fromError36(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const resourceRolesList = await query2(resourceId);
    return response_default(res, {
      data: {
        roles: resourceRolesList
      },
      success: true,
      error: false,
      message: "Resource roles retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError57(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/setResourceUsers.ts
import { z as z42 } from "zod";
import createHttpError58 from "http-errors";
import { fromError as fromError37 } from "zod-validation-error";
import { eq as eq68 } from "drizzle-orm";
var setUserResourcesBodySchema = z42.object({
  userIds: z42.array(z42.string())
}).strict();
var setUserResourcesParamsSchema = z42.object({
  resourceId: z42.string().transform(Number).pipe(z42.number().int().positive())
}).strict();
async function setResourceUsers(req, res, next2) {
  try {
    const parsedBody = setUserResourcesBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError58(
          HttpCode_default.BAD_REQUEST,
          fromError37(parsedBody.error).toString()
        )
      );
    }
    const { userIds } = parsedBody.data;
    const parsedParams = setUserResourcesParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError58(
          HttpCode_default.BAD_REQUEST,
          fromError37(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    await db.transaction(async (trx) => {
      await trx.delete(userResources).where(eq68(userResources.resourceId, resourceId));
      const newUserResources = await Promise.all(
        userIds.map(
          (userId) => trx.insert(userResources).values({ userId, resourceId }).returning()
        )
      );
      return response_default(res, {
        data: {},
        success: true,
        error: false,
        message: "Users set for resource successfully",
        status: HttpCode_default.CREATED
      });
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError58(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/listResourceUsers.ts
import { z as z43 } from "zod";
import { eq as eq69 } from "drizzle-orm";
import createHttpError59 from "http-errors";
import { fromError as fromError38 } from "zod-validation-error";
var listResourceUsersSchema = z43.object({
  resourceId: z43.string().transform(Number).pipe(z43.number().int().positive())
}).strict();
async function queryUsers(resourceId) {
  return await db.select({
    userId: userResources.userId,
    email: users.email
  }).from(userResources).innerJoin(users, eq69(userResources.userId, users.userId)).where(eq69(userResources.resourceId, resourceId));
}
async function listResourceUsers(req, res, next2) {
  try {
    const parsedParams = listResourceUsersSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError59(
          HttpCode_default.BAD_REQUEST,
          fromError38(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const resourceUsersList = await queryUsers(resourceId);
    return response_default(res, {
      data: {
        users: resourceUsersList
      },
      success: true,
      error: false,
      message: "Resource users retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError59(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/setResourcePassword.ts
import { z as z44 } from "zod";
import { eq as eq70 } from "drizzle-orm";
import createHttpError60 from "http-errors";
import { fromError as fromError39 } from "zod-validation-error";
var setResourceAuthMethodsParamsSchema = z44.object({
  resourceId: z44.string().transform(Number).pipe(z44.number().int().positive())
});
var setResourceAuthMethodsBodySchema = z44.object({
  password: z44.string().min(4).max(100).nullable()
}).strict();
async function setResourcePassword(req, res, next2) {
  try {
    const parsedParams = setResourceAuthMethodsParamsSchema.safeParse(
      req.params
    );
    if (!parsedParams.success) {
      return next2(
        createHttpError60(
          HttpCode_default.BAD_REQUEST,
          fromError39(parsedParams.error).toString()
        )
      );
    }
    const parsedBody = setResourceAuthMethodsBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError60(
          HttpCode_default.BAD_REQUEST,
          fromError39(parsedBody.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const { password } = parsedBody.data;
    await db.transaction(async (trx) => {
      await trx.delete(resourcePassword).where(eq70(resourcePassword.resourceId, resourceId));
      if (password) {
        const passwordHash = await hashPassword(password);
        await trx.insert(resourcePassword).values({ resourceId, passwordHash });
      }
    });
    return response(res, {
      data: {},
      success: true,
      error: false,
      message: "Resource password set successfully",
      status: HttpCode_default.CREATED
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError60(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/authWithPassword.ts
import { eq as eq72 } from "drizzle-orm";
import createHttpError61 from "http-errors";
import { z as z45 } from "zod";
import { fromError as fromError40 } from "zod-validation-error";

// server/auth/sessions/resource.ts
import { encodeHexLowerCase as encodeHexLowerCase4 } from "@oslojs/encoding";
import { sha256 as sha2564 } from "@oslojs/crypto/sha2";
import { eq as eq71, and as and27 } from "drizzle-orm";
var SESSION_COOKIE_NAME2 = config_default.getRawConfig().server.session_cookie_name;
var SESSION_COOKIE_EXPIRES2 = 1e3 * 60 * 60 * config_default.getRawConfig().server.resource_session_length_hours;
async function createResourceSession(opts) {
  if (!opts.passwordId && !opts.pincodeId && !opts.whitelistId && !opts.accessTokenId && !opts.userSessionId) {
    throw new Error("Auth method must be provided");
  }
  const sessionId = encodeHexLowerCase4(
    sha2564(new TextEncoder().encode(opts.token))
  );
  const session = {
    sessionId,
    expiresAt: opts.expiresAt || new Date(Date.now() + SESSION_COOKIE_EXPIRES2).getTime(),
    sessionLength: opts.sessionLength || SESSION_COOKIE_EXPIRES2,
    resourceId: opts.resourceId,
    passwordId: opts.passwordId || null,
    pincodeId: opts.pincodeId || null,
    whitelistId: opts.whitelistId || null,
    doNotExtend: opts.doNotExtend || false,
    accessTokenId: opts.accessTokenId || null,
    isRequestToken: opts.isRequestToken || false,
    userSessionId: opts.userSessionId || null
  };
  await db_default.insert(resourceSessions).values(session);
  return session;
}
async function validateResourceSessionToken(token2, resourceId) {
  const sessionId = encodeHexLowerCase4(
    sha2564(new TextEncoder().encode(token2))
  );
  const result = await db_default.select().from(resourceSessions).where(
    and27(
      eq71(resourceSessions.sessionId, sessionId),
      eq71(resourceSessions.resourceId, resourceId)
    )
  );
  if (result.length < 1) {
    return { resourceSession: null };
  }
  const resourceSession = result[0];
  if (Date.now() >= resourceSession.expiresAt) {
    await db_default.delete(resourceSessions).where(eq71(resourceSessions.sessionId, resourceSessions.sessionId));
    return { resourceSession: null };
  } else if (Date.now() >= resourceSession.expiresAt - resourceSession.sessionLength / 2) {
    if (!resourceSession.doNotExtend) {
      resourceSession.expiresAt = new Date(
        Date.now() + resourceSession.sessionLength
      ).getTime();
      await db_default.update(resourceSessions).set({
        expiresAt: resourceSession.expiresAt
      }).where(
        eq71(resourceSessions.sessionId, resourceSession.sessionId)
      );
    }
  }
  return { resourceSession };
}
function serializeResourceSessionCookie(cookieName, domain, token2, isHttp = false, expiresAt) {
  if (!isHttp) {
    if (expiresAt === void 0) {
      return `${cookieName}_s=${token2}; HttpOnly; SameSite=Lax; Path=/; Secure; Domain=${"." + domain}`;
    }
    return `${cookieName}_s=${token2}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Secure; Domain=${"." + domain}`;
  } else {
    if (expiresAt === void 0) {
      return `${cookieName}=${token2}; HttpOnly; SameSite=Lax; Path=/; Domain=${"." + domain}`;
    }
    return `${cookieName}=${token2}; HttpOnly; SameSite=Lax; Expires=${expiresAt.toUTCString()}; Path=/; Domain=${"." + domain}`;
  }
}

// server/routers/resource/authWithPassword.ts
var authWithPasswordBodySchema = z45.object({
  password: z45.string()
}).strict();
var authWithPasswordParamsSchema = z45.object({
  resourceId: z45.string().transform(Number).pipe(z45.number().int().positive())
}).strict();
async function authWithPassword(req, res, next2) {
  const parsedBody = authWithPasswordBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError61(
        HttpCode_default.BAD_REQUEST,
        fromError40(parsedBody.error).toString()
      )
    );
  }
  const parsedParams = authWithPasswordParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return next2(
      createHttpError61(
        HttpCode_default.BAD_REQUEST,
        fromError40(parsedParams.error).toString()
      )
    );
  }
  const { resourceId } = parsedParams.data;
  const { password } = parsedBody.data;
  try {
    const [result] = await db_default.select().from(resources).leftJoin(
      resourcePassword,
      eq72(resourcePassword.resourceId, resources.resourceId)
    ).leftJoin(orgs, eq72(orgs.orgId, resources.orgId)).where(eq72(resources.resourceId, resourceId)).limit(1);
    const resource = result?.resources;
    const org = result?.orgs;
    const definedPassword = result?.resourcePassword;
    if (!org) {
      return next2(
        createHttpError61(HttpCode_default.BAD_REQUEST, "Org does not exist")
      );
    }
    if (!resource) {
      return next2(
        createHttpError61(HttpCode_default.BAD_REQUEST, "Resource does not exist")
      );
    }
    if (!definedPassword) {
      return next2(
        createHttpError61(
          HttpCode_default.UNAUTHORIZED,
          createHttpError61(
            HttpCode_default.BAD_REQUEST,
            "Resource has no password protection"
          )
        )
      );
    }
    const validPassword = await verifyPassword(
      password,
      definedPassword.passwordHash
    );
    if (!validPassword) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Resource password incorrect. Resource ID: ${resource.resourceId}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError61(HttpCode_default.UNAUTHORIZED, "Incorrect password")
      );
    }
    const token2 = generateSessionToken();
    await createResourceSession({
      resourceId,
      token: token2,
      passwordId: definedPassword.passwordId,
      isRequestToken: true,
      expiresAt: Date.now() + 1e3 * 30,
      // 30 seconds
      sessionLength: 1e3 * 30,
      doNotExtend: true
    });
    return response_default(res, {
      data: {
        session: token2
      },
      success: true,
      error: false,
      message: "Authenticated with resource successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    logger_default.error(e2);
    return next2(
      createHttpError61(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to authenticate with resource"
      )
    );
  }
}

// server/routers/resource/getResourceAuthInfo.ts
import { z as z46 } from "zod";
import { eq as eq73 } from "drizzle-orm";
import createHttpError62 from "http-errors";
import { fromError as fromError41 } from "zod-validation-error";
var getResourceAuthInfoSchema = z46.object({
  resourceId: z46.string().transform(Number).pipe(z46.number().int().positive())
}).strict();
async function getResourceAuthInfo(req, res, next2) {
  try {
    const parsedParams = getResourceAuthInfoSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError62(
          HttpCode_default.BAD_REQUEST,
          fromError41(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const [result] = await db.select().from(resources).leftJoin(
      resourcePincode,
      eq73(resourcePincode.resourceId, resources.resourceId)
    ).leftJoin(
      resourcePassword,
      eq73(resourcePassword.resourceId, resources.resourceId)
    ).where(eq73(resources.resourceId, resourceId)).limit(1);
    const resource = result?.resources;
    const pincode = result?.resourcePincode;
    const password = result?.resourcePassword;
    const url = `${resource.ssl ? "https" : "http"}://${resource.fullDomain}`;
    if (!resource) {
      return next2(
        createHttpError62(HttpCode_default.NOT_FOUND, "Resource not found")
      );
    }
    return response_default(res, {
      data: {
        resourceId: resource.resourceId,
        resourceName: resource.name,
        password: password !== null,
        pincode: pincode !== null,
        sso: resource.sso,
        blockAccess: resource.blockAccess,
        url,
        whitelist: resource.emailWhitelistEnabled
      },
      success: true,
      error: false,
      message: "Resource auth info retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError62(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/setResourcePincode.ts
import { z as z47 } from "zod";
import { eq as eq74 } from "drizzle-orm";
import createHttpError63 from "http-errors";
import { fromError as fromError42 } from "zod-validation-error";
var setResourceAuthMethodsParamsSchema2 = z47.object({
  resourceId: z47.string().transform(Number).pipe(z47.number().int().positive())
});
var setResourceAuthMethodsBodySchema2 = z47.object({
  pincode: z47.string().regex(/^\d{6}$/).or(z47.null())
}).strict();
async function setResourcePincode(req, res, next2) {
  try {
    const parsedParams = setResourceAuthMethodsParamsSchema2.safeParse(
      req.params
    );
    if (!parsedParams.success) {
      return next2(
        createHttpError63(
          HttpCode_default.BAD_REQUEST,
          fromError42(parsedParams.error).toString()
        )
      );
    }
    const parsedBody = setResourceAuthMethodsBodySchema2.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError63(
          HttpCode_default.BAD_REQUEST,
          fromError42(parsedBody.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const { pincode } = parsedBody.data;
    await db.transaction(async (trx) => {
      await trx.delete(resourcePincode).where(eq74(resourcePincode.resourceId, resourceId));
      if (pincode) {
        const pincodeHash = await hashPassword(pincode);
        await trx.insert(resourcePincode).values({ resourceId, pincodeHash, digitLength: 6 });
      }
    });
    return response(res, {
      data: {},
      success: true,
      error: false,
      message: "Resource PIN code set successfully",
      status: HttpCode_default.CREATED
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError63(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "An error occurred"
      )
    );
  }
}

// server/routers/resource/authWithPincode.ts
import { eq as eq75 } from "drizzle-orm";
import createHttpError64 from "http-errors";
import { z as z48 } from "zod";
import { fromError as fromError43 } from "zod-validation-error";
var authWithPincodeBodySchema = z48.object({
  pincode: z48.string()
}).strict();
var authWithPincodeParamsSchema = z48.object({
  resourceId: z48.string().transform(Number).pipe(z48.number().int().positive())
}).strict();
async function authWithPincode(req, res, next2) {
  const parsedBody = authWithPincodeBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError64(
        HttpCode_default.BAD_REQUEST,
        fromError43(parsedBody.error).toString()
      )
    );
  }
  const parsedParams = authWithPincodeParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return next2(
      createHttpError64(
        HttpCode_default.BAD_REQUEST,
        fromError43(parsedParams.error).toString()
      )
    );
  }
  const { resourceId } = parsedParams.data;
  const { pincode } = parsedBody.data;
  try {
    const [result] = await db_default.select().from(resources).leftJoin(
      resourcePincode,
      eq75(resourcePincode.resourceId, resources.resourceId)
    ).leftJoin(orgs, eq75(orgs.orgId, resources.orgId)).where(eq75(resources.resourceId, resourceId)).limit(1);
    const resource = result?.resources;
    const org = result?.orgs;
    const definedPincode = result?.resourcePincode;
    if (!org) {
      return next2(
        createHttpError64(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "Org does not exist"
        )
      );
    }
    if (!resource) {
      return next2(
        createHttpError64(HttpCode_default.BAD_REQUEST, "Resource does not exist")
      );
    }
    if (!definedPincode) {
      return next2(
        createHttpError64(
          HttpCode_default.UNAUTHORIZED,
          "Resource has no pincode protection"
        )
      );
    }
    const validPincode = await verifyPassword(
      pincode,
      definedPincode.pincodeHash
    );
    if (!validPincode) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Resource pin code incorrect. Resource ID: ${resource.resourceId}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError64(HttpCode_default.UNAUTHORIZED, "Incorrect PIN")
      );
    }
    const token2 = generateSessionToken();
    await createResourceSession({
      resourceId,
      token: token2,
      pincodeId: definedPincode.pincodeId,
      isRequestToken: true,
      expiresAt: Date.now() + 1e3 * 30,
      // 30 seconds
      sessionLength: 1e3 * 30,
      doNotExtend: true
    });
    return response_default(res, {
      data: {
        session: token2
      },
      success: true,
      error: false,
      message: "Authenticated with resource successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    logger_default.error(e2);
    return next2(
      createHttpError64(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to authenticate with resource"
      )
    );
  }
}

// server/routers/resource/setResourceWhitelist.ts
import { z as z49 } from "zod";
import createHttpError65 from "http-errors";
import { fromError as fromError44 } from "zod-validation-error";
import { and as and28, eq as eq76 } from "drizzle-orm";
var setResourceWhitelistBodySchema = z49.object({
  emails: z49.array(
    z49.string().email().or(
      z49.string().regex(/^\*@[\w.-]+\.[a-zA-Z]{2,}$/, {
        message: "Invalid email address. Wildcard (*) must be the entire local part."
      })
    )
  ).max(50).transform((v2) => v2.map((e2) => e2.toLowerCase()))
}).strict();
var setResourceWhitelistParamsSchema = z49.object({
  resourceId: z49.string().transform(Number).pipe(z49.number().int().positive())
}).strict();
async function setResourceWhitelist(req, res, next2) {
  try {
    const parsedBody = setResourceWhitelistBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError65(
          HttpCode_default.BAD_REQUEST,
          fromError44(parsedBody.error).toString()
        )
      );
    }
    const { emails } = parsedBody.data;
    const parsedParams = setResourceWhitelistParamsSchema.safeParse(
      req.params
    );
    if (!parsedParams.success) {
      return next2(
        createHttpError65(
          HttpCode_default.BAD_REQUEST,
          fromError44(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const [resource] = await db.select().from(resources).where(eq76(resources.resourceId, resourceId));
    if (!resource) {
      return next2(
        createHttpError65(HttpCode_default.NOT_FOUND, "Resource not found")
      );
    }
    if (!resource.emailWhitelistEnabled) {
      return next2(
        createHttpError65(
          HttpCode_default.BAD_REQUEST,
          "Email whitelist is not enabled for this resource"
        )
      );
    }
    const whitelist = await db.select().from(resourceWhitelist).where(eq76(resourceWhitelist.resourceId, resourceId));
    await db.transaction(async (trx) => {
      const existingEmails = whitelist.map((w2) => w2.email);
      const emailsToAdd = emails.filter(
        (e2) => !existingEmails.includes(e2)
      );
      const emailsToRemove = existingEmails.filter(
        (e2) => !emails.includes(e2)
      );
      for (const email of emailsToAdd) {
        await trx.insert(resourceWhitelist).values({
          email,
          resourceId
        });
      }
      for (const email of emailsToRemove) {
        await trx.delete(resourceWhitelist).where(
          and28(
            eq76(resourceWhitelist.resourceId, resourceId),
            eq76(resourceWhitelist.email, email)
          )
        );
      }
      return response_default(res, {
        data: {},
        success: true,
        error: false,
        message: "Whitelist set for resource successfully",
        status: HttpCode_default.CREATED
      });
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError65(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/getResourceWhitelist.ts
import { z as z50 } from "zod";
import { eq as eq77 } from "drizzle-orm";
import createHttpError66 from "http-errors";
import { fromError as fromError45 } from "zod-validation-error";
var getResourceWhitelistSchema = z50.object({
  resourceId: z50.string().transform(Number).pipe(z50.number().int().positive())
}).strict();
async function queryWhitelist(resourceId) {
  return await db.select({
    email: resourceWhitelist.email
  }).from(resourceWhitelist).where(eq77(resourceWhitelist.resourceId, resourceId));
}
async function getResourceWhitelist(req, res, next2) {
  try {
    const parsedParams = getResourceWhitelistSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError66(
          HttpCode_default.BAD_REQUEST,
          fromError45(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const whitelist = await queryWhitelist(resourceId);
    return response_default(res, {
      data: {
        whitelist
      },
      success: true,
      error: false,
      message: "Resource whitelist retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError66(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/authWithWhitelist.ts
import { eq as eq79, and as and30 } from "drizzle-orm";
import createHttpError67 from "http-errors";
import { z as z53 } from "zod";
import { fromError as fromError46 } from "zod-validation-error";

// server/auth/resourceOtp.ts
import { and as and29, eq as eq78 } from "drizzle-orm";
import { createDate, isWithinExpirationDate, TimeSpan } from "oslo";
import { alphabet, generateRandomString as generateRandomString2 } from "oslo/crypto";

// node_modules/domelementtype/lib/esm/index.js
var ElementType;
(function(ElementType2) {
  ElementType2["Root"] = "root";
  ElementType2["Text"] = "text";
  ElementType2["Directive"] = "directive";
  ElementType2["Comment"] = "comment";
  ElementType2["Script"] = "script";
  ElementType2["Style"] = "style";
  ElementType2["Tag"] = "tag";
  ElementType2["CDATA"] = "cdata";
  ElementType2["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
function isTag(elem) {
  return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
}
var Root = ElementType.Root;
var Text = ElementType.Text;
var Directive = ElementType.Directive;
var Comment = ElementType.Comment;
var Script = ElementType.Script;
var Style = ElementType.Style;
var Tag = ElementType.Tag;
var CDATA = ElementType.CDATA;
var Doctype = ElementType.Doctype;

// node_modules/domhandler/lib/esm/node.js
var Node = class {
  constructor() {
    this.parent = null;
    this.prev = null;
    this.next = null;
    this.startIndex = null;
    this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(parent) {
    this.parent = parent;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(prev) {
    this.prev = prev;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(next2) {
    this.next = next2;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(recursive = false) {
    return cloneNode(this, recursive);
  }
};
var DataNode = class extends Node {
  /**
   * @param data The content of the data node
   */
  constructor(data) {
    super();
    this.data = data;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(data) {
    this.data = data;
  }
};
var Text2 = class extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Text;
  }
  get nodeType() {
    return 3;
  }
};
var Comment2 = class extends DataNode {
  constructor() {
    super(...arguments);
    this.type = ElementType.Comment;
  }
  get nodeType() {
    return 8;
  }
};
var ProcessingInstruction = class extends DataNode {
  constructor(name2, data) {
    super(data);
    this.name = name2;
    this.type = ElementType.Directive;
  }
  get nodeType() {
    return 1;
  }
};
var NodeWithChildren = class extends Node {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(children) {
    super();
    this.children = children;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var _a3;
    return (_a3 = this.children[0]) !== null && _a3 !== void 0 ? _a3 : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(children) {
    this.children = children;
  }
};
var CDATA2 = class extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.CDATA;
  }
  get nodeType() {
    return 4;
  }
};
var Document = class extends NodeWithChildren {
  constructor() {
    super(...arguments);
    this.type = ElementType.Root;
  }
  get nodeType() {
    return 9;
  }
};
var Element = class extends NodeWithChildren {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(name2, attribs, children = [], type = name2 === "script" ? ElementType.Script : name2 === "style" ? ElementType.Style : ElementType.Tag) {
    super(children);
    this.name = name2;
    this.attribs = attribs;
    this.type = type;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(name2) {
    this.name = name2;
  }
  get attributes() {
    return Object.keys(this.attribs).map((name2) => {
      var _a3, _b;
      return {
        name: name2,
        value: this.attribs[name2],
        namespace: (_a3 = this["x-attribsNamespace"]) === null || _a3 === void 0 ? void 0 : _a3[name2],
        prefix: (_b = this["x-attribsPrefix"]) === null || _b === void 0 ? void 0 : _b[name2]
      };
    });
  }
};
function isTag2(node) {
  return isTag(node);
}
function isCDATA(node) {
  return node.type === ElementType.CDATA;
}
function isText(node) {
  return node.type === ElementType.Text;
}
function isComment(node) {
  return node.type === ElementType.Comment;
}
function isDirective(node) {
  return node.type === ElementType.Directive;
}
function isDocument(node) {
  return node.type === ElementType.Root;
}
function cloneNode(node, recursive = false) {
  let result;
  if (isText(node)) {
    result = new Text2(node.data);
  } else if (isComment(node)) {
    result = new Comment2(node.data);
  } else if (isTag2(node)) {
    const children = recursive ? cloneChildren(node.children) : [];
    const clone = new Element(node.name, { ...node.attribs }, children);
    children.forEach((child) => child.parent = clone);
    if (node.namespace != null) {
      clone.namespace = node.namespace;
    }
    if (node["x-attribsNamespace"]) {
      clone["x-attribsNamespace"] = { ...node["x-attribsNamespace"] };
    }
    if (node["x-attribsPrefix"]) {
      clone["x-attribsPrefix"] = { ...node["x-attribsPrefix"] };
    }
    result = clone;
  } else if (isCDATA(node)) {
    const children = recursive ? cloneChildren(node.children) : [];
    const clone = new CDATA2(children);
    children.forEach((child) => child.parent = clone);
    result = clone;
  } else if (isDocument(node)) {
    const children = recursive ? cloneChildren(node.children) : [];
    const clone = new Document(children);
    children.forEach((child) => child.parent = clone);
    if (node["x-mode"]) {
      clone["x-mode"] = node["x-mode"];
    }
    result = clone;
  } else if (isDirective(node)) {
    const instruction = new ProcessingInstruction(node.name, node.data);
    if (node["x-name"] != null) {
      instruction["x-name"] = node["x-name"];
      instruction["x-publicId"] = node["x-publicId"];
      instruction["x-systemId"] = node["x-systemId"];
    }
    result = instruction;
  } else {
    throw new Error(`Not implemented yet: ${node.type}`);
  }
  result.startIndex = node.startIndex;
  result.endIndex = node.endIndex;
  if (node.sourceCodeLocation != null) {
    result.sourceCodeLocation = node.sourceCodeLocation;
  }
  return result;
}
function cloneChildren(childs) {
  const children = childs.map((child) => cloneNode(child, true));
  for (let i = 1; i < children.length; i++) {
    children[i].prev = children[i - 1];
    children[i - 1].next = children[i];
  }
  return children;
}

// node_modules/domhandler/lib/esm/index.js
var defaultOpts = {
  withStartIndices: false,
  withEndIndices: false,
  xmlMode: false
};
var DomHandler = class {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(callback, options, elementCB) {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
    if (typeof options === "function") {
      elementCB = options;
      options = defaultOpts;
    }
    if (typeof callback === "object") {
      options = callback;
      callback = void 0;
    }
    this.callback = callback !== null && callback !== void 0 ? callback : null;
    this.options = options !== null && options !== void 0 ? options : defaultOpts;
    this.elementCB = elementCB !== null && elementCB !== void 0 ? elementCB : null;
  }
  onparserinit(parser) {
    this.parser = parser;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [];
    this.root = new Document(this.dom);
    this.done = false;
    this.tagStack = [this.root];
    this.lastNode = null;
    this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    if (this.done)
      return;
    this.done = true;
    this.parser = null;
    this.handleCallback(null);
  }
  onerror(error) {
    this.handleCallback(error);
  }
  onclosetag() {
    this.lastNode = null;
    const elem = this.tagStack.pop();
    if (this.options.withEndIndices) {
      elem.endIndex = this.parser.endIndex;
    }
    if (this.elementCB)
      this.elementCB(elem);
  }
  onopentag(name2, attribs) {
    const type = this.options.xmlMode ? ElementType.Tag : void 0;
    const element = new Element(name2, attribs, void 0, type);
    this.addNode(element);
    this.tagStack.push(element);
  }
  ontext(data) {
    const { lastNode } = this;
    if (lastNode && lastNode.type === ElementType.Text) {
      lastNode.data += data;
      if (this.options.withEndIndices) {
        lastNode.endIndex = this.parser.endIndex;
      }
    } else {
      const node = new Text2(data);
      this.addNode(node);
      this.lastNode = node;
    }
  }
  oncomment(data) {
    if (this.lastNode && this.lastNode.type === ElementType.Comment) {
      this.lastNode.data += data;
      return;
    }
    const node = new Comment2(data);
    this.addNode(node);
    this.lastNode = node;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const text2 = new Text2("");
    const node = new CDATA2([text2]);
    this.addNode(node);
    text2.parent = node;
    this.lastNode = text2;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(name2, data) {
    const node = new ProcessingInstruction(name2, data);
    this.addNode(node);
  }
  handleCallback(error) {
    if (typeof this.callback === "function") {
      this.callback(error, this.dom);
    } else if (error) {
      throw error;
    }
  }
  addNode(node) {
    const parent = this.tagStack[this.tagStack.length - 1];
    const previousSibling = parent.children[parent.children.length - 1];
    if (this.options.withStartIndices) {
      node.startIndex = this.parser.startIndex;
    }
    if (this.options.withEndIndices) {
      node.endIndex = this.parser.endIndex;
    }
    parent.children.push(node);
    if (previousSibling) {
      node.prev = previousSibling;
      previousSibling.next = node;
    }
    node.parent = parent;
    this.lastNode = null;
  }
};

// node_modules/leac/lib/leac.mjs
var e = /\n/g;
function n(n2) {
  const o2 = [...n2.matchAll(e)].map((e2) => e2.index || 0);
  o2.unshift(-1);
  const s2 = t(o2, 0, o2.length);
  return (e2) => r(s2, e2);
}
function t(e2, n2, r2) {
  if (r2 - n2 == 1) return { offset: e2[n2], index: n2 + 1 };
  const o2 = Math.ceil((n2 + r2) / 2), s2 = t(e2, n2, o2), l2 = t(e2, o2, r2);
  return { offset: s2.offset, low: s2, high: l2 };
}
function r(e2, n2) {
  return function(e3) {
    return Object.prototype.hasOwnProperty.call(e3, "index");
  }(e2) ? { line: e2.index, column: n2 - e2.offset } : r(e2.high.offset < n2 ? e2.high : e2.low, n2);
}
function o(e2, t9 = "", r2 = {}) {
  const o2 = "string" != typeof t9 ? t9 : r2, l2 = "string" == typeof t9 ? t9 : "", c2 = e2.map(s), f = !!o2.lineNumbers;
  return function(e3, t10 = 0) {
    const r3 = f ? n(e3) : () => ({ line: 0, column: 0 });
    let o3 = t10;
    const s2 = [];
    e: for (; o3 < e3.length; ) {
      let n2 = false;
      for (const t11 of c2) {
        t11.regex.lastIndex = o3;
        const c3 = t11.regex.exec(e3);
        if (c3 && c3[0].length > 0) {
          if (!t11.discard) {
            const e4 = r3(o3), n3 = "string" == typeof t11.replace ? c3[0].replace(new RegExp(t11.regex.source, t11.regex.flags), t11.replace) : c3[0];
            s2.push({ state: l2, name: t11.name, text: n3, offset: o3, len: c3[0].length, line: e4.line, column: e4.column });
          }
          if (o3 = t11.regex.lastIndex, n2 = true, t11.push) {
            const n3 = t11.push(e3, o3);
            s2.push(...n3.tokens), o3 = n3.offset;
          }
          if (t11.pop) break e;
          break;
        }
      }
      if (!n2) break;
    }
    return { tokens: s2, offset: o3, complete: e3.length <= o3 };
  };
}
function s(e2, n2) {
  return { ...e2, regex: l(e2, n2) };
}
function l(e2, n2) {
  if (0 === e2.name.length) throw new Error(`Rule #${n2} has empty name, which is not allowed.`);
  if (function(e3) {
    return Object.prototype.hasOwnProperty.call(e3, "regex");
  }(e2)) return function(e3) {
    if (e3.global) throw new Error(`Regular expression /${e3.source}/${e3.flags} contains the global flag, which is not allowed.`);
    return e3.sticky ? e3 : new RegExp(e3.source, e3.flags + "y");
  }(e2.regex);
  if (function(e3) {
    return Object.prototype.hasOwnProperty.call(e3, "str");
  }(e2)) {
    if (0 === e2.str.length) throw new Error(`Rule #${n2} ("${e2.name}") has empty "str" property, which is not allowed.`);
    return new RegExp(c(e2.str), "y");
  }
  return new RegExp(c(e2.name), "y");
}
function c(e2) {
  return e2.replace(/[-[\]{}()*+!<=:?./\\^$|#\s,]/g, "\\$&");
}

// node_modules/peberminta/lib/core.mjs
function token(onToken, onEnd) {
  return (data, i) => {
    let position = i;
    let value = void 0;
    if (i < data.tokens.length) {
      value = onToken(data.tokens[i], data, i);
      if (value !== void 0) {
        position++;
      }
    } else {
      onEnd?.(data, i);
    }
    return value === void 0 ? { matched: false } : {
      matched: true,
      position,
      value
    };
  };
}
function mapInner(r2, f) {
  return r2.matched ? {
    matched: true,
    position: r2.position,
    value: f(r2.value, r2.position)
  } : r2;
}
function mapOuter(r2, f) {
  return r2.matched ? f(r2) : r2;
}
function map(p, mapper) {
  return (data, i) => mapInner(p(data, i), (v2, j3) => mapper(v2, data, i, j3));
}
function option(p, def) {
  return (data, i) => {
    const r2 = p(data, i);
    return r2.matched ? r2 : {
      matched: true,
      position: i,
      value: def
    };
  };
}
function choice(...ps2) {
  return (data, i) => {
    for (const p of ps2) {
      const result = p(data, i);
      if (result.matched) {
        return result;
      }
    }
    return { matched: false };
  };
}
function otherwise(pa2, pb) {
  return (data, i) => {
    const r1 = pa2(data, i);
    return r1.matched ? r1 : pb(data, i);
  };
}
function takeWhile(p, test) {
  return (data, i) => {
    const values = [];
    let success = true;
    do {
      const r2 = p(data, i);
      if (r2.matched && test(r2.value, values.length + 1, data, i, r2.position)) {
        values.push(r2.value);
        i = r2.position;
      } else {
        success = false;
      }
    } while (success);
    return {
      matched: true,
      position: i,
      value: values
    };
  };
}
function many(p) {
  return takeWhile(p, () => true);
}
function many1(p) {
  return ab(p, many(p), (head, tail) => [head, ...tail]);
}
function ab(pa2, pb, join2) {
  return (data, i) => mapOuter(pa2(data, i), (ma2) => mapInner(pb(data, ma2.position), (vb, j3) => join2(ma2.value, vb, data, i, j3)));
}
function left(pa2, pb) {
  return ab(pa2, pb, (va2) => va2);
}
function right(pa2, pb) {
  return ab(pa2, pb, (va2, vb) => vb);
}
function abc(pa2, pb, pc, join2) {
  return (data, i) => mapOuter(pa2(data, i), (ma2) => mapOuter(pb(data, ma2.position), (mb) => mapInner(pc(data, mb.position), (vc, j3) => join2(ma2.value, mb.value, vc, data, i, j3))));
}
function middle(pa2, pb, pc) {
  return abc(pa2, pb, pc, (ra2, rb) => rb);
}
function all(...ps2) {
  return (data, i) => {
    const result = [];
    let position = i;
    for (const p of ps2) {
      const r1 = p(data, position);
      if (r1.matched) {
        result.push(r1.value);
        position = r1.position;
      } else {
        return { matched: false };
      }
    }
    return {
      matched: true,
      position,
      value: result
    };
  };
}
function flatten(...ps2) {
  return flatten1(all(...ps2));
}
function flatten1(p) {
  return map(p, (vs2) => vs2.flatMap((v2) => v2));
}
function chainReduce(acc, f) {
  return (data, i) => {
    let loop = true;
    let acc1 = acc;
    let pos = i;
    do {
      const r2 = f(acc1, data, pos)(data, pos);
      if (r2.matched) {
        acc1 = r2.value;
        pos = r2.position;
      } else {
        loop = false;
      }
    } while (loop);
    return {
      matched: true,
      position: pos,
      value: acc1
    };
  };
}
function reduceLeft(acc, p, reducer) {
  return chainReduce(acc, (acc2) => map(p, (v2, data, i, j3) => reducer(acc2, v2, data, i, j3)));
}
function leftAssoc2(pLeft, pOper, pRight) {
  return chain(pLeft, (v0) => reduceLeft(v0, ab(pOper, pRight, (f, y2) => [f, y2]), (acc, [f, y2]) => f(acc, y2)));
}
function chain(p, f) {
  return (data, i) => mapOuter(p(data, i), (m1) => f(m1.value, data, i, m1.position)(data, m1.position));
}

// node_modules/parseley/lib/parseley.mjs
var ws = `(?:[ \\t\\r\\n\\f]*)`;
var nl = `(?:\\n|\\r\\n|\\r|\\f)`;
var nonascii = `[^\\x00-\\x7F]`;
var unicode = `(?:\\\\[0-9a-f]{1,6}(?:\\r\\n|[ \\n\\r\\t\\f])?)`;
var escape = `(?:\\\\[^\\n\\r\\f0-9a-f])`;
var nmstart = `(?:[_a-z]|${nonascii}|${unicode}|${escape})`;
var nmchar = `(?:[_a-z0-9-]|${nonascii}|${unicode}|${escape})`;
var name = `(?:${nmchar}+)`;
var ident = `(?:[-]?${nmstart}${nmchar}*)`;
var string1 = `'([^\\n\\r\\f\\\\']|\\\\${nl}|${nonascii}|${unicode}|${escape})*'`;
var string2 = `"([^\\n\\r\\f\\\\"]|\\\\${nl}|${nonascii}|${unicode}|${escape})*"`;
var lexSelector = o([
  { name: "ws", regex: new RegExp(ws) },
  { name: "hash", regex: new RegExp(`#${name}`, "i") },
  { name: "ident", regex: new RegExp(ident, "i") },
  { name: "str1", regex: new RegExp(string1, "i") },
  { name: "str2", regex: new RegExp(string2, "i") },
  { name: "*" },
  { name: "." },
  { name: "," },
  { name: "[" },
  { name: "]" },
  { name: "=" },
  { name: ">" },
  { name: "|" },
  { name: "+" },
  { name: "~" },
  { name: "^" },
  { name: "$" }
]);
var lexEscapedString = o([
  { name: "unicode", regex: new RegExp(unicode, "i") },
  { name: "escape", regex: new RegExp(escape, "i") },
  { name: "any", regex: new RegExp("[\\s\\S]", "i") }
]);
function sumSpec([a0, a1, a2], [b0, b1, b22]) {
  return [a0 + b0, a1 + b1, a2 + b22];
}
function sumAllSpec(ss2) {
  return ss2.reduce(sumSpec, [0, 0, 0]);
}
var unicodeEscapedSequence_ = token((t9) => t9.name === "unicode" ? String.fromCodePoint(parseInt(t9.text.slice(1), 16)) : void 0);
var escapedSequence_ = token((t9) => t9.name === "escape" ? t9.text.slice(1) : void 0);
var anyChar_ = token((t9) => t9.name === "any" ? t9.text : void 0);
var escapedString_ = map(many(choice(unicodeEscapedSequence_, escapedSequence_, anyChar_)), (cs2) => cs2.join(""));
function unescape(escapedString) {
  const lexerResult = lexEscapedString(escapedString);
  const result = escapedString_({ tokens: lexerResult.tokens, options: void 0 }, 0);
  return result.value;
}
function literal(name2) {
  return token((t9) => t9.name === name2 ? true : void 0);
}
var whitespace_ = token((t9) => t9.name === "ws" ? null : void 0);
var optionalWhitespace_ = option(whitespace_, null);
function optionallySpaced(parser) {
  return middle(optionalWhitespace_, parser, optionalWhitespace_);
}
var identifier_ = token((t9) => t9.name === "ident" ? unescape(t9.text) : void 0);
var hashId_ = token((t9) => t9.name === "hash" ? unescape(t9.text.slice(1)) : void 0);
var string_ = token((t9) => t9.name.startsWith("str") ? unescape(t9.text.slice(1, -1)) : void 0);
var namespace_ = left(option(identifier_, ""), literal("|"));
var qualifiedName_ = otherwise(ab(namespace_, identifier_, (ns2, name2) => ({ name: name2, namespace: ns2 })), map(identifier_, (name2) => ({ name: name2, namespace: null })));
var uniSelector_ = otherwise(ab(namespace_, literal("*"), (ns2) => ({ type: "universal", namespace: ns2, specificity: [0, 0, 0] })), map(literal("*"), () => ({ type: "universal", namespace: null, specificity: [0, 0, 0] })));
var tagSelector_ = map(qualifiedName_, ({ name: name2, namespace }) => ({
  type: "tag",
  name: name2,
  namespace,
  specificity: [0, 0, 1]
}));
var classSelector_ = ab(literal("."), identifier_, (fullstop, name2) => ({
  type: "class",
  name: name2,
  specificity: [0, 1, 0]
}));
var idSelector_ = map(hashId_, (name2) => ({
  type: "id",
  name: name2,
  specificity: [1, 0, 0]
}));
var attrModifier_ = token((t9) => {
  if (t9.name === "ident") {
    if (t9.text === "i" || t9.text === "I") {
      return "i";
    }
    if (t9.text === "s" || t9.text === "S") {
      return "s";
    }
  }
  return void 0;
});
var attrValue_ = otherwise(ab(string_, option(right(optionalWhitespace_, attrModifier_), null), (v2, mod) => ({ value: v2, modifier: mod })), ab(identifier_, option(right(whitespace_, attrModifier_), null), (v2, mod) => ({ value: v2, modifier: mod })));
var attrMatcher_ = choice(map(literal("="), () => "="), ab(literal("~"), literal("="), () => "~="), ab(literal("|"), literal("="), () => "|="), ab(literal("^"), literal("="), () => "^="), ab(literal("$"), literal("="), () => "$="), ab(literal("*"), literal("="), () => "*="));
var attrPresenceSelector_ = abc(literal("["), optionallySpaced(qualifiedName_), literal("]"), (lbr, { name: name2, namespace }) => ({
  type: "attrPresence",
  name: name2,
  namespace,
  specificity: [0, 1, 0]
}));
var attrValueSelector_ = middle(literal("["), abc(optionallySpaced(qualifiedName_), attrMatcher_, optionallySpaced(attrValue_), ({ name: name2, namespace }, matcher, { value, modifier }) => ({
  type: "attrValue",
  name: name2,
  namespace,
  matcher,
  value,
  modifier,
  specificity: [0, 1, 0]
})), literal("]"));
var attrSelector_ = otherwise(attrPresenceSelector_, attrValueSelector_);
var typeSelector_ = otherwise(uniSelector_, tagSelector_);
var subclassSelector_ = choice(idSelector_, classSelector_, attrSelector_);
var compoundSelector_ = map(otherwise(flatten(typeSelector_, many(subclassSelector_)), many1(subclassSelector_)), (ss2) => {
  return {
    type: "compound",
    list: ss2,
    specificity: sumAllSpec(ss2.map((s2) => s2.specificity))
  };
});
var combinator_ = choice(map(literal(">"), () => ">"), map(literal("+"), () => "+"), map(literal("~"), () => "~"), ab(literal("|"), literal("|"), () => "||"));
var combinatorSeparator_ = otherwise(optionallySpaced(combinator_), map(whitespace_, () => " "));
var complexSelector_ = leftAssoc2(compoundSelector_, map(combinatorSeparator_, (c2) => (left2, right2) => ({
  type: "compound",
  list: [...right2.list, { type: "combinator", combinator: c2, left: left2, specificity: left2.specificity }],
  specificity: sumSpec(left2.specificity, right2.specificity)
})), compoundSelector_);
var listSelector_ = leftAssoc2(map(complexSelector_, (s2) => ({ type: "list", list: [s2] })), map(optionallySpaced(literal(",")), () => (acc, next2) => ({ type: "list", list: [...acc.list, next2] })), complexSelector_);
function parse_(parser, str) {
  if (!(typeof str === "string" || str instanceof String)) {
    throw new Error("Expected a selector string. Actual input is not a string!");
  }
  const lexerResult = lexSelector(str);
  if (!lexerResult.complete) {
    throw new Error(`The input "${str}" was only partially tokenized, stopped at offset ${lexerResult.offset}!
` + prettyPrintPosition(str, lexerResult.offset));
  }
  const result = optionallySpaced(parser)({ tokens: lexerResult.tokens, options: void 0 }, 0);
  if (!result.matched) {
    throw new Error(`No match for "${str}" input!`);
  }
  if (result.position < lexerResult.tokens.length) {
    const token2 = lexerResult.tokens[result.position];
    throw new Error(`The input "${str}" was only partially parsed, stopped at offset ${token2.offset}!
` + prettyPrintPosition(str, token2.offset, token2.len));
  }
  return result.value;
}
function prettyPrintPosition(str, offset, len = 1) {
  return `${str.replace(/(\t)|(\r)|(\n)/g, (m2, t9, r2) => t9 ? "\u2409" : r2 ? "\u240D" : "\u240A")}
${"".padEnd(offset)}${"^".repeat(len)}`;
}
function parse1(str) {
  return parse_(complexSelector_, str);
}
function serialize(selector) {
  if (!selector.type) {
    throw new Error("This is not an AST node.");
  }
  switch (selector.type) {
    case "universal":
      return _serNs(selector.namespace) + "*";
    case "tag":
      return _serNs(selector.namespace) + _serIdent(selector.name);
    case "class":
      return "." + _serIdent(selector.name);
    case "id":
      return "#" + _serIdent(selector.name);
    case "attrPresence":
      return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}]`;
    case "attrValue":
      return `[${_serNs(selector.namespace)}${_serIdent(selector.name)}${selector.matcher}"${_serStr(selector.value)}"${selector.modifier ? selector.modifier : ""}]`;
    case "combinator":
      return serialize(selector.left) + selector.combinator;
    case "compound":
      return selector.list.reduce((acc, node) => {
        if (node.type === "combinator") {
          return serialize(node) + acc;
        } else {
          return acc + serialize(node);
        }
      }, "");
    case "list":
      return selector.list.map(serialize).join(",");
  }
}
function _serNs(ns2) {
  return ns2 || ns2 === "" ? _serIdent(ns2) + "|" : "";
}
function _codePoint(char) {
  return `\\${char.codePointAt(0).toString(16)} `;
}
function _serIdent(str) {
  return str.replace(
    /(^[0-9])|(^-[0-9])|(^-$)|([-0-9a-zA-Z_]|[^\x00-\x7F])|(\x00)|([\x01-\x1f]|\x7f)|([\s\S])/g,
    (m2, d1, d2, hy, safe, nl2, ctrl, other) => d1 ? _codePoint(d1) : d2 ? "-" + _codePoint(d2.slice(1)) : hy ? "\\-" : safe ? safe : nl2 ? "\uFFFD" : ctrl ? _codePoint(ctrl) : "\\" + other
  );
}
function _serStr(str) {
  return str.replace(
    /(")|(\\)|(\x00)|([\x01-\x1f]|\x7f)/g,
    (m2, dq, bs2, nl2, ctrl) => dq ? '\\"' : bs2 ? "\\\\" : nl2 ? "\uFFFD" : _codePoint(ctrl)
  );
}
function normalize(selector) {
  if (!selector.type) {
    throw new Error("This is not an AST node.");
  }
  switch (selector.type) {
    case "compound": {
      selector.list.forEach(normalize);
      selector.list.sort((a, b3) => _compareArrays(_getSelectorPriority(a), _getSelectorPriority(b3)));
      break;
    }
    case "combinator": {
      normalize(selector.left);
      break;
    }
    case "list": {
      selector.list.forEach(normalize);
      selector.list.sort((a, b3) => serialize(a) < serialize(b3) ? -1 : 1);
      break;
    }
  }
  return selector;
}
function _getSelectorPriority(selector) {
  switch (selector.type) {
    case "universal":
      return [1];
    case "tag":
      return [1];
    case "id":
      return [2];
    case "class":
      return [3, selector.name];
    case "attrPresence":
      return [4, serialize(selector)];
    case "attrValue":
      return [5, serialize(selector)];
    case "combinator":
      return [15, serialize(selector)];
  }
}
function compareSpecificity(a, b3) {
  return _compareArrays(a, b3);
}
function _compareArrays(a, b3) {
  if (!Array.isArray(a) || !Array.isArray(b3)) {
    throw new Error("Arguments must be arrays.");
  }
  const shorter = a.length < b3.length ? a.length : b3.length;
  for (let i = 0; i < shorter; i++) {
    if (a[i] === b3[i]) {
      continue;
    }
    return a[i] < b3[i] ? -1 : 1;
  }
  return a.length - b3.length;
}

// node_modules/selderee/lib/selderee.mjs
var DecisionTree = class {
  constructor(input) {
    this.branches = weave(toAstTerminalPairs(input));
  }
  build(builder) {
    return builder(this.branches);
  }
};
function toAstTerminalPairs(array) {
  const len = array.length;
  const results = new Array(len);
  for (let i = 0; i < len; i++) {
    const [selectorString, val] = array[i];
    const ast = preprocess(parse1(selectorString));
    results[i] = {
      ast,
      terminal: {
        type: "terminal",
        valueContainer: { index: i, value: val, specificity: ast.specificity }
      }
    };
  }
  return results;
}
function preprocess(ast) {
  reduceSelectorVariants(ast);
  normalize(ast);
  return ast;
}
function reduceSelectorVariants(ast) {
  const newList = [];
  ast.list.forEach((sel) => {
    switch (sel.type) {
      case "class":
        newList.push({
          matcher: "~=",
          modifier: null,
          name: "class",
          namespace: null,
          specificity: sel.specificity,
          type: "attrValue",
          value: sel.name
        });
        break;
      case "id":
        newList.push({
          matcher: "=",
          modifier: null,
          name: "id",
          namespace: null,
          specificity: sel.specificity,
          type: "attrValue",
          value: sel.name
        });
        break;
      case "combinator":
        reduceSelectorVariants(sel.left);
        newList.push(sel);
        break;
      case "universal":
        break;
      default:
        newList.push(sel);
        break;
    }
  });
  ast.list = newList;
}
function weave(items) {
  const branches = [];
  while (items.length) {
    const topKind = findTopKey(items, (sel) => true, getSelectorKind);
    const { matches, nonmatches, empty } = breakByKind(items, topKind);
    items = nonmatches;
    if (matches.length) {
      branches.push(branchOfKind(topKind, matches));
    }
    if (empty.length) {
      branches.push(...terminate(empty));
    }
  }
  return branches;
}
function terminate(items) {
  const results = [];
  for (const item of items) {
    const terminal = item.terminal;
    if (terminal.type === "terminal") {
      results.push(terminal);
    } else {
      const { matches, rest } = partition(terminal.cont, (node) => node.type === "terminal");
      matches.forEach((node) => results.push(node));
      if (rest.length) {
        terminal.cont = rest;
        results.push(terminal);
      }
    }
  }
  return results;
}
function breakByKind(items, selectedKind) {
  const matches = [];
  const nonmatches = [];
  const empty = [];
  for (const item of items) {
    const simpsels = item.ast.list;
    if (simpsels.length) {
      const isMatch = simpsels.some((node) => getSelectorKind(node) === selectedKind);
      (isMatch ? matches : nonmatches).push(item);
    } else {
      empty.push(item);
    }
  }
  return { matches, nonmatches, empty };
}
function getSelectorKind(sel) {
  switch (sel.type) {
    case "attrPresence":
      return `attrPresence ${sel.name}`;
    case "attrValue":
      return `attrValue ${sel.name}`;
    case "combinator":
      return `combinator ${sel.combinator}`;
    default:
      return sel.type;
  }
}
function branchOfKind(kind, items) {
  if (kind === "tag") {
    return tagNameBranch(items);
  }
  if (kind.startsWith("attrValue ")) {
    return attrValueBranch(kind.substring(10), items);
  }
  if (kind.startsWith("attrPresence ")) {
    return attrPresenceBranch(kind.substring(13), items);
  }
  if (kind === "combinator >") {
    return combinatorBranch(">", items);
  }
  if (kind === "combinator +") {
    return combinatorBranch("+", items);
  }
  throw new Error(`Unsupported selector kind: ${kind}`);
}
function tagNameBranch(items) {
  const groups = spliceAndGroup(items, (x2) => x2.type === "tag", (x2) => x2.name);
  const variants = Object.entries(groups).map(([name2, group]) => ({
    type: "variant",
    value: name2,
    cont: weave(group.items)
  }));
  return {
    type: "tagName",
    variants
  };
}
function attrPresenceBranch(name2, items) {
  for (const item of items) {
    spliceSimpleSelector(item, (x2) => x2.type === "attrPresence" && x2.name === name2);
  }
  return {
    type: "attrPresence",
    name: name2,
    cont: weave(items)
  };
}
function attrValueBranch(name2, items) {
  const groups = spliceAndGroup(items, (x2) => x2.type === "attrValue" && x2.name === name2, (x2) => `${x2.matcher} ${x2.modifier || ""} ${x2.value}`);
  const matchers = [];
  for (const group of Object.values(groups)) {
    const sel = group.oneSimpleSelector;
    const predicate = getAttrPredicate(sel);
    const continuation = weave(group.items);
    matchers.push({
      type: "matcher",
      matcher: sel.matcher,
      modifier: sel.modifier,
      value: sel.value,
      predicate,
      cont: continuation
    });
  }
  return {
    type: "attrValue",
    name: name2,
    matchers
  };
}
function getAttrPredicate(sel) {
  if (sel.modifier === "i") {
    const expected = sel.value.toLowerCase();
    switch (sel.matcher) {
      case "=":
        return (actual) => expected === actual.toLowerCase();
      case "~=":
        return (actual) => actual.toLowerCase().split(/[ \t]+/).includes(expected);
      case "^=":
        return (actual) => actual.toLowerCase().startsWith(expected);
      case "$=":
        return (actual) => actual.toLowerCase().endsWith(expected);
      case "*=":
        return (actual) => actual.toLowerCase().includes(expected);
      case "|=":
        return (actual) => {
          const lower = actual.toLowerCase();
          return expected === lower || lower.startsWith(expected) && lower[expected.length] === "-";
        };
    }
  } else {
    const expected = sel.value;
    switch (sel.matcher) {
      case "=":
        return (actual) => expected === actual;
      case "~=":
        return (actual) => actual.split(/[ \t]+/).includes(expected);
      case "^=":
        return (actual) => actual.startsWith(expected);
      case "$=":
        return (actual) => actual.endsWith(expected);
      case "*=":
        return (actual) => actual.includes(expected);
      case "|=":
        return (actual) => expected === actual || actual.startsWith(expected) && actual[expected.length] === "-";
    }
  }
}
function combinatorBranch(combinator, items) {
  const groups = spliceAndGroup(items, (x2) => x2.type === "combinator" && x2.combinator === combinator, (x2) => serialize(x2.left));
  const leftItems = [];
  for (const group of Object.values(groups)) {
    const rightCont = weave(group.items);
    const leftAst = group.oneSimpleSelector.left;
    leftItems.push({
      ast: leftAst,
      terminal: { type: "popElement", cont: rightCont }
    });
  }
  return {
    type: "pushElement",
    combinator,
    cont: weave(leftItems)
  };
}
function spliceAndGroup(items, predicate, keyCallback) {
  const groups = {};
  while (items.length) {
    const bestKey = findTopKey(items, predicate, keyCallback);
    const bestKeyPredicate = (sel) => predicate(sel) && keyCallback(sel) === bestKey;
    const hasBestKeyPredicate = (item) => item.ast.list.some(bestKeyPredicate);
    const { matches, rest } = partition1(items, hasBestKeyPredicate);
    let oneSimpleSelector = null;
    for (const item of matches) {
      const splicedNode = spliceSimpleSelector(item, bestKeyPredicate);
      if (!oneSimpleSelector) {
        oneSimpleSelector = splicedNode;
      }
    }
    if (oneSimpleSelector == null) {
      throw new Error("No simple selector is found.");
    }
    groups[bestKey] = { oneSimpleSelector, items: matches };
    items = rest;
  }
  return groups;
}
function spliceSimpleSelector(item, predicate) {
  const simpsels = item.ast.list;
  const matches = new Array(simpsels.length);
  let firstIndex = -1;
  for (let i = simpsels.length; i-- > 0; ) {
    if (predicate(simpsels[i])) {
      matches[i] = true;
      firstIndex = i;
    }
  }
  if (firstIndex == -1) {
    throw new Error(`Couldn't find the required simple selector.`);
  }
  const result = simpsels[firstIndex];
  item.ast.list = simpsels.filter((sel, i) => !matches[i]);
  return result;
}
function findTopKey(items, predicate, keyCallback) {
  const candidates = {};
  for (const item of items) {
    const candidates1 = {};
    for (const node of item.ast.list.filter(predicate)) {
      candidates1[keyCallback(node)] = true;
    }
    for (const key of Object.keys(candidates1)) {
      if (candidates[key]) {
        candidates[key]++;
      } else {
        candidates[key] = 1;
      }
    }
  }
  let topKind = "";
  let topCounter = 0;
  for (const entry of Object.entries(candidates)) {
    if (entry[1] > topCounter) {
      topKind = entry[0];
      topCounter = entry[1];
    }
  }
  return topKind;
}
function partition(src, predicate) {
  const matches = [];
  const rest = [];
  for (const x2 of src) {
    if (predicate(x2)) {
      matches.push(x2);
    } else {
      rest.push(x2);
    }
  }
  return { matches, rest };
}
function partition1(src, predicate) {
  const matches = [];
  const rest = [];
  for (const x2 of src) {
    if (predicate(x2)) {
      matches.push(x2);
    } else {
      rest.push(x2);
    }
  }
  return { matches, rest };
}
var Picker = class {
  constructor(f) {
    this.f = f;
  }
  pickAll(el) {
    return this.f(el);
  }
  pick1(el, preferFirst = false) {
    const results = this.f(el);
    const len = results.length;
    if (len === 0) {
      return null;
    }
    if (len === 1) {
      return results[0].value;
    }
    const comparator = preferFirst ? comparatorPreferFirst : comparatorPreferLast;
    let result = results[0];
    for (let i = 1; i < len; i++) {
      const next2 = results[i];
      if (comparator(result, next2)) {
        result = next2;
      }
    }
    return result.value;
  }
};
function comparatorPreferFirst(acc, next2) {
  const diff = compareSpecificity(next2.specificity, acc.specificity);
  return diff > 0 || diff === 0 && next2.index < acc.index;
}
function comparatorPreferLast(acc, next2) {
  const diff = compareSpecificity(next2.specificity, acc.specificity);
  return diff > 0 || diff === 0 && next2.index > acc.index;
}

// node_modules/@selderee/plugin-htmlparser2/lib/hp2-builder.mjs
function hp2Builder(nodes) {
  return new Picker(handleArray(nodes));
}
function handleArray(nodes) {
  const matchers = nodes.map(handleNode);
  return (el, ...tail) => matchers.flatMap((m2) => m2(el, ...tail));
}
function handleNode(node) {
  switch (node.type) {
    case "terminal": {
      const result = [node.valueContainer];
      return (el, ...tail) => result;
    }
    case "tagName":
      return handleTagName(node);
    case "attrValue":
      return handleAttrValueName(node);
    case "attrPresence":
      return handleAttrPresenceName(node);
    case "pushElement":
      return handlePushElementNode(node);
    case "popElement":
      return handlePopElementNode(node);
  }
}
function handleTagName(node) {
  const variants = {};
  for (const variant of node.variants) {
    variants[variant.value] = handleArray(variant.cont);
  }
  return (el, ...tail) => {
    const continuation = variants[el.name];
    return continuation ? continuation(el, ...tail) : [];
  };
}
function handleAttrPresenceName(node) {
  const attrName = node.name;
  const continuation = handleArray(node.cont);
  return (el, ...tail) => Object.prototype.hasOwnProperty.call(el.attribs, attrName) ? continuation(el, ...tail) : [];
}
function handleAttrValueName(node) {
  const callbacks = [];
  for (const matcher of node.matchers) {
    const predicate = matcher.predicate;
    const continuation = handleArray(matcher.cont);
    callbacks.push((attr, el, ...tail) => predicate(attr) ? continuation(el, ...tail) : []);
  }
  const attrName = node.name;
  return (el, ...tail) => {
    const attr = el.attribs[attrName];
    return attr || attr === "" ? callbacks.flatMap((cb) => cb(attr, el, ...tail)) : [];
  };
}
function handlePushElementNode(node) {
  const continuation = handleArray(node.cont);
  const leftElementGetter = node.combinator === "+" ? getPrecedingElement : getParentElement;
  return (el, ...tail) => {
    const next2 = leftElementGetter(el);
    if (next2 === null) {
      return [];
    }
    return continuation(next2, el, ...tail);
  };
}
var getPrecedingElement = (el) => {
  const prev = el.prev;
  if (prev === null) {
    return null;
  }
  return isTag2(prev) ? prev : getPrecedingElement(prev);
};
var getParentElement = (el) => {
  const parent = el.parent;
  return parent && isTag2(parent) ? parent : null;
};
function handlePopElementNode(node) {
  const continuation = handleArray(node.cont);
  return (el, next2, ...tail) => continuation(next2, ...tail);
}

// node_modules/entities/lib/esm/generated/decode-data-html.js
var decode_data_html_default = new Uint16Array(
  // prettier-ignore
  '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c2) => c2.charCodeAt(0))
);

// node_modules/entities/lib/esm/generated/decode-data-xml.js
var decode_data_xml_default = new Uint16Array(
  // prettier-ignore
  "\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map((c2) => c2.charCodeAt(0))
);

// node_modules/entities/lib/esm/decode_codepoint.js
var _a;
var decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (_a = String.fromCodePoint) !== null && _a !== void 0 ? _a : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint(codePoint) {
  var _a3;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a3 = decodeMap.get(codePoint)) !== null && _a3 !== void 0 ? _a3 : codePoint;
}

// node_modules/entities/lib/esm/decode.js
var CharCodes;
(function(CharCodes3) {
  CharCodes3[CharCodes3["NUM"] = 35] = "NUM";
  CharCodes3[CharCodes3["SEMI"] = 59] = "SEMI";
  CharCodes3[CharCodes3["EQUALS"] = 61] = "EQUALS";
  CharCodes3[CharCodes3["ZERO"] = 48] = "ZERO";
  CharCodes3[CharCodes3["NINE"] = 57] = "NINE";
  CharCodes3[CharCodes3["LOWER_A"] = 97] = "LOWER_A";
  CharCodes3[CharCodes3["LOWER_F"] = 102] = "LOWER_F";
  CharCodes3[CharCodes3["LOWER_X"] = 120] = "LOWER_X";
  CharCodes3[CharCodes3["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes3[CharCodes3["UPPER_A"] = 65] = "UPPER_A";
  CharCodes3[CharCodes3["UPPER_F"] = 70] = "UPPER_F";
  CharCodes3[CharCodes3["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
  return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
}
function isEntityInAttributeInvalidEnd(code) {
  return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder = class {
  constructor(decodeTree, emitCodePoint, errors) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(str, offset) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (str.charCodeAt(offset) === CharCodes.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(str, offset + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(str, offset);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(str, offset);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(str, offset);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(str, offset);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(str, offset);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(str, offset) {
    if (offset >= str.length) {
      return -1;
    }
    if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(str, offset + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(str, offset);
  }
  addToNumericResult(str, start, end, base) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber(char) || isHexadecimalCharacter(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(str, offset) {
    const startIdx = offset;
    while (offset < str.length) {
      const char = str.charCodeAt(offset);
      if (isNumber(char)) {
        offset += 1;
      } else {
        this.addToNumericResult(str, startIdx, offset, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(str, startIdx, offset, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a3;
    if (this.consumed <= expectedLength) {
      (_a3 = this.errors) === null || _a3 === void 0 ? void 0 : _a3.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(str, offset) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset < str.length; offset++, this.excess++) {
      const char = str.charCodeAt(offset);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a3;
    const { result, decodeTree } = this;
    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result, valueLength, this.consumed);
    (_a3 = this.errors) === null || _a3 === void 0 ? void 0 : _a3.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a3;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      // Otherwise, emit a numeric entity if we have one.
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a3 = this.errors) === null || _a3 === void 0 ? void 0 : _a3.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
};
function getDecoder(decodeTree) {
  let ret = "";
  const decoder2 = new EntityDecoder(decodeTree, (str) => ret += fromCodePoint(str));
  return function decodeWithTrie(str, decodeMode) {
    let lastIndex = 0;
    let offset = 0;
    while ((offset = str.indexOf("&", offset)) >= 0) {
      ret += str.slice(lastIndex, offset);
      decoder2.startEntity(decodeMode);
      const len = decoder2.write(
        str,
        // Skip the "&"
        offset + 1
      );
      if (len < 0) {
        lastIndex = offset + decoder2.end();
        break;
      }
      lastIndex = offset + len;
      offset = len === 0 ? lastIndex + 1 : lastIndex;
    }
    const result = ret + str.slice(lastIndex);
    ret = "";
    return result;
  };
}
function determineBranch(decodeTree, current, nodeIdx, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
  }
  let lo2 = nodeIdx;
  let hi3 = lo2 + branchCount - 1;
  while (lo2 <= hi3) {
    const mid = lo2 + hi3 >>> 1;
    const midVal = decodeTree[mid];
    if (midVal < char) {
      lo2 = mid + 1;
    } else if (midVal > char) {
      hi3 = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}
var htmlDecoder = getDecoder(decode_data_html_default);
var xmlDecoder = getDecoder(decode_data_xml_default);

// node_modules/htmlparser2/lib/esm/Tokenizer.js
var CharCodes2;
(function(CharCodes3) {
  CharCodes3[CharCodes3["Tab"] = 9] = "Tab";
  CharCodes3[CharCodes3["NewLine"] = 10] = "NewLine";
  CharCodes3[CharCodes3["FormFeed"] = 12] = "FormFeed";
  CharCodes3[CharCodes3["CarriageReturn"] = 13] = "CarriageReturn";
  CharCodes3[CharCodes3["Space"] = 32] = "Space";
  CharCodes3[CharCodes3["ExclamationMark"] = 33] = "ExclamationMark";
  CharCodes3[CharCodes3["Number"] = 35] = "Number";
  CharCodes3[CharCodes3["Amp"] = 38] = "Amp";
  CharCodes3[CharCodes3["SingleQuote"] = 39] = "SingleQuote";
  CharCodes3[CharCodes3["DoubleQuote"] = 34] = "DoubleQuote";
  CharCodes3[CharCodes3["Dash"] = 45] = "Dash";
  CharCodes3[CharCodes3["Slash"] = 47] = "Slash";
  CharCodes3[CharCodes3["Zero"] = 48] = "Zero";
  CharCodes3[CharCodes3["Nine"] = 57] = "Nine";
  CharCodes3[CharCodes3["Semi"] = 59] = "Semi";
  CharCodes3[CharCodes3["Lt"] = 60] = "Lt";
  CharCodes3[CharCodes3["Eq"] = 61] = "Eq";
  CharCodes3[CharCodes3["Gt"] = 62] = "Gt";
  CharCodes3[CharCodes3["Questionmark"] = 63] = "Questionmark";
  CharCodes3[CharCodes3["UpperA"] = 65] = "UpperA";
  CharCodes3[CharCodes3["LowerA"] = 97] = "LowerA";
  CharCodes3[CharCodes3["UpperF"] = 70] = "UpperF";
  CharCodes3[CharCodes3["LowerF"] = 102] = "LowerF";
  CharCodes3[CharCodes3["UpperZ"] = 90] = "UpperZ";
  CharCodes3[CharCodes3["LowerZ"] = 122] = "LowerZ";
  CharCodes3[CharCodes3["LowerX"] = 120] = "LowerX";
  CharCodes3[CharCodes3["OpeningSquareBracket"] = 91] = "OpeningSquareBracket";
})(CharCodes2 || (CharCodes2 = {}));
var State;
(function(State2) {
  State2[State2["Text"] = 1] = "Text";
  State2[State2["BeforeTagName"] = 2] = "BeforeTagName";
  State2[State2["InTagName"] = 3] = "InTagName";
  State2[State2["InSelfClosingTag"] = 4] = "InSelfClosingTag";
  State2[State2["BeforeClosingTagName"] = 5] = "BeforeClosingTagName";
  State2[State2["InClosingTagName"] = 6] = "InClosingTagName";
  State2[State2["AfterClosingTagName"] = 7] = "AfterClosingTagName";
  State2[State2["BeforeAttributeName"] = 8] = "BeforeAttributeName";
  State2[State2["InAttributeName"] = 9] = "InAttributeName";
  State2[State2["AfterAttributeName"] = 10] = "AfterAttributeName";
  State2[State2["BeforeAttributeValue"] = 11] = "BeforeAttributeValue";
  State2[State2["InAttributeValueDq"] = 12] = "InAttributeValueDq";
  State2[State2["InAttributeValueSq"] = 13] = "InAttributeValueSq";
  State2[State2["InAttributeValueNq"] = 14] = "InAttributeValueNq";
  State2[State2["BeforeDeclaration"] = 15] = "BeforeDeclaration";
  State2[State2["InDeclaration"] = 16] = "InDeclaration";
  State2[State2["InProcessingInstruction"] = 17] = "InProcessingInstruction";
  State2[State2["BeforeComment"] = 18] = "BeforeComment";
  State2[State2["CDATASequence"] = 19] = "CDATASequence";
  State2[State2["InSpecialComment"] = 20] = "InSpecialComment";
  State2[State2["InCommentLike"] = 21] = "InCommentLike";
  State2[State2["BeforeSpecialS"] = 22] = "BeforeSpecialS";
  State2[State2["SpecialStartSequence"] = 23] = "SpecialStartSequence";
  State2[State2["InSpecialTag"] = 24] = "InSpecialTag";
  State2[State2["BeforeEntity"] = 25] = "BeforeEntity";
  State2[State2["BeforeNumericEntity"] = 26] = "BeforeNumericEntity";
  State2[State2["InNamedEntity"] = 27] = "InNamedEntity";
  State2[State2["InNumericEntity"] = 28] = "InNumericEntity";
  State2[State2["InHexEntity"] = 29] = "InHexEntity";
})(State || (State = {}));
function isWhitespace(c2) {
  return c2 === CharCodes2.Space || c2 === CharCodes2.NewLine || c2 === CharCodes2.Tab || c2 === CharCodes2.FormFeed || c2 === CharCodes2.CarriageReturn;
}
function isEndOfTagSection(c2) {
  return c2 === CharCodes2.Slash || c2 === CharCodes2.Gt || isWhitespace(c2);
}
function isNumber2(c2) {
  return c2 >= CharCodes2.Zero && c2 <= CharCodes2.Nine;
}
function isASCIIAlpha(c2) {
  return c2 >= CharCodes2.LowerA && c2 <= CharCodes2.LowerZ || c2 >= CharCodes2.UpperA && c2 <= CharCodes2.UpperZ;
}
function isHexDigit(c2) {
  return c2 >= CharCodes2.UpperA && c2 <= CharCodes2.UpperF || c2 >= CharCodes2.LowerA && c2 <= CharCodes2.LowerF;
}
var QuoteType;
(function(QuoteType2) {
  QuoteType2[QuoteType2["NoValue"] = 0] = "NoValue";
  QuoteType2[QuoteType2["Unquoted"] = 1] = "Unquoted";
  QuoteType2[QuoteType2["Single"] = 2] = "Single";
  QuoteType2[QuoteType2["Double"] = 3] = "Double";
})(QuoteType || (QuoteType = {}));
var Sequences = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
  // `</title`
};
var Tokenizer = class {
  constructor({ xmlMode = false, decodeEntities = true }, cbs) {
    this.cbs = cbs;
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State.Text;
    this.isSpecial = false;
    this.running = true;
    this.offset = 0;
    this.currentSequence = void 0;
    this.sequenceIndex = 0;
    this.trieIndex = 0;
    this.trieCurrent = 0;
    this.entityResult = 0;
    this.entityExcess = 0;
    this.xmlMode = xmlMode;
    this.decodeEntities = decodeEntities;
    this.entityTrie = xmlMode ? decode_data_xml_default : decode_data_html_default;
  }
  reset() {
    this.state = State.Text;
    this.buffer = "";
    this.sectionStart = 0;
    this.index = 0;
    this.baseState = State.Text;
    this.currentSequence = void 0;
    this.running = true;
    this.offset = 0;
  }
  write(chunk) {
    this.offset += this.buffer.length;
    this.buffer = chunk;
    this.parse();
  }
  end() {
    if (this.running)
      this.finish();
  }
  pause() {
    this.running = false;
  }
  resume() {
    this.running = true;
    if (this.index < this.buffer.length + this.offset) {
      this.parse();
    }
  }
  /**
   * The current index within all of the written data.
   */
  getIndex() {
    return this.index;
  }
  /**
   * The start of the current section.
   */
  getSectionStart() {
    return this.sectionStart;
  }
  stateText(c2) {
    if (c2 === CharCodes2.Lt || !this.decodeEntities && this.fastForwardTo(CharCodes2.Lt)) {
      if (this.index > this.sectionStart) {
        this.cbs.ontext(this.sectionStart, this.index);
      }
      this.state = State.BeforeTagName;
      this.sectionStart = this.index;
    } else if (this.decodeEntities && c2 === CharCodes2.Amp) {
      this.state = State.BeforeEntity;
    }
  }
  stateSpecialStartSequence(c2) {
    const isEnd = this.sequenceIndex === this.currentSequence.length;
    const isMatch = isEnd ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      isEndOfTagSection(c2)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (c2 | 32) === this.currentSequence[this.sequenceIndex]
    );
    if (!isMatch) {
      this.isSpecial = false;
    } else if (!isEnd) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0;
    this.state = State.InTagName;
    this.stateInTagName(c2);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(c2) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (c2 === CharCodes2.Gt || isWhitespace(c2)) {
        const endOfText = this.index - this.currentSequence.length;
        if (this.sectionStart < endOfText) {
          const actualIndex = this.index;
          this.index = endOfText;
          this.cbs.ontext(this.sectionStart, endOfText);
          this.index = actualIndex;
        }
        this.isSpecial = false;
        this.sectionStart = endOfText + 2;
        this.stateInClosingTagName(c2);
        return;
      }
      this.sequenceIndex = 0;
    }
    if ((c2 | 32) === this.currentSequence[this.sequenceIndex]) {
      this.sequenceIndex += 1;
    } else if (this.sequenceIndex === 0) {
      if (this.currentSequence === Sequences.TitleEnd) {
        if (this.decodeEntities && c2 === CharCodes2.Amp) {
          this.state = State.BeforeEntity;
        }
      } else if (this.fastForwardTo(CharCodes2.Lt)) {
        this.sequenceIndex = 1;
      }
    } else {
      this.sequenceIndex = Number(c2 === CharCodes2.Lt);
    }
  }
  stateCDATASequence(c2) {
    if (c2 === Sequences.Cdata[this.sequenceIndex]) {
      if (++this.sequenceIndex === Sequences.Cdata.length) {
        this.state = State.InCommentLike;
        this.currentSequence = Sequences.CdataEnd;
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
      }
    } else {
      this.sequenceIndex = 0;
      this.state = State.InDeclaration;
      this.stateInDeclaration(c2);
    }
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(c2) {
    while (++this.index < this.buffer.length + this.offset) {
      if (this.buffer.charCodeAt(this.index - this.offset) === c2) {
        return true;
      }
    }
    this.index = this.buffer.length + this.offset - 1;
    return false;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(c2) {
    if (c2 === this.currentSequence[this.sequenceIndex]) {
      if (++this.sequenceIndex === this.currentSequence.length) {
        if (this.currentSequence === Sequences.CdataEnd) {
          this.cbs.oncdata(this.sectionStart, this.index, 2);
        } else {
          this.cbs.oncomment(this.sectionStart, this.index, 2);
        }
        this.sequenceIndex = 0;
        this.sectionStart = this.index + 1;
        this.state = State.Text;
      }
    } else if (this.sequenceIndex === 0) {
      if (this.fastForwardTo(this.currentSequence[0])) {
        this.sequenceIndex = 1;
      }
    } else if (c2 !== this.currentSequence[this.sequenceIndex - 1]) {
      this.sequenceIndex = 0;
    }
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(c2) {
    return this.xmlMode ? !isEndOfTagSection(c2) : isASCIIAlpha(c2);
  }
  startSpecial(sequence, offset) {
    this.isSpecial = true;
    this.currentSequence = sequence;
    this.sequenceIndex = offset;
    this.state = State.SpecialStartSequence;
  }
  stateBeforeTagName(c2) {
    if (c2 === CharCodes2.ExclamationMark) {
      this.state = State.BeforeDeclaration;
      this.sectionStart = this.index + 1;
    } else if (c2 === CharCodes2.Questionmark) {
      this.state = State.InProcessingInstruction;
      this.sectionStart = this.index + 1;
    } else if (this.isTagStartChar(c2)) {
      const lower = c2 | 32;
      this.sectionStart = this.index;
      if (!this.xmlMode && lower === Sequences.TitleEnd[2]) {
        this.startSpecial(Sequences.TitleEnd, 3);
      } else {
        this.state = !this.xmlMode && lower === Sequences.ScriptEnd[2] ? State.BeforeSpecialS : State.InTagName;
      }
    } else if (c2 === CharCodes2.Slash) {
      this.state = State.BeforeClosingTagName;
    } else {
      this.state = State.Text;
      this.stateText(c2);
    }
  }
  stateInTagName(c2) {
    if (isEndOfTagSection(c2)) {
      this.cbs.onopentagname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c2);
    }
  }
  stateBeforeClosingTagName(c2) {
    if (isWhitespace(c2)) {
    } else if (c2 === CharCodes2.Gt) {
      this.state = State.Text;
    } else {
      this.state = this.isTagStartChar(c2) ? State.InClosingTagName : State.InSpecialComment;
      this.sectionStart = this.index;
    }
  }
  stateInClosingTagName(c2) {
    if (c2 === CharCodes2.Gt || isWhitespace(c2)) {
      this.cbs.onclosetag(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.AfterClosingTagName;
      this.stateAfterClosingTagName(c2);
    }
  }
  stateAfterClosingTagName(c2) {
    if (c2 === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.state = State.Text;
      this.baseState = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeAttributeName(c2) {
    if (c2 === CharCodes2.Gt) {
      this.cbs.onopentagend(this.index);
      if (this.isSpecial) {
        this.state = State.InSpecialTag;
        this.sequenceIndex = 0;
      } else {
        this.state = State.Text;
      }
      this.baseState = this.state;
      this.sectionStart = this.index + 1;
    } else if (c2 === CharCodes2.Slash) {
      this.state = State.InSelfClosingTag;
    } else if (!isWhitespace(c2)) {
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateInSelfClosingTag(c2) {
    if (c2 === CharCodes2.Gt) {
      this.cbs.onselfclosingtag(this.index);
      this.state = State.Text;
      this.baseState = State.Text;
      this.sectionStart = this.index + 1;
      this.isSpecial = false;
    } else if (!isWhitespace(c2)) {
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c2);
    }
  }
  stateInAttributeName(c2) {
    if (c2 === CharCodes2.Eq || isEndOfTagSection(c2)) {
      this.cbs.onattribname(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.state = State.AfterAttributeName;
      this.stateAfterAttributeName(c2);
    }
  }
  stateAfterAttributeName(c2) {
    if (c2 === CharCodes2.Eq) {
      this.state = State.BeforeAttributeValue;
    } else if (c2 === CharCodes2.Slash || c2 === CharCodes2.Gt) {
      this.cbs.onattribend(QuoteType.NoValue, this.index);
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c2);
    } else if (!isWhitespace(c2)) {
      this.cbs.onattribend(QuoteType.NoValue, this.index);
      this.state = State.InAttributeName;
      this.sectionStart = this.index;
    }
  }
  stateBeforeAttributeValue(c2) {
    if (c2 === CharCodes2.DoubleQuote) {
      this.state = State.InAttributeValueDq;
      this.sectionStart = this.index + 1;
    } else if (c2 === CharCodes2.SingleQuote) {
      this.state = State.InAttributeValueSq;
      this.sectionStart = this.index + 1;
    } else if (!isWhitespace(c2)) {
      this.sectionStart = this.index;
      this.state = State.InAttributeValueNq;
      this.stateInAttributeValueNoQuotes(c2);
    }
  }
  handleInAttributeValue(c2, quote) {
    if (c2 === quote || !this.decodeEntities && this.fastForwardTo(quote)) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(quote === CharCodes2.DoubleQuote ? QuoteType.Double : QuoteType.Single, this.index);
      this.state = State.BeforeAttributeName;
    } else if (this.decodeEntities && c2 === CharCodes2.Amp) {
      this.baseState = this.state;
      this.state = State.BeforeEntity;
    }
  }
  stateInAttributeValueDoubleQuotes(c2) {
    this.handleInAttributeValue(c2, CharCodes2.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(c2) {
    this.handleInAttributeValue(c2, CharCodes2.SingleQuote);
  }
  stateInAttributeValueNoQuotes(c2) {
    if (isWhitespace(c2) || c2 === CharCodes2.Gt) {
      this.cbs.onattribdata(this.sectionStart, this.index);
      this.sectionStart = -1;
      this.cbs.onattribend(QuoteType.Unquoted, this.index);
      this.state = State.BeforeAttributeName;
      this.stateBeforeAttributeName(c2);
    } else if (this.decodeEntities && c2 === CharCodes2.Amp) {
      this.baseState = this.state;
      this.state = State.BeforeEntity;
    }
  }
  stateBeforeDeclaration(c2) {
    if (c2 === CharCodes2.OpeningSquareBracket) {
      this.state = State.CDATASequence;
      this.sequenceIndex = 0;
    } else {
      this.state = c2 === CharCodes2.Dash ? State.BeforeComment : State.InDeclaration;
    }
  }
  stateInDeclaration(c2) {
    if (c2 === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.cbs.ondeclaration(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateInProcessingInstruction(c2) {
    if (c2 === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.cbs.onprocessinginstruction(this.sectionStart, this.index);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeComment(c2) {
    if (c2 === CharCodes2.Dash) {
      this.state = State.InCommentLike;
      this.currentSequence = Sequences.CommentEnd;
      this.sequenceIndex = 2;
      this.sectionStart = this.index + 1;
    } else {
      this.state = State.InDeclaration;
    }
  }
  stateInSpecialComment(c2) {
    if (c2 === CharCodes2.Gt || this.fastForwardTo(CharCodes2.Gt)) {
      this.cbs.oncomment(this.sectionStart, this.index, 0);
      this.state = State.Text;
      this.sectionStart = this.index + 1;
    }
  }
  stateBeforeSpecialS(c2) {
    const lower = c2 | 32;
    if (lower === Sequences.ScriptEnd[3]) {
      this.startSpecial(Sequences.ScriptEnd, 4);
    } else if (lower === Sequences.StyleEnd[3]) {
      this.startSpecial(Sequences.StyleEnd, 4);
    } else {
      this.state = State.InTagName;
      this.stateInTagName(c2);
    }
  }
  stateBeforeEntity(c2) {
    this.entityExcess = 1;
    this.entityResult = 0;
    if (c2 === CharCodes2.Number) {
      this.state = State.BeforeNumericEntity;
    } else if (c2 === CharCodes2.Amp) {
    } else {
      this.trieIndex = 0;
      this.trieCurrent = this.entityTrie[0];
      this.state = State.InNamedEntity;
      this.stateInNamedEntity(c2);
    }
  }
  stateInNamedEntity(c2) {
    this.entityExcess += 1;
    this.trieIndex = determineBranch(this.entityTrie, this.trieCurrent, this.trieIndex + 1, c2);
    if (this.trieIndex < 0) {
      this.emitNamedEntity();
      this.index--;
      return;
    }
    this.trieCurrent = this.entityTrie[this.trieIndex];
    const masked = this.trieCurrent & BinTrieFlags.VALUE_LENGTH;
    if (masked) {
      const valueLength = (masked >> 14) - 1;
      if (!this.allowLegacyEntity() && c2 !== CharCodes2.Semi) {
        this.trieIndex += valueLength;
      } else {
        const entityStart = this.index - this.entityExcess + 1;
        if (entityStart > this.sectionStart) {
          this.emitPartial(this.sectionStart, entityStart);
        }
        this.entityResult = this.trieIndex;
        this.trieIndex += valueLength;
        this.entityExcess = 0;
        this.sectionStart = this.index + 1;
        if (valueLength === 0) {
          this.emitNamedEntity();
        }
      }
    }
  }
  emitNamedEntity() {
    this.state = this.baseState;
    if (this.entityResult === 0) {
      return;
    }
    const valueLength = (this.entityTrie[this.entityResult] & BinTrieFlags.VALUE_LENGTH) >> 14;
    switch (valueLength) {
      case 1: {
        this.emitCodePoint(this.entityTrie[this.entityResult] & ~BinTrieFlags.VALUE_LENGTH);
        break;
      }
      case 2: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        break;
      }
      case 3: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
      }
    }
  }
  stateBeforeNumericEntity(c2) {
    if ((c2 | 32) === CharCodes2.LowerX) {
      this.entityExcess++;
      this.state = State.InHexEntity;
    } else {
      this.state = State.InNumericEntity;
      this.stateInNumericEntity(c2);
    }
  }
  emitNumericEntity(strict) {
    const entityStart = this.index - this.entityExcess - 1;
    const numberStart = entityStart + 2 + Number(this.state === State.InHexEntity);
    if (numberStart !== this.index) {
      if (entityStart > this.sectionStart) {
        this.emitPartial(this.sectionStart, entityStart);
      }
      this.sectionStart = this.index + Number(strict);
      this.emitCodePoint(replaceCodePoint(this.entityResult));
    }
    this.state = this.baseState;
  }
  stateInNumericEntity(c2) {
    if (c2 === CharCodes2.Semi) {
      this.emitNumericEntity(true);
    } else if (isNumber2(c2)) {
      this.entityResult = this.entityResult * 10 + (c2 - CharCodes2.Zero);
      this.entityExcess++;
    } else {
      if (this.allowLegacyEntity()) {
        this.emitNumericEntity(false);
      } else {
        this.state = this.baseState;
      }
      this.index--;
    }
  }
  stateInHexEntity(c2) {
    if (c2 === CharCodes2.Semi) {
      this.emitNumericEntity(true);
    } else if (isNumber2(c2)) {
      this.entityResult = this.entityResult * 16 + (c2 - CharCodes2.Zero);
      this.entityExcess++;
    } else if (isHexDigit(c2)) {
      this.entityResult = this.entityResult * 16 + ((c2 | 32) - CharCodes2.LowerA + 10);
      this.entityExcess++;
    } else {
      if (this.allowLegacyEntity()) {
        this.emitNumericEntity(false);
      } else {
        this.state = this.baseState;
      }
      this.index--;
    }
  }
  allowLegacyEntity() {
    return !this.xmlMode && (this.baseState === State.Text || this.baseState === State.InSpecialTag);
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    if (this.running && this.sectionStart !== this.index) {
      if (this.state === State.Text || this.state === State.InSpecialTag && this.sequenceIndex === 0) {
        this.cbs.ontext(this.sectionStart, this.index);
        this.sectionStart = this.index;
      } else if (this.state === State.InAttributeValueDq || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueNq) {
        this.cbs.onattribdata(this.sectionStart, this.index);
        this.sectionStart = this.index;
      }
    }
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    while (this.shouldContinue()) {
      const c2 = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case State.Text: {
          this.stateText(c2);
          break;
        }
        case State.SpecialStartSequence: {
          this.stateSpecialStartSequence(c2);
          break;
        }
        case State.InSpecialTag: {
          this.stateInSpecialTag(c2);
          break;
        }
        case State.CDATASequence: {
          this.stateCDATASequence(c2);
          break;
        }
        case State.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(c2);
          break;
        }
        case State.InAttributeName: {
          this.stateInAttributeName(c2);
          break;
        }
        case State.InCommentLike: {
          this.stateInCommentLike(c2);
          break;
        }
        case State.InSpecialComment: {
          this.stateInSpecialComment(c2);
          break;
        }
        case State.BeforeAttributeName: {
          this.stateBeforeAttributeName(c2);
          break;
        }
        case State.InTagName: {
          this.stateInTagName(c2);
          break;
        }
        case State.InClosingTagName: {
          this.stateInClosingTagName(c2);
          break;
        }
        case State.BeforeTagName: {
          this.stateBeforeTagName(c2);
          break;
        }
        case State.AfterAttributeName: {
          this.stateAfterAttributeName(c2);
          break;
        }
        case State.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(c2);
          break;
        }
        case State.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(c2);
          break;
        }
        case State.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(c2);
          break;
        }
        case State.AfterClosingTagName: {
          this.stateAfterClosingTagName(c2);
          break;
        }
        case State.BeforeSpecialS: {
          this.stateBeforeSpecialS(c2);
          break;
        }
        case State.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(c2);
          break;
        }
        case State.InSelfClosingTag: {
          this.stateInSelfClosingTag(c2);
          break;
        }
        case State.InDeclaration: {
          this.stateInDeclaration(c2);
          break;
        }
        case State.BeforeDeclaration: {
          this.stateBeforeDeclaration(c2);
          break;
        }
        case State.BeforeComment: {
          this.stateBeforeComment(c2);
          break;
        }
        case State.InProcessingInstruction: {
          this.stateInProcessingInstruction(c2);
          break;
        }
        case State.InNamedEntity: {
          this.stateInNamedEntity(c2);
          break;
        }
        case State.BeforeEntity: {
          this.stateBeforeEntity(c2);
          break;
        }
        case State.InHexEntity: {
          this.stateInHexEntity(c2);
          break;
        }
        case State.InNumericEntity: {
          this.stateInNumericEntity(c2);
          break;
        }
        default: {
          this.stateBeforeNumericEntity(c2);
        }
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    if (this.state === State.InNamedEntity) {
      this.emitNamedEntity();
    }
    if (this.sectionStart < this.index) {
      this.handleTrailingData();
    }
    this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const endIndex = this.buffer.length + this.offset;
    if (this.state === State.InCommentLike) {
      if (this.currentSequence === Sequences.CdataEnd) {
        this.cbs.oncdata(this.sectionStart, endIndex, 0);
      } else {
        this.cbs.oncomment(this.sectionStart, endIndex, 0);
      }
    } else if (this.state === State.InNumericEntity && this.allowLegacyEntity()) {
      this.emitNumericEntity(false);
    } else if (this.state === State.InHexEntity && this.allowLegacyEntity()) {
      this.emitNumericEntity(false);
    } else if (this.state === State.InTagName || this.state === State.BeforeAttributeName || this.state === State.BeforeAttributeValue || this.state === State.AfterAttributeName || this.state === State.InAttributeName || this.state === State.InAttributeValueSq || this.state === State.InAttributeValueDq || this.state === State.InAttributeValueNq || this.state === State.InClosingTagName) {
    } else {
      this.cbs.ontext(this.sectionStart, endIndex);
    }
  }
  emitPartial(start, endIndex) {
    if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
      this.cbs.onattribdata(start, endIndex);
    } else {
      this.cbs.ontext(start, endIndex);
    }
  }
  emitCodePoint(cp) {
    if (this.baseState !== State.Text && this.baseState !== State.InSpecialTag) {
      this.cbs.onattribentity(cp);
    } else {
      this.cbs.ontextentity(cp);
    }
  }
};

// node_modules/htmlparser2/lib/esm/Parser.js
var formTags = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]);
var pTag = /* @__PURE__ */ new Set(["p"]);
var tableSectionTags = /* @__PURE__ */ new Set(["thead", "tbody"]);
var ddtTags = /* @__PURE__ */ new Set(["dd", "dt"]);
var rtpTags = /* @__PURE__ */ new Set(["rt", "rp"]);
var openImpliesClose = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", pTag],
  ["h1", pTag],
  ["h2", pTag],
  ["h3", pTag],
  ["h4", pTag],
  ["h5", pTag],
  ["h6", pTag],
  ["select", formTags],
  ["input", formTags],
  ["output", formTags],
  ["button", formTags],
  ["datalist", formTags],
  ["textarea", formTags],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", ddtTags],
  ["dt", ddtTags],
  ["address", pTag],
  ["article", pTag],
  ["aside", pTag],
  ["blockquote", pTag],
  ["details", pTag],
  ["div", pTag],
  ["dl", pTag],
  ["fieldset", pTag],
  ["figcaption", pTag],
  ["figure", pTag],
  ["footer", pTag],
  ["form", pTag],
  ["header", pTag],
  ["hr", pTag],
  ["main", pTag],
  ["nav", pTag],
  ["ol", pTag],
  ["pre", pTag],
  ["section", pTag],
  ["table", pTag],
  ["ul", pTag],
  ["rt", rtpTags],
  ["rp", rtpTags],
  ["tbody", tableSectionTags],
  ["tfoot", tableSectionTags]
]);
var voidElements = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var foreignContextElements = /* @__PURE__ */ new Set(["math", "svg"]);
var htmlIntegrationElements = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]);
var reNameEnd = /\s|\//;
var Parser = class {
  constructor(cbs, options = {}) {
    var _a3, _b, _c, _d, _e3;
    this.options = options;
    this.startIndex = 0;
    this.endIndex = 0;
    this.openTagStart = 0;
    this.tagname = "";
    this.attribname = "";
    this.attribvalue = "";
    this.attribs = null;
    this.stack = [];
    this.foreignContext = [];
    this.buffers = [];
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
    this.cbs = cbs !== null && cbs !== void 0 ? cbs : {};
    this.lowerCaseTagNames = (_a3 = options.lowerCaseTags) !== null && _a3 !== void 0 ? _a3 : !options.xmlMode;
    this.lowerCaseAttributeNames = (_b = options.lowerCaseAttributeNames) !== null && _b !== void 0 ? _b : !options.xmlMode;
    this.tokenizer = new ((_c = options.Tokenizer) !== null && _c !== void 0 ? _c : Tokenizer)(this.options, this);
    (_e3 = (_d = this.cbs).onparserinit) === null || _e3 === void 0 ? void 0 : _e3.call(_d, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(start, endIndex) {
    var _a3, _b;
    const data = this.getSlice(start, endIndex);
    this.endIndex = endIndex - 1;
    (_b = (_a3 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a3, data);
    this.startIndex = endIndex;
  }
  /** @internal */
  ontextentity(cp) {
    var _a3, _b;
    const index = this.tokenizer.getSectionStart();
    this.endIndex = index - 1;
    (_b = (_a3 = this.cbs).ontext) === null || _b === void 0 ? void 0 : _b.call(_a3, fromCodePoint(cp));
    this.startIndex = index;
  }
  isVoidElement(name2) {
    return !this.options.xmlMode && voidElements.has(name2);
  }
  /** @internal */
  onopentagname(start, endIndex) {
    this.endIndex = endIndex;
    let name2 = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name2 = name2.toLowerCase();
    }
    this.emitOpenTag(name2);
  }
  emitOpenTag(name2) {
    var _a3, _b, _c, _d;
    this.openTagStart = this.startIndex;
    this.tagname = name2;
    const impliesClose = !this.options.xmlMode && openImpliesClose.get(name2);
    if (impliesClose) {
      while (this.stack.length > 0 && impliesClose.has(this.stack[this.stack.length - 1])) {
        const element = this.stack.pop();
        (_b = (_a3 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a3, element, true);
      }
    }
    if (!this.isVoidElement(name2)) {
      this.stack.push(name2);
      if (foreignContextElements.has(name2)) {
        this.foreignContext.push(true);
      } else if (htmlIntegrationElements.has(name2)) {
        this.foreignContext.push(false);
      }
    }
    (_d = (_c = this.cbs).onopentagname) === null || _d === void 0 ? void 0 : _d.call(_c, name2);
    if (this.cbs.onopentag)
      this.attribs = {};
  }
  endOpenTag(isImplied) {
    var _a3, _b;
    this.startIndex = this.openTagStart;
    if (this.attribs) {
      (_b = (_a3 = this.cbs).onopentag) === null || _b === void 0 ? void 0 : _b.call(_a3, this.tagname, this.attribs, isImplied);
      this.attribs = null;
    }
    if (this.cbs.onclosetag && this.isVoidElement(this.tagname)) {
      this.cbs.onclosetag(this.tagname, true);
    }
    this.tagname = "";
  }
  /** @internal */
  onopentagend(endIndex) {
    this.endIndex = endIndex;
    this.endOpenTag(false);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onclosetag(start, endIndex) {
    var _a3, _b, _c, _d, _e3, _f;
    this.endIndex = endIndex;
    let name2 = this.getSlice(start, endIndex);
    if (this.lowerCaseTagNames) {
      name2 = name2.toLowerCase();
    }
    if (foreignContextElements.has(name2) || htmlIntegrationElements.has(name2)) {
      this.foreignContext.pop();
    }
    if (!this.isVoidElement(name2)) {
      const pos = this.stack.lastIndexOf(name2);
      if (pos !== -1) {
        if (this.cbs.onclosetag) {
          let count7 = this.stack.length - pos;
          while (count7--) {
            this.cbs.onclosetag(this.stack.pop(), count7 !== 0);
          }
        } else
          this.stack.length = pos;
      } else if (!this.options.xmlMode && name2 === "p") {
        this.emitOpenTag("p");
        this.closeCurrentTag(true);
      }
    } else if (!this.options.xmlMode && name2 === "br") {
      (_b = (_a3 = this.cbs).onopentagname) === null || _b === void 0 ? void 0 : _b.call(_a3, "br");
      (_d = (_c = this.cbs).onopentag) === null || _d === void 0 ? void 0 : _d.call(_c, "br", {}, true);
      (_f = (_e3 = this.cbs).onclosetag) === null || _f === void 0 ? void 0 : _f.call(_e3, "br", false);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onselfclosingtag(endIndex) {
    this.endIndex = endIndex;
    if (this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1]) {
      this.closeCurrentTag(false);
      this.startIndex = endIndex + 1;
    } else {
      this.onopentagend(endIndex);
    }
  }
  closeCurrentTag(isOpenImplied) {
    var _a3, _b;
    const name2 = this.tagname;
    this.endOpenTag(isOpenImplied);
    if (this.stack[this.stack.length - 1] === name2) {
      (_b = (_a3 = this.cbs).onclosetag) === null || _b === void 0 ? void 0 : _b.call(_a3, name2, !isOpenImplied);
      this.stack.pop();
    }
  }
  /** @internal */
  onattribname(start, endIndex) {
    this.startIndex = start;
    const name2 = this.getSlice(start, endIndex);
    this.attribname = this.lowerCaseAttributeNames ? name2.toLowerCase() : name2;
  }
  /** @internal */
  onattribdata(start, endIndex) {
    this.attribvalue += this.getSlice(start, endIndex);
  }
  /** @internal */
  onattribentity(cp) {
    this.attribvalue += fromCodePoint(cp);
  }
  /** @internal */
  onattribend(quote, endIndex) {
    var _a3, _b;
    this.endIndex = endIndex;
    (_b = (_a3 = this.cbs).onattribute) === null || _b === void 0 ? void 0 : _b.call(_a3, this.attribname, this.attribvalue, quote === QuoteType.Double ? '"' : quote === QuoteType.Single ? "'" : quote === QuoteType.NoValue ? void 0 : null);
    if (this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname)) {
      this.attribs[this.attribname] = this.attribvalue;
    }
    this.attribvalue = "";
  }
  getInstructionName(value) {
    const index = value.search(reNameEnd);
    let name2 = index < 0 ? value : value.substr(0, index);
    if (this.lowerCaseTagNames) {
      name2 = name2.toLowerCase();
    }
    return name2;
  }
  /** @internal */
  ondeclaration(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name2 = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`!${name2}`, `!${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onprocessinginstruction(start, endIndex) {
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex);
    if (this.cbs.onprocessinginstruction) {
      const name2 = this.getInstructionName(value);
      this.cbs.onprocessinginstruction(`?${name2}`, `?${value}`);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncomment(start, endIndex, offset) {
    var _a3, _b, _c, _d;
    this.endIndex = endIndex;
    (_b = (_a3 = this.cbs).oncomment) === null || _b === void 0 ? void 0 : _b.call(_a3, this.getSlice(start, endIndex - offset));
    (_d = (_c = this.cbs).oncommentend) === null || _d === void 0 ? void 0 : _d.call(_c);
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  oncdata(start, endIndex, offset) {
    var _a3, _b, _c, _d, _e3, _f, _g, _h, _j, _k;
    this.endIndex = endIndex;
    const value = this.getSlice(start, endIndex - offset);
    if (this.options.xmlMode || this.options.recognizeCDATA) {
      (_b = (_a3 = this.cbs).oncdatastart) === null || _b === void 0 ? void 0 : _b.call(_a3);
      (_d = (_c = this.cbs).ontext) === null || _d === void 0 ? void 0 : _d.call(_c, value);
      (_f = (_e3 = this.cbs).oncdataend) === null || _f === void 0 ? void 0 : _f.call(_e3);
    } else {
      (_h = (_g = this.cbs).oncomment) === null || _h === void 0 ? void 0 : _h.call(_g, `[CDATA[${value}]]`);
      (_k = (_j = this.cbs).oncommentend) === null || _k === void 0 ? void 0 : _k.call(_j);
    }
    this.startIndex = endIndex + 1;
  }
  /** @internal */
  onend() {
    var _a3, _b;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let index = this.stack.length; index > 0; this.cbs.onclosetag(this.stack[--index], true))
        ;
    }
    (_b = (_a3 = this.cbs).onend) === null || _b === void 0 ? void 0 : _b.call(_a3);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var _a3, _b, _c, _d;
    (_b = (_a3 = this.cbs).onreset) === null || _b === void 0 ? void 0 : _b.call(_a3);
    this.tokenizer.reset();
    this.tagname = "";
    this.attribname = "";
    this.attribs = null;
    this.stack.length = 0;
    this.startIndex = 0;
    this.endIndex = 0;
    (_d = (_c = this.cbs).onparserinit) === null || _d === void 0 ? void 0 : _d.call(_c, this);
    this.buffers.length = 0;
    this.bufferOffset = 0;
    this.writeIndex = 0;
    this.ended = false;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(data) {
    this.reset();
    this.end(data);
  }
  getSlice(start, end) {
    while (start - this.bufferOffset >= this.buffers[0].length) {
      this.shiftBuffer();
    }
    let slice = this.buffers[0].slice(start - this.bufferOffset, end - this.bufferOffset);
    while (end - this.bufferOffset > this.buffers[0].length) {
      this.shiftBuffer();
      slice += this.buffers[0].slice(0, end - this.bufferOffset);
    }
    return slice;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length;
    this.writeIndex--;
    this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(chunk) {
    var _a3, _b;
    if (this.ended) {
      (_b = (_a3 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a3, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(chunk);
    if (this.tokenizer.running) {
      this.tokenizer.write(chunk);
      this.writeIndex++;
    }
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(chunk) {
    var _a3, _b;
    if (this.ended) {
      (_b = (_a3 = this.cbs).onerror) === null || _b === void 0 ? void 0 : _b.call(_a3, new Error(".end() after done!"));
      return;
    }
    if (chunk)
      this.write(chunk);
    this.ended = true;
    this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    this.tokenizer.resume();
    while (this.tokenizer.running && this.writeIndex < this.buffers.length) {
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    }
    if (this.ended)
      this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(chunk) {
    this.write(chunk);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(chunk) {
    this.end(chunk);
  }
};

// node_modules/entities/lib/esm/generated/encode-html.js
function restoreDiff(arr) {
  for (let i = 1; i < arr.length; i++) {
    arr[i][0] += arr[i - 1][0] + 1;
  }
  return arr;
}
var encode_html_default = new Map(/* @__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));

// node_modules/entities/lib/esm/escape.js
var xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
var xmlCodeMap = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]);
var getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (str, index) => str.codePointAt(index) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (c2, index) => (c2.charCodeAt(index) & 64512) === 55296 ? (c2.charCodeAt(index) - 55296) * 1024 + c2.charCodeAt(index + 1) - 56320 + 65536 : c2.charCodeAt(index)
  )
);
function encodeXML(str) {
  let ret = "";
  let lastIdx = 0;
  let match;
  while ((match = xmlReplacer.exec(str)) !== null) {
    const i = match.index;
    const char = str.charCodeAt(i);
    const next2 = xmlCodeMap.get(char);
    if (next2 !== void 0) {
      ret += str.substring(lastIdx, i) + next2;
      lastIdx = i + 1;
    } else {
      ret += `${str.substring(lastIdx, i)}&#x${getCodePoint(str, i).toString(16)};`;
      lastIdx = xmlReplacer.lastIndex += Number((char & 64512) === 55296);
    }
  }
  return ret + str.substr(lastIdx);
}
function getEscaper(regex, map2) {
  return function escape3(data) {
    let match;
    let lastIdx = 0;
    let result = "";
    while (match = regex.exec(data)) {
      if (lastIdx !== match.index) {
        result += data.substring(lastIdx, match.index);
      }
      result += map2.get(match[0].charCodeAt(0));
      lastIdx = match.index + 1;
    }
    return result + data.substring(lastIdx);
  };
}
var escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
var escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
]));
var escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
]));

// node_modules/entities/lib/esm/index.js
var EntityLevel;
(function(EntityLevel2) {
  EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
  EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
var EncodingMode;
(function(EncodingMode2) {
  EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
  EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
  EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
  EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
  EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));

// node_modules/dom-serializer/lib/esm/foreignNames.js
var elementNames = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((val) => [val.toLowerCase(), val]));
var attributeNames = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((val) => [val.toLowerCase(), val]));

// node_modules/dom-serializer/lib/esm/index.js
var unencodedElements = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function replaceQuotes(value) {
  return value.replace(/"/g, "&quot;");
}
function formatAttributes(attributes, opts) {
  var _a3;
  if (!attributes)
    return;
  const encode = ((_a3 = opts.encodeEntities) !== null && _a3 !== void 0 ? _a3 : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
  return Object.keys(attributes).map((key) => {
    var _a4, _b;
    const value = (_a4 = attributes[key]) !== null && _a4 !== void 0 ? _a4 : "";
    if (opts.xmlMode === "foreign") {
      key = (_b = attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
    }
    if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
      return key;
    }
    return `${key}="${encode(value)}"`;
  }).join(" ");
}
var singleTag = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function render(node, options = {}) {
  const nodes = "length" in node ? node : [node];
  let output = "";
  for (let i = 0; i < nodes.length; i++) {
    output += renderNode(nodes[i], options);
  }
  return output;
}
function renderNode(node, options) {
  switch (node.type) {
    case Root:
      return render(node.children, options);
    // @ts-expect-error We don't use `Doctype` yet
    case Doctype:
    case Directive:
      return renderDirective(node);
    case Comment:
      return renderComment(node);
    case CDATA:
      return renderCdata(node);
    case Script:
    case Style:
    case Tag:
      return renderTag(node, options);
    case Text:
      return renderText(node, options);
  }
}
var foreignModeIntegrationPoints = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]);
var foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
function renderTag(elem, opts) {
  var _a3;
  if (opts.xmlMode === "foreign") {
    elem.name = (_a3 = elementNames.get(elem.name)) !== null && _a3 !== void 0 ? _a3 : elem.name;
    if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
      opts = { ...opts, xmlMode: false };
    }
  }
  if (!opts.xmlMode && foreignElements.has(elem.name)) {
    opts = { ...opts, xmlMode: "foreign" };
  }
  let tag = `<${elem.name}`;
  const attribs = formatAttributes(elem.attribs, opts);
  if (attribs) {
    tag += ` ${attribs}`;
  }
  if (elem.children.length === 0 && (opts.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    opts.selfClosingTags !== false
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    opts.selfClosingTags && singleTag.has(elem.name)
  ))) {
    if (!opts.xmlMode)
      tag += " ";
    tag += "/>";
  } else {
    tag += ">";
    if (elem.children.length > 0) {
      tag += render(elem.children, opts);
    }
    if (opts.xmlMode || !singleTag.has(elem.name)) {
      tag += `</${elem.name}>`;
    }
  }
  return tag;
}
function renderDirective(elem) {
  return `<${elem.data}>`;
}
function renderText(elem, opts) {
  var _a3;
  let data = elem.data || "";
  if (((_a3 = opts.encodeEntities) !== null && _a3 !== void 0 ? _a3 : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
    data = opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML(data) : escapeText(data);
  }
  return data;
}
function renderCdata(elem) {
  return `<![CDATA[${elem.children[0].data}]]>`;
}
function renderComment(elem) {
  return `<!--${elem.data}-->`;
}

// node_modules/domutils/lib/esm/helpers.js
var DocumentPosition;
(function(DocumentPosition2) {
  DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
  DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
  DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
  DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
  DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));

// node_modules/htmlparser2/lib/esm/index.js
function parseDocument(data, options) {
  const handler = new DomHandler(void 0, options);
  new Parser(handler, options).end(data);
  return handler.root;
}

// node_modules/html-to-text/lib/html-to-text.mjs
var import_deepmerge = __toESM(require_cjs(), 1);
function limitedDepthRecursive(n2, f, g = () => void 0) {
  if (n2 === void 0) {
    const f1 = function(...args) {
      return f(f1, ...args);
    };
    return f1;
  }
  if (n2 >= 0) {
    return function(...args) {
      return f(limitedDepthRecursive(n2 - 1, f, g), ...args);
    };
  }
  return g;
}
function trimCharacter(str, char) {
  let start = 0;
  let end = str.length;
  while (start < end && str[start] === char) {
    ++start;
  }
  while (end > start && str[end - 1] === char) {
    --end;
  }
  return start > 0 || end < str.length ? str.substring(start, end) : str;
}
function trimCharacterEnd(str, char) {
  let end = str.length;
  while (end > 0 && str[end - 1] === char) {
    --end;
  }
  return end < str.length ? str.substring(0, end) : str;
}
function unicodeEscape(str) {
  return str.replace(/[\s\S]/g, (c2) => "\\u" + c2.charCodeAt().toString(16).padStart(4, "0"));
}
function mergeDuplicatesPreferLast(items, getKey) {
  const map2 = /* @__PURE__ */ new Map();
  for (let i = items.length; i-- > 0; ) {
    const item = items[i];
    const key = getKey(item);
    map2.set(
      key,
      map2.has(key) ? (0, import_deepmerge.default)(item, map2.get(key), { arrayMerge: overwriteMerge$1 }) : item
    );
  }
  return [...map2.values()].reverse();
}
var overwriteMerge$1 = (acc, src, options) => [...src];
function get(obj, path4) {
  for (const key of path4) {
    if (!obj) {
      return void 0;
    }
    obj = obj[key];
  }
  return obj;
}
function numberToLetterSequence(num, baseChar = "a", base = 26) {
  const digits = [];
  do {
    num -= 1;
    digits.push(num % base);
    num = num / base >> 0;
  } while (num > 0);
  const baseCode = baseChar.charCodeAt(0);
  return digits.reverse().map((n2) => String.fromCharCode(baseCode + n2)).join("");
}
var I = ["I", "X", "C", "M"];
var V = ["V", "L", "D"];
function numberToRoman(num) {
  return [...num + ""].map((n2) => +n2).reverse().map((v2, i) => v2 % 5 < 4 ? (v2 < 5 ? "" : V[i]) + I[i].repeat(v2 % 5) : I[i] + (v2 < 5 ? V[i] : I[i + 1])).reverse().join("");
}
var InlineTextBuilder = class {
  /**
   * Creates an instance of InlineTextBuilder.
   *
   * If `maxLineLength` is not provided then it is either `options.wordwrap` or unlimited.
   *
   * @param { Options } options           HtmlToText options.
   * @param { number }  [ maxLineLength ] This builder will try to wrap text to fit this line length.
   */
  constructor(options, maxLineLength = void 0) {
    this.lines = [];
    this.nextLineWords = [];
    this.maxLineLength = maxLineLength || options.wordwrap || Number.MAX_VALUE;
    this.nextLineAvailableChars = this.maxLineLength;
    this.wrapCharacters = get(options, ["longWordSplit", "wrapCharacters"]) || [];
    this.forceWrapOnLimit = get(options, ["longWordSplit", "forceWrapOnLimit"]) || false;
    this.stashedSpace = false;
    this.wordBreakOpportunity = false;
  }
  /**
   * Add a new word.
   *
   * @param { string } word A word to add.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */
  pushWord(word, noWrap = false) {
    if (this.nextLineAvailableChars <= 0 && !noWrap) {
      this.startNewLine();
    }
    const isLineStart = this.nextLineWords.length === 0;
    const cost = word.length + (isLineStart ? 0 : 1);
    if (cost <= this.nextLineAvailableChars || noWrap) {
      this.nextLineWords.push(word);
      this.nextLineAvailableChars -= cost;
    } else {
      const [first, ...rest] = this.splitLongWord(word);
      if (!isLineStart) {
        this.startNewLine();
      }
      this.nextLineWords.push(first);
      this.nextLineAvailableChars -= first.length;
      for (const part of rest) {
        this.startNewLine();
        this.nextLineWords.push(part);
        this.nextLineAvailableChars -= part.length;
      }
    }
  }
  /**
   * Pop a word from the currently built line.
   * This doesn't affect completed lines.
   *
   * @returns { string }
   */
  popWord() {
    const lastWord = this.nextLineWords.pop();
    if (lastWord !== void 0) {
      const isLineStart = this.nextLineWords.length === 0;
      const cost = lastWord.length + (isLineStart ? 0 : 1);
      this.nextLineAvailableChars += cost;
    }
    return lastWord;
  }
  /**
   * Concat a word to the last word already in the builder.
   * Adds a new word in case there are no words yet in the last line.
   *
   * @param { string } word A word to be concatenated.
   * @param { boolean } [noWrap] Don't wrap text even if the line is too long.
   */
  concatWord(word, noWrap = false) {
    if (this.wordBreakOpportunity && word.length > this.nextLineAvailableChars) {
      this.pushWord(word, noWrap);
      this.wordBreakOpportunity = false;
    } else {
      const lastWord = this.popWord();
      this.pushWord(lastWord ? lastWord.concat(word) : word, noWrap);
    }
  }
  /**
   * Add current line (and more empty lines if provided argument > 1) to the list of complete lines and start a new one.
   *
   * @param { number } n Number of line breaks that will be added to the resulting string.
   */
  startNewLine(n2 = 1) {
    this.lines.push(this.nextLineWords);
    if (n2 > 1) {
      this.lines.push(...Array.from({ length: n2 - 1 }, () => []));
    }
    this.nextLineWords = [];
    this.nextLineAvailableChars = this.maxLineLength;
  }
  /**
   * No words in this builder.
   *
   * @returns { boolean }
   */
  isEmpty() {
    return this.lines.length === 0 && this.nextLineWords.length === 0;
  }
  clear() {
    this.lines.length = 0;
    this.nextLineWords.length = 0;
    this.nextLineAvailableChars = this.maxLineLength;
  }
  /**
   * Join all lines of words inside the InlineTextBuilder into a complete string.
   *
   * @returns { string }
   */
  toString() {
    return [...this.lines, this.nextLineWords].map((words) => words.join(" ")).join("\n");
  }
  /**
   * Split a long word up to fit within the word wrap limit.
   * Use either a character to split looking back from the word wrap limit,
   * or truncate to the word wrap limit.
   *
   * @param   { string }   word Input word.
   * @returns { string[] }      Parts of the word.
   */
  splitLongWord(word) {
    const parts = [];
    let idx = 0;
    while (word.length > this.maxLineLength) {
      const firstLine = word.substring(0, this.maxLineLength);
      const remainingChars = word.substring(this.maxLineLength);
      const splitIndex = firstLine.lastIndexOf(this.wrapCharacters[idx]);
      if (splitIndex > -1) {
        word = firstLine.substring(splitIndex + 1) + remainingChars;
        parts.push(firstLine.substring(0, splitIndex + 1));
      } else {
        idx++;
        if (idx < this.wrapCharacters.length) {
          word = firstLine + remainingChars;
        } else {
          if (this.forceWrapOnLimit) {
            parts.push(firstLine);
            word = remainingChars;
            if (word.length > this.maxLineLength) {
              continue;
            }
          } else {
            word = firstLine + remainingChars;
          }
          break;
        }
      }
    }
    parts.push(word);
    return parts;
  }
};
var StackItem = class {
  constructor(next2 = null) {
    this.next = next2;
  }
  getRoot() {
    return this.next ? this.next : this;
  }
};
var BlockStackItem = class extends StackItem {
  constructor(options, next2 = null, leadingLineBreaks = 1, maxLineLength = void 0) {
    super(next2);
    this.leadingLineBreaks = leadingLineBreaks;
    this.inlineTextBuilder = new InlineTextBuilder(options, maxLineLength);
    this.rawText = "";
    this.stashedLineBreaks = 0;
    this.isPre = next2 && next2.isPre;
    this.isNoWrap = next2 && next2.isNoWrap;
  }
};
var ListStackItem = class extends BlockStackItem {
  constructor(options, next2 = null, {
    interRowLineBreaks = 1,
    leadingLineBreaks = 2,
    maxLineLength = void 0,
    maxPrefixLength = 0,
    prefixAlign = "left"
  } = {}) {
    super(options, next2, leadingLineBreaks, maxLineLength);
    this.maxPrefixLength = maxPrefixLength;
    this.prefixAlign = prefixAlign;
    this.interRowLineBreaks = interRowLineBreaks;
  }
};
var ListItemStackItem = class extends BlockStackItem {
  constructor(options, next2 = null, {
    leadingLineBreaks = 1,
    maxLineLength = void 0,
    prefix = ""
  } = {}) {
    super(options, next2, leadingLineBreaks, maxLineLength);
    this.prefix = prefix;
  }
};
var TableStackItem = class extends StackItem {
  constructor(next2 = null) {
    super(next2);
    this.rows = [];
    this.isPre = next2 && next2.isPre;
    this.isNoWrap = next2 && next2.isNoWrap;
  }
};
var TableRowStackItem = class extends StackItem {
  constructor(next2 = null) {
    super(next2);
    this.cells = [];
    this.isPre = next2 && next2.isPre;
    this.isNoWrap = next2 && next2.isNoWrap;
  }
};
var TableCellStackItem = class extends StackItem {
  constructor(options, next2 = null, maxColumnWidth = void 0) {
    super(next2);
    this.inlineTextBuilder = new InlineTextBuilder(options, maxColumnWidth);
    this.rawText = "";
    this.stashedLineBreaks = 0;
    this.isPre = next2 && next2.isPre;
    this.isNoWrap = next2 && next2.isNoWrap;
  }
};
var TransformerStackItem = class extends StackItem {
  constructor(next2 = null, transform) {
    super(next2);
    this.transform = transform;
  }
};
function charactersToCodes(str) {
  return [...str].map((c2) => "\\u" + c2.charCodeAt(0).toString(16).padStart(4, "0")).join("");
}
var WhitespaceProcessor = class {
  /**
   * Creates an instance of WhitespaceProcessor.
   *
   * @param { Options } options    HtmlToText options.
   * @memberof WhitespaceProcessor
   */
  constructor(options) {
    this.whitespaceChars = options.preserveNewlines ? options.whitespaceCharacters.replace(/\n/g, "") : options.whitespaceCharacters;
    const whitespaceCodes = charactersToCodes(this.whitespaceChars);
    this.leadingWhitespaceRe = new RegExp(`^[${whitespaceCodes}]`);
    this.trailingWhitespaceRe = new RegExp(`[${whitespaceCodes}]$`);
    this.allWhitespaceOrEmptyRe = new RegExp(`^[${whitespaceCodes}]*$`);
    this.newlineOrNonWhitespaceRe = new RegExp(`(\\n|[^\\n${whitespaceCodes}])`, "g");
    this.newlineOrNonNewlineStringRe = new RegExp(`(\\n|[^\\n]+)`, "g");
    if (options.preserveNewlines) {
      const wordOrNewlineRe = new RegExp(`\\n|[^\\n${whitespaceCodes}]+`, "gm");
      this.shrinkWrapAdd = function(text2, inlineTextBuilder, transform = (str) => str, noWrap = false) {
        if (!text2) {
          return;
        }
        const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
        let anyMatch = false;
        let m2 = wordOrNewlineRe.exec(text2);
        if (m2) {
          anyMatch = true;
          if (m2[0] === "\n") {
            inlineTextBuilder.startNewLine();
          } else if (previouslyStashedSpace || this.testLeadingWhitespace(text2)) {
            inlineTextBuilder.pushWord(transform(m2[0]), noWrap);
          } else {
            inlineTextBuilder.concatWord(transform(m2[0]), noWrap);
          }
          while ((m2 = wordOrNewlineRe.exec(text2)) !== null) {
            if (m2[0] === "\n") {
              inlineTextBuilder.startNewLine();
            } else {
              inlineTextBuilder.pushWord(transform(m2[0]), noWrap);
            }
          }
        }
        inlineTextBuilder.stashedSpace = previouslyStashedSpace && !anyMatch || this.testTrailingWhitespace(text2);
      };
    } else {
      const wordRe = new RegExp(`[^${whitespaceCodes}]+`, "g");
      this.shrinkWrapAdd = function(text2, inlineTextBuilder, transform = (str) => str, noWrap = false) {
        if (!text2) {
          return;
        }
        const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
        let anyMatch = false;
        let m2 = wordRe.exec(text2);
        if (m2) {
          anyMatch = true;
          if (previouslyStashedSpace || this.testLeadingWhitespace(text2)) {
            inlineTextBuilder.pushWord(transform(m2[0]), noWrap);
          } else {
            inlineTextBuilder.concatWord(transform(m2[0]), noWrap);
          }
          while ((m2 = wordRe.exec(text2)) !== null) {
            inlineTextBuilder.pushWord(transform(m2[0]), noWrap);
          }
        }
        inlineTextBuilder.stashedSpace = previouslyStashedSpace && !anyMatch || this.testTrailingWhitespace(text2);
      };
    }
  }
  /**
   * Add text with only minimal processing.
   * Everything between newlines considered a single word.
   * No whitespace is trimmed.
   * Not affected by preserveNewlines option - `\n` always starts a new line.
   *
   * `noWrap` argument is `true` by default - this won't start a new line
   * even if there is not enough space left in the current line.
   *
   * @param { string }            text              Input text.
   * @param { InlineTextBuilder } inlineTextBuilder A builder to receive processed text.
   * @param { boolean }           [noWrap] Don't wrap text even if the line is too long.
   */
  addLiteral(text2, inlineTextBuilder, noWrap = true) {
    if (!text2) {
      return;
    }
    const previouslyStashedSpace = inlineTextBuilder.stashedSpace;
    let anyMatch = false;
    let m2 = this.newlineOrNonNewlineStringRe.exec(text2);
    if (m2) {
      anyMatch = true;
      if (m2[0] === "\n") {
        inlineTextBuilder.startNewLine();
      } else if (previouslyStashedSpace) {
        inlineTextBuilder.pushWord(m2[0], noWrap);
      } else {
        inlineTextBuilder.concatWord(m2[0], noWrap);
      }
      while ((m2 = this.newlineOrNonNewlineStringRe.exec(text2)) !== null) {
        if (m2[0] === "\n") {
          inlineTextBuilder.startNewLine();
        } else {
          inlineTextBuilder.pushWord(m2[0], noWrap);
        }
      }
    }
    inlineTextBuilder.stashedSpace = previouslyStashedSpace && !anyMatch;
  }
  /**
   * Test whether the given text starts with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testLeadingWhitespace(text2) {
    return this.leadingWhitespaceRe.test(text2);
  }
  /**
   * Test whether the given text ends with HTML whitespace character.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testTrailingWhitespace(text2) {
    return this.trailingWhitespaceRe.test(text2);
  }
  /**
   * Test whether the given text contains any non-whitespace characters.
   *
   * @param   { string }  text  The string to test.
   * @returns { boolean }
   */
  testContainsWords(text2) {
    return !this.allWhitespaceOrEmptyRe.test(text2);
  }
  /**
   * Return the number of newlines if there are no words.
   *
   * If any word is found then return zero regardless of the actual number of newlines.
   *
   * @param   { string }  text  Input string.
   * @returns { number }
   */
  countNewlinesNoWords(text2) {
    this.newlineOrNonWhitespaceRe.lastIndex = 0;
    let counter = 0;
    let match;
    while ((match = this.newlineOrNonWhitespaceRe.exec(text2)) !== null) {
      if (match[0] === "\n") {
        counter++;
      } else {
        return 0;
      }
    }
    return counter;
  }
};
var BlockTextBuilder = class {
  /**
   * Creates an instance of BlockTextBuilder.
   *
   * @param { Options } options HtmlToText options.
   * @param { import('selderee').Picker<DomNode, TagDefinition> } picker Selectors decision tree picker.
   * @param { any} [metadata] Optional metadata for HTML document, for use in formatters.
   */
  constructor(options, picker, metadata = void 0) {
    this.options = options;
    this.picker = picker;
    this.metadata = metadata;
    this.whitespaceProcessor = new WhitespaceProcessor(options);
    this._stackItem = new BlockStackItem(options);
    this._wordTransformer = void 0;
  }
  /**
   * Put a word-by-word transform function onto the transformations stack.
   *
   * Mainly used for uppercasing. Can be bypassed to add unformatted text such as URLs.
   *
   * Word transformations applied before wrapping.
   *
   * @param { (str: string) => string } wordTransform Word transformation function.
   */
  pushWordTransform(wordTransform) {
    this._wordTransformer = new TransformerStackItem(this._wordTransformer, wordTransform);
  }
  /**
   * Remove a function from the word transformations stack.
   *
   * @returns { (str: string) => string } A function that was removed.
   */
  popWordTransform() {
    if (!this._wordTransformer) {
      return void 0;
    }
    const transform = this._wordTransformer.transform;
    this._wordTransformer = this._wordTransformer.next;
    return transform;
  }
  /**
   * Ignore wordwrap option in followup inline additions and disable automatic wrapping.
   */
  startNoWrap() {
    this._stackItem.isNoWrap = true;
  }
  /**
   * Return automatic wrapping to behavior defined by options.
   */
  stopNoWrap() {
    this._stackItem.isNoWrap = false;
  }
  /** @returns { (str: string) => string } */
  _getCombinedWordTransformer() {
    const wt3 = this._wordTransformer ? (str) => applyTransformer(str, this._wordTransformer) : void 0;
    const ce3 = this.options.encodeCharacters;
    return wt3 ? ce3 ? (str) => ce3(wt3(str)) : wt3 : ce3;
  }
  _popStackItem() {
    const item = this._stackItem;
    this._stackItem = item.next;
    return item;
  }
  /**
   * Add a line break into currently built block.
   */
  addLineBreak() {
    if (!(this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem)) {
      return;
    }
    if (this._stackItem.isPre) {
      this._stackItem.rawText += "\n";
    } else {
      this._stackItem.inlineTextBuilder.startNewLine();
    }
  }
  /**
   * Allow to break line in case directly following text will not fit.
   */
  addWordBreakOpportunity() {
    if (this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem) {
      this._stackItem.inlineTextBuilder.wordBreakOpportunity = true;
    }
  }
  /**
   * Add a node inline into the currently built block.
   *
   * @param { string } str
   * Text content of a node to add.
   *
   * @param { object } [param1]
   * Object holding the parameters of the operation.
   *
   * @param { boolean } [param1.noWordTransform]
   * Ignore word transformers if there are any.
   * Don't encode characters as well.
   * (Use this for things like URL addresses).
   */
  addInline(str, { noWordTransform = false } = {}) {
    if (!(this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem)) {
      return;
    }
    if (this._stackItem.isPre) {
      this._stackItem.rawText += str;
      return;
    }
    if (str.length === 0 || // empty string
    this._stackItem.stashedLineBreaks && // stashed linebreaks make whitespace irrelevant
    !this.whitespaceProcessor.testContainsWords(str)) {
      return;
    }
    if (this.options.preserveNewlines) {
      const newlinesNumber = this.whitespaceProcessor.countNewlinesNoWords(str);
      if (newlinesNumber > 0) {
        this._stackItem.inlineTextBuilder.startNewLine(newlinesNumber);
        return;
      }
    }
    if (this._stackItem.stashedLineBreaks) {
      this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
    }
    this.whitespaceProcessor.shrinkWrapAdd(
      str,
      this._stackItem.inlineTextBuilder,
      noWordTransform ? void 0 : this._getCombinedWordTransformer(),
      this._stackItem.isNoWrap
    );
    this._stackItem.stashedLineBreaks = 0;
  }
  /**
   * Add a string inline into the currently built block.
   *
   * Use this for markup elements that don't have to adhere
   * to text layout rules.
   *
   * @param { string } str Text to add.
   */
  addLiteral(str) {
    if (!(this._stackItem instanceof BlockStackItem || this._stackItem instanceof ListItemStackItem || this._stackItem instanceof TableCellStackItem)) {
      return;
    }
    if (str.length === 0) {
      return;
    }
    if (this._stackItem.isPre) {
      this._stackItem.rawText += str;
      return;
    }
    if (this._stackItem.stashedLineBreaks) {
      this._stackItem.inlineTextBuilder.startNewLine(this._stackItem.stashedLineBreaks);
    }
    this.whitespaceProcessor.addLiteral(
      str,
      this._stackItem.inlineTextBuilder,
      this._stackItem.isNoWrap
    );
    this._stackItem.stashedLineBreaks = 0;
  }
  /**
   * Start building a new block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any preceding block.
   *
   * @param { number }  [param0.reservedLineLength]
   * Reserve this number of characters on each line for block markup.
   *
   * @param { boolean } [param0.isPre]
   * Should HTML whitespace be preserved inside this block.
   */
  openBlock({ leadingLineBreaks = 1, reservedLineLength = 0, isPre = false } = {}) {
    const maxLineLength = Math.max(20, this._stackItem.inlineTextBuilder.maxLineLength - reservedLineLength);
    this._stackItem = new BlockStackItem(
      this.options,
      this._stackItem,
      leadingLineBreaks,
      maxLineLength
    );
    if (isPre) {
      this._stackItem.isPre = true;
    }
  }
  /**
   * Finalize currently built block, add it's content to the parent block.
   *
   * @param { object } [param0]
   * Object holding the parameters of the block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This block should have at least this number of line breaks to separate it from any following block.
   *
   * @param { (str: string) => string } [param0.blockTransform]
   * A function to transform the block text before adding to the parent block.
   * This happens after word wrap and should be used in combination with reserved line length
   * in order to keep line lengths correct.
   * Used for whole block markup.
   */
  closeBlock({ trailingLineBreaks = 1, blockTransform = void 0 } = {}) {
    const block = this._popStackItem();
    const blockText = blockTransform ? blockTransform(getText(block)) : getText(block);
    addText(this._stackItem, blockText, block.leadingLineBreaks, Math.max(block.stashedLineBreaks, trailingLineBreaks));
  }
  /**
   * Start building a new list.
   *
   * @param { object } [param0]
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.maxPrefixLength]
   * Length of the longest list item prefix.
   * If not supplied or too small then list items won't be aligned properly.
   *
   * @param { 'left' | 'right' } [param0.prefixAlign]
   * Specify how prefixes of different lengths have to be aligned
   * within a column.
   *
   * @param { number } [param0.interRowLineBreaks]
   * Minimum number of line breaks between list items.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any preceding block.
   */
  openList({ maxPrefixLength = 0, prefixAlign = "left", interRowLineBreaks = 1, leadingLineBreaks = 2 } = {}) {
    this._stackItem = new ListStackItem(this.options, this._stackItem, {
      interRowLineBreaks,
      leadingLineBreaks,
      maxLineLength: this._stackItem.inlineTextBuilder.maxLineLength,
      maxPrefixLength,
      prefixAlign
    });
  }
  /**
   * Start building a new list item.
   *
   * @param {object} param0
   * Object holding the parameters of the list item.
   *
   * @param { string } [param0.prefix]
   * Prefix for this list item (item number, bullet point, etc).
   */
  openListItem({ prefix = "" } = {}) {
    if (!(this._stackItem instanceof ListStackItem)) {
      throw new Error("Can't add a list item to something that is not a list! Check the formatter.");
    }
    const list = this._stackItem;
    const prefixLength = Math.max(prefix.length, list.maxPrefixLength);
    const maxLineLength = Math.max(20, list.inlineTextBuilder.maxLineLength - prefixLength);
    this._stackItem = new ListItemStackItem(this.options, list, {
      prefix,
      maxLineLength,
      leadingLineBreaks: list.interRowLineBreaks
    });
  }
  /**
   * Finalize currently built list item, add it's content to the parent list.
   */
  closeListItem() {
    const listItem = this._popStackItem();
    const list = listItem.next;
    const prefixLength = Math.max(listItem.prefix.length, list.maxPrefixLength);
    const spacing = "\n" + " ".repeat(prefixLength);
    const prefix = list.prefixAlign === "right" ? listItem.prefix.padStart(prefixLength) : listItem.prefix.padEnd(prefixLength);
    const text2 = prefix + getText(listItem).replace(/\n/g, spacing);
    addText(
      list,
      text2,
      listItem.leadingLineBreaks,
      Math.max(listItem.stashedLineBreaks, list.interRowLineBreaks)
    );
  }
  /**
   * Finalize currently built list, add it's content to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the list.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This list should have at least this number of line breaks to separate it from any following block.
   */
  closeList({ trailingLineBreaks = 2 } = {}) {
    const list = this._popStackItem();
    const text2 = getText(list);
    if (text2) {
      addText(this._stackItem, text2, list.leadingLineBreaks, trailingLineBreaks);
    }
  }
  /**
   * Start building a table.
   */
  openTable() {
    this._stackItem = new TableStackItem(this._stackItem);
  }
  /**
   * Start building a table row.
   */
  openTableRow() {
    if (!(this._stackItem instanceof TableStackItem)) {
      throw new Error("Can't add a table row to something that is not a table! Check the formatter.");
    }
    this._stackItem = new TableRowStackItem(this._stackItem);
  }
  /**
   * Start building a table cell.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.maxColumnWidth]
   * Wrap cell content to this width. Fall back to global wordwrap value if undefined.
   */
  openTableCell({ maxColumnWidth = void 0 } = {}) {
    if (!(this._stackItem instanceof TableRowStackItem)) {
      throw new Error("Can't add a table cell to something that is not a table row! Check the formatter.");
    }
    this._stackItem = new TableCellStackItem(this.options, this._stackItem, maxColumnWidth);
  }
  /**
   * Finalize currently built table cell and add it to parent table row's cells.
   *
   * @param { object } [param0]
   * Object holding the parameters of the cell.
   *
   * @param { number } [param0.colspan] How many columns this cell should occupy.
   * @param { number } [param0.rowspan] How many rows this cell should occupy.
   */
  closeTableCell({ colspan = 1, rowspan = 1 } = {}) {
    const cell = this._popStackItem();
    const text2 = trimCharacter(getText(cell), "\n");
    cell.next.cells.push({ colspan, rowspan, text: text2 });
  }
  /**
   * Finalize currently built table row and add it to parent table's rows.
   */
  closeTableRow() {
    const row = this._popStackItem();
    row.next.rows.push(row.cells);
  }
  /**
   * Finalize currently built table and add the rendered text to the parent block.
   *
   * @param { object } param0
   * Object holding the parameters of the table.
   *
   * @param { TablePrinter } param0.tableToString
   * A function to convert a table of stringified cells into a complete table.
   *
   * @param { number } [param0.leadingLineBreaks]
   * This table should have at least this number of line breaks to separate if from any preceding block.
   *
   * @param { number } [param0.trailingLineBreaks]
   * This table should have at least this number of line breaks to separate it from any following block.
   */
  closeTable({ tableToString: tableToString2, leadingLineBreaks = 2, trailingLineBreaks = 2 }) {
    const table = this._popStackItem();
    const output = tableToString2(table.rows);
    if (output) {
      addText(this._stackItem, output, leadingLineBreaks, trailingLineBreaks);
    }
  }
  /**
   * Return the rendered text content of this builder.
   *
   * @returns { string }
   */
  toString() {
    return getText(this._stackItem.getRoot());
  }
};
function getText(stackItem) {
  if (!(stackItem instanceof BlockStackItem || stackItem instanceof ListItemStackItem || stackItem instanceof TableCellStackItem)) {
    throw new Error("Only blocks, list items and table cells can be requested for text contents.");
  }
  return stackItem.inlineTextBuilder.isEmpty() ? stackItem.rawText : stackItem.rawText + stackItem.inlineTextBuilder.toString();
}
function addText(stackItem, text2, leadingLineBreaks, trailingLineBreaks) {
  if (!(stackItem instanceof BlockStackItem || stackItem instanceof ListItemStackItem || stackItem instanceof TableCellStackItem)) {
    throw new Error("Only blocks, list items and table cells can contain text.");
  }
  const parentText = getText(stackItem);
  const lineBreaks = Math.max(stackItem.stashedLineBreaks, leadingLineBreaks);
  stackItem.inlineTextBuilder.clear();
  if (parentText) {
    stackItem.rawText = parentText + "\n".repeat(lineBreaks) + text2;
  } else {
    stackItem.rawText = text2;
    stackItem.leadingLineBreaks = lineBreaks;
  }
  stackItem.stashedLineBreaks = trailingLineBreaks;
}
function applyTransformer(str, transformer) {
  return transformer ? applyTransformer(transformer.transform(str), transformer.next) : str;
}
function compile$1(options = {}) {
  const selectorsWithoutFormat = options.selectors.filter((s2) => !s2.format);
  if (selectorsWithoutFormat.length) {
    throw new Error(
      "Following selectors have no specified format: " + selectorsWithoutFormat.map((s2) => `\`${s2.selector}\``).join(", ")
    );
  }
  const picker = new DecisionTree(
    options.selectors.map((s2) => [s2.selector, s2])
  ).build(hp2Builder);
  if (typeof options.encodeCharacters !== "function") {
    options.encodeCharacters = makeReplacerFromDict(options.encodeCharacters);
  }
  const baseSelectorsPicker = new DecisionTree(
    options.baseElements.selectors.map((s2, i) => [s2, i + 1])
  ).build(hp2Builder);
  function findBaseElements(dom) {
    return findBases(dom, options, baseSelectorsPicker);
  }
  const limitedWalk = limitedDepthRecursive(
    options.limits.maxDepth,
    recursiveWalk,
    function(dom, builder) {
      builder.addInline(options.limits.ellipsis || "");
    }
  );
  return function(html, metadata = void 0) {
    return process2(html, metadata, options, picker, findBaseElements, limitedWalk);
  };
}
function process2(html, metadata, options, picker, findBaseElements, walk) {
  const maxInputLength = options.limits.maxInputLength;
  if (maxInputLength && html && html.length > maxInputLength) {
    console.warn(
      `Input length ${html.length} is above allowed limit of ${maxInputLength}. Truncating without ellipsis.`
    );
    html = html.substring(0, maxInputLength);
  }
  const document = parseDocument(html, { decodeEntities: options.decodeEntities });
  const bases = findBaseElements(document.children);
  const builder = new BlockTextBuilder(options, picker, metadata);
  walk(bases, builder);
  return builder.toString();
}
function findBases(dom, options, baseSelectorsPicker) {
  const results = [];
  function recursiveWalk2(walk, dom2) {
    dom2 = dom2.slice(0, options.limits.maxChildNodes);
    for (const elem of dom2) {
      if (elem.type !== "tag") {
        continue;
      }
      const pickedSelectorIndex = baseSelectorsPicker.pick1(elem);
      if (pickedSelectorIndex > 0) {
        results.push({ selectorIndex: pickedSelectorIndex, element: elem });
      } else if (elem.children) {
        walk(elem.children);
      }
      if (results.length >= options.limits.maxBaseElements) {
        return;
      }
    }
  }
  const limitedWalk = limitedDepthRecursive(
    options.limits.maxDepth,
    recursiveWalk2
  );
  limitedWalk(dom);
  if (options.baseElements.orderBy !== "occurrence") {
    results.sort((a, b3) => a.selectorIndex - b3.selectorIndex);
  }
  return options.baseElements.returnDomByDefault && results.length === 0 ? dom : results.map((x2) => x2.element);
}
function recursiveWalk(walk, dom, builder) {
  if (!dom) {
    return;
  }
  const options = builder.options;
  const tooManyChildNodes = dom.length > options.limits.maxChildNodes;
  if (tooManyChildNodes) {
    dom = dom.slice(0, options.limits.maxChildNodes);
    dom.push({
      data: options.limits.ellipsis,
      type: "text"
    });
  }
  for (const elem of dom) {
    switch (elem.type) {
      case "text": {
        builder.addInline(elem.data);
        break;
      }
      case "tag": {
        const tagDefinition = builder.picker.pick1(elem);
        const format2 = options.formatters[tagDefinition.format];
        format2(elem, walk, builder, tagDefinition.options || {});
        break;
      }
    }
  }
  return;
}
function makeReplacerFromDict(dict) {
  if (!dict || Object.keys(dict).length === 0) {
    return void 0;
  }
  const entries = Object.entries(dict).filter(([, v2]) => v2 !== false);
  const regex = new RegExp(
    entries.map(([c2]) => `(${unicodeEscape([...c2][0])})`).join("|"),
    "g"
  );
  const values = entries.map(([, v2]) => v2);
  const replacer = (m2, ...cgs) => values[cgs.findIndex((cg) => cg)];
  return (str) => str.replace(regex, replacer);
}
function formatSkip(elem, walk, builder, formatOptions) {
}
function formatInlineString(elem, walk, builder, formatOptions) {
  builder.addLiteral(formatOptions.string || "");
}
function formatBlockString(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.addLiteral(formatOptions.string || "");
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatInline(elem, walk, builder, formatOptions) {
  walk(elem.children, builder);
}
function formatBlock$1(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function renderOpenTag(elem) {
  const attrs = elem.attribs && elem.attribs.length ? " " + Object.entries(elem.attribs).map(([k2, v2]) => v2 === "" ? k2 : `${k2}=${v2.replace(/"/g, "&quot;")}`).join(" ") : "";
  return `<${elem.name}${attrs}>`;
}
function renderCloseTag(elem) {
  return `</${elem.name}>`;
}
function formatInlineTag(elem, walk, builder, formatOptions) {
  builder.startNoWrap();
  builder.addLiteral(renderOpenTag(elem));
  builder.stopNoWrap();
  walk(elem.children, builder);
  builder.startNoWrap();
  builder.addLiteral(renderCloseTag(elem));
  builder.stopNoWrap();
}
function formatBlockTag(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.startNoWrap();
  builder.addLiteral(renderOpenTag(elem));
  builder.stopNoWrap();
  walk(elem.children, builder);
  builder.startNoWrap();
  builder.addLiteral(renderCloseTag(elem));
  builder.stopNoWrap();
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatInlineHtml(elem, walk, builder, formatOptions) {
  builder.startNoWrap();
  builder.addLiteral(
    render(elem, { decodeEntities: builder.options.decodeEntities })
  );
  builder.stopNoWrap();
}
function formatBlockHtml(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.startNoWrap();
  builder.addLiteral(
    render(elem, { decodeEntities: builder.options.decodeEntities })
  );
  builder.stopNoWrap();
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatInlineSurround(elem, walk, builder, formatOptions) {
  builder.addLiteral(formatOptions.prefix || "");
  walk(elem.children, builder);
  builder.addLiteral(formatOptions.suffix || "");
}
var genericFormatters = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  block: formatBlock$1,
  blockHtml: formatBlockHtml,
  blockString: formatBlockString,
  blockTag: formatBlockTag,
  inline: formatInline,
  inlineHtml: formatInlineHtml,
  inlineString: formatInlineString,
  inlineSurround: formatInlineSurround,
  inlineTag: formatInlineTag,
  skip: formatSkip
});
function getRow(matrix, j3) {
  if (!matrix[j3]) {
    matrix[j3] = [];
  }
  return matrix[j3];
}
function findFirstVacantIndex(row, x2 = 0) {
  while (row[x2]) {
    x2++;
  }
  return x2;
}
function transposeInPlace(matrix, maxSize) {
  for (let i = 0; i < maxSize; i++) {
    const rowI = getRow(matrix, i);
    for (let j3 = 0; j3 < i; j3++) {
      const rowJ = getRow(matrix, j3);
      if (rowI[j3] || rowJ[i]) {
        const temp = rowI[j3];
        rowI[j3] = rowJ[i];
        rowJ[i] = temp;
      }
    }
  }
}
function putCellIntoLayout(cell, layout, baseRow, baseCol) {
  for (let r2 = 0; r2 < cell.rowspan; r2++) {
    const layoutRow = getRow(layout, baseRow + r2);
    for (let c2 = 0; c2 < cell.colspan; c2++) {
      layoutRow[baseCol + c2] = cell;
    }
  }
}
function getOrInitOffset(offsets, index) {
  if (offsets[index] === void 0) {
    offsets[index] = index === 0 ? 0 : 1 + getOrInitOffset(offsets, index - 1);
  }
  return offsets[index];
}
function updateOffset(offsets, base, span, value) {
  offsets[base + span] = Math.max(
    getOrInitOffset(offsets, base + span),
    getOrInitOffset(offsets, base) + value
  );
}
function tableToString(tableRows, rowSpacing, colSpacing) {
  const layout = [];
  let colNumber = 0;
  const rowNumber = tableRows.length;
  const rowOffsets = [0];
  for (let j3 = 0; j3 < rowNumber; j3++) {
    const layoutRow = getRow(layout, j3);
    const cells = tableRows[j3];
    let x2 = 0;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      x2 = findFirstVacantIndex(layoutRow, x2);
      putCellIntoLayout(cell, layout, j3, x2);
      x2 += cell.colspan;
      cell.lines = cell.text.split("\n");
      const cellHeight = cell.lines.length;
      updateOffset(rowOffsets, j3, cell.rowspan, cellHeight + rowSpacing);
    }
    colNumber = layoutRow.length > colNumber ? layoutRow.length : colNumber;
  }
  transposeInPlace(layout, rowNumber > colNumber ? rowNumber : colNumber);
  const outputLines = [];
  const colOffsets = [0];
  for (let x2 = 0; x2 < colNumber; x2++) {
    let y2 = 0;
    let cell;
    const rowsInThisColumn = Math.min(rowNumber, layout[x2].length);
    while (y2 < rowsInThisColumn) {
      cell = layout[x2][y2];
      if (cell) {
        if (!cell.rendered) {
          let cellWidth = 0;
          for (let j3 = 0; j3 < cell.lines.length; j3++) {
            const line = cell.lines[j3];
            const lineOffset = rowOffsets[y2] + j3;
            outputLines[lineOffset] = (outputLines[lineOffset] || "").padEnd(colOffsets[x2]) + line;
            cellWidth = line.length > cellWidth ? line.length : cellWidth;
          }
          updateOffset(colOffsets, x2, cell.colspan, cellWidth + colSpacing);
          cell.rendered = true;
        }
        y2 += cell.rowspan;
      } else {
        const lineOffset = rowOffsets[y2];
        outputLines[lineOffset] = outputLines[lineOffset] || "";
        y2++;
      }
    }
  }
  return outputLines.join("\n");
}
function formatLineBreak(elem, walk, builder, formatOptions) {
  builder.addLineBreak();
}
function formatWbr(elem, walk, builder, formatOptions) {
  builder.addWordBreakOpportunity();
}
function formatHorizontalLine(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  builder.addInline("-".repeat(formatOptions.length || builder.options.wordwrap || 40));
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatParagraph(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatPre(elem, walk, builder, formatOptions) {
  builder.openBlock({
    isPre: true,
    leadingLineBreaks: formatOptions.leadingLineBreaks || 2
  });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatHeading(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks || 2 });
  if (formatOptions.uppercase !== false) {
    builder.pushWordTransform((str) => str.toUpperCase());
    walk(elem.children, builder);
    builder.popWordTransform();
  } else {
    walk(elem.children, builder);
  }
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks || 2 });
}
function formatBlockquote(elem, walk, builder, formatOptions) {
  builder.openBlock({
    leadingLineBreaks: formatOptions.leadingLineBreaks || 2,
    reservedLineLength: 2
  });
  walk(elem.children, builder);
  builder.closeBlock({
    trailingLineBreaks: formatOptions.trailingLineBreaks || 2,
    blockTransform: (str) => (formatOptions.trimEmptyLines !== false ? trimCharacter(str, "\n") : str).split("\n").map((line) => "> " + line).join("\n")
  });
}
function withBrackets(str, brackets) {
  if (!brackets) {
    return str;
  }
  const lbr = typeof brackets[0] === "string" ? brackets[0] : "[";
  const rbr = typeof brackets[1] === "string" ? brackets[1] : "]";
  return lbr + str + rbr;
}
function pathRewrite(path4, rewriter, baseUrl, metadata, elem) {
  const modifiedPath = typeof rewriter === "function" ? rewriter(path4, metadata, elem) : path4;
  return modifiedPath[0] === "/" && baseUrl ? trimCharacterEnd(baseUrl, "/") + modifiedPath : modifiedPath;
}
function formatImage(elem, walk, builder, formatOptions) {
  const attribs = elem.attribs || {};
  const alt = attribs.alt ? attribs.alt : "";
  const src = !attribs.src ? "" : pathRewrite(attribs.src, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
  const text2 = !src ? alt : !alt ? withBrackets(src, formatOptions.linkBrackets) : alt + " " + withBrackets(src, formatOptions.linkBrackets);
  builder.addInline(text2, { noWordTransform: true });
}
function formatAnchor(elem, walk, builder, formatOptions) {
  function getHref() {
    if (formatOptions.ignoreHref) {
      return "";
    }
    if (!elem.attribs || !elem.attribs.href) {
      return "";
    }
    let href2 = elem.attribs.href.replace(/^mailto:/, "");
    if (formatOptions.noAnchorUrl && href2[0] === "#") {
      return "";
    }
    href2 = pathRewrite(href2, formatOptions.pathRewrite, formatOptions.baseUrl, builder.metadata, elem);
    return href2;
  }
  const href = getHref();
  if (!href) {
    walk(elem.children, builder);
  } else {
    let text2 = "";
    builder.pushWordTransform(
      (str) => {
        if (str) {
          text2 += str;
        }
        return str;
      }
    );
    walk(elem.children, builder);
    builder.popWordTransform();
    const hideSameLink = formatOptions.hideLinkHrefIfSameAsText && href === text2;
    if (!hideSameLink) {
      builder.addInline(
        !text2 ? href : " " + withBrackets(href, formatOptions.linkBrackets),
        { noWordTransform: true }
      );
    }
  }
}
function formatList(elem, walk, builder, formatOptions, nextPrefixCallback) {
  const isNestedList = get(elem, ["parent", "name"]) === "li";
  let maxPrefixLength = 0;
  const listItems = (elem.children || []).filter((child) => child.type !== "text" || !/^\s*$/.test(child.data)).map(function(child) {
    if (child.name !== "li") {
      return { node: child, prefix: "" };
    }
    const prefix = isNestedList ? nextPrefixCallback().trimStart() : nextPrefixCallback();
    if (prefix.length > maxPrefixLength) {
      maxPrefixLength = prefix.length;
    }
    return { node: child, prefix };
  });
  if (!listItems.length) {
    return;
  }
  builder.openList({
    interRowLineBreaks: 1,
    leadingLineBreaks: isNestedList ? 1 : formatOptions.leadingLineBreaks || 2,
    maxPrefixLength,
    prefixAlign: "left"
  });
  for (const { node, prefix } of listItems) {
    builder.openListItem({ prefix });
    walk([node], builder);
    builder.closeListItem();
  }
  builder.closeList({ trailingLineBreaks: isNestedList ? 1 : formatOptions.trailingLineBreaks || 2 });
}
function formatUnorderedList(elem, walk, builder, formatOptions) {
  const prefix = formatOptions.itemPrefix || " * ";
  return formatList(elem, walk, builder, formatOptions, () => prefix);
}
function formatOrderedList(elem, walk, builder, formatOptions) {
  let nextIndex = Number(elem.attribs.start || "1");
  const indexFunction = getOrderedListIndexFunction(elem.attribs.type);
  const nextPrefixCallback = () => " " + indexFunction(nextIndex++) + ". ";
  return formatList(elem, walk, builder, formatOptions, nextPrefixCallback);
}
function getOrderedListIndexFunction(olType = "1") {
  switch (olType) {
    case "a":
      return (i) => numberToLetterSequence(i, "a");
    case "A":
      return (i) => numberToLetterSequence(i, "A");
    case "i":
      return (i) => numberToRoman(i).toLowerCase();
    case "I":
      return (i) => numberToRoman(i);
    case "1":
    default:
      return (i) => i.toString();
  }
}
function splitClassesAndIds(selectors) {
  const classes = [];
  const ids = [];
  for (const selector of selectors) {
    if (selector.startsWith(".")) {
      classes.push(selector.substring(1));
    } else if (selector.startsWith("#")) {
      ids.push(selector.substring(1));
    }
  }
  return { classes, ids };
}
function isDataTable(attr, tables) {
  if (tables === true) {
    return true;
  }
  if (!attr) {
    return false;
  }
  const { classes, ids } = splitClassesAndIds(tables);
  const attrClasses = (attr["class"] || "").split(" ");
  const attrIds = (attr["id"] || "").split(" ");
  return attrClasses.some((x2) => classes.includes(x2)) || attrIds.some((x2) => ids.includes(x2));
}
function formatTable(elem, walk, builder, formatOptions) {
  return isDataTable(elem.attribs, builder.options.tables) ? formatDataTable(elem, walk, builder, formatOptions) : formatBlock(elem, walk, builder, formatOptions);
}
function formatBlock(elem, walk, builder, formatOptions) {
  builder.openBlock({ leadingLineBreaks: formatOptions.leadingLineBreaks });
  walk(elem.children, builder);
  builder.closeBlock({ trailingLineBreaks: formatOptions.trailingLineBreaks });
}
function formatDataTable(elem, walk, builder, formatOptions) {
  builder.openTable();
  elem.children.forEach(walkTable);
  builder.closeTable({
    tableToString: (rows) => tableToString(rows, formatOptions.rowSpacing ?? 0, formatOptions.colSpacing ?? 3),
    leadingLineBreaks: formatOptions.leadingLineBreaks,
    trailingLineBreaks: formatOptions.trailingLineBreaks
  });
  function formatCell(cellNode) {
    const colspan = +get(cellNode, ["attribs", "colspan"]) || 1;
    const rowspan = +get(cellNode, ["attribs", "rowspan"]) || 1;
    builder.openTableCell({ maxColumnWidth: formatOptions.maxColumnWidth });
    walk(cellNode.children, builder);
    builder.closeTableCell({ colspan, rowspan });
  }
  function walkTable(elem2) {
    if (elem2.type !== "tag") {
      return;
    }
    const formatHeaderCell = formatOptions.uppercaseHeaderCells !== false ? (cellNode) => {
      builder.pushWordTransform((str) => str.toUpperCase());
      formatCell(cellNode);
      builder.popWordTransform();
    } : formatCell;
    switch (elem2.name) {
      case "thead":
      case "tbody":
      case "tfoot":
      case "center":
        elem2.children.forEach(walkTable);
        return;
      case "tr": {
        builder.openTableRow();
        for (const childOfTr of elem2.children) {
          if (childOfTr.type !== "tag") {
            continue;
          }
          switch (childOfTr.name) {
            case "th": {
              formatHeaderCell(childOfTr);
              break;
            }
            case "td": {
              formatCell(childOfTr);
              break;
            }
          }
        }
        builder.closeTableRow();
        break;
      }
    }
  }
}
var textFormatters = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  anchor: formatAnchor,
  blockquote: formatBlockquote,
  dataTable: formatDataTable,
  heading: formatHeading,
  horizontalLine: formatHorizontalLine,
  image: formatImage,
  lineBreak: formatLineBreak,
  orderedList: formatOrderedList,
  paragraph: formatParagraph,
  pre: formatPre,
  table: formatTable,
  unorderedList: formatUnorderedList,
  wbr: formatWbr
});
var DEFAULT_OPTIONS = {
  baseElements: {
    selectors: ["body"],
    orderBy: "selectors",
    // 'selectors' | 'occurrence'
    returnDomByDefault: true
  },
  decodeEntities: true,
  encodeCharacters: {},
  formatters: {},
  limits: {
    ellipsis: "...",
    maxBaseElements: void 0,
    maxChildNodes: void 0,
    maxDepth: void 0,
    maxInputLength: 1 << 24
    // 16_777_216
  },
  longWordSplit: {
    forceWrapOnLimit: false,
    wrapCharacters: []
  },
  preserveNewlines: false,
  selectors: [
    { selector: "*", format: "inline" },
    {
      selector: "a",
      format: "anchor",
      options: {
        baseUrl: null,
        hideLinkHrefIfSameAsText: false,
        ignoreHref: false,
        linkBrackets: ["[", "]"],
        noAnchorUrl: true
      }
    },
    { selector: "article", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "aside", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: "blockquote",
      format: "blockquote",
      options: { leadingLineBreaks: 2, trailingLineBreaks: 2, trimEmptyLines: true }
    },
    { selector: "br", format: "lineBreak" },
    { selector: "div", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "footer", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "form", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "h1", format: "heading", options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h2", format: "heading", options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h3", format: "heading", options: { leadingLineBreaks: 3, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h4", format: "heading", options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h5", format: "heading", options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: "h6", format: "heading", options: { leadingLineBreaks: 2, trailingLineBreaks: 2, uppercase: true } },
    { selector: "header", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: "hr",
      format: "horizontalLine",
      options: { leadingLineBreaks: 2, length: void 0, trailingLineBreaks: 2 }
    },
    {
      selector: "img",
      format: "image",
      options: { baseUrl: null, linkBrackets: ["[", "]"] }
    },
    { selector: "main", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    { selector: "nav", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: "ol",
      format: "orderedList",
      options: { leadingLineBreaks: 2, trailingLineBreaks: 2 }
    },
    { selector: "p", format: "paragraph", options: { leadingLineBreaks: 2, trailingLineBreaks: 2 } },
    { selector: "pre", format: "pre", options: { leadingLineBreaks: 2, trailingLineBreaks: 2 } },
    { selector: "section", format: "block", options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
    {
      selector: "table",
      format: "table",
      options: {
        colSpacing: 3,
        leadingLineBreaks: 2,
        maxColumnWidth: 60,
        rowSpacing: 0,
        trailingLineBreaks: 2,
        uppercaseHeaderCells: true
      }
    },
    {
      selector: "ul",
      format: "unorderedList",
      options: { itemPrefix: " * ", leadingLineBreaks: 2, trailingLineBreaks: 2 }
    },
    { selector: "wbr", format: "wbr" }
  ],
  tables: [],
  // deprecated
  whitespaceCharacters: " 	\r\n\f\u200B",
  wordwrap: 80
};
var concatMerge = (acc, src, options) => [...acc, ...src];
var overwriteMerge = (acc, src, options) => [...src];
var selectorsMerge = (acc, src, options) => acc.some((s2) => typeof s2 === "object") ? concatMerge(acc, src) : overwriteMerge(acc, src);
function compile(options = {}) {
  options = (0, import_deepmerge.default)(
    DEFAULT_OPTIONS,
    options,
    {
      arrayMerge: overwriteMerge,
      customMerge: (key) => key === "selectors" ? selectorsMerge : void 0
    }
  );
  options.formatters = Object.assign({}, genericFormatters, textFormatters, options.formatters);
  options.selectors = mergeDuplicatesPreferLast(options.selectors, (s2) => s2.selector);
  handleDeprecatedOptions(options);
  return compile$1(options);
}
function convert(html, options = {}, metadata = void 0) {
  return compile(options)(html, metadata);
}
function handleDeprecatedOptions(options) {
  if (options.tags) {
    const tagDefinitions = Object.entries(options.tags).map(
      ([selector, definition]) => ({ ...definition, selector: selector || "*" })
    );
    options.selectors.push(...tagDefinitions);
    options.selectors = mergeDuplicatesPreferLast(options.selectors, (s2) => s2.selector);
  }
  function set(obj, path4, value) {
    const valueKey = path4.pop();
    for (const key of path4) {
      let nested = obj[key];
      if (!nested) {
        nested = {};
        obj[key] = nested;
      }
      obj = nested;
    }
    obj[valueKey] = value;
  }
  if (options["baseElement"]) {
    const baseElement = options["baseElement"];
    set(
      options,
      ["baseElements", "selectors"],
      Array.isArray(baseElement) ? baseElement : [baseElement]
    );
  }
  if (options["returnDomByDefault"] !== void 0) {
    set(options, ["baseElements", "returnDomByDefault"], options["returnDomByDefault"]);
  }
  for (const definition of options.selectors) {
    if (definition.format === "anchor" && get(definition, ["options", "noLinkBrackets"])) {
      set(definition, ["options", "linkBrackets"], false);
    }
  }
}

// node_modules/@react-email/render/dist/node/index.mjs
import { Suspense } from "react";

// node_modules/prettier/standalone.mjs
var yu = Object.create;
var He = Object.defineProperty;
var Au = Object.getOwnPropertyDescriptor;
var Bu = Object.getOwnPropertyNames;
var wu = Object.getPrototypeOf;
var xu = Object.prototype.hasOwnProperty;
var sr = (e2) => {
  throw TypeError(e2);
};
var _u = (e2, t9) => () => (e2 && (t9 = e2(e2 = 0)), t9);
var At = (e2, t9) => () => (t9 || e2((t9 = { exports: {} }).exports, t9), t9.exports);
var We = (e2, t9) => {
  for (var r2 in t9) He(e2, r2, { get: t9[r2], enumerable: true });
};
var ar = (e2, t9, r2, n2) => {
  if (t9 && typeof t9 == "object" || typeof t9 == "function") for (let o2 of Bu(t9)) !xu.call(e2, o2) && o2 !== r2 && He(e2, o2, { get: () => t9[o2], enumerable: !(n2 = Au(t9, o2)) || n2.enumerable });
  return e2;
};
var Me = (e2, t9, r2) => (r2 = e2 != null ? yu(wu(e2)) : {}, ar(t9 || !e2 || !e2.__esModule ? He(r2, "default", { value: e2, enumerable: true }) : r2, e2));
var vu = (e2) => ar(He({}, "__esModule", { value: true }), e2);
var bu = (e2, t9, r2) => t9.has(e2) || sr("Cannot " + r2);
var Dr = (e2, t9, r2) => t9.has(e2) ? sr("Cannot add the same private member more than once") : t9 instanceof WeakSet ? t9.add(e2) : t9.set(e2, r2);
var pe = (e2, t9, r2) => (bu(e2, t9, "access private method"), r2);
var it = At((ia2, sn2) => {
  "use strict";
  var on2 = new Proxy(String, { get: () => on2 });
  sn2.exports = on2;
});
var Tn = {};
We(Tn, { default: () => _o, shouldHighlight: () => xo });
var xo;
var _o;
var kn = _u(() => {
  xo = () => false, _o = String;
});
var Pn = At((bD, Xt) => {
  var g = String, Ln2 = function() {
    return { isColorSupported: false, reset: g, bold: g, dim: g, italic: g, underline: g, inverse: g, hidden: g, strikethrough: g, black: g, red: g, green: g, yellow: g, blue: g, magenta: g, cyan: g, white: g, gray: g, bgBlack: g, bgRed: g, bgGreen: g, bgYellow: g, bgBlue: g, bgMagenta: g, bgCyan: g, bgWhite: g };
  };
  Xt.exports = Ln2();
  Xt.exports.createColors = Ln2;
});
var $n = At((Ct2) => {
  "use strict";
  Object.defineProperty(Ct2, "__esModule", { value: true });
  Ct2.codeFrameColumns = Mn2;
  Ct2.default = To2;
  var In2 = (kn(), vu(Tn)), Hn2 = vo2(Pn(), true);
  function Wn2(e2) {
    if (typeof WeakMap != "function") return null;
    var t9 = /* @__PURE__ */ new WeakMap(), r2 = /* @__PURE__ */ new WeakMap();
    return (Wn2 = function(n2) {
      return n2 ? r2 : t9;
    })(e2);
  }
  function vo2(e2, t9) {
    if (!t9 && e2 && e2.__esModule) return e2;
    if (e2 === null || typeof e2 != "object" && typeof e2 != "function") return { default: e2 };
    var r2 = Wn2(t9);
    if (r2 && r2.has(e2)) return r2.get(e2);
    var n2 = { __proto__: null }, o2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in e2) if (u !== "default" && {}.hasOwnProperty.call(e2, u)) {
      var i = o2 ? Object.getOwnPropertyDescriptor(e2, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n2, u, i) : n2[u] = e2[u];
    }
    return n2.default = e2, r2 && r2.set(e2, n2), n2;
  }
  var bo2 = Hn2.default, Rn2 = (e2, t9) => (r2) => e2(t9(r2)), Zt;
  function Oo(e2) {
    if (e2) {
      var t9;
      return (t9 = Zt) != null || (Zt = (0, Hn2.createColors)(true)), Zt;
    }
    return bo2;
  }
  var Yn2 = false;
  function So2(e2) {
    return { gutter: e2.gray, marker: Rn2(e2.red, e2.bold), message: Rn2(e2.red, e2.bold) };
  }
  var jn2 = /\r\n|[\n\r\u2028\u2029]/;
  function No2(e2, t9, r2) {
    let n2 = Object.assign({ column: 0, line: -1 }, e2.start), o2 = Object.assign({}, n2, e2.end), { linesAbove: u = 2, linesBelow: i = 3 } = r2 || {}, s2 = n2.line, a = n2.column, D = o2.line, l2 = o2.column, d = Math.max(s2 - (u + 1), 0), f = Math.min(t9.length, D + i);
    s2 === -1 && (d = 0), D === -1 && (f = t9.length);
    let p = D - s2, c2 = {};
    if (p) for (let F = 0; F <= p; F++) {
      let m2 = F + s2;
      if (!a) c2[m2] = true;
      else if (F === 0) {
        let E2 = t9[m2 - 1].length;
        c2[m2] = [a, E2 - a + 1];
      } else if (F === p) c2[m2] = [0, l2];
      else {
        let E2 = t9[m2 - F].length;
        c2[m2] = [0, E2];
      }
    }
    else a === l2 ? a ? c2[s2] = [a, 0] : c2[s2] = true : c2[s2] = [a, l2 - a];
    return { start: d, end: f, markerLines: c2 };
  }
  function Mn2(e2, t9, r2 = {}) {
    let n2 = (r2.highlightCode || r2.forceColor) && (0, In2.shouldHighlight)(r2), o2 = Oo(r2.forceColor), u = So2(o2), i = (F, m2) => n2 ? F(m2) : m2, s2 = e2.split(jn2), { start: a, end: D, markerLines: l2 } = No2(t9, s2, r2), d = t9.start && typeof t9.start.column == "number", f = String(D).length, c2 = (n2 ? (0, In2.default)(e2, r2) : e2).split(jn2, D).slice(a, D).map((F, m2) => {
      let E2 = a + 1 + m2, w2 = ` ${` ${E2}`.slice(-f)} |`, h2 = l2[E2], C = !l2[E2 + 1];
      if (h2) {
        let k2 = "";
        if (Array.isArray(h2)) {
          let v2 = F.slice(0, Math.max(h2[0] - 1, 0)).replace(/[^\t]/g, " "), $2 = h2[1] || 1;
          k2 = [`
 `, i(u.gutter, w2.replace(/\d/g, " ")), " ", v2, i(u.marker, "^").repeat($2)].join(""), C && r2.message && (k2 += " " + i(u.message, r2.message));
        }
        return [i(u.marker, ">"), i(u.gutter, w2), F.length > 0 ? ` ${F}` : "", k2].join("");
      } else return ` ${i(u.gutter, w2)}${F.length > 0 ? ` ${F}` : ""}`;
    }).join(`
`);
    return r2.message && !d && (c2 = `${" ".repeat(f + 1)}${r2.message}
${c2}`), n2 ? o2.reset(c2) : c2;
  }
  function To2(e2, t9, r2, n2 = {}) {
    if (!Yn2) {
      Yn2 = true;
      let u = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
      {
        let i = new Error(u);
        i.name = "DeprecationWarning", console.warn(new Error(u));
      }
    }
    return r2 = Math.max(r2, 0), Mn2(e2, { start: { column: r2, line: t9 } }, n2);
  }
});
var ir = {};
We(ir, { __debug: () => di, check: () => fi, doc: () => nr, format: () => gu, formatWithCursor: () => Cu, getSupportInfo: () => pi, util: () => or6, version: () => fu });
var Ou = (e2, t9, r2, n2) => {
  if (!(e2 && t9 == null)) return t9.replaceAll ? t9.replaceAll(r2, n2) : r2.global ? t9.replace(r2, n2) : t9.split(r2).join(n2);
};
var ne3 = Ou;
function Z() {
}
Z.prototype = { diff: function(t9, r2) {
  var n2, o2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, u = o2.callback;
  typeof o2 == "function" && (u = o2, o2 = {}), this.options = o2;
  var i = this;
  function s2(h2) {
    return u ? (setTimeout(function() {
      u(void 0, h2);
    }, 0), true) : h2;
  }
  t9 = this.castInput(t9), r2 = this.castInput(r2), t9 = this.removeEmpty(this.tokenize(t9)), r2 = this.removeEmpty(this.tokenize(r2));
  var a = r2.length, D = t9.length, l2 = 1, d = a + D;
  o2.maxEditLength && (d = Math.min(d, o2.maxEditLength));
  var f = (n2 = o2.timeout) !== null && n2 !== void 0 ? n2 : 1 / 0, p = Date.now() + f, c2 = [{ oldPos: -1, lastComponent: void 0 }], F = this.extractCommon(c2[0], r2, t9, 0);
  if (c2[0].oldPos + 1 >= D && F + 1 >= a) return s2([{ value: this.join(r2), count: r2.length }]);
  var m2 = -1 / 0, E2 = 1 / 0;
  function A() {
    for (var h2 = Math.max(m2, -l2); h2 <= Math.min(E2, l2); h2 += 2) {
      var C = void 0, k2 = c2[h2 - 1], v2 = c2[h2 + 1];
      k2 && (c2[h2 - 1] = void 0);
      var $2 = false;
      if (v2) {
        var ye2 = v2.oldPos - h2;
        $2 = v2 && 0 <= ye2 && ye2 < a;
      }
      var yt2 = k2 && k2.oldPos + 1 < D;
      if (!$2 && !yt2) {
        c2[h2] = void 0;
        continue;
      }
      if (!yt2 || $2 && k2.oldPos + 1 < v2.oldPos ? C = i.addToPath(v2, true, void 0, 0) : C = i.addToPath(k2, void 0, true, 1), F = i.extractCommon(C, r2, t9, h2), C.oldPos + 1 >= D && F + 1 >= a) return s2(Su(i, C.lastComponent, r2, t9, i.useLongestToken));
      c2[h2] = C, C.oldPos + 1 >= D && (E2 = Math.min(E2, h2 - 1)), F + 1 >= a && (m2 = Math.max(m2, h2 + 1));
    }
    l2++;
  }
  if (u) (function h2() {
    setTimeout(function() {
      if (l2 > d || Date.now() > p) return u();
      A() || h2();
    }, 0);
  })();
  else for (; l2 <= d && Date.now() <= p; ) {
    var w2 = A();
    if (w2) return w2;
  }
}, addToPath: function(t9, r2, n2, o2) {
  var u = t9.lastComponent;
  return u && u.added === r2 && u.removed === n2 ? { oldPos: t9.oldPos + o2, lastComponent: { count: u.count + 1, added: r2, removed: n2, previousComponent: u.previousComponent } } : { oldPos: t9.oldPos + o2, lastComponent: { count: 1, added: r2, removed: n2, previousComponent: u } };
}, extractCommon: function(t9, r2, n2, o2) {
  for (var u = r2.length, i = n2.length, s2 = t9.oldPos, a = s2 - o2, D = 0; a + 1 < u && s2 + 1 < i && this.equals(r2[a + 1], n2[s2 + 1]); ) a++, s2++, D++;
  return D && (t9.lastComponent = { count: D, previousComponent: t9.lastComponent }), t9.oldPos = s2, a;
}, equals: function(t9, r2) {
  return this.options.comparator ? this.options.comparator(t9, r2) : t9 === r2 || this.options.ignoreCase && t9.toLowerCase() === r2.toLowerCase();
}, removeEmpty: function(t9) {
  for (var r2 = [], n2 = 0; n2 < t9.length; n2++) t9[n2] && r2.push(t9[n2]);
  return r2;
}, castInput: function(t9) {
  return t9;
}, tokenize: function(t9) {
  return t9.split("");
}, join: function(t9) {
  return t9.join("");
} };
function Su(e2, t9, r2, n2, o2) {
  for (var u = [], i; t9; ) u.push(t9), i = t9.previousComponent, delete t9.previousComponent, t9 = i;
  u.reverse();
  for (var s2 = 0, a = u.length, D = 0, l2 = 0; s2 < a; s2++) {
    var d = u[s2];
    if (d.removed) {
      if (d.value = e2.join(n2.slice(l2, l2 + d.count)), l2 += d.count, s2 && u[s2 - 1].added) {
        var p = u[s2 - 1];
        u[s2 - 1] = u[s2], u[s2] = p;
      }
    } else {
      if (!d.added && o2) {
        var f = r2.slice(D, D + d.count);
        f = f.map(function(F, m2) {
          var E2 = n2[l2 + m2];
          return E2.length > F.length ? E2 : F;
        }), d.value = e2.join(f);
      } else d.value = e2.join(r2.slice(D, D + d.count));
      D += d.count, d.added || (l2 += d.count);
    }
  }
  var c2 = u[a - 1];
  return a > 1 && typeof c2.value == "string" && (c2.added || c2.removed) && e2.equals("", c2.value) && (u[a - 2].value += c2.value, u.pop()), u;
}
var hi = new Z();
var lr = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
var cr = /\S/;
var fr = new Z();
fr.equals = function(e2, t9) {
  return this.options.ignoreCase && (e2 = e2.toLowerCase(), t9 = t9.toLowerCase()), e2 === t9 || this.options.ignoreWhitespace && !cr.test(e2) && !cr.test(t9);
};
fr.tokenize = function(e2) {
  for (var t9 = e2.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), r2 = 0; r2 < t9.length - 1; r2++) !t9[r2 + 1] && t9[r2 + 2] && lr.test(t9[r2]) && lr.test(t9[r2 + 2]) && (t9[r2] += t9[r2 + 2], t9.splice(r2 + 1, 2), r2--);
  return t9;
};
var pr = new Z();
pr.tokenize = function(e2) {
  this.options.stripTrailingCr && (e2 = e2.replace(/\r\n/g, `
`));
  var t9 = [], r2 = e2.split(/(\n|\r\n)/);
  r2[r2.length - 1] || r2.pop();
  for (var n2 = 0; n2 < r2.length; n2++) {
    var o2 = r2[n2];
    n2 % 2 && !this.options.newlineIsToken ? t9[t9.length - 1] += o2 : (this.options.ignoreWhitespace && (o2 = o2.trim()), t9.push(o2));
  }
  return t9;
};
var Nu = new Z();
Nu.tokenize = function(e2) {
  return e2.split(/(\S.+?[.!?])(?=\s+|$)/);
};
var Tu = new Z();
Tu.tokenize = function(e2) {
  return e2.split(/([{}:;,]|\s+)/);
};
function $e(e2) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? $e = function(t9) {
    return typeof t9;
  } : $e = function(t9) {
    return t9 && typeof Symbol == "function" && t9.constructor === Symbol && t9 !== Symbol.prototype ? "symbol" : typeof t9;
  }, $e(e2);
}
var ku = Object.prototype.toString;
var Ae = new Z();
Ae.useLongestToken = true;
Ae.tokenize = pr.tokenize;
Ae.castInput = function(e2) {
  var t9 = this.options, r2 = t9.undefinedReplacement, n2 = t9.stringifyReplacer, o2 = n2 === void 0 ? function(u, i) {
    return typeof i > "u" ? r2 : i;
  } : n2;
  return typeof e2 == "string" ? e2 : JSON.stringify(Bt(e2, null, null, o2), o2, "  ");
};
Ae.equals = function(e2, t9) {
  return Z.prototype.equals.call(Ae, e2.replace(/,([\r\n])/g, "$1"), t9.replace(/,([\r\n])/g, "$1"));
};
function Bt(e2, t9, r2, n2, o2) {
  t9 = t9 || [], r2 = r2 || [], n2 && (e2 = n2(o2, e2));
  var u;
  for (u = 0; u < t9.length; u += 1) if (t9[u] === e2) return r2[u];
  var i;
  if (ku.call(e2) === "[object Array]") {
    for (t9.push(e2), i = new Array(e2.length), r2.push(i), u = 0; u < e2.length; u += 1) i[u] = Bt(e2[u], t9, r2, n2, o2);
    return t9.pop(), r2.pop(), i;
  }
  if (e2 && e2.toJSON && (e2 = e2.toJSON()), $e(e2) === "object" && e2 !== null) {
    t9.push(e2), i = {}, r2.push(i);
    var s2 = [], a;
    for (a in e2) e2.hasOwnProperty(a) && s2.push(a);
    for (s2.sort(), u = 0; u < s2.length; u += 1) a = s2[u], i[a] = Bt(e2[a], t9, r2, n2, a);
    t9.pop(), r2.pop();
  } else i = e2;
  return i;
}
var Ve = new Z();
Ve.tokenize = function(e2) {
  return e2.slice();
};
Ve.join = Ve.removeEmpty = function(e2) {
  return e2;
};
function dr(e2, t9, r2) {
  return Ve.diff(e2, t9, r2);
}
function Fr(e2) {
  let t9 = e2.indexOf("\r");
  return t9 >= 0 ? e2.charAt(t9 + 1) === `
` ? "crlf" : "cr" : "lf";
}
function Be(e2) {
  switch (e2) {
    case "cr":
      return "\r";
    case "crlf":
      return `\r
`;
    default:
      return `
`;
  }
}
function wt(e2, t9) {
  let r2;
  switch (t9) {
    case `
`:
      r2 = /\n/gu;
      break;
    case "\r":
      r2 = /\r/gu;
      break;
    case `\r
`:
      r2 = /\r\n/gu;
      break;
    default:
      throw new Error(`Unexpected "eol" ${JSON.stringify(t9)}.`);
  }
  let n2 = e2.match(r2);
  return n2 ? n2.length : 0;
}
function mr(e2) {
  return ne3(false, e2, /\r\n?/gu, `
`);
}
var U = "string";
var W = "array";
var z51 = "cursor";
var L = "indent";
var P = "align";
var I2 = "trim";
var x = "group";
var S = "fill";
var _ = "if-break";
var R = "indent-if-break";
var Y = "line-suffix";
var j = "line-suffix-boundary";
var B = "line";
var N = "label";
var b = "break-parent";
var Ue = /* @__PURE__ */ new Set([z51, L, P, I2, x, S, _, R, Y, j, B, N, b]);
function Lu(e2) {
  if (typeof e2 == "string") return U;
  if (Array.isArray(e2)) return W;
  if (!e2) return;
  let { type: t9 } = e2;
  if (Ue.has(t9)) return t9;
}
var G = Lu;
var Pu = (e2) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e2);
function Iu(e2) {
  let t9 = e2 === null ? "null" : typeof e2;
  if (t9 !== "string" && t9 !== "object") return `Unexpected doc '${t9}', 
Expected it to be 'string' or 'object'.`;
  if (G(e2)) throw new Error("doc is valid.");
  let r2 = Object.prototype.toString.call(e2);
  if (r2 !== "[object Object]") return `Unexpected doc '${r2}'.`;
  let n2 = Pu([...Ue].map((o2) => `'${o2}'`));
  return `Unexpected doc.type '${e2.type}'.
Expected it to be ${n2}.`;
}
var xt = class extends Error {
  name = "InvalidDocError";
  constructor(t9) {
    super(Iu(t9)), this.doc = t9;
  }
};
var Q = xt;
var Er = {};
function Ru(e2, t9, r2, n2) {
  let o2 = [e2];
  for (; o2.length > 0; ) {
    let u = o2.pop();
    if (u === Er) {
      r2(o2.pop());
      continue;
    }
    r2 && o2.push(u, Er);
    let i = G(u);
    if (!i) throw new Q(u);
    if ((t9 == null ? void 0 : t9(u)) !== false) switch (i) {
      case W:
      case S: {
        let s2 = i === W ? u : u.parts;
        for (let a = s2.length, D = a - 1; D >= 0; --D) o2.push(s2[D]);
        break;
      }
      case _:
        o2.push(u.flatContents, u.breakContents);
        break;
      case x:
        if (n2 && u.expandedStates) for (let s2 = u.expandedStates.length, a = s2 - 1; a >= 0; --a) o2.push(u.expandedStates[a]);
        else o2.push(u.contents);
        break;
      case P:
      case L:
      case R:
      case N:
      case Y:
        o2.push(u.contents);
        break;
      case U:
      case z51:
      case I2:
      case j:
      case B:
      case b:
        break;
      default:
        throw new Q(u);
    }
  }
}
var we = Ru;
var hr = () => {
};
var K = hr;
var ze = hr;
function De(e2) {
  return K(e2), { type: L, contents: e2 };
}
function ae(e2, t9) {
  return K(t9), { type: P, contents: t9, n: e2 };
}
function _t(e2, t9 = {}) {
  return K(e2), ze(t9.expandedStates, true), { type: x, id: t9.id, contents: e2, break: !!t9.shouldBreak, expandedStates: t9.expandedStates };
}
function Cr(e2) {
  return ae(Number.NEGATIVE_INFINITY, e2);
}
function gr(e2) {
  return ae({ type: "root" }, e2);
}
function yr(e2) {
  return ae(-1, e2);
}
function Ar(e2, t9) {
  return _t(e2[0], { ...t9, expandedStates: e2 });
}
function Ge(e2) {
  return ze(e2), { type: S, parts: e2 };
}
function Br(e2, t9 = "", r2 = {}) {
  return K(e2), t9 !== "" && K(t9), { type: _, breakContents: e2, flatContents: t9, groupId: r2.groupId };
}
function wr(e2, t9) {
  return K(e2), { type: R, contents: e2, groupId: t9.groupId, negate: t9.negate };
}
function xe(e2) {
  return K(e2), { type: Y, contents: e2 };
}
var xr = { type: j };
var de = { type: b };
var _r = { type: I2 };
var _e = { type: B, hard: true };
var vt = { type: B, hard: true, literal: true };
var Ke = { type: B };
var vr = { type: B, soft: true };
var q = [_e, de];
var qe = [vt, de];
var ve = { type: z51 };
function be(e2, t9) {
  K(e2), ze(t9);
  let r2 = [];
  for (let n2 = 0; n2 < t9.length; n2++) n2 !== 0 && r2.push(e2), r2.push(t9[n2]);
  return r2;
}
function Je(e2, t9, r2) {
  K(e2);
  let n2 = e2;
  if (t9 > 0) {
    for (let o2 = 0; o2 < Math.floor(t9 / r2); ++o2) n2 = De(n2);
    n2 = ae(t9 % r2, n2), n2 = ae(Number.NEGATIVE_INFINITY, n2);
  }
  return n2;
}
function br(e2, t9) {
  return K(t9), e2 ? { type: N, label: e2, contents: t9 } : t9;
}
function ee(e2) {
  var t9;
  if (!e2) return "";
  if (Array.isArray(e2)) {
    let r2 = [];
    for (let n2 of e2) if (Array.isArray(n2)) r2.push(...ee(n2));
    else {
      let o2 = ee(n2);
      o2 !== "" && r2.push(o2);
    }
    return r2;
  }
  return e2.type === _ ? { ...e2, breakContents: ee(e2.breakContents), flatContents: ee(e2.flatContents) } : e2.type === x ? { ...e2, contents: ee(e2.contents), expandedStates: (t9 = e2.expandedStates) == null ? void 0 : t9.map(ee) } : e2.type === S ? { type: "fill", parts: e2.parts.map(ee) } : e2.contents ? { ...e2, contents: ee(e2.contents) } : e2;
}
function Or(e2) {
  let t9 = /* @__PURE__ */ Object.create(null), r2 = /* @__PURE__ */ new Set();
  return n2(ee(e2));
  function n2(u, i, s2) {
    var a, D;
    if (typeof u == "string") return JSON.stringify(u);
    if (Array.isArray(u)) {
      let l2 = u.map(n2).filter(Boolean);
      return l2.length === 1 ? l2[0] : `[${l2.join(", ")}]`;
    }
    if (u.type === B) {
      let l2 = ((a = s2 == null ? void 0 : s2[i + 1]) == null ? void 0 : a.type) === b;
      return u.literal ? l2 ? "literalline" : "literallineWithoutBreakParent" : u.hard ? l2 ? "hardline" : "hardlineWithoutBreakParent" : u.soft ? "softline" : "line";
    }
    if (u.type === b) return ((D = s2 == null ? void 0 : s2[i - 1]) == null ? void 0 : D.type) === B && s2[i - 1].hard ? void 0 : "breakParent";
    if (u.type === I2) return "trim";
    if (u.type === L) return "indent(" + n2(u.contents) + ")";
    if (u.type === P) return u.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + n2(u.contents) + ")" : u.n < 0 ? "dedent(" + n2(u.contents) + ")" : u.n.type === "root" ? "markAsRoot(" + n2(u.contents) + ")" : "align(" + JSON.stringify(u.n) + ", " + n2(u.contents) + ")";
    if (u.type === _) return "ifBreak(" + n2(u.breakContents) + (u.flatContents ? ", " + n2(u.flatContents) : "") + (u.groupId ? (u.flatContents ? "" : ', ""') + `, { groupId: ${o2(u.groupId)} }` : "") + ")";
    if (u.type === R) {
      let l2 = [];
      u.negate && l2.push("negate: true"), u.groupId && l2.push(`groupId: ${o2(u.groupId)}`);
      let d = l2.length > 0 ? `, { ${l2.join(", ")} }` : "";
      return `indentIfBreak(${n2(u.contents)}${d})`;
    }
    if (u.type === x) {
      let l2 = [];
      u.break && u.break !== "propagated" && l2.push("shouldBreak: true"), u.id && l2.push(`id: ${o2(u.id)}`);
      let d = l2.length > 0 ? `, { ${l2.join(", ")} }` : "";
      return u.expandedStates ? `conditionalGroup([${u.expandedStates.map((f) => n2(f)).join(",")}]${d})` : `group(${n2(u.contents)}${d})`;
    }
    if (u.type === S) return `fill([${u.parts.map((l2) => n2(l2)).join(", ")}])`;
    if (u.type === Y) return "lineSuffix(" + n2(u.contents) + ")";
    if (u.type === j) return "lineSuffixBoundary";
    if (u.type === N) return `label(${JSON.stringify(u.label)}, ${n2(u.contents)})`;
    throw new Error("Unknown doc type " + u.type);
  }
  function o2(u) {
    if (typeof u != "symbol") return JSON.stringify(String(u));
    if (u in t9) return t9[u];
    let i = u.description || "symbol";
    for (let s2 = 0; ; s2++) {
      let a = i + (s2 > 0 ? ` #${s2}` : "");
      if (!r2.has(a)) return r2.add(a), t9[u] = `Symbol.for(${JSON.stringify(a)})`;
    }
  }
}
var Yu = (e2, t9, r2) => {
  if (!(e2 && t9 == null)) return Array.isArray(t9) || typeof t9 == "string" ? t9[r2 < 0 ? t9.length + r2 : r2] : t9.at(r2);
};
var y = Yu;
var Sr = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
function Nr(e2) {
  return e2 === 12288 || e2 >= 65281 && e2 <= 65376 || e2 >= 65504 && e2 <= 65510;
}
function Tr(e2) {
  return e2 >= 4352 && e2 <= 4447 || e2 === 8986 || e2 === 8987 || e2 === 9001 || e2 === 9002 || e2 >= 9193 && e2 <= 9196 || e2 === 9200 || e2 === 9203 || e2 === 9725 || e2 === 9726 || e2 === 9748 || e2 === 9749 || e2 >= 9800 && e2 <= 9811 || e2 === 9855 || e2 === 9875 || e2 === 9889 || e2 === 9898 || e2 === 9899 || e2 === 9917 || e2 === 9918 || e2 === 9924 || e2 === 9925 || e2 === 9934 || e2 === 9940 || e2 === 9962 || e2 === 9970 || e2 === 9971 || e2 === 9973 || e2 === 9978 || e2 === 9981 || e2 === 9989 || e2 === 9994 || e2 === 9995 || e2 === 10024 || e2 === 10060 || e2 === 10062 || e2 >= 10067 && e2 <= 10069 || e2 === 10071 || e2 >= 10133 && e2 <= 10135 || e2 === 10160 || e2 === 10175 || e2 === 11035 || e2 === 11036 || e2 === 11088 || e2 === 11093 || e2 >= 11904 && e2 <= 11929 || e2 >= 11931 && e2 <= 12019 || e2 >= 12032 && e2 <= 12245 || e2 >= 12272 && e2 <= 12287 || e2 >= 12289 && e2 <= 12350 || e2 >= 12353 && e2 <= 12438 || e2 >= 12441 && e2 <= 12543 || e2 >= 12549 && e2 <= 12591 || e2 >= 12593 && e2 <= 12686 || e2 >= 12688 && e2 <= 12771 || e2 >= 12783 && e2 <= 12830 || e2 >= 12832 && e2 <= 12871 || e2 >= 12880 && e2 <= 19903 || e2 >= 19968 && e2 <= 42124 || e2 >= 42128 && e2 <= 42182 || e2 >= 43360 && e2 <= 43388 || e2 >= 44032 && e2 <= 55203 || e2 >= 63744 && e2 <= 64255 || e2 >= 65040 && e2 <= 65049 || e2 >= 65072 && e2 <= 65106 || e2 >= 65108 && e2 <= 65126 || e2 >= 65128 && e2 <= 65131 || e2 >= 94176 && e2 <= 94180 || e2 === 94192 || e2 === 94193 || e2 >= 94208 && e2 <= 100343 || e2 >= 100352 && e2 <= 101589 || e2 >= 101632 && e2 <= 101640 || e2 >= 110576 && e2 <= 110579 || e2 >= 110581 && e2 <= 110587 || e2 === 110589 || e2 === 110590 || e2 >= 110592 && e2 <= 110882 || e2 === 110898 || e2 >= 110928 && e2 <= 110930 || e2 === 110933 || e2 >= 110948 && e2 <= 110951 || e2 >= 110960 && e2 <= 111355 || e2 === 126980 || e2 === 127183 || e2 === 127374 || e2 >= 127377 && e2 <= 127386 || e2 >= 127488 && e2 <= 127490 || e2 >= 127504 && e2 <= 127547 || e2 >= 127552 && e2 <= 127560 || e2 === 127568 || e2 === 127569 || e2 >= 127584 && e2 <= 127589 || e2 >= 127744 && e2 <= 127776 || e2 >= 127789 && e2 <= 127797 || e2 >= 127799 && e2 <= 127868 || e2 >= 127870 && e2 <= 127891 || e2 >= 127904 && e2 <= 127946 || e2 >= 127951 && e2 <= 127955 || e2 >= 127968 && e2 <= 127984 || e2 === 127988 || e2 >= 127992 && e2 <= 128062 || e2 === 128064 || e2 >= 128066 && e2 <= 128252 || e2 >= 128255 && e2 <= 128317 || e2 >= 128331 && e2 <= 128334 || e2 >= 128336 && e2 <= 128359 || e2 === 128378 || e2 === 128405 || e2 === 128406 || e2 === 128420 || e2 >= 128507 && e2 <= 128591 || e2 >= 128640 && e2 <= 128709 || e2 === 128716 || e2 >= 128720 && e2 <= 128722 || e2 >= 128725 && e2 <= 128727 || e2 >= 128732 && e2 <= 128735 || e2 === 128747 || e2 === 128748 || e2 >= 128756 && e2 <= 128764 || e2 >= 128992 && e2 <= 129003 || e2 === 129008 || e2 >= 129292 && e2 <= 129338 || e2 >= 129340 && e2 <= 129349 || e2 >= 129351 && e2 <= 129535 || e2 >= 129648 && e2 <= 129660 || e2 >= 129664 && e2 <= 129672 || e2 >= 129680 && e2 <= 129725 || e2 >= 129727 && e2 <= 129733 || e2 >= 129742 && e2 <= 129755 || e2 >= 129760 && e2 <= 129768 || e2 >= 129776 && e2 <= 129784 || e2 >= 131072 && e2 <= 196605 || e2 >= 196608 && e2 <= 262141;
}
var kr = (e2) => !(Nr(e2) || Tr(e2));
var ju = /[^\x20-\x7F]/u;
function Hu(e2) {
  if (!e2) return 0;
  if (!ju.test(e2)) return e2.length;
  e2 = e2.replace(Sr(), "  ");
  let t9 = 0;
  for (let r2 of e2) {
    let n2 = r2.codePointAt(0);
    n2 <= 31 || n2 >= 127 && n2 <= 159 || n2 >= 768 && n2 <= 879 || (t9 += kr(n2) ? 1 : 2);
  }
  return t9;
}
var Oe = Hu;
function Ne(e2, t9) {
  if (typeof e2 == "string") return t9(e2);
  let r2 = /* @__PURE__ */ new Map();
  return n2(e2);
  function n2(u) {
    if (r2.has(u)) return r2.get(u);
    let i = o2(u);
    return r2.set(u, i), i;
  }
  function o2(u) {
    switch (G(u)) {
      case W:
        return t9(u.map(n2));
      case S:
        return t9({ ...u, parts: u.parts.map(n2) });
      case _:
        return t9({ ...u, breakContents: n2(u.breakContents), flatContents: n2(u.flatContents) });
      case x: {
        let { expandedStates: i, contents: s2 } = u;
        return i ? (i = i.map(n2), s2 = i[0]) : s2 = n2(s2), t9({ ...u, contents: s2, expandedStates: i });
      }
      case P:
      case L:
      case R:
      case N:
      case Y:
        return t9({ ...u, contents: n2(u.contents) });
      case U:
      case z51:
      case I2:
      case j:
      case B:
      case b:
        return t9(u);
      default:
        throw new Q(u);
    }
  }
}
function Xe(e2, t9, r2) {
  let n2 = r2, o2 = false;
  function u(i) {
    if (o2) return false;
    let s2 = t9(i);
    s2 !== void 0 && (o2 = true, n2 = s2);
  }
  return we(e2, u), n2;
}
function Wu(e2) {
  if (e2.type === x && e2.break || e2.type === B && e2.hard || e2.type === b) return true;
}
function Ir(e2) {
  return Xe(e2, Wu, false);
}
function Lr(e2) {
  if (e2.length > 0) {
    let t9 = y(false, e2, -1);
    !t9.expandedStates && !t9.break && (t9.break = "propagated");
  }
  return null;
}
function Rr(e2) {
  let t9 = /* @__PURE__ */ new Set(), r2 = [];
  function n2(u) {
    if (u.type === b && Lr(r2), u.type === x) {
      if (r2.push(u), t9.has(u)) return false;
      t9.add(u);
    }
  }
  function o2(u) {
    u.type === x && r2.pop().break && Lr(r2);
  }
  we(e2, n2, o2, true);
}
function Mu(e2) {
  return e2.type === B && !e2.hard ? e2.soft ? "" : " " : e2.type === _ ? e2.flatContents : e2;
}
function Yr(e2) {
  return Ne(e2, Mu);
}
function Pr(e2) {
  for (e2 = [...e2]; e2.length >= 2 && y(false, e2, -2).type === B && y(false, e2, -1).type === b; ) e2.length -= 2;
  if (e2.length > 0) {
    let t9 = Se(y(false, e2, -1));
    e2[e2.length - 1] = t9;
  }
  return e2;
}
function Se(e2) {
  switch (G(e2)) {
    case L:
    case R:
    case x:
    case Y:
    case N: {
      let t9 = Se(e2.contents);
      return { ...e2, contents: t9 };
    }
    case _:
      return { ...e2, breakContents: Se(e2.breakContents), flatContents: Se(e2.flatContents) };
    case S:
      return { ...e2, parts: Pr(e2.parts) };
    case W:
      return Pr(e2);
    case U:
      return e2.replace(/[\n\r]*$/u, "");
    case P:
    case z51:
    case I2:
    case j:
    case B:
    case b:
      break;
    default:
      throw new Q(e2);
  }
  return e2;
}
function Ze(e2) {
  return Se(Vu(e2));
}
function $u(e2) {
  switch (G(e2)) {
    case S:
      if (e2.parts.every((t9) => t9 === "")) return "";
      break;
    case x:
      if (!e2.contents && !e2.id && !e2.break && !e2.expandedStates) return "";
      if (e2.contents.type === x && e2.contents.id === e2.id && e2.contents.break === e2.break && e2.contents.expandedStates === e2.expandedStates) return e2.contents;
      break;
    case P:
    case L:
    case R:
    case Y:
      if (!e2.contents) return "";
      break;
    case _:
      if (!e2.flatContents && !e2.breakContents) return "";
      break;
    case W: {
      let t9 = [];
      for (let r2 of e2) {
        if (!r2) continue;
        let [n2, ...o2] = Array.isArray(r2) ? r2 : [r2];
        typeof n2 == "string" && typeof y(false, t9, -1) == "string" ? t9[t9.length - 1] += n2 : t9.push(n2), t9.push(...o2);
      }
      return t9.length === 0 ? "" : t9.length === 1 ? t9[0] : t9;
    }
    case U:
    case z51:
    case I2:
    case j:
    case B:
    case N:
    case b:
      break;
    default:
      throw new Q(e2);
  }
  return e2;
}
function Vu(e2) {
  return Ne(e2, (t9) => $u(t9));
}
function jr(e2, t9 = qe) {
  return Ne(e2, (r2) => typeof r2 == "string" ? be(t9, r2.split(`
`)) : r2);
}
function Uu(e2) {
  if (e2.type === B) return true;
}
function Hr(e2) {
  return Xe(e2, Uu, false);
}
function Qe(e2, t9) {
  return e2.type === N ? { ...e2, contents: t9(e2.contents) } : t9(e2);
}
var H = Symbol("MODE_BREAK");
var J = Symbol("MODE_FLAT");
var Te = Symbol("cursor");
function Wr() {
  return { value: "", length: 0, queue: [] };
}
function zu(e2, t9) {
  return bt(e2, { type: "indent" }, t9);
}
function Gu(e2, t9, r2) {
  return t9 === Number.NEGATIVE_INFINITY ? e2.root || Wr() : t9 < 0 ? bt(e2, { type: "dedent" }, r2) : t9 ? t9.type === "root" ? { ...e2, root: e2 } : bt(e2, { type: typeof t9 == "string" ? "stringAlign" : "numberAlign", n: t9 }, r2) : e2;
}
function bt(e2, t9, r2) {
  let n2 = t9.type === "dedent" ? e2.queue.slice(0, -1) : [...e2.queue, t9], o2 = "", u = 0, i = 0, s2 = 0;
  for (let c2 of n2) switch (c2.type) {
    case "indent":
      l2(), r2.useTabs ? a(1) : D(r2.tabWidth);
      break;
    case "stringAlign":
      l2(), o2 += c2.n, u += c2.n.length;
      break;
    case "numberAlign":
      i += 1, s2 += c2.n;
      break;
    default:
      throw new Error(`Unexpected type '${c2.type}'`);
  }
  return f(), { ...e2, value: o2, length: u, queue: n2 };
  function a(c2) {
    o2 += "	".repeat(c2), u += r2.tabWidth * c2;
  }
  function D(c2) {
    o2 += " ".repeat(c2), u += c2;
  }
  function l2() {
    r2.useTabs ? d() : f();
  }
  function d() {
    i > 0 && a(i), p();
  }
  function f() {
    s2 > 0 && D(s2), p();
  }
  function p() {
    i = 0, s2 = 0;
  }
}
function Ot(e2) {
  let t9 = 0, r2 = 0, n2 = e2.length;
  e: for (; n2--; ) {
    let o2 = e2[n2];
    if (o2 === Te) {
      r2++;
      continue;
    }
    for (let u = o2.length - 1; u >= 0; u--) {
      let i = o2[u];
      if (i === " " || i === "	") t9++;
      else {
        e2[n2] = o2.slice(0, u + 1);
        break e;
      }
    }
  }
  if (t9 > 0 || r2 > 0) for (e2.length = n2 + 1; r2-- > 0; ) e2.push(Te);
  return t9;
}
function et(e2, t9, r2, n2, o2, u) {
  if (r2 === Number.POSITIVE_INFINITY) return true;
  let i = t9.length, s2 = [e2], a = [];
  for (; r2 >= 0; ) {
    if (s2.length === 0) {
      if (i === 0) return true;
      s2.push(t9[--i]);
      continue;
    }
    let { mode: D, doc: l2 } = s2.pop(), d = G(l2);
    switch (d) {
      case U:
        a.push(l2), r2 -= Oe(l2);
        break;
      case W:
      case S: {
        let f = d === W ? l2 : l2.parts;
        for (let p = f.length - 1; p >= 0; p--) s2.push({ mode: D, doc: f[p] });
        break;
      }
      case L:
      case P:
      case R:
      case N:
        s2.push({ mode: D, doc: l2.contents });
        break;
      case I2:
        r2 += Ot(a);
        break;
      case x: {
        if (u && l2.break) return false;
        let f = l2.break ? H : D, p = l2.expandedStates && f === H ? y(false, l2.expandedStates, -1) : l2.contents;
        s2.push({ mode: f, doc: p });
        break;
      }
      case _: {
        let p = (l2.groupId ? o2[l2.groupId] || J : D) === H ? l2.breakContents : l2.flatContents;
        p && s2.push({ mode: D, doc: p });
        break;
      }
      case B:
        if (D === H || l2.hard) return true;
        l2.soft || (a.push(" "), r2--);
        break;
      case Y:
        n2 = true;
        break;
      case j:
        if (n2) return false;
        break;
    }
  }
  return false;
}
function Fe(e2, t9) {
  let r2 = {}, n2 = t9.printWidth, o2 = Be(t9.endOfLine), u = 0, i = [{ ind: Wr(), mode: H, doc: e2 }], s2 = [], a = false, D = [], l2 = 0;
  for (Rr(e2); i.length > 0; ) {
    let { ind: f, mode: p, doc: c2 } = i.pop();
    switch (G(c2)) {
      case U: {
        let F = o2 !== `
` ? ne3(false, c2, `
`, o2) : c2;
        s2.push(F), i.length > 0 && (u += Oe(F));
        break;
      }
      case W:
        for (let F = c2.length - 1; F >= 0; F--) i.push({ ind: f, mode: p, doc: c2[F] });
        break;
      case z51:
        if (l2 >= 2) throw new Error("There are too many 'cursor' in doc.");
        s2.push(Te), l2++;
        break;
      case L:
        i.push({ ind: zu(f, t9), mode: p, doc: c2.contents });
        break;
      case P:
        i.push({ ind: Gu(f, c2.n, t9), mode: p, doc: c2.contents });
        break;
      case I2:
        u -= Ot(s2);
        break;
      case x:
        switch (p) {
          case J:
            if (!a) {
              i.push({ ind: f, mode: c2.break ? H : J, doc: c2.contents });
              break;
            }
          case H: {
            a = false;
            let F = { ind: f, mode: J, doc: c2.contents }, m2 = n2 - u, E2 = D.length > 0;
            if (!c2.break && et(F, i, m2, E2, r2)) i.push(F);
            else if (c2.expandedStates) {
              let A = y(false, c2.expandedStates, -1);
              if (c2.break) {
                i.push({ ind: f, mode: H, doc: A });
                break;
              } else for (let w2 = 1; w2 < c2.expandedStates.length + 1; w2++) if (w2 >= c2.expandedStates.length) {
                i.push({ ind: f, mode: H, doc: A });
                break;
              } else {
                let h2 = c2.expandedStates[w2], C = { ind: f, mode: J, doc: h2 };
                if (et(C, i, m2, E2, r2)) {
                  i.push(C);
                  break;
                }
              }
            } else i.push({ ind: f, mode: H, doc: c2.contents });
            break;
          }
        }
        c2.id && (r2[c2.id] = y(false, i, -1).mode);
        break;
      case S: {
        let F = n2 - u, { parts: m2 } = c2;
        if (m2.length === 0) break;
        let [E2, A] = m2, w2 = { ind: f, mode: J, doc: E2 }, h2 = { ind: f, mode: H, doc: E2 }, C = et(w2, [], F, D.length > 0, r2, true);
        if (m2.length === 1) {
          C ? i.push(w2) : i.push(h2);
          break;
        }
        let k2 = { ind: f, mode: J, doc: A }, v2 = { ind: f, mode: H, doc: A };
        if (m2.length === 2) {
          C ? i.push(k2, w2) : i.push(v2, h2);
          break;
        }
        m2.splice(0, 2);
        let $2 = { ind: f, mode: p, doc: Ge(m2) }, ye2 = m2[0];
        et({ ind: f, mode: J, doc: [E2, A, ye2] }, [], F, D.length > 0, r2, true) ? i.push($2, k2, w2) : C ? i.push($2, v2, w2) : i.push($2, v2, h2);
        break;
      }
      case _:
      case R: {
        let F = c2.groupId ? r2[c2.groupId] : p;
        if (F === H) {
          let m2 = c2.type === _ ? c2.breakContents : c2.negate ? c2.contents : De(c2.contents);
          m2 && i.push({ ind: f, mode: p, doc: m2 });
        }
        if (F === J) {
          let m2 = c2.type === _ ? c2.flatContents : c2.negate ? De(c2.contents) : c2.contents;
          m2 && i.push({ ind: f, mode: p, doc: m2 });
        }
        break;
      }
      case Y:
        D.push({ ind: f, mode: p, doc: c2.contents });
        break;
      case j:
        D.length > 0 && i.push({ ind: f, mode: p, doc: _e });
        break;
      case B:
        switch (p) {
          case J:
            if (c2.hard) a = true;
            else {
              c2.soft || (s2.push(" "), u += 1);
              break;
            }
          case H:
            if (D.length > 0) {
              i.push({ ind: f, mode: p, doc: c2 }, ...D.reverse()), D.length = 0;
              break;
            }
            c2.literal ? f.root ? (s2.push(o2, f.root.value), u = f.root.length) : (s2.push(o2), u = 0) : (u -= Ot(s2), s2.push(o2 + f.value), u = f.length);
            break;
        }
        break;
      case N:
        i.push({ ind: f, mode: p, doc: c2.contents });
        break;
      case b:
        break;
      default:
        throw new Q(c2);
    }
    i.length === 0 && D.length > 0 && (i.push(...D.reverse()), D.length = 0);
  }
  let d = s2.indexOf(Te);
  if (d !== -1) {
    let f = s2.indexOf(Te, d + 1), p = s2.slice(0, d).join(""), c2 = s2.slice(d + 1, f).join(""), F = s2.slice(f + 1).join("");
    return { formatted: p + c2 + F, cursorNodeStart: p.length, cursorNodeText: c2 };
  }
  return { formatted: s2.join("") };
}
function Ku(e2, t9, r2 = 0) {
  let n2 = 0;
  for (let o2 = r2; o2 < e2.length; ++o2) e2[o2] === "	" ? n2 = n2 + t9 - n2 % t9 : n2++;
  return n2;
}
var me = Ku;
var te;
var Nt;
var tt;
var St = class {
  constructor(t9) {
    Dr(this, te);
    this.stack = [t9];
  }
  get key() {
    let { stack: t9, siblings: r2 } = this;
    return y(false, t9, r2 === null ? -2 : -4) ?? null;
  }
  get index() {
    return this.siblings === null ? null : y(false, this.stack, -2);
  }
  get node() {
    return y(false, this.stack, -1);
  }
  get parent() {
    return this.getNode(1);
  }
  get grandparent() {
    return this.getNode(2);
  }
  get isInArray() {
    return this.siblings !== null;
  }
  get siblings() {
    let { stack: t9 } = this, r2 = y(false, t9, -3);
    return Array.isArray(r2) ? r2 : null;
  }
  get next() {
    let { siblings: t9 } = this;
    return t9 === null ? null : t9[this.index + 1];
  }
  get previous() {
    let { siblings: t9 } = this;
    return t9 === null ? null : t9[this.index - 1];
  }
  get isFirst() {
    return this.index === 0;
  }
  get isLast() {
    let { siblings: t9, index: r2 } = this;
    return t9 !== null && r2 === t9.length - 1;
  }
  get isRoot() {
    return this.stack.length === 1;
  }
  get root() {
    return this.stack[0];
  }
  get ancestors() {
    return [...pe(this, te, tt).call(this)];
  }
  getName() {
    let { stack: t9 } = this, { length: r2 } = t9;
    return r2 > 1 ? y(false, t9, -2) : null;
  }
  getValue() {
    return y(false, this.stack, -1);
  }
  getNode(t9 = 0) {
    let r2 = pe(this, te, Nt).call(this, t9);
    return r2 === -1 ? null : this.stack[r2];
  }
  getParentNode(t9 = 0) {
    return this.getNode(t9 + 1);
  }
  call(t9, ...r2) {
    let { stack: n2 } = this, { length: o2 } = n2, u = y(false, n2, -1);
    for (let i of r2) u = u[i], n2.push(i, u);
    try {
      return t9(this);
    } finally {
      n2.length = o2;
    }
  }
  callParent(t9, r2 = 0) {
    let n2 = pe(this, te, Nt).call(this, r2 + 1), o2 = this.stack.splice(n2 + 1);
    try {
      return t9(this);
    } finally {
      this.stack.push(...o2);
    }
  }
  each(t9, ...r2) {
    let { stack: n2 } = this, { length: o2 } = n2, u = y(false, n2, -1);
    for (let i of r2) u = u[i], n2.push(i, u);
    try {
      for (let i = 0; i < u.length; ++i) n2.push(i, u[i]), t9(this, i, u), n2.length -= 2;
    } finally {
      n2.length = o2;
    }
  }
  map(t9, ...r2) {
    let n2 = [];
    return this.each((o2, u, i) => {
      n2[u] = t9(o2, u, i);
    }, ...r2), n2;
  }
  match(...t9) {
    let r2 = this.stack.length - 1, n2 = null, o2 = this.stack[r2--];
    for (let u of t9) {
      if (o2 === void 0) return false;
      let i = null;
      if (typeof n2 == "number" && (i = n2, n2 = this.stack[r2--], o2 = this.stack[r2--]), u && !u(o2, n2, i)) return false;
      n2 = this.stack[r2--], o2 = this.stack[r2--];
    }
    return true;
  }
  findAncestor(t9) {
    for (let r2 of pe(this, te, tt).call(this)) if (t9(r2)) return r2;
  }
  hasAncestor(t9) {
    for (let r2 of pe(this, te, tt).call(this)) if (t9(r2)) return true;
    return false;
  }
};
te = /* @__PURE__ */ new WeakSet(), Nt = function(t9) {
  let { stack: r2 } = this;
  for (let n2 = r2.length - 1; n2 >= 0; n2 -= 2) if (!Array.isArray(r2[n2]) && --t9 < 0) return n2;
  return -1;
}, tt = function* () {
  let { stack: t9 } = this;
  for (let r2 = t9.length - 3; r2 >= 0; r2 -= 2) {
    let n2 = t9[r2];
    Array.isArray(n2) || (yield n2);
  }
};
var Mr = St;
var $r = new Proxy(() => {
}, { get: () => $r });
var ke = $r;
function qu(e2) {
  return e2 !== null && typeof e2 == "object";
}
var Vr = qu;
function* Tt(e2, t9) {
  let { getVisitorKeys: r2, filter: n2 = () => true } = t9, o2 = (u) => Vr(u) && n2(u);
  for (let u of r2(e2)) {
    let i = e2[u];
    if (Array.isArray(i)) for (let s2 of i) o2(s2) && (yield s2);
    else o2(i) && (yield i);
  }
}
function* Ur(e2, t9) {
  let r2 = [e2];
  for (let n2 = 0; n2 < r2.length; n2++) {
    let o2 = r2[n2];
    for (let u of Tt(o2, t9)) yield u, r2.push(u);
  }
}
function Ee(e2) {
  return (t9, r2, n2) => {
    let o2 = !!(n2 != null && n2.backwards);
    if (r2 === false) return false;
    let { length: u } = t9, i = r2;
    for (; i >= 0 && i < u; ) {
      let s2 = t9.charAt(i);
      if (e2 instanceof RegExp) {
        if (!e2.test(s2)) return i;
      } else if (!e2.includes(s2)) return i;
      o2 ? i-- : i++;
    }
    return i === -1 || i === u ? i : false;
  };
}
var zr = Ee(/\s/u);
var T = Ee(" 	");
var rt = Ee(",; 	");
var nt = Ee(/[^\n\r]/u);
function Ju(e2, t9, r2) {
  let n2 = !!(r2 != null && r2.backwards);
  if (t9 === false) return false;
  let o2 = e2.charAt(t9);
  if (n2) {
    if (e2.charAt(t9 - 1) === "\r" && o2 === `
`) return t9 - 2;
    if (o2 === `
` || o2 === "\r" || o2 === "\u2028" || o2 === "\u2029") return t9 - 1;
  } else {
    if (o2 === "\r" && e2.charAt(t9 + 1) === `
`) return t9 + 2;
    if (o2 === `
` || o2 === "\r" || o2 === "\u2028" || o2 === "\u2029") return t9 + 1;
  }
  return t9;
}
var M = Ju;
function Xu(e2, t9, r2 = {}) {
  let n2 = T(e2, r2.backwards ? t9 - 1 : t9, r2), o2 = M(e2, n2, r2);
  return n2 !== o2;
}
var V2 = Xu;
function Zu(e2) {
  return Array.isArray(e2) && e2.length > 0;
}
var kt = Zu;
var Gr = /* @__PURE__ */ new Set(["tokens", "comments", "parent", "enclosingNode", "precedingNode", "followingNode"]);
var Qu = (e2) => Object.keys(e2).filter((t9) => !Gr.has(t9));
function eo(e2) {
  return e2 ? (t9) => e2(t9, Gr) : Qu;
}
var X = eo;
function to(e2) {
  let t9 = e2.type || e2.kind || "(unknown type)", r2 = String(e2.name || e2.id && (typeof e2.id == "object" ? e2.id.name : e2.id) || e2.key && (typeof e2.key == "object" ? e2.key.name : e2.key) || e2.value && (typeof e2.value == "object" ? "" : String(e2.value)) || e2.operator || "");
  return r2.length > 20 && (r2 = r2.slice(0, 19) + "\u2026"), t9 + (r2 ? " " + r2 : "");
}
function Lt(e2, t9) {
  (e2.comments ?? (e2.comments = [])).push(t9), t9.printed = false, t9.nodeDescription = to(e2);
}
function ue(e2, t9) {
  t9.leading = true, t9.trailing = false, Lt(e2, t9);
}
function re(e2, t9, r2) {
  t9.leading = false, t9.trailing = false, r2 && (t9.marker = r2), Lt(e2, t9);
}
function oe(e2, t9) {
  t9.leading = false, t9.trailing = true, Lt(e2, t9);
}
var Pt = /* @__PURE__ */ new WeakMap();
function ut(e2, t9) {
  if (Pt.has(e2)) return Pt.get(e2);
  let { printer: { getCommentChildNodes: r2, canAttachComment: n2, getVisitorKeys: o2 }, locStart: u, locEnd: i } = t9;
  if (!n2) return [];
  let s2 = ((r2 == null ? void 0 : r2(e2, t9)) ?? [...Tt(e2, { getVisitorKeys: X(o2) })]).flatMap((a) => n2(a) ? [a] : ut(a, t9));
  return s2.sort((a, D) => u(a) - u(D) || i(a) - i(D)), Pt.set(e2, s2), s2;
}
function qr(e2, t9, r2, n2) {
  let { locStart: o2, locEnd: u } = r2, i = o2(t9), s2 = u(t9), a = ut(e2, r2), D, l2, d = 0, f = a.length;
  for (; d < f; ) {
    let p = d + f >> 1, c2 = a[p], F = o2(c2), m2 = u(c2);
    if (F <= i && s2 <= m2) return qr(c2, t9, r2, c2);
    if (m2 <= i) {
      D = c2, d = p + 1;
      continue;
    }
    if (s2 <= F) {
      l2 = c2, f = p;
      continue;
    }
    throw new Error("Comment location overlaps with node location");
  }
  if ((n2 == null ? void 0 : n2.type) === "TemplateLiteral") {
    let { quasis: p } = n2, c2 = Rt(p, t9, r2);
    D && Rt(p, D, r2) !== c2 && (D = null), l2 && Rt(p, l2, r2) !== c2 && (l2 = null);
  }
  return { enclosingNode: n2, precedingNode: D, followingNode: l2 };
}
var It = () => false;
function Jr(e2, t9) {
  let { comments: r2 } = e2;
  if (delete e2.comments, !kt(r2) || !t9.printer.canAttachComment) return;
  let n2 = [], { locStart: o2, locEnd: u, printer: { experimentalFeatures: { avoidAstMutation: i = false } = {}, handleComments: s2 = {} }, originalText: a } = t9, { ownLine: D = It, endOfLine: l2 = It, remaining: d = It } = s2, f = r2.map((p, c2) => ({ ...qr(e2, p, t9), comment: p, text: a, options: t9, ast: e2, isLastComment: r2.length - 1 === c2 }));
  for (let [p, c2] of f.entries()) {
    let { comment: F, precedingNode: m2, enclosingNode: E2, followingNode: A, text: w2, options: h2, ast: C, isLastComment: k2 } = c2;
    if (h2.parser === "json" || h2.parser === "json5" || h2.parser === "jsonc" || h2.parser === "__js_expression" || h2.parser === "__ts_expression" || h2.parser === "__vue_expression" || h2.parser === "__vue_ts_expression") {
      if (o2(F) - o2(C) <= 0) {
        ue(C, F);
        continue;
      }
      if (u(F) - u(C) >= 0) {
        oe(C, F);
        continue;
      }
    }
    let v2;
    if (i ? v2 = [c2] : (F.enclosingNode = E2, F.precedingNode = m2, F.followingNode = A, v2 = [F, w2, h2, C, k2]), ro(w2, h2, f, p)) F.placement = "ownLine", D(...v2) || (A ? ue(A, F) : m2 ? oe(m2, F) : E2 ? re(E2, F) : re(C, F));
    else if (no(w2, h2, f, p)) F.placement = "endOfLine", l2(...v2) || (m2 ? oe(m2, F) : A ? ue(A, F) : E2 ? re(E2, F) : re(C, F));
    else if (F.placement = "remaining", !d(...v2)) if (m2 && A) {
      let $2 = n2.length;
      $2 > 0 && n2[$2 - 1].followingNode !== A && Kr(n2, h2), n2.push(c2);
    } else m2 ? oe(m2, F) : A ? ue(A, F) : E2 ? re(E2, F) : re(C, F);
  }
  if (Kr(n2, t9), !i) for (let p of r2) delete p.precedingNode, delete p.enclosingNode, delete p.followingNode;
}
var Xr = (e2) => !/[\S\n\u2028\u2029]/u.test(e2);
function ro(e2, t9, r2, n2) {
  let { comment: o2, precedingNode: u } = r2[n2], { locStart: i, locEnd: s2 } = t9, a = i(o2);
  if (u) for (let D = n2 - 1; D >= 0; D--) {
    let { comment: l2, precedingNode: d } = r2[D];
    if (d !== u || !Xr(e2.slice(s2(l2), a))) break;
    a = i(l2);
  }
  return V2(e2, a, { backwards: true });
}
function no(e2, t9, r2, n2) {
  let { comment: o2, followingNode: u } = r2[n2], { locStart: i, locEnd: s2 } = t9, a = s2(o2);
  if (u) for (let D = n2 + 1; D < r2.length; D++) {
    let { comment: l2, followingNode: d } = r2[D];
    if (d !== u || !Xr(e2.slice(a, i(l2)))) break;
    a = s2(l2);
  }
  return V2(e2, a);
}
function Kr(e2, t9) {
  var s2, a;
  let r2 = e2.length;
  if (r2 === 0) return;
  let { precedingNode: n2, followingNode: o2 } = e2[0], u = t9.locStart(o2), i;
  for (i = r2; i > 0; --i) {
    let { comment: D, precedingNode: l2, followingNode: d } = e2[i - 1];
    ke.strictEqual(l2, n2), ke.strictEqual(d, o2);
    let f = t9.originalText.slice(t9.locEnd(D), u);
    if (((a = (s2 = t9.printer).isGap) == null ? void 0 : a.call(s2, f, t9)) ?? /^[\s(]*$/u.test(f)) u = t9.locStart(D);
    else break;
  }
  for (let [D, { comment: l2 }] of e2.entries()) D < i ? oe(n2, l2) : ue(o2, l2);
  for (let D of [n2, o2]) D.comments && D.comments.length > 1 && D.comments.sort((l2, d) => t9.locStart(l2) - t9.locStart(d));
  e2.length = 0;
}
function Rt(e2, t9, r2) {
  let n2 = r2.locStart(t9) - 1;
  for (let o2 = 1; o2 < e2.length; ++o2) if (n2 < r2.locStart(e2[o2])) return o2 - 1;
  return 0;
}
function uo(e2, t9) {
  let r2 = t9 - 1;
  r2 = T(e2, r2, { backwards: true }), r2 = M(e2, r2, { backwards: true }), r2 = T(e2, r2, { backwards: true });
  let n2 = M(e2, r2, { backwards: true });
  return r2 !== n2;
}
var Le = uo;
function Zr(e2, t9) {
  let r2 = e2.node;
  return r2.printed = true, t9.printer.printComment(e2, t9);
}
function oo(e2, t9) {
  var l2;
  let r2 = e2.node, n2 = [Zr(e2, t9)], { printer: o2, originalText: u, locStart: i, locEnd: s2 } = t9;
  if ((l2 = o2.isBlockComment) == null ? void 0 : l2.call(o2, r2)) {
    let d = V2(u, s2(r2)) ? V2(u, i(r2), { backwards: true }) ? q : Ke : " ";
    n2.push(d);
  } else n2.push(q);
  let D = M(u, T(u, s2(r2)));
  return D !== false && V2(u, D) && n2.push(q), n2;
}
function io(e2, t9, r2) {
  var D;
  let n2 = e2.node, o2 = Zr(e2, t9), { printer: u, originalText: i, locStart: s2 } = t9, a = (D = u.isBlockComment) == null ? void 0 : D.call(u, n2);
  if (r2 != null && r2.hasLineSuffix && !(r2 != null && r2.isBlock) || V2(i, s2(n2), { backwards: true })) {
    let l2 = Le(i, s2(n2));
    return { doc: xe([q, l2 ? q : "", o2]), isBlock: a, hasLineSuffix: true };
  }
  return !a || r2 != null && r2.hasLineSuffix ? { doc: [xe([" ", o2]), de], isBlock: a, hasLineSuffix: true } : { doc: [" ", o2], isBlock: a, hasLineSuffix: false };
}
function so(e2, t9) {
  let r2 = e2.node;
  if (!r2) return {};
  let n2 = t9[Symbol.for("printedComments")];
  if ((r2.comments || []).filter((a) => !n2.has(a)).length === 0) return { leading: "", trailing: "" };
  let u = [], i = [], s2;
  return e2.each(() => {
    let a = e2.node;
    if (n2 != null && n2.has(a)) return;
    let { leading: D, trailing: l2 } = a;
    D ? u.push(oo(e2, t9)) : l2 && (s2 = io(e2, t9, s2), i.push(s2.doc));
  }, "comments"), { leading: u, trailing: i };
}
function Qr(e2, t9, r2) {
  let { leading: n2, trailing: o2 } = so(e2, r2);
  return !n2 && !o2 ? t9 : Qe(t9, (u) => [n2, u, o2]);
}
function en(e2) {
  let { [Symbol.for("comments")]: t9, [Symbol.for("printedComments")]: r2 } = e2;
  for (let n2 of t9) {
    if (!n2.printed && !r2.has(n2)) throw new Error('Comment "' + n2.value.trim() + '" was not printed. Please report this error!');
    delete n2.printed;
  }
}
function ao(e2) {
  return () => {
  };
}
var tn = ao;
var Pe = class extends Error {
  name = "ConfigError";
};
var Ie = class extends Error {
  name = "UndefinedParserError";
};
var rn = { cursorOffset: { category: "Special", type: "int", default: -1, range: { start: -1, end: 1 / 0, step: 1 }, description: "Print (to stderr) where a cursor at the given position would move to after formatting.", cliCategory: "Editor" }, endOfLine: { category: "Global", type: "choice", default: "lf", description: "Which end of line characters to apply.", choices: [{ value: "lf", description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos" }, { value: "crlf", description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows" }, { value: "cr", description: "Carriage Return character only (\\r), used very rarely" }, { value: "auto", description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)` }] }, filepath: { category: "Special", type: "path", description: "Specify the input filepath. This will be used to do parser inference.", cliName: "stdin-filepath", cliCategory: "Other", cliDescription: "Path to the file to pretend that stdin comes from." }, insertPragma: { category: "Special", type: "boolean", default: false, description: "Insert @format pragma into file's first docblock comment.", cliCategory: "Other" }, parser: { category: "Global", type: "choice", default: void 0, description: "Which parser to use.", exception: (e2) => typeof e2 == "string" || typeof e2 == "function", choices: [{ value: "flow", description: "Flow" }, { value: "babel", description: "JavaScript" }, { value: "babel-flow", description: "Flow" }, { value: "babel-ts", description: "TypeScript" }, { value: "typescript", description: "TypeScript" }, { value: "acorn", description: "JavaScript" }, { value: "espree", description: "JavaScript" }, { value: "meriyah", description: "JavaScript" }, { value: "css", description: "CSS" }, { value: "less", description: "Less" }, { value: "scss", description: "SCSS" }, { value: "json", description: "JSON" }, { value: "json5", description: "JSON5" }, { value: "jsonc", description: "JSON with Comments" }, { value: "json-stringify", description: "JSON.stringify" }, { value: "graphql", description: "GraphQL" }, { value: "markdown", description: "Markdown" }, { value: "mdx", description: "MDX" }, { value: "vue", description: "Vue" }, { value: "yaml", description: "YAML" }, { value: "glimmer", description: "Ember / Handlebars" }, { value: "html", description: "HTML" }, { value: "angular", description: "Angular" }, { value: "lwc", description: "Lightning Web Components" }] }, plugins: { type: "path", array: true, default: [{ value: [] }], category: "Global", description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.", exception: (e2) => typeof e2 == "string" || typeof e2 == "object", cliName: "plugin", cliCategory: "Config" }, printWidth: { category: "Global", type: "int", default: 80, description: "The line length where Prettier will try wrap.", range: { start: 0, end: 1 / 0, step: 1 } }, rangeEnd: { category: "Special", type: "int", default: 1 / 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`, cliCategory: "Editor" }, rangeStart: { category: "Special", type: "int", default: 0, range: { start: 0, end: 1 / 0, step: 1 }, description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`, cliCategory: "Editor" }, requirePragma: { category: "Special", type: "boolean", default: false, description: `Require either '@prettier' or '@format' to be present in the file's first docblock comment
in order for it to be formatted.`, cliCategory: "Other" }, tabWidth: { type: "int", category: "Global", default: 2, description: "Number of spaces per indentation level.", range: { start: 0, end: 1 / 0, step: 1 } }, useTabs: { category: "Global", type: "boolean", default: false, description: "Indent with tabs instead of spaces." }, embeddedLanguageFormatting: { category: "Global", type: "choice", default: "auto", description: "Control how Prettier formats quoted code embedded in the file.", choices: [{ value: "auto", description: "Format embedded code if Prettier can automatically identify it." }, { value: "off", description: "Never automatically format embedded code." }] } };
function ot({ plugins: e2 = [], showDeprecated: t9 = false } = {}) {
  let r2 = e2.flatMap((o2) => o2.languages ?? []), n2 = [];
  for (let o2 of lo(Object.assign({}, ...e2.map(({ options: u }) => u), rn))) !t9 && o2.deprecated || (Array.isArray(o2.choices) && (t9 || (o2.choices = o2.choices.filter((u) => !u.deprecated)), o2.name === "parser" && (o2.choices = [...o2.choices, ...Do(o2.choices, r2, e2)])), o2.pluginDefaults = Object.fromEntries(e2.filter((u) => {
    var i;
    return ((i = u.defaultOptions) == null ? void 0 : i[o2.name]) !== void 0;
  }).map((u) => [u.name, u.defaultOptions[o2.name]])), n2.push(o2));
  return { languages: r2, options: n2 };
}
function* Do(e2, t9, r2) {
  let n2 = new Set(e2.map((o2) => o2.value));
  for (let o2 of t9) if (o2.parsers) {
    for (let u of o2.parsers) if (!n2.has(u)) {
      n2.add(u);
      let i = r2.find((a) => a.parsers && Object.prototype.hasOwnProperty.call(a.parsers, u)), s2 = o2.name;
      i != null && i.name && (s2 += ` (plugin: ${i.name})`), yield { value: u, description: s2 };
    }
  }
}
function lo(e2) {
  let t9 = [];
  for (let [r2, n2] of Object.entries(e2)) {
    let o2 = { name: r2, ...n2 };
    Array.isArray(o2.default) && (o2.default = y(false, o2.default, -1).value), t9.push(o2);
  }
  return t9;
}
var co = (e2) => String(e2).split(/[/\\]/u).pop();
function nn(e2, t9) {
  if (!t9) return;
  let r2 = co(t9).toLowerCase();
  return e2.find(({ filenames: n2 }) => n2 == null ? void 0 : n2.some((o2) => o2.toLowerCase() === r2)) ?? e2.find(({ extensions: n2 }) => n2 == null ? void 0 : n2.some((o2) => r2.endsWith(o2)));
}
function fo(e2, t9) {
  if (t9) return e2.find(({ name: r2 }) => r2.toLowerCase() === t9) ?? e2.find(({ aliases: r2 }) => r2 == null ? void 0 : r2.includes(t9)) ?? e2.find(({ extensions: r2 }) => r2 == null ? void 0 : r2.includes(`.${t9}`));
}
function po(e2, t9) {
  let r2 = e2.plugins.flatMap((o2) => o2.languages ?? []), n2 = fo(r2, t9.language) ?? nn(r2, t9.physicalFile) ?? nn(r2, t9.file) ?? (t9.physicalFile, void 0);
  return n2 == null ? void 0 : n2.parsers[0];
}
var un = po;
var ie = { key: (e2) => /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(e2) ? e2 : JSON.stringify(e2), value(e2) {
  if (e2 === null || typeof e2 != "object") return JSON.stringify(e2);
  if (Array.isArray(e2)) return `[${e2.map((r2) => ie.value(r2)).join(", ")}]`;
  let t9 = Object.keys(e2);
  return t9.length === 0 ? "{}" : `{ ${t9.map((r2) => `${ie.key(r2)}: ${ie.value(e2[r2])}`).join(", ")} }`;
}, pair: ({ key: e2, value: t9 }) => ie.value({ [e2]: t9 }) };
var Yt = Me(it(), 1);
var an = (e2, t9, { descriptor: r2 }) => {
  let n2 = [`${Yt.default.yellow(typeof e2 == "string" ? r2.key(e2) : r2.pair(e2))} is deprecated`];
  return t9 && n2.push(`we now treat it as ${Yt.default.blue(typeof t9 == "string" ? r2.key(t9) : r2.pair(t9))}`), n2.join("; ") + ".";
};
var le = Me(it(), 1);
var st = Symbol.for("vnopts.VALUE_NOT_EXIST");
var he = Symbol.for("vnopts.VALUE_UNCHANGED");
var Dn = " ".repeat(2);
var cn = (e2, t9, r2) => {
  let { text: n2, list: o2 } = r2.normalizeExpectedResult(r2.schemas[e2].expected(r2)), u = [];
  return n2 && u.push(ln(e2, t9, n2, r2.descriptor)), o2 && u.push([ln(e2, t9, o2.title, r2.descriptor)].concat(o2.values.map((i) => fn(i, r2.loggerPrintWidth))).join(`
`)), pn(u, r2.loggerPrintWidth);
};
function ln(e2, t9, r2, n2) {
  return [`Invalid ${le.default.red(n2.key(e2))} value.`, `Expected ${le.default.blue(r2)},`, `but received ${t9 === st ? le.default.gray("nothing") : le.default.red(n2.value(t9))}.`].join(" ");
}
function fn({ text: e2, list: t9 }, r2) {
  let n2 = [];
  return e2 && n2.push(`- ${le.default.blue(e2)}`), t9 && n2.push([`- ${le.default.blue(t9.title)}:`].concat(t9.values.map((o2) => fn(o2, r2 - Dn.length).replace(/^|\n/g, `$&${Dn}`))).join(`
`)), pn(n2, r2);
}
function pn(e2, t9) {
  if (e2.length === 1) return e2[0];
  let [r2, n2] = e2, [o2, u] = e2.map((i) => i.split(`
`, 1)[0].length);
  return o2 > t9 && o2 > u ? n2 : r2;
}
var Wt = Me(it(), 1);
var jt = [];
var dn = [];
function Ht(e2, t9) {
  if (e2 === t9) return 0;
  let r2 = e2;
  e2.length > t9.length && (e2 = t9, t9 = r2);
  let n2 = e2.length, o2 = t9.length;
  for (; n2 > 0 && e2.charCodeAt(~-n2) === t9.charCodeAt(~-o2); ) n2--, o2--;
  let u = 0;
  for (; u < n2 && e2.charCodeAt(u) === t9.charCodeAt(u); ) u++;
  if (n2 -= u, o2 -= u, n2 === 0) return o2;
  let i, s2, a, D, l2 = 0, d = 0;
  for (; l2 < n2; ) dn[l2] = e2.charCodeAt(u + l2), jt[l2] = ++l2;
  for (; d < o2; ) for (i = t9.charCodeAt(u + d), a = d++, s2 = d, l2 = 0; l2 < n2; l2++) D = i === dn[l2] ? a : a + 1, a = jt[l2], s2 = jt[l2] = a > s2 ? D > s2 ? s2 + 1 : D : D > a ? a + 1 : D;
  return s2;
}
var at = (e2, t9, { descriptor: r2, logger: n2, schemas: o2 }) => {
  let u = [`Ignored unknown option ${Wt.default.yellow(r2.pair({ key: e2, value: t9 }))}.`], i = Object.keys(o2).sort().find((s2) => Ht(e2, s2) < 3);
  i && u.push(`Did you mean ${Wt.default.blue(r2.key(i))}?`), n2.warn(u.join(" "));
};
var Fo = ["default", "expected", "validate", "deprecated", "forward", "redirect", "overlap", "preprocess", "postprocess"];
function mo(e2, t9) {
  let r2 = new e2(t9), n2 = Object.create(r2);
  for (let o2 of Fo) o2 in t9 && (n2[o2] = Eo(t9[o2], r2, O.prototype[o2].length));
  return n2;
}
var O = class {
  static create(t9) {
    return mo(this, t9);
  }
  constructor(t9) {
    this.name = t9.name;
  }
  default(t9) {
  }
  expected(t9) {
    return "nothing";
  }
  validate(t9, r2) {
    return false;
  }
  deprecated(t9, r2) {
    return false;
  }
  forward(t9, r2) {
  }
  redirect(t9, r2) {
  }
  overlap(t9, r2, n2) {
    return t9;
  }
  preprocess(t9, r2) {
    return t9;
  }
  postprocess(t9, r2) {
    return he;
  }
};
function Eo(e2, t9, r2) {
  return typeof e2 == "function" ? (...n2) => e2(...n2.slice(0, r2 - 1), t9, ...n2.slice(r2 - 1)) : () => e2;
}
var Dt = class extends O {
  constructor(t9) {
    super(t9), this._sourceName = t9.sourceName;
  }
  expected(t9) {
    return t9.schemas[this._sourceName].expected(t9);
  }
  validate(t9, r2) {
    return r2.schemas[this._sourceName].validate(t9, r2);
  }
  redirect(t9, r2) {
    return this._sourceName;
  }
};
var lt2 = class extends O {
  expected() {
    return "anything";
  }
  validate() {
    return true;
  }
};
var ct = class extends O {
  constructor({ valueSchema: t9, name: r2 = t9.name, ...n2 }) {
    super({ ...n2, name: r2 }), this._valueSchema = t9;
  }
  expected(t9) {
    let { text: r2, list: n2 } = t9.normalizeExpectedResult(this._valueSchema.expected(t9));
    return { text: r2 && `an array of ${r2}`, list: n2 && { title: "an array of the following values", values: [{ list: n2 }] } };
  }
  validate(t9, r2) {
    if (!Array.isArray(t9)) return false;
    let n2 = [];
    for (let o2 of t9) {
      let u = r2.normalizeValidateResult(this._valueSchema.validate(o2, r2), o2);
      u !== true && n2.push(u.value);
    }
    return n2.length === 0 ? true : { value: n2 };
  }
  deprecated(t9, r2) {
    let n2 = [];
    for (let o2 of t9) {
      let u = r2.normalizeDeprecatedResult(this._valueSchema.deprecated(o2, r2), o2);
      u !== false && n2.push(...u.map(({ value: i }) => ({ value: [i] })));
    }
    return n2;
  }
  forward(t9, r2) {
    let n2 = [];
    for (let o2 of t9) {
      let u = r2.normalizeForwardResult(this._valueSchema.forward(o2, r2), o2);
      n2.push(...u.map(Fn));
    }
    return n2;
  }
  redirect(t9, r2) {
    let n2 = [], o2 = [];
    for (let u of t9) {
      let i = r2.normalizeRedirectResult(this._valueSchema.redirect(u, r2), u);
      "remain" in i && n2.push(i.remain), o2.push(...i.redirect.map(Fn));
    }
    return n2.length === 0 ? { redirect: o2 } : { redirect: o2, remain: n2 };
  }
  overlap(t9, r2) {
    return t9.concat(r2);
  }
};
function Fn({ from: e2, to: t9 }) {
  return { from: [e2], to: t9 };
}
var ft = class extends O {
  expected() {
    return "true or false";
  }
  validate(t9) {
    return typeof t9 == "boolean";
  }
};
function En(e2, t9) {
  let r2 = /* @__PURE__ */ Object.create(null);
  for (let n2 of e2) {
    let o2 = n2[t9];
    if (r2[o2]) throw new Error(`Duplicate ${t9} ${JSON.stringify(o2)}`);
    r2[o2] = n2;
  }
  return r2;
}
function hn(e2, t9) {
  let r2 = /* @__PURE__ */ new Map();
  for (let n2 of e2) {
    let o2 = n2[t9];
    if (r2.has(o2)) throw new Error(`Duplicate ${t9} ${JSON.stringify(o2)}`);
    r2.set(o2, n2);
  }
  return r2;
}
function Cn() {
  let e2 = /* @__PURE__ */ Object.create(null);
  return (t9) => {
    let r2 = JSON.stringify(t9);
    return e2[r2] ? true : (e2[r2] = true, false);
  };
}
function gn(e2, t9) {
  let r2 = [], n2 = [];
  for (let o2 of e2) t9(o2) ? r2.push(o2) : n2.push(o2);
  return [r2, n2];
}
function yn(e2) {
  return e2 === Math.floor(e2);
}
function An(e2, t9) {
  if (e2 === t9) return 0;
  let r2 = typeof e2, n2 = typeof t9, o2 = ["undefined", "object", "boolean", "number", "string"];
  return r2 !== n2 ? o2.indexOf(r2) - o2.indexOf(n2) : r2 !== "string" ? Number(e2) - Number(t9) : e2.localeCompare(t9);
}
function Bn(e2) {
  return (...t9) => {
    let r2 = e2(...t9);
    return typeof r2 == "string" ? new Error(r2) : r2;
  };
}
function Mt(e2) {
  return e2 === void 0 ? {} : e2;
}
function $t(e2) {
  if (typeof e2 == "string") return { text: e2 };
  let { text: t9, list: r2 } = e2;
  return ho((t9 || r2) !== void 0, "Unexpected `expected` result, there should be at least one field."), r2 ? { text: t9, list: { title: r2.title, values: r2.values.map($t) } } : { text: t9 };
}
function Vt(e2, t9) {
  return e2 === true ? true : e2 === false ? { value: t9 } : e2;
}
function Ut(e2, t9, r2 = false) {
  return e2 === false ? false : e2 === true ? r2 ? true : [{ value: t9 }] : "value" in e2 ? [e2] : e2.length === 0 ? false : e2;
}
function mn(e2, t9) {
  return typeof e2 == "string" || "key" in e2 ? { from: t9, to: e2 } : "from" in e2 ? { from: e2.from, to: e2.to } : { from: t9, to: e2.to };
}
function pt(e2, t9) {
  return e2 === void 0 ? [] : Array.isArray(e2) ? e2.map((r2) => mn(r2, t9)) : [mn(e2, t9)];
}
function zt(e2, t9) {
  let r2 = pt(typeof e2 == "object" && "redirect" in e2 ? e2.redirect : e2, t9);
  return r2.length === 0 ? { remain: t9, redirect: r2 } : typeof e2 == "object" && "remain" in e2 ? { remain: e2.remain, redirect: r2 } : { redirect: r2 };
}
function ho(e2, t9) {
  if (!e2) throw new Error(t9);
}
var dt = class extends O {
  constructor(t9) {
    super(t9), this._choices = hn(t9.choices.map((r2) => r2 && typeof r2 == "object" ? r2 : { value: r2 }), "value");
  }
  expected({ descriptor: t9 }) {
    let r2 = Array.from(this._choices.keys()).map((i) => this._choices.get(i)).filter(({ hidden: i }) => !i).map((i) => i.value).sort(An).map(t9.value), n2 = r2.slice(0, -2), o2 = r2.slice(-2);
    return { text: n2.concat(o2.join(" or ")).join(", "), list: { title: "one of the following values", values: r2 } };
  }
  validate(t9) {
    return this._choices.has(t9);
  }
  deprecated(t9) {
    let r2 = this._choices.get(t9);
    return r2 && r2.deprecated ? { value: t9 } : false;
  }
  forward(t9) {
    let r2 = this._choices.get(t9);
    return r2 ? r2.forward : void 0;
  }
  redirect(t9) {
    let r2 = this._choices.get(t9);
    return r2 ? r2.redirect : void 0;
  }
};
var Ft = class extends O {
  expected() {
    return "a number";
  }
  validate(t9, r2) {
    return typeof t9 == "number";
  }
};
var mt = class extends Ft {
  expected() {
    return "an integer";
  }
  validate(t9, r2) {
    return r2.normalizeValidateResult(super.validate(t9, r2), t9) === true && yn(t9);
  }
};
var Re = class extends O {
  expected() {
    return "a string";
  }
  validate(t9) {
    return typeof t9 == "string";
  }
};
var wn = ie;
var xn = at;
var _n = cn;
var vn = an;
var Et = class {
  constructor(t9, r2) {
    let { logger: n2 = console, loggerPrintWidth: o2 = 80, descriptor: u = wn, unknown: i = xn, invalid: s2 = _n, deprecated: a = vn, missing: D = () => false, required: l2 = () => false, preprocess: d = (p) => p, postprocess: f = () => he } = r2 || {};
    this._utils = { descriptor: u, logger: n2 || { warn: () => {
    } }, loggerPrintWidth: o2, schemas: En(t9, "name"), normalizeDefaultResult: Mt, normalizeExpectedResult: $t, normalizeDeprecatedResult: Ut, normalizeForwardResult: pt, normalizeRedirectResult: zt, normalizeValidateResult: Vt }, this._unknownHandler = i, this._invalidHandler = Bn(s2), this._deprecatedHandler = a, this._identifyMissing = (p, c2) => !(p in c2) || D(p, c2), this._identifyRequired = l2, this._preprocess = d, this._postprocess = f, this.cleanHistory();
  }
  cleanHistory() {
    this._hasDeprecationWarned = Cn();
  }
  normalize(t9) {
    let r2 = {}, o2 = [this._preprocess(t9, this._utils)], u = () => {
      for (; o2.length !== 0; ) {
        let i = o2.shift(), s2 = this._applyNormalization(i, r2);
        o2.push(...s2);
      }
    };
    u();
    for (let i of Object.keys(this._utils.schemas)) {
      let s2 = this._utils.schemas[i];
      if (!(i in r2)) {
        let a = Mt(s2.default(this._utils));
        "value" in a && o2.push({ [i]: a.value });
      }
    }
    u();
    for (let i of Object.keys(this._utils.schemas)) {
      if (!(i in r2)) continue;
      let s2 = this._utils.schemas[i], a = r2[i], D = s2.postprocess(a, this._utils);
      D !== he && (this._applyValidation(D, i, s2), r2[i] = D);
    }
    return this._applyPostprocess(r2), this._applyRequiredCheck(r2), r2;
  }
  _applyNormalization(t9, r2) {
    let n2 = [], { knownKeys: o2, unknownKeys: u } = this._partitionOptionKeys(t9);
    for (let i of o2) {
      let s2 = this._utils.schemas[i], a = s2.preprocess(t9[i], this._utils);
      this._applyValidation(a, i, s2);
      let D = ({ from: p, to: c2 }) => {
        n2.push(typeof c2 == "string" ? { [c2]: p } : { [c2.key]: c2.value });
      }, l2 = ({ value: p, redirectTo: c2 }) => {
        let F = Ut(s2.deprecated(p, this._utils), a, true);
        if (F !== false) if (F === true) this._hasDeprecationWarned(i) || this._utils.logger.warn(this._deprecatedHandler(i, c2, this._utils));
        else for (let { value: m2 } of F) {
          let E2 = { key: i, value: m2 };
          if (!this._hasDeprecationWarned(E2)) {
            let A = typeof c2 == "string" ? { key: c2, value: m2 } : c2;
            this._utils.logger.warn(this._deprecatedHandler(E2, A, this._utils));
          }
        }
      };
      pt(s2.forward(a, this._utils), a).forEach(D);
      let f = zt(s2.redirect(a, this._utils), a);
      if (f.redirect.forEach(D), "remain" in f) {
        let p = f.remain;
        r2[i] = i in r2 ? s2.overlap(r2[i], p, this._utils) : p, l2({ value: p });
      }
      for (let { from: p, to: c2 } of f.redirect) l2({ value: p, redirectTo: c2 });
    }
    for (let i of u) {
      let s2 = t9[i];
      this._applyUnknownHandler(i, s2, r2, (a, D) => {
        n2.push({ [a]: D });
      });
    }
    return n2;
  }
  _applyRequiredCheck(t9) {
    for (let r2 of Object.keys(this._utils.schemas)) if (this._identifyMissing(r2, t9) && this._identifyRequired(r2)) throw this._invalidHandler(r2, st, this._utils);
  }
  _partitionOptionKeys(t9) {
    let [r2, n2] = gn(Object.keys(t9).filter((o2) => !this._identifyMissing(o2, t9)), (o2) => o2 in this._utils.schemas);
    return { knownKeys: r2, unknownKeys: n2 };
  }
  _applyValidation(t9, r2, n2) {
    let o2 = Vt(n2.validate(t9, this._utils), t9);
    if (o2 !== true) throw this._invalidHandler(r2, o2.value, this._utils);
  }
  _applyUnknownHandler(t9, r2, n2, o2) {
    let u = this._unknownHandler(t9, r2, this._utils);
    if (u) for (let i of Object.keys(u)) {
      if (this._identifyMissing(i, u)) continue;
      let s2 = u[i];
      i in this._utils.schemas ? o2(i, s2) : n2[i] = s2;
    }
  }
  _applyPostprocess(t9) {
    let r2 = this._postprocess(t9, this._utils);
    if (r2 !== he) {
      if (r2.delete) for (let n2 of r2.delete) delete t9[n2];
      if (r2.override) {
        let { knownKeys: n2, unknownKeys: o2 } = this._partitionOptionKeys(r2.override);
        for (let u of n2) {
          let i = r2.override[u];
          this._applyValidation(i, u, this._utils.schemas[u]), t9[u] = i;
        }
        for (let u of o2) {
          let i = r2.override[u];
          this._applyUnknownHandler(u, i, t9, (s2, a) => {
            let D = this._utils.schemas[s2];
            this._applyValidation(a, s2, D), t9[s2] = a;
          });
        }
      }
    }
  }
};
var Gt;
function go(e2, t9, { logger: r2 = false, isCLI: n2 = false, passThrough: o2 = false, FlagSchema: u, descriptor: i } = {}) {
  if (n2) {
    if (!u) throw new Error("'FlagSchema' option is required.");
    if (!i) throw new Error("'descriptor' option is required.");
  } else i = ie;
  let s2 = o2 ? Array.isArray(o2) ? (f, p) => o2.includes(f) ? { [f]: p } : void 0 : (f, p) => ({ [f]: p }) : (f, p, c2) => {
    let { _: F, ...m2 } = c2.schemas;
    return at(f, p, { ...c2, schemas: m2 });
  }, a = yo(t9, { isCLI: n2, FlagSchema: u }), D = new Et(a, { logger: r2, unknown: s2, descriptor: i }), l2 = r2 !== false;
  l2 && Gt && (D._hasDeprecationWarned = Gt);
  let d = D.normalize(e2);
  return l2 && (Gt = D._hasDeprecationWarned), d;
}
function yo(e2, { isCLI: t9, FlagSchema: r2 }) {
  let n2 = [];
  t9 && n2.push(lt2.create({ name: "_" }));
  for (let o2 of e2) n2.push(Ao(o2, { isCLI: t9, optionInfos: e2, FlagSchema: r2 })), o2.alias && t9 && n2.push(Dt.create({ name: o2.alias, sourceName: o2.name }));
  return n2;
}
function Ao(e2, { isCLI: t9, optionInfos: r2, FlagSchema: n2 }) {
  let { name: o2 } = e2, u = { name: o2 }, i, s2 = {};
  switch (e2.type) {
    case "int":
      i = mt, t9 && (u.preprocess = Number);
      break;
    case "string":
      i = Re;
      break;
    case "choice":
      i = dt, u.choices = e2.choices.map((a) => a != null && a.redirect ? { ...a, redirect: { to: { key: e2.name, value: a.redirect } } } : a);
      break;
    case "boolean":
      i = ft;
      break;
    case "flag":
      i = n2, u.flags = r2.flatMap((a) => [a.alias, a.description && a.name, a.oppositeDescription && `no-${a.name}`].filter(Boolean));
      break;
    case "path":
      i = Re;
      break;
    default:
      throw new Error(`Unexpected type ${e2.type}`);
  }
  if (e2.exception ? u.validate = (a, D, l2) => e2.exception(a) || D.validate(a, l2) : u.validate = (a, D, l2) => a === void 0 || D.validate(a, l2), e2.redirect && (s2.redirect = (a) => a ? { to: typeof e2.redirect == "string" ? e2.redirect : { key: e2.redirect.option, value: e2.redirect.value } } : void 0), e2.deprecated && (s2.deprecated = true), t9 && !e2.array) {
    let a = u.preprocess || ((D) => D);
    u.preprocess = (D, l2, d) => l2.preprocess(a(Array.isArray(D) ? y(false, D, -1) : D), d);
  }
  return e2.array ? ct.create({ ...t9 ? { preprocess: (a) => Array.isArray(a) ? a : [a] } : {}, ...s2, valueSchema: i.create(u) }) : i.create({ ...u, ...s2 });
}
var bn = go;
var Bo = (e2, t9, r2) => {
  if (!(e2 && t9 == null)) {
    if (t9.findLast) return t9.findLast(r2);
    for (let n2 = t9.length - 1; n2 >= 0; n2--) {
      let o2 = t9[n2];
      if (r2(o2, n2, t9)) return o2;
    }
  }
};
var Kt = Bo;
function qt(e2, t9) {
  if (!t9) throw new Error("parserName is required.");
  let r2 = Kt(false, e2, (o2) => o2.parsers && Object.prototype.hasOwnProperty.call(o2.parsers, t9));
  if (r2) return r2;
  let n2 = `Couldn't resolve parser "${t9}".`;
  throw n2 += " Plugins must be explicitly added to the standalone bundle.", new Pe(n2);
}
function On(e2, t9) {
  if (!t9) throw new Error("astFormat is required.");
  let r2 = Kt(false, e2, (o2) => o2.printers && Object.prototype.hasOwnProperty.call(o2.printers, t9));
  if (r2) return r2;
  let n2 = `Couldn't find plugin for AST format "${t9}".`;
  throw n2 += " Plugins must be explicitly added to the standalone bundle.", new Pe(n2);
}
function ht({ plugins: e2, parser: t9 }) {
  let r2 = qt(e2, t9);
  return Jt(r2, t9);
}
function Jt(e2, t9) {
  let r2 = e2.parsers[t9];
  return typeof r2 == "function" ? r2() : r2;
}
function Sn(e2, t9) {
  let r2 = e2.printers[t9];
  return typeof r2 == "function" ? r2() : r2;
}
var Nn = { astFormat: "estree", printer: {}, originalText: void 0, locStart: null, locEnd: null };
async function wo(e2, t9 = {}) {
  var d;
  let r2 = { ...e2 };
  if (!r2.parser) if (r2.filepath) {
    if (r2.parser = un(r2, { physicalFile: r2.filepath }), !r2.parser) throw new Ie(`No parser could be inferred for file "${r2.filepath}".`);
  } else throw new Ie("No parser and no file path given, couldn't infer a parser.");
  let n2 = ot({ plugins: e2.plugins, showDeprecated: true }).options, o2 = { ...Nn, ...Object.fromEntries(n2.filter((f) => f.default !== void 0).map((f) => [f.name, f.default])) }, u = qt(r2.plugins, r2.parser), i = await Jt(u, r2.parser);
  r2.astFormat = i.astFormat, r2.locEnd = i.locEnd, r2.locStart = i.locStart;
  let s2 = (d = u.printers) != null && d[i.astFormat] ? u : On(r2.plugins, i.astFormat), a = await Sn(s2, i.astFormat);
  r2.printer = a;
  let D = s2.defaultOptions ? Object.fromEntries(Object.entries(s2.defaultOptions).filter(([, f]) => f !== void 0)) : {}, l2 = { ...o2, ...D };
  for (let [f, p] of Object.entries(l2)) (r2[f] === null || r2[f] === void 0) && (r2[f] = p);
  return r2.parser === "json" && (r2.trailingComma = "none"), bn(r2, n2, { passThrough: Object.keys(Nn), ...t9 });
}
var se = wo;
var Vn = Me($n(), 1);
async function ko(e2, t9) {
  let r2 = await ht(t9), n2 = r2.preprocess ? r2.preprocess(e2, t9) : e2;
  t9.originalText = n2;
  let o2;
  try {
    o2 = await r2.parse(n2, t9, t9);
  } catch (u) {
    Lo(u, e2);
  }
  return { text: n2, ast: o2 };
}
function Lo(e2, t9) {
  let { loc: r2 } = e2;
  if (r2) {
    let n2 = (0, Vn.codeFrameColumns)(t9, r2, { highlightCode: true });
    throw e2.message += `
` + n2, e2.codeFrame = n2, e2;
  }
  throw e2;
}
var ce = ko;
async function Un(e2, t9, r2, n2, o2) {
  let { embeddedLanguageFormatting: u, printer: { embed: i, hasPrettierIgnore: s2 = () => false, getVisitorKeys: a } } = r2;
  if (!i || u !== "auto") return;
  if (i.length > 2) throw new Error("printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/en/plugins.html#optional-embed");
  let D = X(i.getVisitorKeys ?? a), l2 = [];
  p();
  let d = e2.stack;
  for (let { print: c2, node: F, pathStack: m2 } of l2) try {
    e2.stack = m2;
    let E2 = await c2(f, t9, e2, r2);
    E2 && o2.set(F, E2);
  } catch (E2) {
    if (globalThis.PRETTIER_DEBUG) throw E2;
  }
  e2.stack = d;
  function f(c2, F) {
    return Po(c2, F, r2, n2);
  }
  function p() {
    let { node: c2 } = e2;
    if (c2 === null || typeof c2 != "object" || s2(e2)) return;
    for (let m2 of D(c2)) Array.isArray(c2[m2]) ? e2.each(p, m2) : e2.call(p, m2);
    let F = i(e2, r2);
    if (F) {
      if (typeof F == "function") {
        l2.push({ print: F, node: c2, pathStack: [...e2.stack] });
        return;
      }
      o2.set(c2, F);
    }
  }
}
async function Po(e2, t9, r2, n2) {
  let o2 = await se({ ...r2, ...t9, parentParser: r2.parser, originalText: e2 }, { passThrough: true }), { ast: u } = await ce(e2, o2), i = await n2(u, o2);
  return Ze(i);
}
function Io(e2, t9) {
  let { originalText: r2, [Symbol.for("comments")]: n2, locStart: o2, locEnd: u, [Symbol.for("printedComments")]: i } = t9, { node: s2 } = e2, a = o2(s2), D = u(s2);
  for (let l2 of n2) o2(l2) >= a && u(l2) <= D && i.add(l2);
  return r2.slice(a, D);
}
var zn = Io;
async function Ye(e2, t9) {
  ({ ast: e2 } = await Qt(e2, t9));
  let r2 = /* @__PURE__ */ new Map(), n2 = new Mr(e2), o2 = tn(t9), u = /* @__PURE__ */ new Map();
  await Un(n2, s2, t9, Ye, u);
  let i = await Gn(n2, t9, s2, void 0, u);
  return en(t9), i;
  function s2(D, l2) {
    return D === void 0 || D === n2 ? a(l2) : Array.isArray(D) ? n2.call(() => a(l2), ...D) : n2.call(() => a(l2), D);
  }
  function a(D) {
    o2(n2);
    let l2 = n2.node;
    if (l2 == null) return "";
    let d = l2 && typeof l2 == "object" && D === void 0;
    if (d && r2.has(l2)) return r2.get(l2);
    let f = Gn(n2, t9, s2, D, u);
    return d && r2.set(l2, f), f;
  }
}
function Gn(e2, t9, r2, n2, o2) {
  var a;
  let { node: u } = e2, { printer: i } = t9, s2;
  return (a = i.hasPrettierIgnore) != null && a.call(i, e2) ? s2 = zn(e2, t9) : o2.has(u) ? s2 = o2.get(u) : s2 = i.print(e2, t9, r2, n2), u === t9.cursorNode && (s2 = Qe(s2, (D) => [ve, D, ve])), i.printComment && (!i.willPrintOwnComments || !i.willPrintOwnComments(e2, t9)) && (s2 = Qr(e2, s2, t9)), s2;
}
async function Qt(e2, t9) {
  let r2 = e2.comments ?? [];
  t9[Symbol.for("comments")] = r2, t9[Symbol.for("tokens")] = e2.tokens ?? [], t9[Symbol.for("printedComments")] = /* @__PURE__ */ new Set(), Jr(e2, t9);
  let { printer: { preprocess: n2 } } = t9;
  return e2 = n2 ? await n2(e2, t9) : e2, { ast: e2, comments: r2 };
}
function Ro(e2, t9) {
  let { cursorOffset: r2, locStart: n2, locEnd: o2 } = t9, u = X(t9.printer.getVisitorKeys), i = (a) => n2(a) <= r2 && o2(a) >= r2, s2 = e2;
  for (let a of Ur(e2, { getVisitorKeys: u, filter: i })) s2 = a;
  return s2;
}
var Kn = Ro;
function Yo(e2, t9) {
  let { printer: { massageAstNode: r2, getVisitorKeys: n2 } } = t9;
  if (!r2) return e2;
  let o2 = X(n2), u = r2.ignoredProperties ?? /* @__PURE__ */ new Set();
  return i(e2);
  function i(s2, a) {
    if (!(s2 !== null && typeof s2 == "object")) return s2;
    if (Array.isArray(s2)) return s2.map((f) => i(f, a)).filter(Boolean);
    let D = {}, l2 = new Set(o2(s2));
    for (let f in s2) !Object.prototype.hasOwnProperty.call(s2, f) || u.has(f) || (l2.has(f) ? D[f] = i(s2[f], s2) : D[f] = s2[f]);
    let d = r2(s2, D, a);
    if (d !== null) return d ?? D;
  }
}
var qn = Yo;
var jo = (e2, t9, r2) => {
  if (!(e2 && t9 == null)) {
    if (t9.findLastIndex) return t9.findLastIndex(r2);
    for (let n2 = t9.length - 1; n2 >= 0; n2--) {
      let o2 = t9[n2];
      if (r2(o2, n2, t9)) return n2;
    }
    return -1;
  }
};
var Jn = jo;
var Ho = ({ parser: e2 }) => e2 === "json" || e2 === "json5" || e2 === "jsonc" || e2 === "json-stringify";
function Wo(e2, t9) {
  let r2 = [e2.node, ...e2.parentNodes], n2 = /* @__PURE__ */ new Set([t9.node, ...t9.parentNodes]);
  return r2.find((o2) => Qn.has(o2.type) && n2.has(o2));
}
function Xn(e2) {
  let t9 = Jn(false, e2, (r2) => r2.type !== "Program" && r2.type !== "File");
  return t9 === -1 ? e2 : e2.slice(0, t9 + 1);
}
function Mo(e2, t9, { locStart: r2, locEnd: n2 }) {
  let o2 = e2.node, u = t9.node;
  if (o2 === u) return { startNode: o2, endNode: u };
  let i = r2(e2.node);
  for (let a of Xn(t9.parentNodes)) if (r2(a) >= i) u = a;
  else break;
  let s2 = n2(t9.node);
  for (let a of Xn(e2.parentNodes)) {
    if (n2(a) <= s2) o2 = a;
    else break;
    if (o2 === u) break;
  }
  return { startNode: o2, endNode: u };
}
function er(e2, t9, r2, n2, o2 = [], u) {
  let { locStart: i, locEnd: s2 } = r2, a = i(e2), D = s2(e2);
  if (!(t9 > D || t9 < a || u === "rangeEnd" && t9 === a || u === "rangeStart" && t9 === D)) {
    for (let l2 of ut(e2, r2)) {
      let d = er(l2, t9, r2, n2, [e2, ...o2], u);
      if (d) return d;
    }
    if (!n2 || n2(e2, o2[0])) return { node: e2, parentNodes: o2 };
  }
}
function $o(e2, t9) {
  return t9 !== "DeclareExportDeclaration" && e2 !== "TypeParameterDeclaration" && (e2 === "Directive" || e2 === "TypeAlias" || e2 === "TSExportAssignment" || e2.startsWith("Declare") || e2.startsWith("TSDeclare") || e2.endsWith("Statement") || e2.endsWith("Declaration"));
}
var Qn = /* @__PURE__ */ new Set(["JsonRoot", "ObjectExpression", "ArrayExpression", "StringLiteral", "NumericLiteral", "BooleanLiteral", "NullLiteral", "UnaryExpression", "TemplateLiteral"]);
var Vo = /* @__PURE__ */ new Set(["OperationDefinition", "FragmentDefinition", "VariableDefinition", "TypeExtensionDefinition", "ObjectTypeDefinition", "FieldDefinition", "DirectiveDefinition", "EnumTypeDefinition", "EnumValueDefinition", "InputValueDefinition", "InputObjectTypeDefinition", "SchemaDefinition", "OperationTypeDefinition", "InterfaceTypeDefinition", "UnionTypeDefinition", "ScalarTypeDefinition"]);
function Zn(e2, t9, r2) {
  if (!t9) return false;
  switch (e2.parser) {
    case "flow":
    case "babel":
    case "babel-flow":
    case "babel-ts":
    case "typescript":
    case "acorn":
    case "espree":
    case "meriyah":
    case "__babel_estree":
      return $o(t9.type, r2 == null ? void 0 : r2.type);
    case "json":
    case "json5":
    case "jsonc":
    case "json-stringify":
      return Qn.has(t9.type);
    case "graphql":
      return Vo.has(t9.kind);
    case "vue":
      return t9.tag !== "root";
  }
  return false;
}
function eu(e2, t9, r2) {
  let { rangeStart: n2, rangeEnd: o2, locStart: u, locEnd: i } = t9;
  ke.ok(o2 > n2);
  let s2 = e2.slice(n2, o2).search(/\S/u), a = s2 === -1;
  if (!a) for (n2 += s2; o2 > n2 && !/\S/u.test(e2[o2 - 1]); --o2) ;
  let D = er(r2, n2, t9, (p, c2) => Zn(t9, p, c2), [], "rangeStart"), l2 = a ? D : er(r2, o2, t9, (p) => Zn(t9, p), [], "rangeEnd");
  if (!D || !l2) return { rangeStart: 0, rangeEnd: 0 };
  let d, f;
  if (Ho(t9)) {
    let p = Wo(D, l2);
    d = p, f = p;
  } else ({ startNode: d, endNode: f } = Mo(D, l2, t9));
  return { rangeStart: Math.min(u(d), u(f)), rangeEnd: Math.max(i(d), i(f)) };
}
var uu = "\uFEFF";
var tu = Symbol("cursor");
async function ou(e2, t9, r2 = 0) {
  if (!e2 || e2.trim().length === 0) return { formatted: "", cursorOffset: -1, comments: [] };
  let { ast: n2, text: o2 } = await ce(e2, t9);
  t9.cursorOffset >= 0 && (t9.cursorNode = Kn(n2, t9));
  let u = await Ye(n2, t9, r2);
  r2 > 0 && (u = Je([q, u], r2, t9.tabWidth));
  let i = Fe(u, t9);
  if (r2 > 0) {
    let a = i.formatted.trim();
    i.cursorNodeStart !== void 0 && (i.cursorNodeStart -= i.formatted.indexOf(a)), i.formatted = a + Be(t9.endOfLine);
  }
  let s2 = t9[Symbol.for("comments")];
  if (t9.cursorOffset >= 0) {
    let a, D, l2, d, f;
    if (t9.cursorNode && i.cursorNodeText ? (a = t9.locStart(t9.cursorNode), D = o2.slice(a, t9.locEnd(t9.cursorNode)), l2 = t9.cursorOffset - a, d = i.cursorNodeStart, f = i.cursorNodeText) : (a = 0, D = o2, l2 = t9.cursorOffset, d = 0, f = i.formatted), D === f) return { formatted: i.formatted, cursorOffset: d + l2, comments: s2 };
    let p = D.split("");
    p.splice(l2, 0, tu);
    let c2 = f.split(""), F = dr(p, c2), m2 = d;
    for (let E2 of F) if (E2.removed) {
      if (E2.value.includes(tu)) break;
    } else m2 += E2.count;
    return { formatted: i.formatted, cursorOffset: m2, comments: s2 };
  }
  return { formatted: i.formatted, cursorOffset: -1, comments: s2 };
}
async function Uo(e2, t9) {
  let { ast: r2, text: n2 } = await ce(e2, t9), { rangeStart: o2, rangeEnd: u } = eu(n2, t9, r2), i = n2.slice(o2, u), s2 = Math.min(o2, n2.lastIndexOf(`
`, o2) + 1), a = n2.slice(s2, o2).match(/^\s*/u)[0], D = me(a, t9.tabWidth), l2 = await ou(i, { ...t9, rangeStart: 0, rangeEnd: Number.POSITIVE_INFINITY, cursorOffset: t9.cursorOffset > o2 && t9.cursorOffset <= u ? t9.cursorOffset - o2 : -1, endOfLine: "lf" }, D), d = l2.formatted.trimEnd(), { cursorOffset: f } = t9;
  f > u ? f += d.length - i.length : l2.cursorOffset >= 0 && (f = l2.cursorOffset + o2);
  let p = n2.slice(0, o2) + d + n2.slice(u);
  if (t9.endOfLine !== "lf") {
    let c2 = Be(t9.endOfLine);
    f >= 0 && c2 === `\r
` && (f += wt(p.slice(0, f), `
`)), p = ne3(false, p, `
`, c2);
  }
  return { formatted: p, cursorOffset: f, comments: l2.comments };
}
function tr(e2, t9, r2) {
  return typeof t9 != "number" || Number.isNaN(t9) || t9 < 0 || t9 > e2.length ? r2 : t9;
}
function ru(e2, t9) {
  let { cursorOffset: r2, rangeStart: n2, rangeEnd: o2 } = t9;
  return r2 = tr(e2, r2, -1), n2 = tr(e2, n2, 0), o2 = tr(e2, o2, e2.length), { ...t9, cursorOffset: r2, rangeStart: n2, rangeEnd: o2 };
}
function iu(e2, t9) {
  let { cursorOffset: r2, rangeStart: n2, rangeEnd: o2, endOfLine: u } = ru(e2, t9), i = e2.charAt(0) === uu;
  if (i && (e2 = e2.slice(1), r2--, n2--, o2--), u === "auto" && (u = Fr(e2)), e2.includes("\r")) {
    let s2 = (a) => wt(e2.slice(0, Math.max(a, 0)), `\r
`);
    r2 -= s2(r2), n2 -= s2(n2), o2 -= s2(o2), e2 = mr(e2);
  }
  return { hasBOM: i, text: e2, options: ru(e2, { ...t9, cursorOffset: r2, rangeStart: n2, rangeEnd: o2, endOfLine: u }) };
}
async function nu(e2, t9) {
  let r2 = await ht(t9);
  return !r2.hasPragma || r2.hasPragma(e2);
}
async function rr(e2, t9) {
  let { hasBOM: r2, text: n2, options: o2 } = iu(e2, await se(t9));
  if (o2.rangeStart >= o2.rangeEnd && n2 !== "" || o2.requirePragma && !await nu(n2, o2)) return { formatted: e2, cursorOffset: t9.cursorOffset, comments: [] };
  let u;
  return o2.rangeStart > 0 || o2.rangeEnd < n2.length ? u = await Uo(n2, o2) : (!o2.requirePragma && o2.insertPragma && o2.printer.insertPragma && !await nu(n2, o2) && (n2 = o2.printer.insertPragma(n2)), u = await ou(n2, o2)), r2 && (u.formatted = uu + u.formatted, u.cursorOffset >= 0 && u.cursorOffset++), u;
}
async function su(e2, t9, r2) {
  let { text: n2, options: o2 } = iu(e2, await se(t9)), u = await ce(n2, o2);
  return r2 && (r2.preprocessForPrint && (u.ast = await Qt(u.ast, o2)), r2.massage && (u.ast = qn(u.ast, o2))), u;
}
async function au(e2, t9) {
  t9 = await se(t9);
  let r2 = await Ye(e2, t9);
  return Fe(r2, t9);
}
async function Du(e2, t9) {
  let r2 = Or(e2), { formatted: n2 } = await rr(r2, { ...t9, parser: "__js_expression" });
  return n2;
}
async function lu(e2, t9) {
  t9 = await se(t9);
  let { ast: r2 } = await ce(e2, t9);
  return Ye(r2, t9);
}
async function cu(e2, t9) {
  return Fe(e2, await se(t9));
}
var nr = {};
We(nr, { builders: () => Go, printer: () => Ko, utils: () => qo });
var Go = { join: be, line: Ke, softline: vr, hardline: q, literalline: qe, group: _t, conditionalGroup: Ar, fill: Ge, lineSuffix: xe, lineSuffixBoundary: xr, cursor: ve, breakParent: de, ifBreak: Br, trim: _r, indent: De, indentIfBreak: wr, align: ae, addAlignmentToDoc: Je, markAsRoot: gr, dedentToRoot: Cr, dedent: yr, hardlineWithoutBreakParent: _e, literallineWithoutBreakParent: vt, label: br, concat: (e2) => e2 };
var Ko = { printDocToString: Fe };
var qo = { willBreak: Ir, traverseDoc: we, findInDoc: Xe, mapDoc: Ne, removeLines: Yr, stripTrailingHardline: Ze, replaceEndOfLine: jr, canBreak: Hr };
var fu = "3.3.3";
var or6 = {};
We(or6, { addDanglingComment: () => re, addLeadingComment: () => ue, addTrailingComment: () => oe, getAlignmentSize: () => me, getIndentSize: () => pu, getMaxContinuousCount: () => du, getNextNonSpaceNonCommentCharacter: () => Fu, getNextNonSpaceNonCommentCharacterIndex: () => si, getStringWidth: () => Oe, hasNewline: () => V2, hasNewlineInRange: () => mu, hasSpaces: () => Eu, isNextLineEmpty: () => ci, isNextLineEmptyAfterIndex: () => gt, isPreviousLineEmpty: () => Di, makeString: () => hu, skip: () => Ee, skipEverythingButNewLine: () => nt, skipInlineComment: () => Ce, skipNewline: () => M, skipSpaces: () => T, skipToLineEnd: () => rt, skipTrailingComment: () => ge, skipWhitespace: () => zr });
function Jo(e2, t9) {
  if (t9 === false) return false;
  if (e2.charAt(t9) === "/" && e2.charAt(t9 + 1) === "*") {
    for (let r2 = t9 + 2; r2 < e2.length; ++r2) if (e2.charAt(r2) === "*" && e2.charAt(r2 + 1) === "/") return r2 + 2;
  }
  return t9;
}
var Ce = Jo;
function Xo(e2, t9) {
  return t9 === false ? false : e2.charAt(t9) === "/" && e2.charAt(t9 + 1) === "/" ? nt(e2, t9) : t9;
}
var ge = Xo;
function Zo(e2, t9) {
  let r2 = null, n2 = t9;
  for (; n2 !== r2; ) r2 = n2, n2 = T(e2, n2), n2 = Ce(e2, n2), n2 = ge(e2, n2), n2 = M(e2, n2);
  return n2;
}
var je = Zo;
function Qo(e2, t9) {
  let r2 = null, n2 = t9;
  for (; n2 !== r2; ) r2 = n2, n2 = rt(e2, n2), n2 = Ce(e2, n2), n2 = T(e2, n2);
  return n2 = ge(e2, n2), n2 = M(e2, n2), n2 !== false && V2(e2, n2);
}
var gt = Qo;
function ei(e2, t9) {
  let r2 = e2.lastIndexOf(`
`);
  return r2 === -1 ? 0 : me(e2.slice(r2 + 1).match(/^[\t ]*/u)[0], t9);
}
var pu = ei;
function ur(e2) {
  if (typeof e2 != "string") throw new TypeError("Expected a string");
  return e2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function ti(e2, t9) {
  let r2 = e2.match(new RegExp(`(${ur(t9)})+`, "gu"));
  return r2 === null ? 0 : r2.reduce((n2, o2) => Math.max(n2, o2.length / t9.length), 0);
}
var du = ti;
function ri(e2, t9) {
  let r2 = je(e2, t9);
  return r2 === false ? "" : e2.charAt(r2);
}
var Fu = ri;
function ni(e2, t9, r2) {
  for (let n2 = t9; n2 < r2; ++n2) if (e2.charAt(n2) === `
`) return true;
  return false;
}
var mu = ni;
function ui(e2, t9, r2 = {}) {
  return T(e2, r2.backwards ? t9 - 1 : t9, r2) !== t9;
}
var Eu = ui;
function oi(e2, t9, r2) {
  let n2 = t9 === '"' ? "'" : '"', u = ne3(false, e2, /\\(.)|(["'])/gsu, (i, s2, a) => s2 === n2 ? s2 : a === t9 ? "\\" + a : a || (r2 && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/u.test(s2) ? s2 : "\\" + s2));
  return t9 + u + t9;
}
var hu = oi;
function ii(e2, t9, r2) {
  return je(e2, r2(t9));
}
function si(e2, t9) {
  return arguments.length === 2 || typeof t9 == "number" ? je(e2, t9) : ii(...arguments);
}
function ai(e2, t9, r2) {
  return Le(e2, r2(t9));
}
function Di(e2, t9) {
  return arguments.length === 2 || typeof t9 == "number" ? Le(e2, t9) : ai(...arguments);
}
function li(e2, t9, r2) {
  return gt(e2, r2(t9));
}
function ci(e2, t9) {
  return arguments.length === 2 || typeof t9 == "number" ? gt(e2, t9) : li(...arguments);
}
function fe(e2, t9 = 1) {
  return async (...r2) => {
    let n2 = r2[t9] ?? {}, o2 = n2.plugins ?? [];
    return r2[t9] = { ...n2, plugins: Array.isArray(o2) ? o2 : Object.values(o2) }, e2(...r2);
  };
}
var Cu = fe(rr);
async function gu(e2, t9) {
  let { formatted: r2 } = await Cu(e2, { ...t9, cursorOffset: -1 });
  return r2;
}
async function fi(e2, t9) {
  return await gu(e2, t9) === e2;
}
var pi = fe(ot, 0);
var di = { parse: fe(su), formatAST: fe(au), formatDoc: fe(Du), printToDoc: fe(lu), printDocToString: fe(cu) };

// node_modules/prettier/plugins/html.mjs
var ni2 = Object.defineProperty;
var Xr2 = (t9) => {
  throw TypeError(t9);
};
var Jr2 = (t9, e2) => {
  for (var r2 in e2) ni2(t9, r2, { get: e2[r2], enumerable: true });
};
var Zr2 = (t9, e2, r2) => e2.has(t9) || Xr2("Cannot " + r2);
var Q2 = (t9, e2, r2) => (Zr2(t9, e2, "read from private field"), r2 ? r2.call(t9) : e2.get(t9));
var en2 = (t9, e2, r2) => e2.has(t9) ? Xr2("Cannot add the same private member more than once") : e2 instanceof WeakSet ? e2.add(t9) : e2.set(t9, r2);
var tn2 = (t9, e2, r2, n2) => (Zr2(t9, e2, "write to private field"), n2 ? n2.call(t9, r2) : e2.set(t9, r2), r2);
var Yr2 = {};
Jr2(Yr2, { languages: () => Ds, options: () => ys, parsers: () => Gr2, printers: () => $o2 });
var si2 = (t9, e2, r2, n2) => {
  if (!(t9 && e2 == null)) return e2.replaceAll ? e2.replaceAll(r2, n2) : r2.global ? e2.replace(r2, n2) : e2.split(r2).join(n2);
};
var w = si2;
var ke2 = "string";
var Be2 = "array";
var Le2 = "cursor";
var ce2 = "indent";
var pe2 = "align";
var Fe2 = "trim";
var te2 = "group";
var he2 = "fill";
var me2 = "if-break";
var fe2 = "indent-if-break";
var Ne2 = "line-suffix";
var Pe2 = "line-suffix-boundary";
var Y2 = "line";
var Ie2 = "label";
var de2 = "break-parent";
var St2 = /* @__PURE__ */ new Set([Le2, ce2, pe2, Fe2, te2, he2, me2, fe2, Ne2, Pe2, Y2, Ie2, de2]);
function ii2(t9) {
  if (typeof t9 == "string") return ke2;
  if (Array.isArray(t9)) return Be2;
  if (!t9) return;
  let { type: e2 } = t9;
  if (St2.has(e2)) return e2;
}
var Re2 = ii2;
var ai2 = (t9) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(t9);
function oi2(t9) {
  let e2 = t9 === null ? "null" : typeof t9;
  if (e2 !== "string" && e2 !== "object") return `Unexpected doc '${e2}', 
Expected it to be 'string' or 'object'.`;
  if (Re2(t9)) throw new Error("doc is valid.");
  let r2 = Object.prototype.toString.call(t9);
  if (r2 !== "[object Object]") return `Unexpected doc '${r2}'.`;
  let n2 = ai2([...St2].map((s2) => `'${s2}'`));
  return `Unexpected doc.type '${t9.type}'.
Expected it to be ${n2}.`;
}
var lr2 = class extends Error {
  name = "InvalidDocError";
  constructor(e2) {
    super(oi2(e2)), this.doc = e2;
  }
};
var _t2 = lr2;
var rn2 = () => {
};
var re2 = rn2;
var Et2 = rn2;
function k(t9) {
  return re2(t9), { type: ce2, contents: t9 };
}
function nn2(t9, e2) {
  return re2(e2), { type: pe2, contents: e2, n: t9 };
}
function _2(t9, e2 = {}) {
  return re2(t9), Et2(e2.expandedStates, true), { type: te2, id: e2.id, contents: t9, break: !!e2.shouldBreak, expandedStates: e2.expandedStates };
}
function sn(t9) {
  return nn2(Number.NEGATIVE_INFINITY, t9);
}
function an2(t9) {
  return nn2({ type: "root" }, t9);
}
function At2(t9) {
  return Et2(t9), { type: he2, parts: t9 };
}
function ge2(t9, e2 = "", r2 = {}) {
  return re2(t9), e2 !== "" && re2(e2), { type: me2, breakContents: t9, flatContents: e2, groupId: r2.groupId };
}
function on(t9, e2) {
  return re2(t9), { type: fe2, contents: t9, groupId: e2.groupId, negate: e2.negate };
}
var ne4 = { type: de2 };
var ui2 = { type: Y2, hard: true };
var li2 = { type: Y2, hard: true, literal: true };
var E = { type: Y2 };
var v = { type: Y2, soft: true };
var S2 = [ui2, ne4];
var un2 = [li2, ne4];
function q2(t9, e2) {
  re2(t9), Et2(e2);
  let r2 = [];
  for (let n2 = 0; n2 < e2.length; n2++) n2 !== 0 && r2.push(t9), r2.push(e2[n2]);
  return r2;
}
var ci2 = (t9, e2, r2) => {
  if (!(t9 && e2 == null)) return Array.isArray(e2) || typeof e2 == "string" ? e2[r2 < 0 ? e2.length + r2 : r2] : e2.at(r2);
};
var X2 = ci2;
function Dt2(t9, e2) {
  if (typeof t9 == "string") return e2(t9);
  let r2 = /* @__PURE__ */ new Map();
  return n2(t9);
  function n2(i) {
    if (r2.has(i)) return r2.get(i);
    let a = s2(i);
    return r2.set(i, a), a;
  }
  function s2(i) {
    switch (Re2(i)) {
      case Be2:
        return e2(i.map(n2));
      case he2:
        return e2({ ...i, parts: i.parts.map(n2) });
      case me2:
        return e2({ ...i, breakContents: n2(i.breakContents), flatContents: n2(i.flatContents) });
      case te2: {
        let { expandedStates: a, contents: o2 } = i;
        return a ? (a = a.map(n2), o2 = a[0]) : o2 = n2(o2), e2({ ...i, contents: o2, expandedStates: a });
      }
      case pe2:
      case ce2:
      case fe2:
      case Ie2:
      case Ne2:
        return e2({ ...i, contents: n2(i.contents) });
      case ke2:
      case Le2:
      case Fe2:
      case Pe2:
      case Y2:
      case de2:
        return e2(i);
      default:
        throw new _t2(i);
    }
  }
}
function pi2(t9) {
  switch (Re2(t9)) {
    case he2:
      if (t9.parts.every((e2) => e2 === "")) return "";
      break;
    case te2:
      if (!t9.contents && !t9.id && !t9.break && !t9.expandedStates) return "";
      if (t9.contents.type === te2 && t9.contents.id === t9.id && t9.contents.break === t9.break && t9.contents.expandedStates === t9.expandedStates) return t9.contents;
      break;
    case pe2:
    case ce2:
    case fe2:
    case Ne2:
      if (!t9.contents) return "";
      break;
    case me2:
      if (!t9.flatContents && !t9.breakContents) return "";
      break;
    case Be2: {
      let e2 = [];
      for (let r2 of t9) {
        if (!r2) continue;
        let [n2, ...s2] = Array.isArray(r2) ? r2 : [r2];
        typeof n2 == "string" && typeof X2(false, e2, -1) == "string" ? e2[e2.length - 1] += n2 : e2.push(n2), e2.push(...s2);
      }
      return e2.length === 0 ? "" : e2.length === 1 ? e2[0] : e2;
    }
    case ke2:
    case Le2:
    case Fe2:
    case Pe2:
    case Y2:
    case Ie2:
    case de2:
      break;
    default:
      throw new _t2(t9);
  }
  return t9;
}
function ln2(t9) {
  return Dt2(t9, (e2) => pi2(e2));
}
function B2(t9, e2 = un2) {
  return Dt2(t9, (r2) => typeof r2 == "string" ? q2(e2, r2.split(`
`)) : r2);
}
var vt2 = "'";
var cn2 = '"';
function hi2(t9, e2) {
  let r2 = e2 === true || e2 === vt2 ? vt2 : cn2, n2 = r2 === vt2 ? cn2 : vt2, s2 = 0, i = 0;
  for (let a of t9) a === r2 ? s2++ : a === n2 && i++;
  return s2 > i ? n2 : r2;
}
var pn2 = hi2;
function cr2(t9) {
  if (typeof t9 != "string") throw new TypeError("Expected a string");
  return t9.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var H2;
var pr2 = class {
  constructor(e2) {
    en2(this, H2);
    tn2(this, H2, new Set(e2));
  }
  getLeadingWhitespaceCount(e2) {
    let r2 = Q2(this, H2), n2 = 0;
    for (let s2 = 0; s2 < e2.length && r2.has(e2.charAt(s2)); s2++) n2++;
    return n2;
  }
  getTrailingWhitespaceCount(e2) {
    let r2 = Q2(this, H2), n2 = 0;
    for (let s2 = e2.length - 1; s2 >= 0 && r2.has(e2.charAt(s2)); s2--) n2++;
    return n2;
  }
  getLeadingWhitespace(e2) {
    let r2 = this.getLeadingWhitespaceCount(e2);
    return e2.slice(0, r2);
  }
  getTrailingWhitespace(e2) {
    let r2 = this.getTrailingWhitespaceCount(e2);
    return e2.slice(e2.length - r2);
  }
  hasLeadingWhitespace(e2) {
    return Q2(this, H2).has(e2.charAt(0));
  }
  hasTrailingWhitespace(e2) {
    return Q2(this, H2).has(X2(false, e2, -1));
  }
  trimStart(e2) {
    let r2 = this.getLeadingWhitespaceCount(e2);
    return e2.slice(r2);
  }
  trimEnd(e2) {
    let r2 = this.getTrailingWhitespaceCount(e2);
    return e2.slice(0, e2.length - r2);
  }
  trim(e2) {
    return this.trimEnd(this.trimStart(e2));
  }
  split(e2, r2 = false) {
    let n2 = `[${cr2([...Q2(this, H2)].join(""))}]+`, s2 = new RegExp(r2 ? `(${n2})` : n2, "u");
    return e2.split(s2);
  }
  hasWhitespaceCharacter(e2) {
    let r2 = Q2(this, H2);
    return Array.prototype.some.call(e2, (n2) => r2.has(n2));
  }
  hasNonWhitespaceCharacter(e2) {
    let r2 = Q2(this, H2);
    return Array.prototype.some.call(e2, (n2) => !r2.has(n2));
  }
  isWhitespaceOnly(e2) {
    let r2 = Q2(this, H2);
    return Array.prototype.every.call(e2, (n2) => r2.has(n2));
  }
};
H2 = /* @__PURE__ */ new WeakMap();
var hn2 = pr2;
var mi = ["	", `
`, "\f", "\r", " "];
var fi2 = new hn2(mi);
var N2 = fi2;
var hr2 = class extends Error {
  name = "UnexpectedNodeError";
  constructor(e2, r2, n2 = "type") {
    super(`Unexpected ${r2} node ${n2}: ${JSON.stringify(e2[n2])}.`), this.node = e2;
  }
};
var mn2 = hr2;
function di2(t9) {
  return (t9 == null ? void 0 : t9.type) === "front-matter";
}
var $e2 = di2;
var gi = /* @__PURE__ */ new Set(["sourceSpan", "startSourceSpan", "endSourceSpan", "nameSpan", "valueSpan", "keySpan", "tagDefinition", "tokens", "valueTokens", "switchValueSourceSpan", "expSourceSpan", "valueSourceSpan"]);
var Ci = /* @__PURE__ */ new Set(["if", "else if", "for", "switch", "case"]);
function fn2(t9, e2) {
  var r2;
  if (t9.type === "text" || t9.type === "comment" || $e2(t9) || t9.type === "yaml" || t9.type === "toml") return null;
  if (t9.type === "attribute" && delete e2.value, t9.type === "docType" && delete e2.value, t9.type === "angularControlFlowBlock" && ((r2 = t9.parameters) != null && r2.children)) for (let n2 of e2.parameters.children) Ci.has(t9.name) ? delete n2.expression : n2.expression = n2.expression.trim();
  t9.type === "angularIcuExpression" && (e2.switchValue = t9.switchValue.trim()), t9.type === "angularLetDeclarationInitializer" && delete e2.value;
}
fn2.ignoredProperties = gi;
var dn2 = fn2;
async function Si(t9, e2) {
  if (t9.language === "yaml") {
    let r2 = t9.value.trim(), n2 = r2 ? await e2(r2, { parser: "yaml" }) : "";
    return an2([t9.startDelimiter, t9.explicitLanguage, S2, n2, n2 ? S2 : "", t9.endDelimiter]);
  }
}
var gn2 = Si;
function Ce2(t9, e2 = true) {
  return [k([v, t9]), e2 ? v : ""];
}
function j2(t9, e2) {
  let r2 = t9.type === "NGRoot" ? t9.node.type === "NGMicrosyntax" && t9.node.body.length === 1 && t9.node.body[0].type === "NGMicrosyntaxExpression" ? t9.node.body[0].expression : t9.node : t9.type === "JsExpressionRoot" ? t9.node : t9;
  return r2 && (r2.type === "ObjectExpression" || r2.type === "ArrayExpression" || (e2.parser === "__vue_expression" || e2.parser === "__vue_ts_expression") && (r2.type === "TemplateLiteral" || r2.type === "StringLiteral"));
}
async function T2(t9, e2, r2, n2) {
  r2 = { __isInHtmlAttribute: true, __embeddedInHtml: true, ...r2 };
  let s2 = true;
  n2 && (r2.__onHtmlBindingRoot = (a, o2) => {
    s2 = n2(a, o2);
  });
  let i = await e2(t9, r2, e2);
  return s2 ? _2(i) : Ce2(i);
}
function _i(t9, e2, r2, n2) {
  let { node: s2 } = r2, i = n2.originalText.slice(s2.sourceSpan.start.offset, s2.sourceSpan.end.offset);
  return /^\s*$/u.test(i) ? "" : T2(i, t9, { parser: "__ng_directive", __isInHtmlAttribute: false }, j2);
}
var Cn2 = _i;
var Ei = (t9) => String(t9).split(/[/\\]/u).pop();
function Sn2(t9, e2) {
  if (!e2) return;
  let r2 = Ei(e2).toLowerCase();
  return t9.find(({ filenames: n2 }) => n2 == null ? void 0 : n2.some((s2) => s2.toLowerCase() === r2)) ?? t9.find(({ extensions: n2 }) => n2 == null ? void 0 : n2.some((s2) => r2.endsWith(s2)));
}
function Ai(t9, e2) {
  if (e2) return t9.find(({ name: r2 }) => r2.toLowerCase() === e2) ?? t9.find(({ aliases: r2 }) => r2 == null ? void 0 : r2.includes(e2)) ?? t9.find(({ extensions: r2 }) => r2 == null ? void 0 : r2.includes(`.${e2}`));
}
function Di2(t9, e2) {
  let r2 = t9.plugins.flatMap((s2) => s2.languages ?? []), n2 = Ai(r2, e2.language) ?? Sn2(r2, e2.physicalFile) ?? Sn2(r2, e2.file) ?? (e2.physicalFile, void 0);
  return n2 == null ? void 0 : n2.parsers[0];
}
var Oe2 = Di2;
var _n2 = "inline";
var En2 = { area: "none", base: "none", basefont: "none", datalist: "none", head: "none", link: "none", meta: "none", noembed: "none", noframes: "none", param: "block", rp: "none", script: "block", style: "none", template: "inline", title: "none", html: "block", body: "block", address: "block", blockquote: "block", center: "block", dialog: "block", div: "block", figure: "block", figcaption: "block", footer: "block", form: "block", header: "block", hr: "block", legend: "block", listing: "block", main: "block", p: "block", plaintext: "block", pre: "block", search: "block", xmp: "block", slot: "contents", ruby: "ruby", rt: "ruby-text", article: "block", aside: "block", h1: "block", h2: "block", h3: "block", h4: "block", h5: "block", h6: "block", hgroup: "block", nav: "block", section: "block", dir: "block", dd: "block", dl: "block", dt: "block", menu: "block", ol: "block", ul: "block", li: "list-item", table: "table", caption: "table-caption", colgroup: "table-column-group", col: "table-column", thead: "table-header-group", tbody: "table-row-group", tfoot: "table-footer-group", tr: "table-row", td: "table-cell", th: "table-cell", input: "inline-block", button: "inline-block", fieldset: "block", marquee: "inline-block", source: "block", track: "block", details: "block", summary: "block", meter: "inline-block", progress: "inline-block", object: "inline-block", video: "inline-block", audio: "inline-block", select: "inline-block", option: "block", optgroup: "block" };
var An2 = "normal";
var Dn2 = { listing: "pre", plaintext: "pre", pre: "pre", xmp: "pre", nobr: "nowrap", table: "initial", textarea: "pre-wrap" };
function vi(t9) {
  return t9.type === "element" && !t9.hasExplicitNamespace && !["html", "svg"].includes(t9.namespace);
}
var Se2 = vi;
var yi = (t9) => w(false, t9, /^[\t\f\r ]*\n/gu, "");
var mr2 = (t9) => yi(N2.trimEnd(t9));
var vn2 = (t9) => {
  let e2 = t9, r2 = N2.getLeadingWhitespace(e2);
  r2 && (e2 = e2.slice(r2.length));
  let n2 = N2.getTrailingWhitespace(e2);
  return n2 && (e2 = e2.slice(0, -n2.length)), { leadingWhitespace: r2, trailingWhitespace: n2, text: e2 };
};
function yt(t9, e2) {
  return !!(t9.type === "ieConditionalComment" && t9.lastChild && !t9.lastChild.isSelfClosing && !t9.lastChild.endSourceSpan || t9.type === "ieConditionalComment" && !t9.complete || _e2(t9) && t9.children.some((r2) => r2.type !== "text" && r2.type !== "interpolation") || Tt2(t9, e2) && !U2(t9) && t9.type !== "interpolation");
}
function Ee2(t9) {
  return t9.type === "attribute" || !t9.parent || !t9.prev ? false : wi(t9.prev);
}
function wi(t9) {
  return t9.type === "comment" && t9.value.trim() === "prettier-ignore";
}
function $(t9) {
  return t9.type === "text" || t9.type === "comment";
}
function U2(t9) {
  return t9.type === "element" && (t9.fullName === "script" || t9.fullName === "style" || t9.fullName === "svg:style" || t9.fullName === "svg:script" || Se2(t9) && (t9.name === "script" || t9.name === "style"));
}
function yn2(t9) {
  return t9.children && !U2(t9);
}
function wn2(t9) {
  return U2(t9) || t9.type === "interpolation" || fr2(t9);
}
function fr2(t9) {
  return Rn(t9).startsWith("pre");
}
function bn2(t9, e2) {
  var s2, i;
  let r2 = n2();
  if (r2 && !t9.prev && ((i = (s2 = t9.parent) == null ? void 0 : s2.tagDefinition) != null && i.ignoreFirstLf)) return t9.type === "interpolation";
  return r2;
  function n2() {
    return $e2(t9) || t9.type === "angularControlFlowBlock" ? false : (t9.type === "text" || t9.type === "interpolation") && t9.prev && (t9.prev.type === "text" || t9.prev.type === "interpolation") ? true : !t9.parent || t9.parent.cssDisplay === "none" ? false : _e2(t9.parent) ? true : !(!t9.prev && (t9.parent.type === "root" || _e2(t9) && t9.parent || U2(t9.parent) || Je2(t9.parent, e2) || !Li(t9.parent.cssDisplay)) || t9.prev && !Pi(t9.prev.cssDisplay));
  }
}
function Tn2(t9, e2) {
  return $e2(t9) || t9.type === "angularControlFlowBlock" ? false : (t9.type === "text" || t9.type === "interpolation") && t9.next && (t9.next.type === "text" || t9.next.type === "interpolation") ? true : !t9.parent || t9.parent.cssDisplay === "none" ? false : _e2(t9.parent) ? true : !(!t9.next && (t9.parent.type === "root" || _e2(t9) && t9.parent || U2(t9.parent) || Je2(t9.parent, e2) || !Fi(t9.parent.cssDisplay)) || t9.next && !Ni(t9.next.cssDisplay));
}
function xn2(t9) {
  return Ii(t9.cssDisplay) && !U2(t9);
}
function Qe2(t9) {
  return $e2(t9) || t9.next && t9.sourceSpan.end && t9.sourceSpan.end.line + 1 < t9.next.sourceSpan.start.line;
}
function kn2(t9) {
  return dr2(t9) || t9.type === "element" && t9.children.length > 0 && (["body", "script", "style"].includes(t9.name) || t9.children.some((e2) => Ti(e2))) || t9.firstChild && t9.firstChild === t9.lastChild && t9.firstChild.type !== "text" && Ln(t9.firstChild) && (!t9.lastChild.isTrailingSpaceSensitive || Fn2(t9.lastChild));
}
function dr2(t9) {
  return t9.type === "element" && t9.children.length > 0 && (["html", "head", "ul", "ol", "select"].includes(t9.name) || t9.cssDisplay.startsWith("table") && t9.cssDisplay !== "table-cell");
}
function wt2(t9) {
  return Nn2(t9) || t9.prev && bi(t9.prev) || Bn2(t9);
}
function bi(t9) {
  return Nn2(t9) || t9.type === "element" && t9.fullName === "br" || Bn2(t9);
}
function Bn2(t9) {
  return Ln(t9) && Fn2(t9);
}
function Ln(t9) {
  return t9.hasLeadingSpaces && (t9.prev ? t9.prev.sourceSpan.end.line < t9.sourceSpan.start.line : t9.parent.type === "root" || t9.parent.startSourceSpan.end.line < t9.sourceSpan.start.line);
}
function Fn2(t9) {
  return t9.hasTrailingSpaces && (t9.next ? t9.next.sourceSpan.start.line > t9.sourceSpan.end.line : t9.parent.type === "root" || t9.parent.endSourceSpan && t9.parent.endSourceSpan.start.line > t9.sourceSpan.end.line);
}
function Nn2(t9) {
  switch (t9.type) {
    case "ieConditionalComment":
    case "comment":
    case "directive":
      return true;
    case "element":
      return ["script", "select"].includes(t9.name);
  }
  return false;
}
function bt2(t9) {
  return t9.lastChild ? bt2(t9.lastChild) : t9;
}
function Ti(t9) {
  var e2;
  return (e2 = t9.children) == null ? void 0 : e2.some((r2) => r2.type !== "text");
}
function Pn2(t9) {
  if (t9) switch (t9) {
    case "module":
    case "text/javascript":
    case "text/babel":
    case "application/javascript":
      return "babel";
    case "application/x-typescript":
      return "typescript";
    case "text/markdown":
      return "markdown";
    case "text/html":
      return "html";
    case "text/x-handlebars-template":
      return "glimmer";
    default:
      if (t9.endsWith("json") || t9.endsWith("importmap") || t9 === "speculationrules") return "json";
  }
}
function xi(t9, e2) {
  let { name: r2, attrMap: n2 } = t9;
  if (r2 !== "script" || Object.prototype.hasOwnProperty.call(n2, "src")) return;
  let { type: s2, lang: i } = t9.attrMap;
  return !i && !s2 ? "babel" : Oe2(e2, { language: i }) ?? Pn2(s2);
}
function ki(t9, e2) {
  if (!Tt2(t9, e2)) return;
  let { attrMap: r2 } = t9;
  if (Object.prototype.hasOwnProperty.call(r2, "src")) return;
  let { type: n2, lang: s2 } = r2;
  return Oe2(e2, { language: s2 }) ?? Pn2(n2);
}
function Bi(t9, e2) {
  if (t9.name !== "style") return;
  let { lang: r2 } = t9.attrMap;
  return r2 ? Oe2(e2, { language: r2 }) : "css";
}
function gr2(t9, e2) {
  return xi(t9, e2) ?? Bi(t9, e2) ?? ki(t9, e2);
}
function Xe2(t9) {
  return t9 === "block" || t9 === "list-item" || t9.startsWith("table");
}
function Li(t9) {
  return !Xe2(t9) && t9 !== "inline-block";
}
function Fi(t9) {
  return !Xe2(t9) && t9 !== "inline-block";
}
function Ni(t9) {
  return !Xe2(t9);
}
function Pi(t9) {
  return !Xe2(t9);
}
function Ii(t9) {
  return !Xe2(t9) && t9 !== "inline-block";
}
function _e2(t9) {
  return Rn(t9).startsWith("pre");
}
function Ri(t9, e2) {
  let r2 = t9;
  for (; r2; ) {
    if (e2(r2)) return true;
    r2 = r2.parent;
  }
  return false;
}
function In(t9, e2) {
  var n2;
  if (Ae2(t9, e2)) return "block";
  if (((n2 = t9.prev) == null ? void 0 : n2.type) === "comment") {
    let s2 = t9.prev.value.match(/^\s*display:\s*([a-z]+)\s*$/u);
    if (s2) return s2[1];
  }
  let r2 = false;
  if (t9.type === "element" && t9.namespace === "svg") if (Ri(t9, (s2) => s2.fullName === "svg:foreignObject")) r2 = true;
  else return t9.name === "svg" ? "inline-block" : "block";
  switch (e2.htmlWhitespaceSensitivity) {
    case "strict":
      return "inline";
    case "ignore":
      return "block";
    default:
      return t9.type === "element" && (!t9.namespace || r2 || Se2(t9)) && En2[t9.name] || _n2;
  }
}
function Rn(t9) {
  return t9.type === "element" && (!t9.namespace || Se2(t9)) && Dn2[t9.name] || An2;
}
function $i(t9) {
  let e2 = Number.POSITIVE_INFINITY;
  for (let r2 of t9.split(`
`)) {
    if (r2.length === 0) continue;
    let n2 = N2.getLeadingWhitespaceCount(r2);
    if (n2 === 0) return 0;
    r2.length !== n2 && n2 < e2 && (e2 = n2);
  }
  return e2 === Number.POSITIVE_INFINITY ? 0 : e2;
}
function Cr2(t9, e2 = $i(t9)) {
  return e2 === 0 ? t9 : t9.split(`
`).map((r2) => r2.slice(e2)).join(`
`);
}
function Sr2(t9) {
  return w(false, w(false, t9, "&apos;", "'"), "&quot;", '"');
}
function P2(t9) {
  return Sr2(t9.value);
}
var Oi = /* @__PURE__ */ new Set(["template", "style", "script"]);
function Je2(t9, e2) {
  return Ae2(t9, e2) && !Oi.has(t9.fullName);
}
function Ae2(t9, e2) {
  return e2.parser === "vue" && t9.type === "element" && t9.parent.type === "root" && t9.fullName.toLowerCase() !== "html";
}
function Tt2(t9, e2) {
  return Ae2(t9, e2) && (Je2(t9, e2) || t9.attrMap.lang && t9.attrMap.lang !== "html");
}
function $n2(t9) {
  let e2 = t9.fullName;
  return e2.charAt(0) === "#" || e2 === "slot-scope" || e2 === "v-slot" || e2.startsWith("v-slot:");
}
function On2(t9, e2) {
  let r2 = t9.parent;
  if (!Ae2(r2, e2)) return false;
  let n2 = r2.fullName, s2 = t9.fullName;
  return n2 === "script" && s2 === "setup" || n2 === "style" && s2 === "vars";
}
function xt2(t9, e2 = t9.value) {
  return t9.parent.isWhitespaceSensitive ? t9.parent.isIndentationSensitive ? B2(e2) : B2(Cr2(mr2(e2)), S2) : q2(E, N2.split(e2));
}
function kt2(t9, e2) {
  return Ae2(t9, e2) && t9.name === "script";
}
var _r2 = /\{\{(.+?)\}\}/su;
async function Mn(t9, e2) {
  let r2 = [];
  for (let [n2, s2] of t9.split(_r2).entries()) if (n2 % 2 === 0) r2.push(B2(s2));
  else try {
    r2.push(_2(["{{", k([E, await T2(s2, e2, { parser: "__ng_interpolation", __isInHtmlInterpolation: true })]), E, "}}"]));
  } catch {
    r2.push("{{", B2(s2), "}}");
  }
  return r2;
}
function Er2({ parser: t9 }) {
  return (e2, r2, n2) => T2(P2(n2.node), e2, { parser: t9 }, j2);
}
var Mi = Er2({ parser: "__ng_action" });
var qi = Er2({ parser: "__ng_binding" });
var Hi = Er2({ parser: "__ng_directive" });
function Vi(t9, e2) {
  if (e2.parser !== "angular") return;
  let { node: r2 } = t9, n2 = r2.fullName;
  if (n2.startsWith("(") && n2.endsWith(")") || n2.startsWith("on-")) return Mi;
  if (n2.startsWith("[") && n2.endsWith("]") || /^bind(?:on)?-/u.test(n2) || /^ng-(?:if|show|hide|class|style)$/u.test(n2)) return qi;
  if (n2.startsWith("*")) return Hi;
  let s2 = P2(r2);
  if (/^i18n(?:-.+)?$/u.test(n2)) return () => Ce2(At2(xt2(r2, s2.trim())), !s2.includes("@@"));
  if (_r2.test(s2)) return (i) => Mn(s2, i);
}
var qn2 = Vi;
function Ui(t9, e2) {
  let { node: r2 } = t9, n2 = P2(r2);
  if (r2.fullName === "class" && !e2.parentParser && !n2.includes("{{")) return () => n2.trim().split(/\s+/u).join(" ");
}
var Hn = Ui;
function Vn2(t9) {
  return t9 === "	" || t9 === `
` || t9 === "\f" || t9 === "\r" || t9 === " ";
}
var Wi = /^[ \t\n\r\u000c]+/;
var zi = /^[, \t\n\r\u000c]+/;
var Gi = /^[^ \t\n\r\u000c]+/;
var Yi = /[,]+$/;
var Un2 = /^\d+$/;
var ji = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;
function Ki(t9) {
  let e2 = t9.length, r2, n2, s2, i, a, o2 = 0, u;
  function p(C) {
    let A, D = C.exec(t9.substring(o2));
    if (D) return [A] = D, o2 += A.length, A;
  }
  let l2 = [];
  for (; ; ) {
    if (p(zi), o2 >= e2) {
      if (l2.length === 0) throw new Error("Must contain one or more image candidate strings.");
      return l2;
    }
    u = o2, r2 = p(Gi), n2 = [], r2.slice(-1) === "," ? (r2 = r2.replace(Yi, ""), d()) : f();
  }
  function f() {
    for (p(Wi), s2 = "", i = "in descriptor"; ; ) {
      if (a = t9.charAt(o2), i === "in descriptor") if (Vn2(a)) s2 && (n2.push(s2), s2 = "", i = "after descriptor");
      else if (a === ",") {
        o2 += 1, s2 && n2.push(s2), d();
        return;
      } else if (a === "(") s2 += a, i = "in parens";
      else if (a === "") {
        s2 && n2.push(s2), d();
        return;
      } else s2 += a;
      else if (i === "in parens") if (a === ")") s2 += a, i = "in descriptor";
      else if (a === "") {
        n2.push(s2), d();
        return;
      } else s2 += a;
      else if (i === "after descriptor" && !Vn2(a)) if (a === "") {
        d();
        return;
      } else i = "in descriptor", o2 -= 1;
      o2 += 1;
    }
  }
  function d() {
    let C = false, A, D, R2, F, c2 = {}, g, y2, M2, x2, V3;
    for (F = 0; F < n2.length; F++) g = n2[F], y2 = g[g.length - 1], M2 = g.substring(0, g.length - 1), x2 = parseInt(M2, 10), V3 = parseFloat(M2), Un2.test(M2) && y2 === "w" ? ((A || D) && (C = true), x2 === 0 ? C = true : A = x2) : ji.test(M2) && y2 === "x" ? ((A || D || R2) && (C = true), V3 < 0 ? C = true : D = V3) : Un2.test(M2) && y2 === "h" ? ((R2 || D) && (C = true), x2 === 0 ? C = true : R2 = x2) : C = true;
    if (!C) c2.source = { value: r2, startOffset: u }, A && (c2.width = { value: A }), D && (c2.density = { value: D }), R2 && (c2.height = { value: R2 }), l2.push(c2);
    else throw new Error(`Invalid srcset descriptor found in "${t9}" at "${g}".`);
  }
}
var Wn = Ki;
function Qi(t9) {
  if (t9.node.fullName === "srcset" && (t9.parent.fullName === "img" || t9.parent.fullName === "source")) return () => Ji(P2(t9.node));
}
var zn2 = { width: "w", height: "h", density: "x" };
var Xi = Object.keys(zn2);
function Ji(t9) {
  let e2 = Wn(t9), r2 = Xi.filter((l2) => e2.some((f) => Object.prototype.hasOwnProperty.call(f, l2)));
  if (r2.length > 1) throw new Error("Mixed descriptor in srcset is not supported");
  let [n2] = r2, s2 = zn2[n2], i = e2.map((l2) => l2.source.value), a = Math.max(...i.map((l2) => l2.length)), o2 = e2.map((l2) => l2[n2] ? String(l2[n2].value) : ""), u = o2.map((l2) => {
    let f = l2.indexOf(".");
    return f === -1 ? l2.length : f;
  }), p = Math.max(...u);
  return Ce2(q2([",", E], i.map((l2, f) => {
    let d = [l2], C = o2[f];
    if (C) {
      let A = a - l2.length + 1, D = p - u[f], R2 = " ".repeat(A + D);
      d.push(ge2(R2, " "), C + s2);
    }
    return d;
  })));
}
var Gn2 = Qi;
function Yn(t9, e2) {
  let { node: r2 } = t9, n2 = P2(t9.node).trim();
  if (r2.fullName === "style" && !e2.parentParser && !n2.includes("{{")) return async (s2) => Ce2(await s2(n2, { parser: "css", __isHTMLStyleAttribute: true }));
}
var Ar2 = /* @__PURE__ */ new WeakMap();
function Zi(t9, e2) {
  let { root: r2 } = t9;
  return Ar2.has(r2) || Ar2.set(r2, r2.children.some((n2) => kt2(n2, e2) && ["ts", "typescript"].includes(n2.attrMap.lang))), Ar2.get(r2);
}
var Me2 = Zi;
function jn(t9, e2, r2) {
  let { node: n2 } = r2, s2 = P2(n2);
  return T2(`type T<${s2}> = any`, t9, { parser: "babel-ts", __isEmbeddedTypescriptGenericParameters: true }, j2);
}
function Kn2(t9, e2, { parseWithTs: r2 }) {
  return T2(`function _(${t9}) {}`, e2, { parser: r2 ? "babel-ts" : "babel", __isVueBindings: true });
}
function Qn2(t9) {
  let e2 = /^(?:[\w$]+|\([^)]*\))\s*=>|^function\s*\(/u, r2 = /^[$_a-z][\w$]*(?:\.[$_a-z][\w$]*|\['[^']*'\]|\["[^"]*"\]|\[\d+\]|\[[$_a-z][\w$]*\])*$/iu, n2 = t9.trim();
  return e2.test(n2) || r2.test(n2);
}
async function Xn2(t9, e2, r2, n2) {
  let s2 = P2(r2.node), { left: i, operator: a, right: o2 } = ea(s2), u = Me2(r2, n2);
  return [_2(await T2(`function _(${i}) {}`, t9, { parser: u ? "babel-ts" : "babel", __isVueForBindingLeft: true })), " ", a, " ", await T2(o2, t9, { parser: u ? "__ts_expression" : "__js_expression" })];
}
function ea(t9) {
  let e2 = /(.*?)\s+(in|of)\s+(.*)/su, r2 = /,([^,\]}]*)(?:,([^,\]}]*))?$/u, n2 = /^\(|\)$/gu, s2 = t9.match(e2);
  if (!s2) return;
  let i = {};
  if (i.for = s2[3].trim(), !i.for) return;
  let a = w(false, s2[1].trim(), n2, ""), o2 = a.match(r2);
  o2 ? (i.alias = a.replace(r2, ""), i.iterator1 = o2[1].trim(), o2[2] && (i.iterator2 = o2[2].trim())) : i.alias = a;
  let u = [i.alias, i.iterator1, i.iterator2];
  if (!u.some((p, l2) => !p && (l2 === 0 || u.slice(l2 + 1).some(Boolean)))) return { left: u.filter(Boolean).join(","), operator: s2[2], right: i.for };
}
function ta(t9, e2) {
  if (e2.parser !== "vue") return;
  let { node: r2 } = t9, n2 = r2.fullName;
  if (n2 === "v-for") return Xn2;
  if (n2 === "generic" && kt2(r2.parent, e2)) return jn;
  let s2 = P2(r2), i = Me2(t9, e2);
  if ($n2(r2) || On2(r2, e2)) return (a) => Kn2(s2, a, { parseWithTs: i });
  if (n2.startsWith("@") || n2.startsWith("v-on:")) return (a) => ra(s2, a, { parseWithTs: i });
  if (n2.startsWith(":") || n2.startsWith("v-bind:")) return (a) => na(s2, a, { parseWithTs: i });
  if (n2.startsWith("v-")) return (a) => Jn2(s2, a, { parseWithTs: i });
}
function ra(t9, e2, { parseWithTs: r2 }) {
  return Qn2(t9) ? Jn2(t9, e2, { parseWithTs: r2 }) : T2(t9, e2, { parser: r2 ? "__vue_ts_event_binding" : "__vue_event_binding" }, j2);
}
function na(t9, e2, { parseWithTs: r2 }) {
  return T2(t9, e2, { parser: r2 ? "__vue_ts_expression" : "__vue_expression" }, j2);
}
function Jn2(t9, e2, { parseWithTs: r2 }) {
  return T2(t9, e2, { parser: r2 ? "__ts_expression" : "__js_expression" }, j2);
}
var Zn2 = ta;
function sa(t9, e2) {
  let { node: r2 } = t9;
  if (r2.value) {
    if (/^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/u.test(e2.originalText.slice(r2.valueSpan.start.offset, r2.valueSpan.end.offset)) || e2.parser === "lwc" && r2.value.startsWith("{") && r2.value.endsWith("}")) return [r2.rawName, "=", r2.value];
    for (let n2 of [Gn2, Yn, Hn, Zn2, qn2]) {
      let s2 = n2(t9, e2);
      if (s2) return ia(s2);
    }
  }
}
function ia(t9) {
  return async (e2, r2, n2, s2) => {
    let i = await t9(e2, r2, n2, s2);
    if (i) return i = Dt2(i, (a) => typeof a == "string" ? w(false, a, '"', "&quot;") : a), [n2.node.rawName, '="', _2(i), '"'];
  };
}
var es = sa;
var ts = new Proxy(() => {
}, { get: () => ts });
var Dr2 = ts;
function aa(t9) {
  return Array.isArray(t9) && t9.length > 0;
}
var qe2 = aa;
function se2(t9) {
  return t9.sourceSpan.start.offset;
}
function ie2(t9) {
  return t9.sourceSpan.end.offset;
}
function Ze2(t9, e2) {
  return [t9.isSelfClosing ? "" : oa(t9, e2), De2(t9, e2)];
}
function oa(t9, e2) {
  return t9.lastChild && we2(t9.lastChild) ? "" : [ua(t9, e2), Bt2(t9, e2)];
}
function De2(t9, e2) {
  return (t9.next ? K2(t9.next) : ye(t9.parent)) ? "" : [ve2(t9, e2), W2(t9, e2)];
}
function ua(t9, e2) {
  return ye(t9) ? ve2(t9.lastChild, e2) : "";
}
function W2(t9, e2) {
  return we2(t9) ? Bt2(t9.parent, e2) : et2(t9) ? Lt2(t9.next) : "";
}
function Bt2(t9, e2) {
  if (Dr2(!t9.isSelfClosing), rs(t9, e2)) return "";
  switch (t9.type) {
    case "ieConditionalComment":
      return "<!";
    case "element":
      if (t9.hasHtmComponentClosingTag) return "<//";
    default:
      return `</${t9.rawName}`;
  }
}
function ve2(t9, e2) {
  if (rs(t9, e2)) return "";
  switch (t9.type) {
    case "ieConditionalComment":
    case "ieConditionalEndComment":
      return "[endif]-->";
    case "ieConditionalStartComment":
      return "]><!-->";
    case "interpolation":
      return "}}";
    case "angularIcuExpression":
      return "}";
    case "element":
      if (t9.isSelfClosing) return "/>";
    default:
      return ">";
  }
}
function rs(t9, e2) {
  return !t9.isSelfClosing && !t9.endSourceSpan && (Ee2(t9) || yt(t9.parent, e2));
}
function K2(t9) {
  return t9.prev && t9.prev.type !== "docType" && t9.type !== "angularControlFlowBlock" && !$(t9.prev) && t9.isLeadingSpaceSensitive && !t9.hasLeadingSpaces;
}
function ye(t9) {
  var e2;
  return ((e2 = t9.lastChild) == null ? void 0 : e2.isTrailingSpaceSensitive) && !t9.lastChild.hasTrailingSpaces && !$(bt2(t9.lastChild)) && !_e2(t9);
}
function we2(t9) {
  return !t9.next && !t9.hasTrailingSpaces && t9.isTrailingSpaceSensitive && $(bt2(t9));
}
function et2(t9) {
  return t9.next && !$(t9.next) && $(t9) && t9.isTrailingSpaceSensitive && !t9.hasTrailingSpaces;
}
function la(t9) {
  let e2 = t9.trim().match(/^prettier-ignore-attribute(?:\s+(.+))?$/su);
  return e2 ? e2[1] ? e2[1].split(/\s+/u) : true : false;
}
function tt2(t9) {
  return !t9.prev && t9.isLeadingSpaceSensitive && !t9.hasLeadingSpaces;
}
function ca(t9, e2, r2) {
  var f;
  let { node: n2 } = t9;
  if (!qe2(n2.attrs)) return n2.isSelfClosing ? " " : "";
  let s2 = ((f = n2.prev) == null ? void 0 : f.type) === "comment" && la(n2.prev.value), i = typeof s2 == "boolean" ? () => s2 : Array.isArray(s2) ? (d) => s2.includes(d.rawName) : () => false, a = t9.map(({ node: d }) => i(d) ? B2(e2.originalText.slice(se2(d), ie2(d))) : r2(), "attrs"), o2 = n2.type === "element" && n2.fullName === "script" && n2.attrs.length === 1 && n2.attrs[0].fullName === "src" && n2.children.length === 0, p = e2.singleAttributePerLine && n2.attrs.length > 1 && !Ae2(n2, e2) ? S2 : E, l2 = [k([o2 ? " " : E, q2(p, a)])];
  return n2.firstChild && tt2(n2.firstChild) || n2.isSelfClosing && ye(n2.parent) || o2 ? l2.push(n2.isSelfClosing ? " " : "") : l2.push(e2.bracketSameLine ? n2.isSelfClosing ? " " : "" : n2.isSelfClosing ? E : v), l2;
}
function pa(t9) {
  return t9.firstChild && tt2(t9.firstChild) ? "" : Ft2(t9);
}
function rt2(t9, e2, r2) {
  let { node: n2 } = t9;
  return [be2(n2, e2), ca(t9, e2, r2), n2.isSelfClosing ? "" : pa(n2)];
}
function be2(t9, e2) {
  return t9.prev && et2(t9.prev) ? "" : [z52(t9, e2), Lt2(t9)];
}
function z52(t9, e2) {
  return tt2(t9) ? Ft2(t9.parent) : K2(t9) ? ve2(t9.prev, e2) : "";
}
function Lt2(t9) {
  switch (t9.type) {
    case "ieConditionalComment":
    case "ieConditionalStartComment":
      return `<!--[if ${t9.condition}`;
    case "ieConditionalEndComment":
      return "<!--<!";
    case "interpolation":
      return "{{";
    case "docType":
      return t9.value === "html" ? "<!doctype" : "<!DOCTYPE";
    case "angularIcuExpression":
      return "{";
    case "element":
      if (t9.condition) return `<!--[if ${t9.condition}]><!--><${t9.rawName}`;
    default:
      return `<${t9.rawName}`;
  }
}
function Ft2(t9) {
  switch (Dr2(!t9.isSelfClosing), t9.type) {
    case "ieConditionalComment":
      return "]>";
    case "element":
      if (t9.condition) return "><!--<![endif]-->";
    default:
      return ">";
  }
}
function ha(t9, e2) {
  if (!t9.endSourceSpan) return "";
  let r2 = t9.startSourceSpan.end.offset;
  t9.firstChild && tt2(t9.firstChild) && (r2 -= Ft2(t9).length);
  let n2 = t9.endSourceSpan.start.offset;
  return t9.lastChild && we2(t9.lastChild) ? n2 += Bt2(t9, e2).length : ye(t9) && (n2 -= ve2(t9.lastChild, e2).length), e2.originalText.slice(r2, n2);
}
var Nt2 = ha;
var ma = /* @__PURE__ */ new Set(["if", "else if", "for", "switch", "case"]);
function fa(t9, e2) {
  let { node: r2 } = t9;
  switch (r2.type) {
    case "element":
      if (U2(r2) || r2.type === "interpolation") return;
      if (!r2.isSelfClosing && Tt2(r2, e2)) {
        let n2 = gr2(r2, e2);
        return n2 ? async (s2, i) => {
          let a = Nt2(r2, e2), o2 = /^\s*$/u.test(a), u = "";
          return o2 || (u = await s2(mr2(a), { parser: n2, __embeddedInHtml: true }), o2 = u === ""), [z52(r2, e2), _2(rt2(t9, e2, i)), o2 ? "" : S2, u, o2 ? "" : S2, Ze2(r2, e2), W2(r2, e2)];
        } : void 0;
      }
      break;
    case "text":
      if (U2(r2.parent)) {
        let n2 = gr2(r2.parent, e2);
        if (n2) return async (s2) => {
          let i = n2 === "markdown" ? Cr2(r2.value.replace(/^[^\S\n]*\n/u, "")) : r2.value, a = { parser: n2, __embeddedInHtml: true };
          if (e2.parser === "html" && n2 === "babel") {
            let o2 = "script", { attrMap: u } = r2.parent;
            u && (u.type === "module" || u.type === "text/babel" && u["data-type"] === "module") && (o2 = "module"), a.__babelSourceType = o2;
          }
          return [ne4, z52(r2, e2), await s2(i, a), W2(r2, e2)];
        };
      } else if (r2.parent.type === "interpolation") return async (n2) => {
        let s2 = { __isInHtmlInterpolation: true, __embeddedInHtml: true };
        return e2.parser === "angular" ? s2.parser = "__ng_interpolation" : e2.parser === "vue" ? s2.parser = Me2(t9, e2) ? "__vue_ts_expression" : "__vue_expression" : s2.parser = "__js_expression", [k([E, await n2(r2.value, s2)]), r2.parent.next && K2(r2.parent.next) ? " " : E];
      };
      break;
    case "attribute":
      return es(t9, e2);
    case "front-matter":
      return (n2) => gn2(r2, n2);
    case "angularControlFlowBlockParameters":
      return ma.has(t9.parent.name) ? Cn2 : void 0;
    case "angularLetDeclarationInitializer":
      return (n2) => T2(r2.value, n2, { parser: "__ng_binding", __isInHtmlAttribute: false });
  }
}
var ns = fa;
var nt2 = null;
function st2(t9) {
  if (nt2 !== null && typeof nt2.property) {
    let e2 = nt2;
    return nt2 = st2.prototype = null, e2;
  }
  return nt2 = st2.prototype = t9 ?? /* @__PURE__ */ Object.create(null), new st2();
}
var da = 10;
for (let t9 = 0; t9 <= da; t9++) st2();
function vr2(t9) {
  return st2(t9);
}
function ga(t9, e2 = "type") {
  vr2(t9);
  function r2(n2) {
    let s2 = n2[e2], i = t9[s2];
    if (!Array.isArray(i)) throw Object.assign(new Error(`Missing visitor keys for '${s2}'.`), { node: n2 });
    return i;
  }
  return r2;
}
var ss = ga;
var Ca = { "front-matter": [], root: ["children"], element: ["attrs", "children"], ieConditionalComment: ["children"], ieConditionalStartComment: [], ieConditionalEndComment: [], interpolation: ["children"], text: ["children"], docType: [], comment: [], attribute: [], cdata: [], angularControlFlowBlock: ["children", "parameters"], angularControlFlowBlockParameters: ["children"], angularControlFlowBlockParameter: [], angularLetDeclaration: ["init"], angularLetDeclarationInitializer: [], angularIcuExpression: ["cases"], angularIcuCase: ["expression"] };
var is = Ca;
var Sa = ss(is);
var as = Sa;
function os(t9) {
  return /^\s*<!--\s*@(?:format|prettier)\s*-->/u.test(t9);
}
function us(t9) {
  return `<!-- @format -->

` + t9;
}
var ls = /* @__PURE__ */ new Map([["if", /* @__PURE__ */ new Set(["else if", "else"])], ["else if", /* @__PURE__ */ new Set(["else if", "else"])], ["for", /* @__PURE__ */ new Set(["empty"])], ["defer", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["placeholder", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["error", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])], ["loading", /* @__PURE__ */ new Set(["placeholder", "error", "loading"])]]);
function cs(t9) {
  let e2 = ie2(t9);
  return t9.type === "element" && !t9.endSourceSpan && qe2(t9.children) ? Math.max(e2, cs(X2(false, t9.children, -1))) : e2;
}
function it2(t9, e2, r2) {
  let n2 = t9.node;
  if (Ee2(n2)) {
    let s2 = cs(n2);
    return [z52(n2, e2), B2(N2.trimEnd(e2.originalText.slice(se2(n2) + (n2.prev && et2(n2.prev) ? Lt2(n2).length : 0), s2 - (n2.next && K2(n2.next) ? ve2(n2, e2).length : 0)))), W2(n2, e2)];
  }
  return r2();
}
function Pt2(t9, e2) {
  return $(t9) && $(e2) ? t9.isTrailingSpaceSensitive ? t9.hasTrailingSpaces ? wt2(e2) ? S2 : E : "" : wt2(e2) ? S2 : v : et2(t9) && (Ee2(e2) || e2.firstChild || e2.isSelfClosing || e2.type === "element" && e2.attrs.length > 0) || t9.type === "element" && t9.isSelfClosing && K2(e2) ? "" : !e2.isLeadingSpaceSensitive || wt2(e2) || K2(e2) && t9.lastChild && we2(t9.lastChild) && t9.lastChild.lastChild && we2(t9.lastChild.lastChild) ? S2 : e2.hasLeadingSpaces ? E : v;
}
function He2(t9, e2, r2) {
  let { node: n2 } = t9;
  if (dr2(n2)) return [ne4, ...t9.map((i) => {
    let a = i.node, o2 = a.prev ? Pt2(a.prev, a) : "";
    return [o2 ? [o2, Qe2(a.prev) ? S2 : ""] : "", it2(i, e2, r2)];
  }, "children")];
  let s2 = n2.children.map(() => Symbol(""));
  return t9.map((i, a) => {
    let o2 = i.node;
    if ($(o2)) {
      if (o2.prev && $(o2.prev)) {
        let A = Pt2(o2.prev, o2);
        if (A) return Qe2(o2.prev) ? [S2, S2, it2(i, e2, r2)] : [A, it2(i, e2, r2)];
      }
      return it2(i, e2, r2);
    }
    let u = [], p = [], l2 = [], f = [], d = o2.prev ? Pt2(o2.prev, o2) : "", C = o2.next ? Pt2(o2, o2.next) : "";
    return d && (Qe2(o2.prev) ? u.push(S2, S2) : d === S2 ? u.push(S2) : $(o2.prev) ? p.push(d) : p.push(ge2("", v, { groupId: s2[a - 1] }))), C && (Qe2(o2) ? $(o2.next) && f.push(S2, S2) : C === S2 ? $(o2.next) && f.push(S2) : l2.push(C)), [...u, _2([...p, _2([it2(i, e2, r2), ...l2], { id: s2[a] })]), ...f];
  }, "children");
}
function ps(t9, e2, r2) {
  let { node: n2 } = t9, s2 = [];
  _a2(t9) && s2.push("} "), s2.push("@", n2.name), n2.parameters && s2.push(" (", _2(r2("parameters")), ")"), s2.push(" {");
  let i = hs(n2);
  return n2.children.length > 0 ? (n2.firstChild.hasLeadingSpaces = true, n2.lastChild.hasTrailingSpaces = true, s2.push(k([S2, He2(t9, e2, r2)])), i && s2.push(S2, "}")) : i && s2.push("}"), _2(s2, { shouldBreak: true });
}
function hs(t9) {
  var e2, r2;
  return !(((e2 = t9.next) == null ? void 0 : e2.type) === "angularControlFlowBlock" && ((r2 = ls.get(t9.name)) != null && r2.has(t9.next.name)));
}
function _a2(t9) {
  let { previous: e2 } = t9;
  return (e2 == null ? void 0 : e2.type) === "angularControlFlowBlock" && !Ee2(e2) && !hs(e2);
}
function ms(t9, e2, r2) {
  return [k([v, q2([";", E], t9.map(r2, "children"))]), v];
}
function fs3(t9, e2, r2) {
  let { node: n2 } = t9;
  return [be2(n2, e2), _2([n2.switchValue.trim(), ", ", n2.clause, n2.cases.length > 0 ? [",", k([E, q2(E, t9.map(r2, "cases"))])] : "", v]), De2(n2, e2)];
}
function ds(t9, e2, r2) {
  let { node: n2 } = t9;
  return [n2.value, " {", _2([k([v, t9.map(({ node: s2 }) => s2.type === "text" && !N2.trim(s2.value) ? "" : r2(), "expression")]), v]), "}"];
}
function gs(t9, e2, r2) {
  let { node: n2 } = t9;
  if (yt(n2, e2)) return [z52(n2, e2), _2(rt2(t9, e2, r2)), B2(Nt2(n2, e2)), ...Ze2(n2, e2), W2(n2, e2)];
  let s2 = n2.children.length === 1 && (n2.firstChild.type === "interpolation" || n2.firstChild.type === "angularIcuExpression") && n2.firstChild.isLeadingSpaceSensitive && !n2.firstChild.hasLeadingSpaces && n2.lastChild.isTrailingSpaceSensitive && !n2.lastChild.hasTrailingSpaces, i = Symbol("element-attr-group-id"), a = (l2) => _2([_2(rt2(t9, e2, r2), { id: i }), l2, Ze2(n2, e2)]), o2 = (l2) => s2 ? on(l2, { groupId: i }) : (U2(n2) || Je2(n2, e2)) && n2.parent.type === "root" && e2.parser === "vue" && !e2.vueIndentScriptAndStyle ? l2 : k(l2), u = () => s2 ? ge2(v, "", { groupId: i }) : n2.firstChild.hasLeadingSpaces && n2.firstChild.isLeadingSpaceSensitive ? E : n2.firstChild.type === "text" && n2.isWhitespaceSensitive && n2.isIndentationSensitive ? sn(v) : v, p = () => (n2.next ? K2(n2.next) : ye(n2.parent)) ? n2.lastChild.hasTrailingSpaces && n2.lastChild.isTrailingSpaceSensitive ? " " : "" : s2 ? ge2(v, "", { groupId: i }) : n2.lastChild.hasTrailingSpaces && n2.lastChild.isTrailingSpaceSensitive ? E : (n2.lastChild.type === "comment" || n2.lastChild.type === "text" && n2.isWhitespaceSensitive && n2.isIndentationSensitive) && new RegExp(`\\n[\\t ]{${e2.tabWidth * (t9.ancestors.length - 1)}}$`, "u").test(n2.lastChild.value) ? "" : v;
  return n2.children.length === 0 ? a(n2.hasDanglingSpaces && n2.isDanglingSpaceSensitive ? E : "") : a([kn2(n2) ? ne4 : "", o2([u(), He2(t9, e2, r2)]), p()]);
}
function at2(t9) {
  return t9 >= 9 && t9 <= 32 || t9 == 160;
}
function It2(t9) {
  return 48 <= t9 && t9 <= 57;
}
function ot2(t9) {
  return t9 >= 97 && t9 <= 122 || t9 >= 65 && t9 <= 90;
}
function Cs(t9) {
  return t9 >= 97 && t9 <= 102 || t9 >= 65 && t9 <= 70 || It2(t9);
}
function Rt2(t9) {
  return t9 === 10 || t9 === 13;
}
function yr2(t9) {
  return 48 <= t9 && t9 <= 55;
}
function $t2(t9) {
  return t9 === 39 || t9 === 34 || t9 === 96;
}
var Ea = /-+([a-z0-9])/g;
function _s(t9) {
  return t9.replace(Ea, (...e2) => e2[1].toUpperCase());
}
var ae2 = class t2 {
  constructor(e2, r2, n2, s2) {
    this.file = e2, this.offset = r2, this.line = n2, this.col = s2;
  }
  toString() {
    return this.offset != null ? `${this.file.url}@${this.line}:${this.col}` : this.file.url;
  }
  moveBy(e2) {
    let r2 = this.file.content, n2 = r2.length, s2 = this.offset, i = this.line, a = this.col;
    for (; s2 > 0 && e2 < 0; ) if (s2--, e2++, r2.charCodeAt(s2) == 10) {
      i--;
      let u = r2.substring(0, s2 - 1).lastIndexOf(String.fromCharCode(10));
      a = u > 0 ? s2 - u : s2;
    } else a--;
    for (; s2 < n2 && e2 > 0; ) {
      let o2 = r2.charCodeAt(s2);
      s2++, e2--, o2 == 10 ? (i++, a = 0) : a++;
    }
    return new t2(this.file, s2, i, a);
  }
  getContext(e2, r2) {
    let n2 = this.file.content, s2 = this.offset;
    if (s2 != null) {
      s2 > n2.length - 1 && (s2 = n2.length - 1);
      let i = s2, a = 0, o2 = 0;
      for (; a < e2 && s2 > 0 && (s2--, a++, !(n2[s2] == `
` && ++o2 == r2)); ) ;
      for (a = 0, o2 = 0; a < e2 && i < n2.length - 1 && (i++, a++, !(n2[i] == `
` && ++o2 == r2)); ) ;
      return { before: n2.substring(s2, this.offset), after: n2.substring(this.offset, i + 1) };
    }
    return null;
  }
};
var Te2 = class {
  constructor(e2, r2) {
    this.content = e2, this.url = r2;
  }
};
var h = class {
  constructor(e2, r2, n2 = e2, s2 = null) {
    this.start = e2, this.end = r2, this.fullStart = n2, this.details = s2;
  }
  toString() {
    return this.start.file.content.substring(this.start.offset, this.end.offset);
  }
};
var Ot2;
(function(t9) {
  t9[t9.WARNING = 0] = "WARNING", t9[t9.ERROR = 1] = "ERROR";
})(Ot2 || (Ot2 = {}));
var Ue2 = class {
  constructor(e2, r2, n2 = Ot2.ERROR) {
    this.span = e2, this.msg = r2, this.level = n2;
  }
  contextualMessage() {
    let e2 = this.span.start.getContext(100, 3);
    return e2 ? `${this.msg} ("${e2.before}[${Ot2[this.level]} ->]${e2.after}")` : this.msg;
  }
  toString() {
    let e2 = this.span.details ? `, ${this.span.details}` : "";
    return `${this.contextualMessage()}: ${this.span.start}${e2}`;
  }
};
var Aa = [va, ya, ba, xa, ka, Fa, Ba, La, Na, Ta];
function Da(t9, e2) {
  for (let r2 of Aa) r2(t9, e2);
  return t9;
}
function va(t9) {
  t9.walk((e2) => {
    if (e2.type === "element" && e2.tagDefinition.ignoreFirstLf && e2.children.length > 0 && e2.children[0].type === "text" && e2.children[0].value[0] === `
`) {
      let r2 = e2.children[0];
      r2.value.length === 1 ? e2.removeChild(r2) : r2.value = r2.value.slice(1);
    }
  });
}
function ya(t9) {
  let e2 = (r2) => {
    var n2, s2;
    return r2.type === "element" && ((n2 = r2.prev) == null ? void 0 : n2.type) === "ieConditionalStartComment" && r2.prev.sourceSpan.end.offset === r2.startSourceSpan.start.offset && ((s2 = r2.firstChild) == null ? void 0 : s2.type) === "ieConditionalEndComment" && r2.firstChild.sourceSpan.start.offset === r2.startSourceSpan.end.offset;
  };
  t9.walk((r2) => {
    if (r2.children) for (let n2 = 0; n2 < r2.children.length; n2++) {
      let s2 = r2.children[n2];
      if (!e2(s2)) continue;
      let i = s2.prev, a = s2.firstChild;
      r2.removeChild(i), n2--;
      let o2 = new h(i.sourceSpan.start, a.sourceSpan.end), u = new h(o2.start, s2.sourceSpan.end);
      s2.condition = i.condition, s2.sourceSpan = u, s2.startSourceSpan = o2, s2.removeChild(a);
    }
  });
}
function wa(t9, e2, r2) {
  t9.walk((n2) => {
    if (n2.children) for (let s2 = 0; s2 < n2.children.length; s2++) {
      let i = n2.children[s2];
      if (i.type !== "text" && !e2(i)) continue;
      i.type !== "text" && (i.type = "text", i.value = r2(i));
      let a = i.prev;
      !a || a.type !== "text" || (a.value += i.value, a.sourceSpan = new h(a.sourceSpan.start, i.sourceSpan.end), n2.removeChild(i), s2--);
    }
  });
}
function ba(t9) {
  return wa(t9, (e2) => e2.type === "cdata", (e2) => `<![CDATA[${e2.value}]]>`);
}
function Ta(t9) {
  let e2 = (r2) => {
    var n2, s2;
    return r2.type === "element" && r2.attrs.length === 0 && r2.children.length === 1 && r2.firstChild.type === "text" && !N2.hasWhitespaceCharacter(r2.children[0].value) && !r2.firstChild.hasLeadingSpaces && !r2.firstChild.hasTrailingSpaces && r2.isLeadingSpaceSensitive && !r2.hasLeadingSpaces && r2.isTrailingSpaceSensitive && !r2.hasTrailingSpaces && ((n2 = r2.prev) == null ? void 0 : n2.type) === "text" && ((s2 = r2.next) == null ? void 0 : s2.type) === "text";
  };
  t9.walk((r2) => {
    if (r2.children) for (let n2 = 0; n2 < r2.children.length; n2++) {
      let s2 = r2.children[n2];
      if (!e2(s2)) continue;
      let i = s2.prev, a = s2.next;
      i.value += `<${s2.rawName}>` + s2.firstChild.value + `</${s2.rawName}>` + a.value, i.sourceSpan = new h(i.sourceSpan.start, a.sourceSpan.end), i.isTrailingSpaceSensitive = a.isTrailingSpaceSensitive, i.hasTrailingSpaces = a.hasTrailingSpaces, r2.removeChild(s2), n2--, r2.removeChild(a);
    }
  });
}
function xa(t9, e2) {
  if (e2.parser === "html") return;
  let r2 = /\{\{(.+?)\}\}/su;
  t9.walk((n2) => {
    if (yn2(n2)) for (let s2 of n2.children) {
      if (s2.type !== "text") continue;
      let i = s2.sourceSpan.start, a = null, o2 = s2.value.split(r2);
      for (let u = 0; u < o2.length; u++, i = a) {
        let p = o2[u];
        if (u % 2 === 0) {
          a = i.moveBy(p.length), p.length > 0 && n2.insertChildBefore(s2, { type: "text", value: p, sourceSpan: new h(i, a) });
          continue;
        }
        a = i.moveBy(p.length + 4), n2.insertChildBefore(s2, { type: "interpolation", sourceSpan: new h(i, a), children: p.length === 0 ? [] : [{ type: "text", value: p, sourceSpan: new h(i.moveBy(2), a.moveBy(-2)) }] });
      }
      n2.removeChild(s2);
    }
  });
}
function ka(t9) {
  t9.walk((e2) => {
    if (!e2.children) return;
    if (e2.children.length === 0 || e2.children.length === 1 && e2.children[0].type === "text" && N2.trim(e2.children[0].value).length === 0) {
      e2.hasDanglingSpaces = e2.children.length > 0, e2.children = [];
      return;
    }
    let r2 = wn2(e2), n2 = fr2(e2);
    if (!r2) for (let s2 = 0; s2 < e2.children.length; s2++) {
      let i = e2.children[s2];
      if (i.type !== "text") continue;
      let { leadingWhitespace: a, text: o2, trailingWhitespace: u } = vn2(i.value), p = i.prev, l2 = i.next;
      o2 ? (i.value = o2, i.sourceSpan = new h(i.sourceSpan.start.moveBy(a.length), i.sourceSpan.end.moveBy(-u.length)), a && (p && (p.hasTrailingSpaces = true), i.hasLeadingSpaces = true), u && (i.hasTrailingSpaces = true, l2 && (l2.hasLeadingSpaces = true))) : (e2.removeChild(i), s2--, (a || u) && (p && (p.hasTrailingSpaces = true), l2 && (l2.hasLeadingSpaces = true)));
    }
    e2.isWhitespaceSensitive = r2, e2.isIndentationSensitive = n2;
  });
}
function Ba(t9) {
  t9.walk((e2) => {
    e2.isSelfClosing = !e2.children || e2.type === "element" && (e2.tagDefinition.isVoid || e2.endSourceSpan && e2.startSourceSpan.start === e2.endSourceSpan.start && e2.startSourceSpan.end === e2.endSourceSpan.end);
  });
}
function La(t9, e2) {
  t9.walk((r2) => {
    r2.type === "element" && (r2.hasHtmComponentClosingTag = r2.endSourceSpan && /^<\s*\/\s*\/\s*>$/u.test(e2.originalText.slice(r2.endSourceSpan.start.offset, r2.endSourceSpan.end.offset)));
  });
}
function Fa(t9, e2) {
  t9.walk((r2) => {
    r2.cssDisplay = In(r2, e2);
  });
}
function Na(t9, e2) {
  t9.walk((r2) => {
    let { children: n2 } = r2;
    if (n2) {
      if (n2.length === 0) {
        r2.isDanglingSpaceSensitive = xn2(r2);
        return;
      }
      for (let s2 of n2) s2.isLeadingSpaceSensitive = bn2(s2, e2), s2.isTrailingSpaceSensitive = Tn2(s2, e2);
      for (let s2 = 0; s2 < n2.length; s2++) {
        let i = n2[s2];
        i.isLeadingSpaceSensitive = (s2 === 0 || i.prev.isTrailingSpaceSensitive) && i.isLeadingSpaceSensitive, i.isTrailingSpaceSensitive = (s2 === n2.length - 1 || i.next.isLeadingSpaceSensitive) && i.isTrailingSpaceSensitive;
      }
    }
  });
}
var Es = Da;
function Pa(t9, e2, r2) {
  let { node: n2 } = t9;
  switch (n2.type) {
    case "front-matter":
      return B2(n2.raw);
    case "root":
      return e2.__onHtmlRoot && e2.__onHtmlRoot(n2), [_2(He2(t9, e2, r2)), S2];
    case "element":
    case "ieConditionalComment":
      return gs(t9, e2, r2);
    case "angularControlFlowBlock":
      return ps(t9, e2, r2);
    case "angularControlFlowBlockParameters":
      return ms(t9, e2, r2);
    case "angularControlFlowBlockParameter":
      return N2.trim(n2.expression);
    case "angularLetDeclaration":
      return _2(["@let ", _2([n2.id, " =", _2(k([E, r2("init")]))]), ";"]);
    case "angularLetDeclarationInitializer":
      return n2.value;
    case "angularIcuExpression":
      return fs3(t9, e2, r2);
    case "angularIcuCase":
      return ds(t9, e2, r2);
    case "ieConditionalStartComment":
    case "ieConditionalEndComment":
      return [be2(n2), De2(n2)];
    case "interpolation":
      return [be2(n2, e2), ...t9.map(r2, "children"), De2(n2, e2)];
    case "text": {
      if (n2.parent.type === "interpolation") {
        let i = /\n[^\S\n]*$/u, a = i.test(n2.value), o2 = a ? n2.value.replace(i, "") : n2.value;
        return [B2(o2), a ? S2 : ""];
      }
      let s2 = ln2([z52(n2, e2), ...xt2(n2), W2(n2, e2)]);
      return Array.isArray(s2) ? At2(s2) : s2;
    }
    case "docType":
      return [_2([be2(n2, e2), " ", w(false, n2.value.replace(/^html\b/iu, "html"), /\s+/gu, " ")]), De2(n2, e2)];
    case "comment":
      return [z52(n2, e2), B2(e2.originalText.slice(se2(n2), ie2(n2))), W2(n2, e2)];
    case "attribute": {
      if (n2.value === null) return n2.rawName;
      let s2 = Sr2(n2.value), i = pn2(s2, '"');
      return [n2.rawName, "=", i, B2(i === '"' ? w(false, s2, '"', "&quot;") : w(false, s2, "'", "&apos;")), i];
    }
    case "cdata":
    default:
      throw new mn2(n2, "HTML");
  }
}
var Ia = { preprocess: Es, print: Pa, insertPragma: us, massageAstNode: dn2, embed: ns, getVisitorKeys: as };
var As = Ia;
var Ds = [{ linguistLanguageId: 146, name: "Angular", type: "markup", tmScope: "text.html.basic", aceMode: "html", codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", color: "#e34c26", aliases: ["xhtml"], extensions: [".component.html"], parsers: ["angular"], vscodeLanguageIds: ["html"], filenames: [] }, { linguistLanguageId: 146, name: "HTML", type: "markup", tmScope: "text.html.basic", aceMode: "html", codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", color: "#e34c26", aliases: ["xhtml"], extensions: [".html", ".hta", ".htm", ".html.hl", ".inc", ".xht", ".xhtml", ".mjml"], parsers: ["html"], vscodeLanguageIds: ["html"] }, { linguistLanguageId: 146, name: "Lightning Web Components", type: "markup", tmScope: "text.html.basic", aceMode: "html", codemirrorMode: "htmlmixed", codemirrorMimeType: "text/html", color: "#e34c26", aliases: ["xhtml"], extensions: [], parsers: ["lwc"], vscodeLanguageIds: ["html"], filenames: [] }, { linguistLanguageId: 391, name: "Vue", type: "markup", color: "#41b883", extensions: [".vue"], tmScope: "text.html.vue", aceMode: "html", parsers: ["vue"], vscodeLanguageIds: ["vue"] }];
var wr2 = { bracketSpacing: { category: "Common", type: "boolean", default: true, description: "Print spaces between brackets.", oppositeDescription: "Do not print spaces between brackets." }, singleQuote: { category: "Common", type: "boolean", default: false, description: "Use single quotes instead of double quotes." }, proseWrap: { category: "Common", type: "choice", default: "preserve", description: "How to wrap prose.", choices: [{ value: "always", description: "Wrap prose if it exceeds the print width." }, { value: "never", description: "Do not wrap prose." }, { value: "preserve", description: "Wrap prose as-is." }] }, bracketSameLine: { category: "Common", type: "boolean", default: false, description: "Put > of opening tags on the last line instead of on a new line." }, singleAttributePerLine: { category: "Common", type: "boolean", default: false, description: "Enforce single attribute per line in HTML, Vue and JSX." } };
var vs = "HTML";
var Ra = { bracketSameLine: wr2.bracketSameLine, htmlWhitespaceSensitivity: { category: vs, type: "choice", default: "css", description: "How to handle whitespaces in HTML.", choices: [{ value: "css", description: "Respect the default value of CSS display property." }, { value: "strict", description: "Whitespaces are considered sensitive." }, { value: "ignore", description: "Whitespaces are considered insensitive." }] }, singleAttributePerLine: wr2.singleAttributePerLine, vueIndentScriptAndStyle: { category: vs, type: "boolean", default: false, description: "Indent script and style tags in Vue files." } };
var ys = Ra;
var Gr2 = {};
Jr2(Gr2, { angular: () => Po2, html: () => No, lwc: () => Ro2, vue: () => Io2 });
var _p = new RegExp(`(\\:not\\()|(([\\.\\#]?)[-\\w]+)|(?:\\[([-.\\w*\\\\$]+)(?:=(["']?)([^\\]"']*)\\5)?\\])|(\\))|(\\s*,\\s*)`, "g");
var ws2;
(function(t9) {
  t9[t9.Emulated = 0] = "Emulated", t9[t9.None = 2] = "None", t9[t9.ShadowDom = 3] = "ShadowDom";
})(ws2 || (ws2 = {}));
var bs;
(function(t9) {
  t9[t9.OnPush = 0] = "OnPush", t9[t9.Default = 1] = "Default";
})(bs || (bs = {}));
var Ts;
(function(t9) {
  t9[t9.None = 0] = "None", t9[t9.SignalBased = 1] = "SignalBased", t9[t9.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform";
})(Ts || (Ts = {}));
var br2 = { name: "custom-elements" };
var Tr2 = { name: "no-errors-schema" };
var J2;
(function(t9) {
  t9[t9.NONE = 0] = "NONE", t9[t9.HTML = 1] = "HTML", t9[t9.STYLE = 2] = "STYLE", t9[t9.SCRIPT = 3] = "SCRIPT", t9[t9.URL = 4] = "URL", t9[t9.RESOURCE_URL = 5] = "RESOURCE_URL";
})(J2 || (J2 = {}));
var xs;
(function(t9) {
  t9[t9.Error = 0] = "Error", t9[t9.Warning = 1] = "Warning", t9[t9.Ignore = 2] = "Ignore";
})(xs || (xs = {}));
var I3;
(function(t9) {
  t9[t9.RAW_TEXT = 0] = "RAW_TEXT", t9[t9.ESCAPABLE_RAW_TEXT = 1] = "ESCAPABLE_RAW_TEXT", t9[t9.PARSABLE_DATA = 2] = "PARSABLE_DATA";
})(I3 || (I3 = {}));
function ut2(t9, e2 = true) {
  if (t9[0] != ":") return [null, t9];
  let r2 = t9.indexOf(":", 1);
  if (r2 === -1) {
    if (e2) throw new Error(`Unsupported format "${t9}" expecting ":namespace:name"`);
    return [null, t9];
  }
  return [t9.slice(1, r2), t9.slice(r2 + 1)];
}
function xr2(t9) {
  return ut2(t9)[1] === "ng-container";
}
function kr2(t9) {
  return ut2(t9)[1] === "ng-content";
}
function We2(t9) {
  return t9 === null ? null : ut2(t9)[0];
}
function ze2(t9, e2) {
  return t9 ? `:${t9}:${e2}` : e2;
}
var qt2;
function Br2() {
  return qt2 || (qt2 = {}, Mt2(J2.HTML, ["iframe|srcdoc", "*|innerHTML", "*|outerHTML"]), Mt2(J2.STYLE, ["*|style"]), Mt2(J2.URL, ["*|formAction", "area|href", "area|ping", "audio|src", "a|href", "a|ping", "blockquote|cite", "body|background", "del|cite", "form|action", "img|src", "input|src", "ins|cite", "q|cite", "source|src", "track|src", "video|poster", "video|src"]), Mt2(J2.RESOURCE_URL, ["applet|code", "applet|codebase", "base|href", "embed|src", "frame|src", "head|profile", "html|manifest", "iframe|src", "link|href", "media|src", "object|codebase", "object|data", "script|src"])), qt2;
}
function Mt2(t9, e2) {
  for (let r2 of e2) qt2[r2.toLowerCase()] = t9;
}
var Ht2 = class {
};
var $a = "boolean";
var Oa = "number";
var Ma = "string";
var qa = "object";
var Ha = ["[Element]|textContent,%ariaAtomic,%ariaAutoComplete,%ariaBusy,%ariaChecked,%ariaColCount,%ariaColIndex,%ariaColSpan,%ariaCurrent,%ariaDescription,%ariaDisabled,%ariaExpanded,%ariaHasPopup,%ariaHidden,%ariaKeyShortcuts,%ariaLabel,%ariaLevel,%ariaLive,%ariaModal,%ariaMultiLine,%ariaMultiSelectable,%ariaOrientation,%ariaPlaceholder,%ariaPosInSet,%ariaPressed,%ariaReadOnly,%ariaRelevant,%ariaRequired,%ariaRoleDescription,%ariaRowCount,%ariaRowIndex,%ariaRowSpan,%ariaSelected,%ariaSetSize,%ariaSort,%ariaValueMax,%ariaValueMin,%ariaValueNow,%ariaValueText,%classList,className,elementTiming,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*fullscreenchange,*fullscreenerror,*search,*webkitfullscreenchange,*webkitfullscreenerror,outerHTML,%part,#scrollLeft,#scrollTop,slot,*message,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored", "[HTMLElement]^[Element]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,!inert,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy", "abbr,address,article,aside,b,bdi,bdo,cite,content,code,dd,dfn,dt,em,figcaption,figure,footer,header,hgroup,i,kbd,main,mark,nav,noscript,rb,rp,rt,rtc,ruby,s,samp,section,small,strong,sub,sup,u,var,wbr^[HTMLElement]|accessKey,autocapitalize,!autofocus,contentEditable,dir,!draggable,enterKeyHint,!hidden,innerText,inputMode,lang,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate,virtualKeyboardPolicy", "media^[HTMLElement]|!autoplay,!controls,%controlsList,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,*waitingforkey,#playbackRate,preload,!preservesPitch,src,%srcObject,#volume", ":svg:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex", ":svg:graphics^:svg:|", ":svg:animation^:svg:|*begin,*end,*repeat", ":svg:geometry^:svg:|", ":svg:componentTransferFunction^:svg:|", ":svg:gradient^:svg:|", ":svg:textContent^:svg:graphics|", ":svg:textPositioning^:svg:textContent|", "a^[HTMLElement]|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,rev,search,shape,target,text,type,username", "area^[HTMLElement]|alt,coords,download,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerPolicy,rel,%relList,search,shape,target,username", "audio^media|", "br^[HTMLElement]|clear", "base^[HTMLElement]|href,target", "body^[HTMLElement]|aLink,background,bgColor,link,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink", "button^[HTMLElement]|!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value", "canvas^[HTMLElement]|#height,#width", "content^[HTMLElement]|select", "dl^[HTMLElement]|!compact", "data^[HTMLElement]|value", "datalist^[HTMLElement]|", "details^[HTMLElement]|!open", "dialog^[HTMLElement]|!open,returnValue", "dir^[HTMLElement]|!compact", "div^[HTMLElement]|align", "embed^[HTMLElement]|align,height,name,src,type,width", "fieldset^[HTMLElement]|!disabled,name", "font^[HTMLElement]|color,face,size", "form^[HTMLElement]|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target", "frame^[HTMLElement]|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src", "frameset^[HTMLElement]|cols,*afterprint,*beforeprint,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*messageerror,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows", "hr^[HTMLElement]|align,color,!noShade,size,width", "head^[HTMLElement]|", "h1,h2,h3,h4,h5,h6^[HTMLElement]|align", "html^[HTMLElement]|version", "iframe^[HTMLElement]|align,allow,!allowFullscreen,!allowPaymentRequest,csp,frameBorder,height,loading,longDesc,marginHeight,marginWidth,name,referrerPolicy,%sandbox,scrolling,src,srcdoc,width", "img^[HTMLElement]|align,alt,border,%crossOrigin,decoding,#height,#hspace,!isMap,loading,longDesc,lowsrc,name,referrerPolicy,sizes,src,srcset,useMap,#vspace,#width", "input^[HTMLElement]|accept,align,alt,autocomplete,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width", "li^[HTMLElement]|type,#value", "label^[HTMLElement]|htmlFor", "legend^[HTMLElement]|align", "link^[HTMLElement]|as,charset,%crossOrigin,!disabled,href,hreflang,imageSizes,imageSrcset,integrity,media,referrerPolicy,rel,%relList,rev,%sizes,target,type", "map^[HTMLElement]|name", "marquee^[HTMLElement]|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width", "menu^[HTMLElement]|!compact", "meta^[HTMLElement]|content,httpEquiv,media,name,scheme", "meter^[HTMLElement]|#high,#low,#max,#min,#optimum,#value", "ins,del^[HTMLElement]|cite,dateTime", "ol^[HTMLElement]|!compact,!reversed,#start,type", "object^[HTMLElement]|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width", "optgroup^[HTMLElement]|!disabled,label", "option^[HTMLElement]|!defaultSelected,!disabled,label,!selected,text,value", "output^[HTMLElement]|defaultValue,%htmlFor,name,value", "p^[HTMLElement]|align", "param^[HTMLElement]|name,type,value,valueType", "picture^[HTMLElement]|", "pre^[HTMLElement]|#width", "progress^[HTMLElement]|#max,#value", "q,blockquote,cite^[HTMLElement]|", "script^[HTMLElement]|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,!noModule,%referrerPolicy,src,text,type", "select^[HTMLElement]|autocomplete,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value", "slot^[HTMLElement]|name", "source^[HTMLElement]|#height,media,sizes,src,srcset,type,#width", "span^[HTMLElement]|", "style^[HTMLElement]|!disabled,media,type", "caption^[HTMLElement]|align", "th,td^[HTMLElement]|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width", "col,colgroup^[HTMLElement]|align,ch,chOff,#span,vAlign,width", "table^[HTMLElement]|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width", "tr^[HTMLElement]|align,bgColor,ch,chOff,vAlign", "tfoot,thead,tbody^[HTMLElement]|align,ch,chOff,vAlign", "template^[HTMLElement]|", "textarea^[HTMLElement]|autocomplete,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap", "time^[HTMLElement]|dateTime", "title^[HTMLElement]|text", "track^[HTMLElement]|!default,kind,label,src,srclang", "ul^[HTMLElement]|!compact,type", "unknown^[HTMLElement]|", "video^media|!disablePictureInPicture,#height,*enterpictureinpicture,*leavepictureinpicture,!playsInline,poster,#width", ":svg:a^:svg:graphics|", ":svg:animate^:svg:animation|", ":svg:animateMotion^:svg:animation|", ":svg:animateTransform^:svg:animation|", ":svg:circle^:svg:geometry|", ":svg:clipPath^:svg:graphics|", ":svg:defs^:svg:graphics|", ":svg:desc^:svg:|", ":svg:discard^:svg:|", ":svg:ellipse^:svg:geometry|", ":svg:feBlend^:svg:|", ":svg:feColorMatrix^:svg:|", ":svg:feComponentTransfer^:svg:|", ":svg:feComposite^:svg:|", ":svg:feConvolveMatrix^:svg:|", ":svg:feDiffuseLighting^:svg:|", ":svg:feDisplacementMap^:svg:|", ":svg:feDistantLight^:svg:|", ":svg:feDropShadow^:svg:|", ":svg:feFlood^:svg:|", ":svg:feFuncA^:svg:componentTransferFunction|", ":svg:feFuncB^:svg:componentTransferFunction|", ":svg:feFuncG^:svg:componentTransferFunction|", ":svg:feFuncR^:svg:componentTransferFunction|", ":svg:feGaussianBlur^:svg:|", ":svg:feImage^:svg:|", ":svg:feMerge^:svg:|", ":svg:feMergeNode^:svg:|", ":svg:feMorphology^:svg:|", ":svg:feOffset^:svg:|", ":svg:fePointLight^:svg:|", ":svg:feSpecularLighting^:svg:|", ":svg:feSpotLight^:svg:|", ":svg:feTile^:svg:|", ":svg:feTurbulence^:svg:|", ":svg:filter^:svg:|", ":svg:foreignObject^:svg:graphics|", ":svg:g^:svg:graphics|", ":svg:image^:svg:graphics|decoding", ":svg:line^:svg:geometry|", ":svg:linearGradient^:svg:gradient|", ":svg:mpath^:svg:|", ":svg:marker^:svg:|", ":svg:mask^:svg:|", ":svg:metadata^:svg:|", ":svg:path^:svg:geometry|", ":svg:pattern^:svg:|", ":svg:polygon^:svg:geometry|", ":svg:polyline^:svg:geometry|", ":svg:radialGradient^:svg:gradient|", ":svg:rect^:svg:geometry|", ":svg:svg^:svg:graphics|#currentScale,#zoomAndPan", ":svg:script^:svg:|type", ":svg:set^:svg:animation|", ":svg:stop^:svg:|", ":svg:style^:svg:|!disabled,media,title,type", ":svg:switch^:svg:graphics|", ":svg:symbol^:svg:|", ":svg:tspan^:svg:textPositioning|", ":svg:text^:svg:textPositioning|", ":svg:textPath^:svg:textContent|", ":svg:title^:svg:|", ":svg:use^:svg:graphics|", ":svg:view^:svg:|#zoomAndPan", "data^[HTMLElement]|value", "keygen^[HTMLElement]|!autofocus,challenge,!disabled,form,keytype,name", "menuitem^[HTMLElement]|type,label,icon,!disabled,!checked,radiogroup,!default", "summary^[HTMLElement]|", "time^[HTMLElement]|dateTime", ":svg:cursor^:svg:|", ":math:^[HTMLElement]|!autofocus,nonce,*abort,*animationend,*animationiteration,*animationstart,*auxclick,*beforeinput,*beforematch,*beforetoggle,*beforexrselect,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contentvisibilityautostatechange,*contextlost,*contextmenu,*contextrestored,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*formdata,*gotpointercapture,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*lostpointercapture,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*paste,*pause,*play,*playing,*pointercancel,*pointerdown,*pointerenter,*pointerleave,*pointermove,*pointerout,*pointerover,*pointerrawupdate,*pointerup,*progress,*ratechange,*reset,*resize,*scroll,*scrollend,*securitypolicyviolation,*seeked,*seeking,*select,*selectionchange,*selectstart,*slotchange,*stalled,*submit,*suspend,*timeupdate,*toggle,*transitioncancel,*transitionend,*transitionrun,*transitionstart,*volumechange,*waiting,*webkitanimationend,*webkitanimationiteration,*webkitanimationstart,*webkittransitionend,*wheel,%style,#tabIndex", ":math:math^:math:|", ":math:maction^:math:|", ":math:menclose^:math:|", ":math:merror^:math:|", ":math:mfenced^:math:|", ":math:mfrac^:math:|", ":math:mi^:math:|", ":math:mmultiscripts^:math:|", ":math:mn^:math:|", ":math:mo^:math:|", ":math:mover^:math:|", ":math:mpadded^:math:|", ":math:mphantom^:math:|", ":math:mroot^:math:|", ":math:mrow^:math:|", ":math:ms^:math:|", ":math:mspace^:math:|", ":math:msqrt^:math:|", ":math:mstyle^:math:|", ":math:msub^:math:|", ":math:msubsup^:math:|", ":math:msup^:math:|", ":math:mtable^:math:|", ":math:mtd^:math:|", ":math:mtext^:math:|", ":math:mtr^:math:|", ":math:munder^:math:|", ":math:munderover^:math:|", ":math:semantics^:math:|"];
var ks = new Map(Object.entries({ class: "className", for: "htmlFor", formaction: "formAction", innerHtml: "innerHTML", readonly: "readOnly", tabindex: "tabIndex" }));
var Va = Array.from(ks).reduce((t9, [e2, r2]) => (t9.set(e2, r2), t9), /* @__PURE__ */ new Map());
var Vt2 = class extends Ht2 {
  constructor() {
    super(), this._schema = /* @__PURE__ */ new Map(), this._eventSchema = /* @__PURE__ */ new Map(), Ha.forEach((e2) => {
      let r2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Set(), [s2, i] = e2.split("|"), a = i.split(","), [o2, u] = s2.split("^");
      o2.split(",").forEach((l2) => {
        this._schema.set(l2.toLowerCase(), r2), this._eventSchema.set(l2.toLowerCase(), n2);
      });
      let p = u && this._schema.get(u.toLowerCase());
      if (p) {
        for (let [l2, f] of p) r2.set(l2, f);
        for (let l2 of this._eventSchema.get(u.toLowerCase())) n2.add(l2);
      }
      a.forEach((l2) => {
        if (l2.length > 0) switch (l2[0]) {
          case "*":
            n2.add(l2.substring(1));
            break;
          case "!":
            r2.set(l2.substring(1), $a);
            break;
          case "#":
            r2.set(l2.substring(1), Oa);
            break;
          case "%":
            r2.set(l2.substring(1), qa);
            break;
          default:
            r2.set(l2, Ma);
        }
      });
    });
  }
  hasProperty(e2, r2, n2) {
    if (n2.some((i) => i.name === Tr2.name)) return true;
    if (e2.indexOf("-") > -1) {
      if (xr2(e2) || kr2(e2)) return false;
      if (n2.some((i) => i.name === br2.name)) return true;
    }
    return (this._schema.get(e2.toLowerCase()) || this._schema.get("unknown")).has(r2);
  }
  hasElement(e2, r2) {
    return r2.some((n2) => n2.name === Tr2.name) || e2.indexOf("-") > -1 && (xr2(e2) || kr2(e2) || r2.some((n2) => n2.name === br2.name)) ? true : this._schema.has(e2.toLowerCase());
  }
  securityContext(e2, r2, n2) {
    n2 && (r2 = this.getMappedPropName(r2)), e2 = e2.toLowerCase(), r2 = r2.toLowerCase();
    let s2 = Br2()[e2 + "|" + r2];
    return s2 || (s2 = Br2()["*|" + r2], s2 || J2.NONE);
  }
  getMappedPropName(e2) {
    return ks.get(e2) ?? e2;
  }
  getDefaultComponentElementName() {
    return "ng-component";
  }
  validateProperty(e2) {
    return e2.toLowerCase().startsWith("on") ? { error: true, msg: `Binding to event property '${e2}' is disallowed for security reasons, please use (${e2.slice(2)})=...
If '${e2}' is a directive input, make sure the directive is imported by the current module.` } : { error: false };
  }
  validateAttribute(e2) {
    return e2.toLowerCase().startsWith("on") ? { error: true, msg: `Binding to event attribute '${e2}' is disallowed for security reasons, please use (${e2.slice(2)})=...` } : { error: false };
  }
  allKnownElementNames() {
    return Array.from(this._schema.keys());
  }
  allKnownAttributesOfElement(e2) {
    let r2 = this._schema.get(e2.toLowerCase()) || this._schema.get("unknown");
    return Array.from(r2.keys()).map((n2) => Va.get(n2) ?? n2);
  }
  allKnownEventsOfElement(e2) {
    return Array.from(this._eventSchema.get(e2.toLowerCase()) ?? []);
  }
  normalizeAnimationStyleProperty(e2) {
    return _s(e2);
  }
  normalizeAnimationStyleValue(e2, r2, n2) {
    let s2 = "", i = n2.toString().trim(), a = null;
    if (Ua(e2) && n2 !== 0 && n2 !== "0") if (typeof n2 == "number") s2 = "px";
    else {
      let o2 = n2.match(/^[+-]?[\d\.]+([a-z]*)$/);
      o2 && o2[1].length == 0 && (a = `Please provide a CSS unit value for ${r2}:${n2}`);
    }
    return { error: a, value: i + s2 };
  }
};
function Ua(t9) {
  switch (t9) {
    case "width":
    case "height":
    case "minWidth":
    case "minHeight":
    case "maxWidth":
    case "maxHeight":
    case "left":
    case "top":
    case "bottom":
    case "right":
    case "fontSize":
    case "outlineWidth":
    case "outlineOffset":
    case "paddingTop":
    case "paddingLeft":
    case "paddingBottom":
    case "paddingRight":
    case "marginTop":
    case "marginLeft":
    case "marginBottom":
    case "marginRight":
    case "borderRadius":
    case "borderWidth":
    case "borderTopWidth":
    case "borderLeftWidth":
    case "borderRightWidth":
    case "borderBottomWidth":
    case "textIndent":
      return true;
    default:
      return false;
  }
}
var m = class {
  constructor({ closedByChildren: e2, implicitNamespacePrefix: r2, contentType: n2 = I3.PARSABLE_DATA, closedByParent: s2 = false, isVoid: i = false, ignoreFirstLf: a = false, preventNamespaceInheritance: o2 = false, canSelfClose: u = false } = {}) {
    this.closedByChildren = {}, this.closedByParent = false, e2 && e2.length > 0 && e2.forEach((p) => this.closedByChildren[p] = true), this.isVoid = i, this.closedByParent = s2 || i, this.implicitNamespacePrefix = r2 || null, this.contentType = n2, this.ignoreFirstLf = a, this.preventNamespaceInheritance = o2, this.canSelfClose = u ?? i;
  }
  isClosedByChild(e2) {
    return this.isVoid || e2.toLowerCase() in this.closedByChildren;
  }
  getContentType(e2) {
    return typeof this.contentType == "object" ? (e2 === void 0 ? void 0 : this.contentType[e2]) ?? this.contentType.default : this.contentType;
  }
};
var Bs;
var lt3;
function Ge2(t9) {
  return lt3 || (Bs = new m({ canSelfClose: true }), lt3 = Object.assign(/* @__PURE__ */ Object.create(null), { base: new m({ isVoid: true }), meta: new m({ isVoid: true }), area: new m({ isVoid: true }), embed: new m({ isVoid: true }), link: new m({ isVoid: true }), img: new m({ isVoid: true }), input: new m({ isVoid: true }), param: new m({ isVoid: true }), hr: new m({ isVoid: true }), br: new m({ isVoid: true }), source: new m({ isVoid: true }), track: new m({ isVoid: true }), wbr: new m({ isVoid: true }), p: new m({ closedByChildren: ["address", "article", "aside", "blockquote", "div", "dl", "fieldset", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "main", "nav", "ol", "p", "pre", "section", "table", "ul"], closedByParent: true }), thead: new m({ closedByChildren: ["tbody", "tfoot"] }), tbody: new m({ closedByChildren: ["tbody", "tfoot"], closedByParent: true }), tfoot: new m({ closedByChildren: ["tbody"], closedByParent: true }), tr: new m({ closedByChildren: ["tr"], closedByParent: true }), td: new m({ closedByChildren: ["td", "th"], closedByParent: true }), th: new m({ closedByChildren: ["td", "th"], closedByParent: true }), col: new m({ isVoid: true }), svg: new m({ implicitNamespacePrefix: "svg" }), foreignObject: new m({ implicitNamespacePrefix: "svg", preventNamespaceInheritance: true }), math: new m({ implicitNamespacePrefix: "math" }), li: new m({ closedByChildren: ["li"], closedByParent: true }), dt: new m({ closedByChildren: ["dt", "dd"] }), dd: new m({ closedByChildren: ["dt", "dd"], closedByParent: true }), rb: new m({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }), rt: new m({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }), rtc: new m({ closedByChildren: ["rb", "rtc", "rp"], closedByParent: true }), rp: new m({ closedByChildren: ["rb", "rt", "rtc", "rp"], closedByParent: true }), optgroup: new m({ closedByChildren: ["optgroup"], closedByParent: true }), option: new m({ closedByChildren: ["option", "optgroup"], closedByParent: true }), pre: new m({ ignoreFirstLf: true }), listing: new m({ ignoreFirstLf: true }), style: new m({ contentType: I3.RAW_TEXT }), script: new m({ contentType: I3.RAW_TEXT }), title: new m({ contentType: { default: I3.ESCAPABLE_RAW_TEXT, svg: I3.PARSABLE_DATA } }), textarea: new m({ contentType: I3.ESCAPABLE_RAW_TEXT, ignoreFirstLf: true }) }), new Vt2().allKnownElementNames().forEach((e2) => {
    !lt3[e2] && We2(e2) === null && (lt3[e2] = new m({ canSelfClose: false }));
  })), lt3[t9] ?? Bs;
}
var oe2 = class {
  constructor(e2, r2) {
    this.sourceSpan = e2, this.i18n = r2;
  }
};
var Ut2 = class extends oe2 {
  constructor(e2, r2, n2, s2) {
    super(r2, s2), this.value = e2, this.tokens = n2, this.type = "text";
  }
  visit(e2, r2) {
    return e2.visitText(this, r2);
  }
};
var Wt2 = class extends oe2 {
  constructor(e2, r2, n2, s2) {
    super(r2, s2), this.value = e2, this.tokens = n2, this.type = "cdata";
  }
  visit(e2, r2) {
    return e2.visitCdata(this, r2);
  }
};
var zt2 = class extends oe2 {
  constructor(e2, r2, n2, s2, i, a) {
    super(s2, a), this.switchValue = e2, this.type = r2, this.cases = n2, this.switchValueSourceSpan = i;
  }
  visit(e2, r2) {
    return e2.visitExpansion(this, r2);
  }
};
var Gt2 = class {
  constructor(e2, r2, n2, s2, i) {
    this.value = e2, this.expression = r2, this.sourceSpan = n2, this.valueSourceSpan = s2, this.expSourceSpan = i, this.type = "expansionCase";
  }
  visit(e2, r2) {
    return e2.visitExpansionCase(this, r2);
  }
};
var Yt2 = class extends oe2 {
  constructor(e2, r2, n2, s2, i, a, o2) {
    super(n2, o2), this.name = e2, this.value = r2, this.keySpan = s2, this.valueSpan = i, this.valueTokens = a, this.type = "attribute";
  }
  visit(e2, r2) {
    return e2.visitAttribute(this, r2);
  }
  get nameSpan() {
    return this.keySpan;
  }
};
var G2 = class extends oe2 {
  constructor(e2, r2, n2, s2, i, a = null, o2 = null, u) {
    super(s2, u), this.name = e2, this.attrs = r2, this.children = n2, this.startSourceSpan = i, this.endSourceSpan = a, this.nameSpan = o2, this.type = "element";
  }
  visit(e2, r2) {
    return e2.visitElement(this, r2);
  }
};
var jt2 = class {
  constructor(e2, r2) {
    this.value = e2, this.sourceSpan = r2, this.type = "comment";
  }
  visit(e2, r2) {
    return e2.visitComment(this, r2);
  }
};
var Kt2 = class {
  constructor(e2, r2) {
    this.value = e2, this.sourceSpan = r2, this.type = "docType";
  }
  visit(e2, r2) {
    return e2.visitDocType(this, r2);
  }
};
var Z2 = class extends oe2 {
  constructor(e2, r2, n2, s2, i, a, o2 = null, u) {
    super(s2, u), this.name = e2, this.parameters = r2, this.children = n2, this.nameSpan = i, this.startSourceSpan = a, this.endSourceSpan = o2, this.type = "block";
  }
  visit(e2, r2) {
    return e2.visitBlock(this, r2);
  }
};
var ct2 = class {
  constructor(e2, r2) {
    this.expression = e2, this.sourceSpan = r2, this.type = "blockParameter", this.startSourceSpan = null, this.endSourceSpan = null;
  }
  visit(e2, r2) {
    return e2.visitBlockParameter(this, r2);
  }
};
var pt2 = class {
  constructor(e2, r2, n2, s2, i) {
    this.name = e2, this.value = r2, this.sourceSpan = n2, this.nameSpan = s2, this.valueSpan = i, this.type = "letDeclaration", this.startSourceSpan = null, this.endSourceSpan = null;
  }
  visit(e2, r2) {
    return e2.visitLetDeclaration(this, r2);
  }
};
function Qt2(t9, e2, r2 = null) {
  let n2 = [], s2 = t9.visit ? (i) => t9.visit(i, r2) || i.visit(t9, r2) : (i) => i.visit(t9, r2);
  return e2.forEach((i) => {
    let a = s2(i);
    a && n2.push(a);
  }), n2;
}
var ht2 = class {
  constructor() {
  }
  visitElement(e2, r2) {
    this.visitChildren(r2, (n2) => {
      n2(e2.attrs), n2(e2.children);
    });
  }
  visitAttribute(e2, r2) {
  }
  visitText(e2, r2) {
  }
  visitCdata(e2, r2) {
  }
  visitComment(e2, r2) {
  }
  visitDocType(e2, r2) {
  }
  visitExpansion(e2, r2) {
    return this.visitChildren(r2, (n2) => {
      n2(e2.cases);
    });
  }
  visitExpansionCase(e2, r2) {
  }
  visitBlock(e2, r2) {
    this.visitChildren(r2, (n2) => {
      n2(e2.parameters), n2(e2.children);
    });
  }
  visitBlockParameter(e2, r2) {
  }
  visitLetDeclaration(e2, r2) {
  }
  visitChildren(e2, r2) {
    let n2 = [], s2 = this;
    function i(a) {
      a && n2.push(Qt2(s2, a, e2));
    }
    return r2(i), Array.prototype.concat.apply([], n2);
  }
};
var Ye2 = { AElig: "\xC6", AMP: "&", amp: "&", Aacute: "\xC1", Abreve: "\u0102", Acirc: "\xC2", Acy: "\u0410", Afr: "\u{1D504}", Agrave: "\xC0", Alpha: "\u0391", Amacr: "\u0100", And: "\u2A53", Aogon: "\u0104", Aopf: "\u{1D538}", ApplyFunction: "\u2061", af: "\u2061", Aring: "\xC5", angst: "\xC5", Ascr: "\u{1D49C}", Assign: "\u2254", colone: "\u2254", coloneq: "\u2254", Atilde: "\xC3", Auml: "\xC4", Backslash: "\u2216", setminus: "\u2216", setmn: "\u2216", smallsetminus: "\u2216", ssetmn: "\u2216", Barv: "\u2AE7", Barwed: "\u2306", doublebarwedge: "\u2306", Bcy: "\u0411", Because: "\u2235", becaus: "\u2235", because: "\u2235", Bernoullis: "\u212C", Bscr: "\u212C", bernou: "\u212C", Beta: "\u0392", Bfr: "\u{1D505}", Bopf: "\u{1D539}", Breve: "\u02D8", breve: "\u02D8", Bumpeq: "\u224E", HumpDownHump: "\u224E", bump: "\u224E", CHcy: "\u0427", COPY: "\xA9", copy: "\xA9", Cacute: "\u0106", Cap: "\u22D2", CapitalDifferentialD: "\u2145", DD: "\u2145", Cayleys: "\u212D", Cfr: "\u212D", Ccaron: "\u010C", Ccedil: "\xC7", Ccirc: "\u0108", Cconint: "\u2230", Cdot: "\u010A", Cedilla: "\xB8", cedil: "\xB8", CenterDot: "\xB7", centerdot: "\xB7", middot: "\xB7", Chi: "\u03A7", CircleDot: "\u2299", odot: "\u2299", CircleMinus: "\u2296", ominus: "\u2296", CirclePlus: "\u2295", oplus: "\u2295", CircleTimes: "\u2297", otimes: "\u2297", ClockwiseContourIntegral: "\u2232", cwconint: "\u2232", CloseCurlyDoubleQuote: "\u201D", rdquo: "\u201D", rdquor: "\u201D", CloseCurlyQuote: "\u2019", rsquo: "\u2019", rsquor: "\u2019", Colon: "\u2237", Proportion: "\u2237", Colone: "\u2A74", Congruent: "\u2261", equiv: "\u2261", Conint: "\u222F", DoubleContourIntegral: "\u222F", ContourIntegral: "\u222E", conint: "\u222E", oint: "\u222E", Copf: "\u2102", complexes: "\u2102", Coproduct: "\u2210", coprod: "\u2210", CounterClockwiseContourIntegral: "\u2233", awconint: "\u2233", Cross: "\u2A2F", Cscr: "\u{1D49E}", Cup: "\u22D3", CupCap: "\u224D", asympeq: "\u224D", DDotrahd: "\u2911", DJcy: "\u0402", DScy: "\u0405", DZcy: "\u040F", Dagger: "\u2021", ddagger: "\u2021", Darr: "\u21A1", Dashv: "\u2AE4", DoubleLeftTee: "\u2AE4", Dcaron: "\u010E", Dcy: "\u0414", Del: "\u2207", nabla: "\u2207", Delta: "\u0394", Dfr: "\u{1D507}", DiacriticalAcute: "\xB4", acute: "\xB4", DiacriticalDot: "\u02D9", dot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", dblac: "\u02DD", DiacriticalGrave: "`", grave: "`", DiacriticalTilde: "\u02DC", tilde: "\u02DC", Diamond: "\u22C4", diam: "\u22C4", diamond: "\u22C4", DifferentialD: "\u2146", dd: "\u2146", Dopf: "\u{1D53B}", Dot: "\xA8", DoubleDot: "\xA8", die: "\xA8", uml: "\xA8", DotDot: "\u20DC", DotEqual: "\u2250", doteq: "\u2250", esdot: "\u2250", DoubleDownArrow: "\u21D3", Downarrow: "\u21D3", dArr: "\u21D3", DoubleLeftArrow: "\u21D0", Leftarrow: "\u21D0", lArr: "\u21D0", DoubleLeftRightArrow: "\u21D4", Leftrightarrow: "\u21D4", hArr: "\u21D4", iff: "\u21D4", DoubleLongLeftArrow: "\u27F8", Longleftarrow: "\u27F8", xlArr: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", Longleftrightarrow: "\u27FA", xhArr: "\u27FA", DoubleLongRightArrow: "\u27F9", Longrightarrow: "\u27F9", xrArr: "\u27F9", DoubleRightArrow: "\u21D2", Implies: "\u21D2", Rightarrow: "\u21D2", rArr: "\u21D2", DoubleRightTee: "\u22A8", vDash: "\u22A8", DoubleUpArrow: "\u21D1", Uparrow: "\u21D1", uArr: "\u21D1", DoubleUpDownArrow: "\u21D5", Updownarrow: "\u21D5", vArr: "\u21D5", DoubleVerticalBar: "\u2225", par: "\u2225", parallel: "\u2225", shortparallel: "\u2225", spar: "\u2225", DownArrow: "\u2193", ShortDownArrow: "\u2193", darr: "\u2193", downarrow: "\u2193", DownArrowBar: "\u2913", DownArrowUpArrow: "\u21F5", duarr: "\u21F5", DownBreve: "\u0311", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVector: "\u21BD", leftharpoondown: "\u21BD", lhard: "\u21BD", DownLeftVectorBar: "\u2956", DownRightTeeVector: "\u295F", DownRightVector: "\u21C1", rhard: "\u21C1", rightharpoondown: "\u21C1", DownRightVectorBar: "\u2957", DownTee: "\u22A4", top: "\u22A4", DownTeeArrow: "\u21A7", mapstodown: "\u21A7", Dscr: "\u{1D49F}", Dstrok: "\u0110", ENG: "\u014A", ETH: "\xD0", Eacute: "\xC9", Ecaron: "\u011A", Ecirc: "\xCA", Ecy: "\u042D", Edot: "\u0116", Efr: "\u{1D508}", Egrave: "\xC8", Element: "\u2208", in: "\u2208", isin: "\u2208", isinv: "\u2208", Emacr: "\u0112", EmptySmallSquare: "\u25FB", EmptyVerySmallSquare: "\u25AB", Eogon: "\u0118", Eopf: "\u{1D53C}", Epsilon: "\u0395", Equal: "\u2A75", EqualTilde: "\u2242", eqsim: "\u2242", esim: "\u2242", Equilibrium: "\u21CC", rightleftharpoons: "\u21CC", rlhar: "\u21CC", Escr: "\u2130", expectation: "\u2130", Esim: "\u2A73", Eta: "\u0397", Euml: "\xCB", Exists: "\u2203", exist: "\u2203", ExponentialE: "\u2147", ee: "\u2147", exponentiale: "\u2147", Fcy: "\u0424", Ffr: "\u{1D509}", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", blacksquare: "\u25AA", squarf: "\u25AA", squf: "\u25AA", Fopf: "\u{1D53D}", ForAll: "\u2200", forall: "\u2200", Fouriertrf: "\u2131", Fscr: "\u2131", GJcy: "\u0403", GT: ">", gt: ">", Gamma: "\u0393", Gammad: "\u03DC", Gbreve: "\u011E", Gcedil: "\u0122", Gcirc: "\u011C", Gcy: "\u0413", Gdot: "\u0120", Gfr: "\u{1D50A}", Gg: "\u22D9", ggg: "\u22D9", Gopf: "\u{1D53E}", GreaterEqual: "\u2265", ge: "\u2265", geq: "\u2265", GreaterEqualLess: "\u22DB", gel: "\u22DB", gtreqless: "\u22DB", GreaterFullEqual: "\u2267", gE: "\u2267", geqq: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", gl: "\u2277", gtrless: "\u2277", GreaterSlantEqual: "\u2A7E", geqslant: "\u2A7E", ges: "\u2A7E", GreaterTilde: "\u2273", gsim: "\u2273", gtrsim: "\u2273", Gscr: "\u{1D4A2}", Gt: "\u226B", NestedGreaterGreater: "\u226B", gg: "\u226B", HARDcy: "\u042A", Hacek: "\u02C7", caron: "\u02C7", Hat: "^", Hcirc: "\u0124", Hfr: "\u210C", Poincareplane: "\u210C", HilbertSpace: "\u210B", Hscr: "\u210B", hamilt: "\u210B", Hopf: "\u210D", quaternions: "\u210D", HorizontalLine: "\u2500", boxh: "\u2500", Hstrok: "\u0126", HumpEqual: "\u224F", bumpe: "\u224F", bumpeq: "\u224F", IEcy: "\u0415", IJlig: "\u0132", IOcy: "\u0401", Iacute: "\xCD", Icirc: "\xCE", Icy: "\u0418", Idot: "\u0130", Ifr: "\u2111", Im: "\u2111", image: "\u2111", imagpart: "\u2111", Igrave: "\xCC", Imacr: "\u012A", ImaginaryI: "\u2148", ii: "\u2148", Int: "\u222C", Integral: "\u222B", int: "\u222B", Intersection: "\u22C2", bigcap: "\u22C2", xcap: "\u22C2", InvisibleComma: "\u2063", ic: "\u2063", InvisibleTimes: "\u2062", it: "\u2062", Iogon: "\u012E", Iopf: "\u{1D540}", Iota: "\u0399", Iscr: "\u2110", imagline: "\u2110", Itilde: "\u0128", Iukcy: "\u0406", Iuml: "\xCF", Jcirc: "\u0134", Jcy: "\u0419", Jfr: "\u{1D50D}", Jopf: "\u{1D541}", Jscr: "\u{1D4A5}", Jsercy: "\u0408", Jukcy: "\u0404", KHcy: "\u0425", KJcy: "\u040C", Kappa: "\u039A", Kcedil: "\u0136", Kcy: "\u041A", Kfr: "\u{1D50E}", Kopf: "\u{1D542}", Kscr: "\u{1D4A6}", LJcy: "\u0409", LT: "<", lt: "<", Lacute: "\u0139", Lambda: "\u039B", Lang: "\u27EA", Laplacetrf: "\u2112", Lscr: "\u2112", lagran: "\u2112", Larr: "\u219E", twoheadleftarrow: "\u219E", Lcaron: "\u013D", Lcedil: "\u013B", Lcy: "\u041B", LeftAngleBracket: "\u27E8", lang: "\u27E8", langle: "\u27E8", LeftArrow: "\u2190", ShortLeftArrow: "\u2190", larr: "\u2190", leftarrow: "\u2190", slarr: "\u2190", LeftArrowBar: "\u21E4", larrb: "\u21E4", LeftArrowRightArrow: "\u21C6", leftrightarrows: "\u21C6", lrarr: "\u21C6", LeftCeiling: "\u2308", lceil: "\u2308", LeftDoubleBracket: "\u27E6", lobrk: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVector: "\u21C3", dharl: "\u21C3", downharpoonleft: "\u21C3", LeftDownVectorBar: "\u2959", LeftFloor: "\u230A", lfloor: "\u230A", LeftRightArrow: "\u2194", harr: "\u2194", leftrightarrow: "\u2194", LeftRightVector: "\u294E", LeftTee: "\u22A3", dashv: "\u22A3", LeftTeeArrow: "\u21A4", mapstoleft: "\u21A4", LeftTeeVector: "\u295A", LeftTriangle: "\u22B2", vartriangleleft: "\u22B2", vltri: "\u22B2", LeftTriangleBar: "\u29CF", LeftTriangleEqual: "\u22B4", ltrie: "\u22B4", trianglelefteq: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVector: "\u21BF", uharl: "\u21BF", upharpoonleft: "\u21BF", LeftUpVectorBar: "\u2958", LeftVector: "\u21BC", leftharpoonup: "\u21BC", lharu: "\u21BC", LeftVectorBar: "\u2952", LessEqualGreater: "\u22DA", leg: "\u22DA", lesseqgtr: "\u22DA", LessFullEqual: "\u2266", lE: "\u2266", leqq: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", lg: "\u2276", LessLess: "\u2AA1", LessSlantEqual: "\u2A7D", leqslant: "\u2A7D", les: "\u2A7D", LessTilde: "\u2272", lesssim: "\u2272", lsim: "\u2272", Lfr: "\u{1D50F}", Ll: "\u22D8", Lleftarrow: "\u21DA", lAarr: "\u21DA", Lmidot: "\u013F", LongLeftArrow: "\u27F5", longleftarrow: "\u27F5", xlarr: "\u27F5", LongLeftRightArrow: "\u27F7", longleftrightarrow: "\u27F7", xharr: "\u27F7", LongRightArrow: "\u27F6", longrightarrow: "\u27F6", xrarr: "\u27F6", Lopf: "\u{1D543}", LowerLeftArrow: "\u2199", swarr: "\u2199", swarrow: "\u2199", LowerRightArrow: "\u2198", searr: "\u2198", searrow: "\u2198", Lsh: "\u21B0", lsh: "\u21B0", Lstrok: "\u0141", Lt: "\u226A", NestedLessLess: "\u226A", ll: "\u226A", Map: "\u2905", Mcy: "\u041C", MediumSpace: "\u205F", Mellintrf: "\u2133", Mscr: "\u2133", phmmat: "\u2133", Mfr: "\u{1D510}", MinusPlus: "\u2213", mnplus: "\u2213", mp: "\u2213", Mopf: "\u{1D544}", Mu: "\u039C", NJcy: "\u040A", Nacute: "\u0143", Ncaron: "\u0147", Ncedil: "\u0145", Ncy: "\u041D", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", ZeroWidthSpace: "\u200B", NewLine: `
`, Nfr: "\u{1D511}", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nbsp: "\xA0", Nopf: "\u2115", naturals: "\u2115", Not: "\u2AEC", NotCongruent: "\u2262", nequiv: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", npar: "\u2226", nparallel: "\u2226", nshortparallel: "\u2226", nspar: "\u2226", NotElement: "\u2209", notin: "\u2209", notinva: "\u2209", NotEqual: "\u2260", ne: "\u2260", NotEqualTilde: "\u2242\u0338", nesim: "\u2242\u0338", NotExists: "\u2204", nexist: "\u2204", nexists: "\u2204", NotGreater: "\u226F", ngt: "\u226F", ngtr: "\u226F", NotGreaterEqual: "\u2271", nge: "\u2271", ngeq: "\u2271", NotGreaterFullEqual: "\u2267\u0338", ngE: "\u2267\u0338", ngeqq: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", nGtv: "\u226B\u0338", NotGreaterLess: "\u2279", ntgl: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", NotGreaterTilde: "\u2275", ngsim: "\u2275", NotHumpDownHump: "\u224E\u0338", nbump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", nbumpe: "\u224F\u0338", NotLeftTriangle: "\u22EA", nltri: "\u22EA", ntriangleleft: "\u22EA", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangleEqual: "\u22EC", nltrie: "\u22EC", ntrianglelefteq: "\u22EC", NotLess: "\u226E", nless: "\u226E", nlt: "\u226E", NotLessEqual: "\u2270", nle: "\u2270", nleq: "\u2270", NotLessGreater: "\u2278", ntlg: "\u2278", NotLessLess: "\u226A\u0338", nLtv: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", NotLessTilde: "\u2274", nlsim: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", NotPrecedes: "\u2280", npr: "\u2280", nprec: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", npre: "\u2AAF\u0338", npreceq: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", nprcue: "\u22E0", NotReverseElement: "\u220C", notni: "\u220C", notniva: "\u220C", NotRightTriangle: "\u22EB", nrtri: "\u22EB", ntriangleright: "\u22EB", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangleEqual: "\u22ED", nrtrie: "\u22ED", ntrianglerighteq: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", nsqsube: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", nsqsupe: "\u22E3", NotSubset: "\u2282\u20D2", nsubset: "\u2282\u20D2", vnsub: "\u2282\u20D2", NotSubsetEqual: "\u2288", nsube: "\u2288", nsubseteq: "\u2288", NotSucceeds: "\u2281", nsc: "\u2281", nsucc: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", nsce: "\u2AB0\u0338", nsucceq: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", nsccue: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", nsupset: "\u2283\u20D2", vnsup: "\u2283\u20D2", NotSupersetEqual: "\u2289", nsupe: "\u2289", nsupseteq: "\u2289", NotTilde: "\u2241", nsim: "\u2241", NotTildeEqual: "\u2244", nsime: "\u2244", nsimeq: "\u2244", NotTildeFullEqual: "\u2247", ncong: "\u2247", NotTildeTilde: "\u2249", nap: "\u2249", napprox: "\u2249", NotVerticalBar: "\u2224", nmid: "\u2224", nshortmid: "\u2224", nsmid: "\u2224", Nscr: "\u{1D4A9}", Ntilde: "\xD1", Nu: "\u039D", OElig: "\u0152", Oacute: "\xD3", Ocirc: "\xD4", Ocy: "\u041E", Odblac: "\u0150", Ofr: "\u{1D512}", Ograve: "\xD2", Omacr: "\u014C", Omega: "\u03A9", ohm: "\u03A9", Omicron: "\u039F", Oopf: "\u{1D546}", OpenCurlyDoubleQuote: "\u201C", ldquo: "\u201C", OpenCurlyQuote: "\u2018", lsquo: "\u2018", Or: "\u2A54", Oscr: "\u{1D4AA}", Oslash: "\xD8", Otilde: "\xD5", Otimes: "\u2A37", Ouml: "\xD6", OverBar: "\u203E", oline: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", tbrk: "\u23B4", OverParenthesis: "\u23DC", PartialD: "\u2202", part: "\u2202", Pcy: "\u041F", Pfr: "\u{1D513}", Phi: "\u03A6", Pi: "\u03A0", PlusMinus: "\xB1", plusmn: "\xB1", pm: "\xB1", Popf: "\u2119", primes: "\u2119", Pr: "\u2ABB", Precedes: "\u227A", pr: "\u227A", prec: "\u227A", PrecedesEqual: "\u2AAF", pre: "\u2AAF", preceq: "\u2AAF", PrecedesSlantEqual: "\u227C", prcue: "\u227C", preccurlyeq: "\u227C", PrecedesTilde: "\u227E", precsim: "\u227E", prsim: "\u227E", Prime: "\u2033", Product: "\u220F", prod: "\u220F", Proportional: "\u221D", prop: "\u221D", propto: "\u221D", varpropto: "\u221D", vprop: "\u221D", Pscr: "\u{1D4AB}", Psi: "\u03A8", QUOT: '"', quot: '"', Qfr: "\u{1D514}", Qopf: "\u211A", rationals: "\u211A", Qscr: "\u{1D4AC}", RBarr: "\u2910", drbkarow: "\u2910", REG: "\xAE", circledR: "\xAE", reg: "\xAE", Racute: "\u0154", Rang: "\u27EB", Rarr: "\u21A0", twoheadrightarrow: "\u21A0", Rarrtl: "\u2916", Rcaron: "\u0158", Rcedil: "\u0156", Rcy: "\u0420", Re: "\u211C", Rfr: "\u211C", real: "\u211C", realpart: "\u211C", ReverseElement: "\u220B", SuchThat: "\u220B", ni: "\u220B", niv: "\u220B", ReverseEquilibrium: "\u21CB", leftrightharpoons: "\u21CB", lrhar: "\u21CB", ReverseUpEquilibrium: "\u296F", duhar: "\u296F", Rho: "\u03A1", RightAngleBracket: "\u27E9", rang: "\u27E9", rangle: "\u27E9", RightArrow: "\u2192", ShortRightArrow: "\u2192", rarr: "\u2192", rightarrow: "\u2192", srarr: "\u2192", RightArrowBar: "\u21E5", rarrb: "\u21E5", RightArrowLeftArrow: "\u21C4", rightleftarrows: "\u21C4", rlarr: "\u21C4", RightCeiling: "\u2309", rceil: "\u2309", RightDoubleBracket: "\u27E7", robrk: "\u27E7", RightDownTeeVector: "\u295D", RightDownVector: "\u21C2", dharr: "\u21C2", downharpoonright: "\u21C2", RightDownVectorBar: "\u2955", RightFloor: "\u230B", rfloor: "\u230B", RightTee: "\u22A2", vdash: "\u22A2", RightTeeArrow: "\u21A6", map: "\u21A6", mapsto: "\u21A6", RightTeeVector: "\u295B", RightTriangle: "\u22B3", vartriangleright: "\u22B3", vrtri: "\u22B3", RightTriangleBar: "\u29D0", RightTriangleEqual: "\u22B5", rtrie: "\u22B5", trianglerighteq: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVector: "\u21BE", uharr: "\u21BE", upharpoonright: "\u21BE", RightUpVectorBar: "\u2954", RightVector: "\u21C0", rharu: "\u21C0", rightharpoonup: "\u21C0", RightVectorBar: "\u2953", Ropf: "\u211D", reals: "\u211D", RoundImplies: "\u2970", Rrightarrow: "\u21DB", rAarr: "\u21DB", Rscr: "\u211B", realine: "\u211B", Rsh: "\u21B1", rsh: "\u21B1", RuleDelayed: "\u29F4", SHCHcy: "\u0429", SHcy: "\u0428", SOFTcy: "\u042C", Sacute: "\u015A", Sc: "\u2ABC", Scaron: "\u0160", Scedil: "\u015E", Scirc: "\u015C", Scy: "\u0421", Sfr: "\u{1D516}", ShortUpArrow: "\u2191", UpArrow: "\u2191", uarr: "\u2191", uparrow: "\u2191", Sigma: "\u03A3", SmallCircle: "\u2218", compfn: "\u2218", Sopf: "\u{1D54A}", Sqrt: "\u221A", radic: "\u221A", Square: "\u25A1", squ: "\u25A1", square: "\u25A1", SquareIntersection: "\u2293", sqcap: "\u2293", SquareSubset: "\u228F", sqsub: "\u228F", sqsubset: "\u228F", SquareSubsetEqual: "\u2291", sqsube: "\u2291", sqsubseteq: "\u2291", SquareSuperset: "\u2290", sqsup: "\u2290", sqsupset: "\u2290", SquareSupersetEqual: "\u2292", sqsupe: "\u2292", sqsupseteq: "\u2292", SquareUnion: "\u2294", sqcup: "\u2294", Sscr: "\u{1D4AE}", Star: "\u22C6", sstarf: "\u22C6", Sub: "\u22D0", Subset: "\u22D0", SubsetEqual: "\u2286", sube: "\u2286", subseteq: "\u2286", Succeeds: "\u227B", sc: "\u227B", succ: "\u227B", SucceedsEqual: "\u2AB0", sce: "\u2AB0", succeq: "\u2AB0", SucceedsSlantEqual: "\u227D", sccue: "\u227D", succcurlyeq: "\u227D", SucceedsTilde: "\u227F", scsim: "\u227F", succsim: "\u227F", Sum: "\u2211", sum: "\u2211", Sup: "\u22D1", Supset: "\u22D1", Superset: "\u2283", sup: "\u2283", supset: "\u2283", SupersetEqual: "\u2287", supe: "\u2287", supseteq: "\u2287", THORN: "\xDE", TRADE: "\u2122", trade: "\u2122", TSHcy: "\u040B", TScy: "\u0426", Tab: "	", Tau: "\u03A4", Tcaron: "\u0164", Tcedil: "\u0162", Tcy: "\u0422", Tfr: "\u{1D517}", Therefore: "\u2234", there4: "\u2234", therefore: "\u2234", Theta: "\u0398", ThickSpace: "\u205F\u200A", ThinSpace: "\u2009", thinsp: "\u2009", Tilde: "\u223C", sim: "\u223C", thicksim: "\u223C", thksim: "\u223C", TildeEqual: "\u2243", sime: "\u2243", simeq: "\u2243", TildeFullEqual: "\u2245", cong: "\u2245", TildeTilde: "\u2248", ap: "\u2248", approx: "\u2248", asymp: "\u2248", thickapprox: "\u2248", thkap: "\u2248", Topf: "\u{1D54B}", TripleDot: "\u20DB", tdot: "\u20DB", Tscr: "\u{1D4AF}", Tstrok: "\u0166", Uacute: "\xDA", Uarr: "\u219F", Uarrocir: "\u2949", Ubrcy: "\u040E", Ubreve: "\u016C", Ucirc: "\xDB", Ucy: "\u0423", Udblac: "\u0170", Ufr: "\u{1D518}", Ugrave: "\xD9", Umacr: "\u016A", UnderBar: "_", lowbar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", bbrk: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", bigcup: "\u22C3", xcup: "\u22C3", UnionPlus: "\u228E", uplus: "\u228E", Uogon: "\u0172", Uopf: "\u{1D54C}", UpArrowBar: "\u2912", UpArrowDownArrow: "\u21C5", udarr: "\u21C5", UpDownArrow: "\u2195", updownarrow: "\u2195", varr: "\u2195", UpEquilibrium: "\u296E", udhar: "\u296E", UpTee: "\u22A5", bot: "\u22A5", bottom: "\u22A5", perp: "\u22A5", UpTeeArrow: "\u21A5", mapstoup: "\u21A5", UpperLeftArrow: "\u2196", nwarr: "\u2196", nwarrow: "\u2196", UpperRightArrow: "\u2197", nearr: "\u2197", nearrow: "\u2197", Upsi: "\u03D2", upsih: "\u03D2", Upsilon: "\u03A5", Uring: "\u016E", Uscr: "\u{1D4B0}", Utilde: "\u0168", Uuml: "\xDC", VDash: "\u22AB", Vbar: "\u2AEB", Vcy: "\u0412", Vdash: "\u22A9", Vdashl: "\u2AE6", Vee: "\u22C1", bigvee: "\u22C1", xvee: "\u22C1", Verbar: "\u2016", Vert: "\u2016", VerticalBar: "\u2223", mid: "\u2223", shortmid: "\u2223", smid: "\u2223", VerticalLine: "|", verbar: "|", vert: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", wr: "\u2240", wreath: "\u2240", VeryThinSpace: "\u200A", hairsp: "\u200A", Vfr: "\u{1D519}", Vopf: "\u{1D54D}", Vscr: "\u{1D4B1}", Vvdash: "\u22AA", Wcirc: "\u0174", Wedge: "\u22C0", bigwedge: "\u22C0", xwedge: "\u22C0", Wfr: "\u{1D51A}", Wopf: "\u{1D54E}", Wscr: "\u{1D4B2}", Xfr: "\u{1D51B}", Xi: "\u039E", Xopf: "\u{1D54F}", Xscr: "\u{1D4B3}", YAcy: "\u042F", YIcy: "\u0407", YUcy: "\u042E", Yacute: "\xDD", Ycirc: "\u0176", Ycy: "\u042B", Yfr: "\u{1D51C}", Yopf: "\u{1D550}", Yscr: "\u{1D4B4}", Yuml: "\u0178", ZHcy: "\u0416", Zacute: "\u0179", Zcaron: "\u017D", Zcy: "\u0417", Zdot: "\u017B", Zeta: "\u0396", Zfr: "\u2128", zeetrf: "\u2128", Zopf: "\u2124", integers: "\u2124", Zscr: "\u{1D4B5}", aacute: "\xE1", abreve: "\u0103", ac: "\u223E", mstpos: "\u223E", acE: "\u223E\u0333", acd: "\u223F", acirc: "\xE2", acy: "\u0430", aelig: "\xE6", afr: "\u{1D51E}", agrave: "\xE0", alefsym: "\u2135", aleph: "\u2135", alpha: "\u03B1", amacr: "\u0101", amalg: "\u2A3F", and: "\u2227", wedge: "\u2227", andand: "\u2A55", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", angle: "\u2220", ange: "\u29A4", angmsd: "\u2221", measuredangle: "\u2221", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angzarr: "\u237C", aogon: "\u0105", aopf: "\u{1D552}", apE: "\u2A70", apacir: "\u2A6F", ape: "\u224A", approxeq: "\u224A", apid: "\u224B", apos: "'", aring: "\xE5", ascr: "\u{1D4B6}", ast: "*", midast: "*", atilde: "\xE3", auml: "\xE4", awint: "\u2A11", bNot: "\u2AED", backcong: "\u224C", bcong: "\u224C", backepsilon: "\u03F6", bepsi: "\u03F6", backprime: "\u2035", bprime: "\u2035", backsim: "\u223D", bsim: "\u223D", backsimeq: "\u22CD", bsime: "\u22CD", barvee: "\u22BD", barwed: "\u2305", barwedge: "\u2305", bbrktbrk: "\u23B6", bcy: "\u0431", bdquo: "\u201E", ldquor: "\u201E", bemptyv: "\u29B0", beta: "\u03B2", beth: "\u2136", between: "\u226C", twixt: "\u226C", bfr: "\u{1D51F}", bigcirc: "\u25EF", xcirc: "\u25EF", bigodot: "\u2A00", xodot: "\u2A00", bigoplus: "\u2A01", xoplus: "\u2A01", bigotimes: "\u2A02", xotime: "\u2A02", bigsqcup: "\u2A06", xsqcup: "\u2A06", bigstar: "\u2605", starf: "\u2605", bigtriangledown: "\u25BD", xdtri: "\u25BD", bigtriangleup: "\u25B3", xutri: "\u25B3", biguplus: "\u2A04", xuplus: "\u2A04", bkarow: "\u290D", rbarr: "\u290D", blacklozenge: "\u29EB", lozf: "\u29EB", blacktriangle: "\u25B4", utrif: "\u25B4", blacktriangledown: "\u25BE", dtrif: "\u25BE", blacktriangleleft: "\u25C2", ltrif: "\u25C2", blacktriangleright: "\u25B8", rtrif: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bnot: "\u2310", bopf: "\u{1D553}", bowtie: "\u22C8", boxDL: "\u2557", boxDR: "\u2554", boxDl: "\u2556", boxDr: "\u2553", boxH: "\u2550", boxHD: "\u2566", boxHU: "\u2569", boxHd: "\u2564", boxHu: "\u2567", boxUL: "\u255D", boxUR: "\u255A", boxUl: "\u255C", boxUr: "\u2559", boxV: "\u2551", boxVH: "\u256C", boxVL: "\u2563", boxVR: "\u2560", boxVh: "\u256B", boxVl: "\u2562", boxVr: "\u255F", boxbox: "\u29C9", boxdL: "\u2555", boxdR: "\u2552", boxdl: "\u2510", boxdr: "\u250C", boxhD: "\u2565", boxhU: "\u2568", boxhd: "\u252C", boxhu: "\u2534", boxminus: "\u229F", minusb: "\u229F", boxplus: "\u229E", plusb: "\u229E", boxtimes: "\u22A0", timesb: "\u22A0", boxuL: "\u255B", boxuR: "\u2558", boxul: "\u2518", boxur: "\u2514", boxv: "\u2502", boxvH: "\u256A", boxvL: "\u2561", boxvR: "\u255E", boxvh: "\u253C", boxvl: "\u2524", boxvr: "\u251C", brvbar: "\xA6", bscr: "\u{1D4B7}", bsemi: "\u204F", bsol: "\\", bsolb: "\u29C5", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bumpE: "\u2AAE", cacute: "\u0107", cap: "\u2229", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", capcup: "\u2A47", capdot: "\u2A40", caps: "\u2229\uFE00", caret: "\u2041", ccaps: "\u2A4D", ccaron: "\u010D", ccedil: "\xE7", ccirc: "\u0109", ccups: "\u2A4C", ccupssm: "\u2A50", cdot: "\u010B", cemptyv: "\u29B2", cent: "\xA2", cfr: "\u{1D520}", chcy: "\u0447", check: "\u2713", checkmark: "\u2713", chi: "\u03C7", cir: "\u25CB", cirE: "\u29C3", circ: "\u02C6", circeq: "\u2257", cire: "\u2257", circlearrowleft: "\u21BA", olarr: "\u21BA", circlearrowright: "\u21BB", orarr: "\u21BB", circledS: "\u24C8", oS: "\u24C8", circledast: "\u229B", oast: "\u229B", circledcirc: "\u229A", ocir: "\u229A", circleddash: "\u229D", odash: "\u229D", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", clubs: "\u2663", clubsuit: "\u2663", colon: ":", comma: ",", commat: "@", comp: "\u2201", complement: "\u2201", congdot: "\u2A6D", copf: "\u{1D554}", copysr: "\u2117", crarr: "\u21B5", cross: "\u2717", cscr: "\u{1D4B8}", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", curlyeqprec: "\u22DE", cuesc: "\u22DF", curlyeqsucc: "\u22DF", cularr: "\u21B6", curvearrowleft: "\u21B6", cularrp: "\u293D", cup: "\u222A", cupbrcap: "\u2A48", cupcap: "\u2A46", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curvearrowright: "\u21B7", curarrm: "\u293C", curlyvee: "\u22CE", cuvee: "\u22CE", curlywedge: "\u22CF", cuwed: "\u22CF", curren: "\xA4", cwint: "\u2231", cylcty: "\u232D", dHar: "\u2965", dagger: "\u2020", daleth: "\u2138", dash: "\u2010", hyphen: "\u2010", dbkarow: "\u290F", rBarr: "\u290F", dcaron: "\u010F", dcy: "\u0434", ddarr: "\u21CA", downdownarrows: "\u21CA", ddotseq: "\u2A77", eDDot: "\u2A77", deg: "\xB0", delta: "\u03B4", demptyv: "\u29B1", dfisht: "\u297F", dfr: "\u{1D521}", diamondsuit: "\u2666", diams: "\u2666", digamma: "\u03DD", gammad: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", djcy: "\u0452", dlcorn: "\u231E", llcorner: "\u231E", dlcrop: "\u230D", dollar: "$", dopf: "\u{1D555}", doteqdot: "\u2251", eDot: "\u2251", dotminus: "\u2238", minusd: "\u2238", dotplus: "\u2214", plusdo: "\u2214", dotsquare: "\u22A1", sdotb: "\u22A1", drcorn: "\u231F", lrcorner: "\u231F", drcrop: "\u230C", dscr: "\u{1D4B9}", dscy: "\u0455", dsol: "\u29F6", dstrok: "\u0111", dtdot: "\u22F1", dtri: "\u25BF", triangledown: "\u25BF", dwangle: "\u29A6", dzcy: "\u045F", dzigrarr: "\u27FF", eacute: "\xE9", easter: "\u2A6E", ecaron: "\u011B", ecir: "\u2256", eqcirc: "\u2256", ecirc: "\xEA", ecolon: "\u2255", eqcolon: "\u2255", ecy: "\u044D", edot: "\u0117", efDot: "\u2252", fallingdotseq: "\u2252", efr: "\u{1D522}", eg: "\u2A9A", egrave: "\xE8", egs: "\u2A96", eqslantgtr: "\u2A96", egsdot: "\u2A98", el: "\u2A99", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", eqslantless: "\u2A95", elsdot: "\u2A97", emacr: "\u0113", empty: "\u2205", emptyset: "\u2205", emptyv: "\u2205", varnothing: "\u2205", emsp13: "\u2004", emsp14: "\u2005", emsp: "\u2003", eng: "\u014B", ensp: "\u2002", eogon: "\u0119", eopf: "\u{1D556}", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", epsilon: "\u03B5", epsiv: "\u03F5", straightepsilon: "\u03F5", varepsilon: "\u03F5", equals: "=", equest: "\u225F", questeq: "\u225F", equivDD: "\u2A78", eqvparsl: "\u29E5", erDot: "\u2253", risingdotseq: "\u2253", erarr: "\u2971", escr: "\u212F", eta: "\u03B7", eth: "\xF0", euml: "\xEB", euro: "\u20AC", excl: "!", fcy: "\u0444", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", ffr: "\u{1D523}", filig: "\uFB01", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", fopf: "\u{1D557}", fork: "\u22D4", pitchfork: "\u22D4", forkv: "\u2AD9", fpartint: "\u2A0D", frac12: "\xBD", half: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", sfrown: "\u2322", fscr: "\u{1D4BB}", gEl: "\u2A8C", gtreqqless: "\u2A8C", gacute: "\u01F5", gamma: "\u03B3", gap: "\u2A86", gtrapprox: "\u2A86", gbreve: "\u011F", gcirc: "\u011D", gcy: "\u0433", gdot: "\u0121", gescc: "\u2AA9", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", gfr: "\u{1D524}", gimel: "\u2137", gjcy: "\u0453", glE: "\u2A92", gla: "\u2AA5", glj: "\u2AA4", gnE: "\u2269", gneqq: "\u2269", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gneq: "\u2A88", gnsim: "\u22E7", gopf: "\u{1D558}", gscr: "\u210A", gsime: "\u2A8E", gsiml: "\u2A90", gtcc: "\u2AA7", gtcir: "\u2A7A", gtdot: "\u22D7", gtrdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrarr: "\u2978", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", hardcy: "\u044A", harrcir: "\u2948", harrw: "\u21AD", leftrightsquigarrow: "\u21AD", hbar: "\u210F", hslash: "\u210F", planck: "\u210F", plankv: "\u210F", hcirc: "\u0125", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", mldr: "\u2026", hercon: "\u22B9", hfr: "\u{1D525}", hksearow: "\u2925", searhk: "\u2925", hkswarow: "\u2926", swarhk: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", larrhk: "\u21A9", hookrightarrow: "\u21AA", rarrhk: "\u21AA", hopf: "\u{1D559}", horbar: "\u2015", hscr: "\u{1D4BD}", hstrok: "\u0127", hybull: "\u2043", iacute: "\xED", icirc: "\xEE", icy: "\u0438", iecy: "\u0435", iexcl: "\xA1", ifr: "\u{1D526}", igrave: "\xEC", iiiint: "\u2A0C", qint: "\u2A0C", iiint: "\u222D", tint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", ijlig: "\u0133", imacr: "\u012B", imath: "\u0131", inodot: "\u0131", imof: "\u22B7", imped: "\u01B5", incare: "\u2105", infin: "\u221E", infintie: "\u29DD", intcal: "\u22BA", intercal: "\u22BA", intlarhk: "\u2A17", intprod: "\u2A3C", iprod: "\u2A3C", iocy: "\u0451", iogon: "\u012F", iopf: "\u{1D55A}", iota: "\u03B9", iquest: "\xBF", iscr: "\u{1D4BE}", isinE: "\u22F9", isindot: "\u22F5", isins: "\u22F4", isinsv: "\u22F3", itilde: "\u0129", iukcy: "\u0456", iuml: "\xEF", jcirc: "\u0135", jcy: "\u0439", jfr: "\u{1D527}", jmath: "\u0237", jopf: "\u{1D55B}", jscr: "\u{1D4BF}", jsercy: "\u0458", jukcy: "\u0454", kappa: "\u03BA", kappav: "\u03F0", varkappa: "\u03F0", kcedil: "\u0137", kcy: "\u043A", kfr: "\u{1D528}", kgreen: "\u0138", khcy: "\u0445", kjcy: "\u045C", kopf: "\u{1D55C}", kscr: "\u{1D4C0}", lAtail: "\u291B", lBarr: "\u290E", lEg: "\u2A8B", lesseqqgtr: "\u2A8B", lHar: "\u2962", lacute: "\u013A", laemptyv: "\u29B4", lambda: "\u03BB", langd: "\u2991", lap: "\u2A85", lessapprox: "\u2A85", laquo: "\xAB", larrbfs: "\u291F", larrfs: "\u291D", larrlp: "\u21AB", looparrowleft: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", leftarrowtail: "\u21A2", lat: "\u2AAB", latail: "\u2919", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lbbrk: "\u2772", lbrace: "{", lcub: "{", lbrack: "[", lsqb: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", lcaron: "\u013E", lcedil: "\u013C", lcy: "\u043B", ldca: "\u2936", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", leq: "\u2264", leftleftarrows: "\u21C7", llarr: "\u21C7", leftthreetimes: "\u22CB", lthree: "\u22CB", lescc: "\u2AA8", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessdot: "\u22D6", ltdot: "\u22D6", lfisht: "\u297C", lfr: "\u{1D529}", lgE: "\u2A91", lharul: "\u296A", lhblk: "\u2584", ljcy: "\u0459", llhard: "\u296B", lltri: "\u25FA", lmidot: "\u0140", lmoust: "\u23B0", lmoustache: "\u23B0", lnE: "\u2268", lneqq: "\u2268", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lneq: "\u2A87", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", longmapsto: "\u27FC", xmap: "\u27FC", looparrowright: "\u21AC", rarrlp: "\u21AC", lopar: "\u2985", lopf: "\u{1D55D}", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", loz: "\u25CA", lozenge: "\u25CA", lpar: "(", lparlt: "\u2993", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\u{1D4C1}", lsime: "\u2A8D", lsimg: "\u2A8F", lsquor: "\u201A", sbquo: "\u201A", lstrok: "\u0142", ltcc: "\u2AA6", ltcir: "\u2A79", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltrPar: "\u2996", ltri: "\u25C3", triangleleft: "\u25C3", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", mDDot: "\u223A", macr: "\xAF", strns: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", marker: "\u25AE", mcomma: "\u2A29", mcy: "\u043C", mdash: "\u2014", mfr: "\u{1D52A}", mho: "\u2127", micro: "\xB5", midcir: "\u2AF0", minus: "\u2212", minusdu: "\u2A2A", mlcp: "\u2ADB", models: "\u22A7", mopf: "\u{1D55E}", mscr: "\u{1D4C2}", mu: "\u03BC", multimap: "\u22B8", mumap: "\u22B8", nGg: "\u22D9\u0338", nGt: "\u226B\u20D2", nLeftarrow: "\u21CD", nlArr: "\u21CD", nLeftrightarrow: "\u21CE", nhArr: "\u21CE", nLl: "\u22D8\u0338", nLt: "\u226A\u20D2", nRightarrow: "\u21CF", nrArr: "\u21CF", nVDash: "\u22AF", nVdash: "\u22AE", nacute: "\u0144", nang: "\u2220\u20D2", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", natur: "\u266E", natural: "\u266E", ncap: "\u2A43", ncaron: "\u0148", ncedil: "\u0146", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", ncy: "\u043D", ndash: "\u2013", neArr: "\u21D7", nearhk: "\u2924", nedot: "\u2250\u0338", nesear: "\u2928", toea: "\u2928", nfr: "\u{1D52B}", nharr: "\u21AE", nleftrightarrow: "\u21AE", nhpar: "\u2AF2", nis: "\u22FC", nisd: "\u22FA", njcy: "\u045A", nlE: "\u2266\u0338", nleqq: "\u2266\u0338", nlarr: "\u219A", nleftarrow: "\u219A", nldr: "\u2025", nopf: "\u{1D55F}", not: "\xAC", notinE: "\u22F9\u0338", notindot: "\u22F5\u0338", notinvb: "\u22F7", notinvc: "\u22F6", notnivb: "\u22FE", notnivc: "\u22FD", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", nrarr: "\u219B", nrightarrow: "\u219B", nrarrc: "\u2933\u0338", nrarrw: "\u219D\u0338", nscr: "\u{1D4C3}", nsub: "\u2284", nsubE: "\u2AC5\u0338", nsubseteqq: "\u2AC5\u0338", nsup: "\u2285", nsupE: "\u2AC6\u0338", nsupseteqq: "\u2AC6\u0338", ntilde: "\xF1", nu: "\u03BD", num: "#", numero: "\u2116", numsp: "\u2007", nvDash: "\u22AD", nvHarr: "\u2904", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwArr: "\u21D6", nwarhk: "\u2923", nwnear: "\u2927", oacute: "\xF3", ocirc: "\xF4", ocy: "\u043E", odblac: "\u0151", odiv: "\u2A38", odsold: "\u29BC", oelig: "\u0153", ofcir: "\u29BF", ofr: "\u{1D52C}", ogon: "\u02DB", ograve: "\xF2", ogt: "\u29C1", ohbar: "\u29B5", olcir: "\u29BE", olcross: "\u29BB", olt: "\u29C0", omacr: "\u014D", omega: "\u03C9", omicron: "\u03BF", omid: "\u29B6", oopf: "\u{1D560}", opar: "\u29B7", operp: "\u29B9", or: "\u2228", vee: "\u2228", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", oscr: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oslash: "\xF8", osol: "\u2298", otilde: "\xF5", otimesas: "\u2A36", ouml: "\xF6", ovbar: "\u233D", para: "\xB6", parsim: "\u2AF3", parsl: "\u2AFD", pcy: "\u043F", percnt: "%", period: ".", permil: "\u2030", pertenk: "\u2031", pfr: "\u{1D52D}", phi: "\u03C6", phiv: "\u03D5", straightphi: "\u03D5", varphi: "\u03D5", phone: "\u260E", pi: "\u03C0", piv: "\u03D6", varpi: "\u03D6", planckh: "\u210E", plus: "+", plusacir: "\u2A23", pluscir: "\u2A22", plusdu: "\u2A25", pluse: "\u2A72", plussim: "\u2A26", plustwo: "\u2A27", pointint: "\u2A15", popf: "\u{1D561}", pound: "\xA3", prE: "\u2AB3", prap: "\u2AB7", precapprox: "\u2AB7", precnapprox: "\u2AB9", prnap: "\u2AB9", precneqq: "\u2AB5", prnE: "\u2AB5", precnsim: "\u22E8", prnsim: "\u22E8", prime: "\u2032", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prurel: "\u22B0", pscr: "\u{1D4C5}", psi: "\u03C8", puncsp: "\u2008", qfr: "\u{1D52E}", qopf: "\u{1D562}", qprime: "\u2057", qscr: "\u{1D4C6}", quatint: "\u2A16", quest: "?", rAtail: "\u291C", rHar: "\u2964", race: "\u223D\u0331", racute: "\u0155", raemptyv: "\u29B3", rangd: "\u2992", range: "\u29A5", raquo: "\xBB", rarrap: "\u2975", rarrbfs: "\u2920", rarrc: "\u2933", rarrfs: "\u291E", rarrpl: "\u2945", rarrsim: "\u2974", rarrtl: "\u21A3", rightarrowtail: "\u21A3", rarrw: "\u219D", rightsquigarrow: "\u219D", ratail: "\u291A", ratio: "\u2236", rbbrk: "\u2773", rbrace: "}", rcub: "}", rbrack: "]", rsqb: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", rcaron: "\u0159", rcedil: "\u0157", rcy: "\u0440", rdca: "\u2937", rdldhar: "\u2969", rdsh: "\u21B3", rect: "\u25AD", rfisht: "\u297D", rfr: "\u{1D52F}", rharul: "\u296C", rho: "\u03C1", rhov: "\u03F1", varrho: "\u03F1", rightrightarrows: "\u21C9", rrarr: "\u21C9", rightthreetimes: "\u22CC", rthree: "\u22CC", ring: "\u02DA", rlm: "\u200F", rmoust: "\u23B1", rmoustache: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", ropar: "\u2986", ropf: "\u{1D563}", roplus: "\u2A2E", rotimes: "\u2A35", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rsaquo: "\u203A", rscr: "\u{1D4C7}", rtimes: "\u22CA", rtri: "\u25B9", triangleright: "\u25B9", rtriltri: "\u29CE", ruluhar: "\u2968", rx: "\u211E", sacute: "\u015B", scE: "\u2AB4", scap: "\u2AB8", succapprox: "\u2AB8", scaron: "\u0161", scedil: "\u015F", scirc: "\u015D", scnE: "\u2AB6", succneqq: "\u2AB6", scnap: "\u2ABA", succnapprox: "\u2ABA", scnsim: "\u22E9", succnsim: "\u22E9", scpolint: "\u2A13", scy: "\u0441", sdot: "\u22C5", sdote: "\u2A66", seArr: "\u21D8", sect: "\xA7", semi: ";", seswar: "\u2929", tosa: "\u2929", sext: "\u2736", sfr: "\u{1D530}", sharp: "\u266F", shchcy: "\u0449", shcy: "\u0448", shy: "\xAD", sigma: "\u03C3", sigmaf: "\u03C2", sigmav: "\u03C2", varsigma: "\u03C2", simdot: "\u2A6A", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", smashp: "\u2A33", smeparsl: "\u29E4", smile: "\u2323", ssmile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", softcy: "\u044C", sol: "/", solb: "\u29C4", solbar: "\u233F", sopf: "\u{1D564}", spades: "\u2660", spadesuit: "\u2660", sqcaps: "\u2293\uFE00", sqcups: "\u2294\uFE00", sscr: "\u{1D4C8}", star: "\u2606", sub: "\u2282", subset: "\u2282", subE: "\u2AC5", subseteqq: "\u2AC5", subdot: "\u2ABD", subedot: "\u2AC3", submult: "\u2AC1", subnE: "\u2ACB", subsetneqq: "\u2ACB", subne: "\u228A", subsetneq: "\u228A", subplus: "\u2ABF", subrarr: "\u2979", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", sung: "\u266A", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", supE: "\u2AC6", supseteqq: "\u2AC6", supdot: "\u2ABE", supdsub: "\u2AD8", supedot: "\u2AC4", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supnE: "\u2ACC", supsetneqq: "\u2ACC", supne: "\u228B", supsetneq: "\u228B", supplus: "\u2AC0", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swArr: "\u21D9", swnwar: "\u292A", szlig: "\xDF", target: "\u2316", tau: "\u03C4", tcaron: "\u0165", tcedil: "\u0163", tcy: "\u0442", telrec: "\u2315", tfr: "\u{1D531}", theta: "\u03B8", thetasym: "\u03D1", thetav: "\u03D1", vartheta: "\u03D1", thorn: "\xFE", times: "\xD7", timesbar: "\u2A31", timesd: "\u2A30", topbot: "\u2336", topcir: "\u2AF1", topf: "\u{1D565}", topfork: "\u2ADA", tprime: "\u2034", triangle: "\u25B5", utri: "\u25B5", triangleq: "\u225C", trie: "\u225C", tridot: "\u25EC", triminus: "\u2A3A", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", tscr: "\u{1D4C9}", tscy: "\u0446", tshcy: "\u045B", tstrok: "\u0167", uHar: "\u2963", uacute: "\xFA", ubrcy: "\u045E", ubreve: "\u016D", ucirc: "\xFB", ucy: "\u0443", udblac: "\u0171", ufisht: "\u297E", ufr: "\u{1D532}", ugrave: "\xF9", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", umacr: "\u016B", uogon: "\u0173", uopf: "\u{1D566}", upsi: "\u03C5", upsilon: "\u03C5", upuparrows: "\u21C8", uuarr: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", uring: "\u016F", urtri: "\u25F9", uscr: "\u{1D4CA}", utdot: "\u22F0", utilde: "\u0169", uuml: "\xFC", uwangle: "\u29A7", vBar: "\u2AE8", vBarv: "\u2AE9", vangrt: "\u299C", varsubsetneq: "\u228A\uFE00", vsubne: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", vsubnE: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", vsupne: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vsupnE: "\u2ACC\uFE00", vcy: "\u0432", veebar: "\u22BB", veeeq: "\u225A", vellip: "\u22EE", vfr: "\u{1D533}", vopf: "\u{1D567}", vscr: "\u{1D4CB}", vzigzag: "\u299A", wcirc: "\u0175", wedbar: "\u2A5F", wedgeq: "\u2259", weierp: "\u2118", wp: "\u2118", wfr: "\u{1D534}", wopf: "\u{1D568}", wscr: "\u{1D4CC}", xfr: "\u{1D535}", xi: "\u03BE", xnis: "\u22FB", xopf: "\u{1D569}", xscr: "\u{1D4CD}", yacute: "\xFD", yacy: "\u044F", ycirc: "\u0177", ycy: "\u044B", yen: "\xA5", yfr: "\u{1D536}", yicy: "\u0457", yopf: "\u{1D56A}", yscr: "\u{1D4CE}", yucy: "\u044E", yuml: "\xFF", zacute: "\u017A", zcaron: "\u017E", zcy: "\u0437", zdot: "\u017C", zeta: "\u03B6", zfr: "\u{1D537}", zhcy: "\u0436", zigrarr: "\u21DD", zopf: "\u{1D56B}", zscr: "\u{1D4CF}", zwj: "\u200D", zwnj: "\u200C" };
var za = "\uE500";
Ye2.ngsp = za;
var Ga = [/@/, /^\s*$/, /[<>]/, /^[{}]$/, /&(#|[a-z])/i, /^\/\//];
function Ls(t9, e2) {
  if (e2 != null && !(Array.isArray(e2) && e2.length == 2)) throw new Error(`Expected '${t9}' to be an array, [start, end].`);
  if (e2 != null) {
    let r2 = e2[0], n2 = e2[1];
    Ga.forEach((s2) => {
      if (s2.test(r2) || s2.test(n2)) throw new Error(`['${r2}', '${n2}'] contains unusable interpolation symbol.`);
    });
  }
}
var Lr2 = class t3 {
  static fromArray(e2) {
    return e2 ? (Ls("interpolation", e2), new t3(e2[0], e2[1])) : Fr2;
  }
  constructor(e2, r2) {
    this.start = e2, this.end = r2;
  }
};
var Fr2 = new Lr2("{{", "}}");
var ft2 = class extends Ue2 {
  constructor(e2, r2, n2) {
    super(n2, e2), this.tokenType = r2;
  }
};
var $r2 = class {
  constructor(e2, r2, n2) {
    this.tokens = e2, this.errors = r2, this.nonNormalizedIcuExpressions = n2;
  }
};
function Ws(t9, e2, r2, n2 = {}) {
  let s2 = new Or2(new Te2(t9, e2), r2, n2);
  return s2.tokenize(), new $r2(_o2(s2.tokens), s2.errors, s2.nonNormalizedIcuExpressions);
}
var po2 = /\r\n?/g;
function je2(t9) {
  return `Unexpected character "${t9 === 0 ? "EOF" : String.fromCharCode(t9)}"`;
}
function Rs(t9) {
  return `Unknown entity "${t9}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
}
function ho2(t9, e2) {
  return `Unable to parse entity "${e2}" - ${t9} character reference entities must end with ";"`;
}
var tr2;
(function(t9) {
  t9.HEX = "hexadecimal", t9.DEC = "decimal";
})(tr2 || (tr2 = {}));
var dt2 = class {
  constructor(e2) {
    this.error = e2;
  }
};
var Or2 = class {
  constructor(e2, r2, n2) {
    this._getTagContentType = r2, this._currentTokenStart = null, this._currentTokenType = null, this._expansionCaseStack = [], this._inInterpolation = false, this._fullNameStack = [], this.tokens = [], this.errors = [], this.nonNormalizedIcuExpressions = [], this._tokenizeIcu = n2.tokenizeExpansionForms || false, this._interpolationConfig = n2.interpolationConfig || Fr2, this._leadingTriviaCodePoints = n2.leadingTriviaChars && n2.leadingTriviaChars.map((i) => i.codePointAt(0) || 0), this._canSelfClose = n2.canSelfClose || false, this._allowHtmComponentClosingTags = n2.allowHtmComponentClosingTags || false;
    let s2 = n2.range || { endPos: e2.content.length, startPos: 0, startLine: 0, startCol: 0 };
    this._cursor = n2.escapedString ? new Mr2(e2, s2) : new rr2(e2, s2), this._preserveLineEndings = n2.preserveLineEndings || false, this._i18nNormalizeLineEndingsInICUs = n2.i18nNormalizeLineEndingsInICUs || false, this._tokenizeBlocks = n2.tokenizeBlocks ?? true, this._tokenizeLet = n2.tokenizeLet ?? true;
    try {
      this._cursor.init();
    } catch (i) {
      this.handleError(i);
    }
  }
  _processCarriageReturns(e2) {
    return this._preserveLineEndings ? e2 : e2.replace(po2, `
`);
  }
  tokenize() {
    for (; this._cursor.peek() !== 0; ) {
      let e2 = this._cursor.clone();
      try {
        if (this._attemptCharCode(60)) if (this._attemptCharCode(33)) this._attemptStr("[CDATA[") ? this._consumeCdata(e2) : this._attemptStr("--") ? this._consumeComment(e2) : this._attemptStrCaseInsensitive("doctype") ? this._consumeDocType(e2) : this._consumeBogusComment(e2);
        else if (this._attemptCharCode(47)) this._consumeTagClose(e2);
        else {
          let r2 = this._cursor.clone();
          this._attemptCharCode(63) ? (this._cursor = r2, this._consumeBogusComment(e2)) : this._consumeTagOpen(e2);
        }
        else this._tokenizeLet && this._cursor.peek() === 64 && !this._inInterpolation && this._attemptStr("@let") ? this._consumeLetDeclaration(e2) : this._tokenizeBlocks && this._attemptCharCode(64) ? this._consumeBlockStart(e2) : this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansionCase() && !this._isInExpansionForm() && this._attemptCharCode(125) ? this._consumeBlockEnd(e2) : this._tokenizeIcu && this._tokenizeExpansionForm() || this._consumeWithInterpolation(5, 8, () => this._isTextEnd(), () => this._isTagStart());
      } catch (r2) {
        this.handleError(r2);
      }
    }
    this._beginToken(34), this._endToken([]);
  }
  _getBlockName() {
    let e2 = false, r2 = this._cursor.clone();
    return this._attemptCharCodeUntilFn((n2) => at2(n2) ? !e2 : Ms(n2) ? (e2 = true, false) : true), this._cursor.getChars(r2).trim();
  }
  _consumeBlockStart(e2) {
    this._beginToken(25, e2);
    let r2 = this._endToken([this._getBlockName()]);
    if (this._cursor.peek() === 40) if (this._cursor.advance(), this._consumeBlockParameters(), this._attemptCharCodeUntilFn(b2), this._attemptCharCode(41)) this._attemptCharCodeUntilFn(b2);
    else {
      r2.type = 29;
      return;
    }
    this._attemptCharCode(123) ? (this._beginToken(26), this._endToken([])) : r2.type = 29;
  }
  _consumeBlockEnd(e2) {
    this._beginToken(27, e2), this._endToken([]);
  }
  _consumeBlockParameters() {
    for (this._attemptCharCodeUntilFn(qs); this._cursor.peek() !== 41 && this._cursor.peek() !== 0; ) {
      this._beginToken(28);
      let e2 = this._cursor.clone(), r2 = null, n2 = 0;
      for (; this._cursor.peek() !== 59 && this._cursor.peek() !== 0 || r2 !== null; ) {
        let s2 = this._cursor.peek();
        if (s2 === 92) this._cursor.advance();
        else if (s2 === r2) r2 = null;
        else if (r2 === null && $t2(s2)) r2 = s2;
        else if (s2 === 40 && r2 === null) n2++;
        else if (s2 === 41 && r2 === null) {
          if (n2 === 0) break;
          n2 > 0 && n2--;
        }
        this._cursor.advance();
      }
      this._endToken([this._cursor.getChars(e2)]), this._attemptCharCodeUntilFn(qs);
    }
  }
  _consumeLetDeclaration(e2) {
    if (this._beginToken(30, e2), at2(this._cursor.peek())) this._attemptCharCodeUntilFn(b2);
    else {
      let s2 = this._endToken([this._cursor.getChars(e2)]);
      s2.type = 33;
      return;
    }
    let r2 = this._endToken([this._getLetDeclarationName()]);
    if (this._attemptCharCodeUntilFn(b2), !this._attemptCharCode(61)) {
      r2.type = 33;
      return;
    }
    this._attemptCharCodeUntilFn((s2) => b2(s2) && !Rt2(s2)), this._consumeLetDeclarationValue(), this._cursor.peek() === 59 ? (this._beginToken(32), this._endToken([]), this._cursor.advance()) : (r2.type = 33, r2.sourceSpan = this._cursor.getSpan(e2));
  }
  _getLetDeclarationName() {
    let e2 = this._cursor.clone(), r2 = false;
    return this._attemptCharCodeUntilFn((n2) => ot2(n2) || n2 == 36 || n2 === 95 || r2 && It2(n2) ? (r2 = true, false) : true), this._cursor.getChars(e2).trim();
  }
  _consumeLetDeclarationValue() {
    let e2 = this._cursor.clone();
    for (this._beginToken(31, e2); this._cursor.peek() !== 0; ) {
      let r2 = this._cursor.peek();
      if (r2 === 59) break;
      $t2(r2) && (this._cursor.advance(), this._attemptCharCodeUntilFn((n2) => n2 === 92 ? (this._cursor.advance(), false) : n2 === r2)), this._cursor.advance();
    }
    this._endToken([this._cursor.getChars(e2)]);
  }
  _tokenizeExpansionForm() {
    if (this.isExpansionFormStart()) return this._consumeExpansionFormStart(), true;
    if (Co(this._cursor.peek()) && this._isInExpansionForm()) return this._consumeExpansionCaseStart(), true;
    if (this._cursor.peek() === 125) {
      if (this._isInExpansionCase()) return this._consumeExpansionCaseEnd(), true;
      if (this._isInExpansionForm()) return this._consumeExpansionFormEnd(), true;
    }
    return false;
  }
  _beginToken(e2, r2 = this._cursor.clone()) {
    this._currentTokenStart = r2, this._currentTokenType = e2;
  }
  _endToken(e2, r2) {
    if (this._currentTokenStart === null) throw new ft2("Programming error - attempted to end a token when there was no start to the token", this._currentTokenType, this._cursor.getSpan(r2));
    if (this._currentTokenType === null) throw new ft2("Programming error - attempted to end a token which has no token type", null, this._cursor.getSpan(this._currentTokenStart));
    let n2 = { type: this._currentTokenType, parts: e2, sourceSpan: (r2 ?? this._cursor).getSpan(this._currentTokenStart, this._leadingTriviaCodePoints) };
    return this.tokens.push(n2), this._currentTokenStart = null, this._currentTokenType = null, n2;
  }
  _createError(e2, r2) {
    this._isInExpansionForm() && (e2 += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`);
    let n2 = new ft2(e2, this._currentTokenType, r2);
    return this._currentTokenStart = null, this._currentTokenType = null, new dt2(n2);
  }
  handleError(e2) {
    if (e2 instanceof gt2 && (e2 = this._createError(e2.msg, this._cursor.getSpan(e2.cursor))), e2 instanceof dt2) this.errors.push(e2.error);
    else throw e2;
  }
  _attemptCharCode(e2) {
    return this._cursor.peek() === e2 ? (this._cursor.advance(), true) : false;
  }
  _attemptCharCodeCaseInsensitive(e2) {
    return So(this._cursor.peek(), e2) ? (this._cursor.advance(), true) : false;
  }
  _requireCharCode(e2) {
    let r2 = this._cursor.clone();
    if (!this._attemptCharCode(e2)) throw this._createError(je2(this._cursor.peek()), this._cursor.getSpan(r2));
  }
  _attemptStr(e2) {
    let r2 = e2.length;
    if (this._cursor.charsLeft() < r2) return false;
    let n2 = this._cursor.clone();
    for (let s2 = 0; s2 < r2; s2++) if (!this._attemptCharCode(e2.charCodeAt(s2))) return this._cursor = n2, false;
    return true;
  }
  _attemptStrCaseInsensitive(e2) {
    for (let r2 = 0; r2 < e2.length; r2++) if (!this._attemptCharCodeCaseInsensitive(e2.charCodeAt(r2))) return false;
    return true;
  }
  _requireStr(e2) {
    let r2 = this._cursor.clone();
    if (!this._attemptStr(e2)) throw this._createError(je2(this._cursor.peek()), this._cursor.getSpan(r2));
  }
  _requireStrCaseInsensitive(e2) {
    let r2 = this._cursor.clone();
    if (!this._attemptStrCaseInsensitive(e2)) throw this._createError(je2(this._cursor.peek()), this._cursor.getSpan(r2));
  }
  _attemptCharCodeUntilFn(e2) {
    for (; !e2(this._cursor.peek()); ) this._cursor.advance();
  }
  _requireCharCodeUntilFn(e2, r2) {
    let n2 = this._cursor.clone();
    if (this._attemptCharCodeUntilFn(e2), this._cursor.diff(n2) < r2) throw this._createError(je2(this._cursor.peek()), this._cursor.getSpan(n2));
  }
  _attemptUntilChar(e2) {
    for (; this._cursor.peek() !== e2; ) this._cursor.advance();
  }
  _readChar() {
    let e2 = String.fromCodePoint(this._cursor.peek());
    return this._cursor.advance(), e2;
  }
  _consumeEntity(e2) {
    this._beginToken(9);
    let r2 = this._cursor.clone();
    if (this._cursor.advance(), this._attemptCharCode(35)) {
      let n2 = this._attemptCharCode(120) || this._attemptCharCode(88), s2 = this._cursor.clone();
      if (this._attemptCharCodeUntilFn(fo2), this._cursor.peek() != 59) {
        this._cursor.advance();
        let a = n2 ? tr2.HEX : tr2.DEC;
        throw this._createError(ho2(a, this._cursor.getChars(r2)), this._cursor.getSpan());
      }
      let i = this._cursor.getChars(s2);
      this._cursor.advance();
      try {
        let a = parseInt(i, n2 ? 16 : 10);
        this._endToken([String.fromCharCode(a), this._cursor.getChars(r2)]);
      } catch {
        throw this._createError(Rs(this._cursor.getChars(r2)), this._cursor.getSpan());
      }
    } else {
      let n2 = this._cursor.clone();
      if (this._attemptCharCodeUntilFn(go2), this._cursor.peek() != 59) this._beginToken(e2, r2), this._cursor = n2, this._endToken(["&"]);
      else {
        let s2 = this._cursor.getChars(n2);
        this._cursor.advance();
        let i = Ye2[s2];
        if (!i) throw this._createError(Rs(s2), this._cursor.getSpan(r2));
        this._endToken([i, `&${s2};`]);
      }
    }
  }
  _consumeRawText(e2, r2) {
    this._beginToken(e2 ? 6 : 7);
    let n2 = [];
    for (; ; ) {
      let s2 = this._cursor.clone(), i = r2();
      if (this._cursor = s2, i) break;
      e2 && this._cursor.peek() === 38 ? (this._endToken([this._processCarriageReturns(n2.join(""))]), n2.length = 0, this._consumeEntity(6), this._beginToken(6)) : n2.push(this._readChar());
    }
    this._endToken([this._processCarriageReturns(n2.join(""))]);
  }
  _consumeComment(e2) {
    this._beginToken(10, e2), this._endToken([]), this._consumeRawText(false, () => this._attemptStr("-->")), this._beginToken(11), this._requireStr("-->"), this._endToken([]);
  }
  _consumeBogusComment(e2) {
    this._beginToken(10, e2), this._endToken([]), this._consumeRawText(false, () => this._cursor.peek() === 62), this._beginToken(11), this._cursor.advance(), this._endToken([]);
  }
  _consumeCdata(e2) {
    this._beginToken(12, e2), this._endToken([]), this._consumeRawText(false, () => this._attemptStr("]]>")), this._beginToken(13), this._requireStr("]]>"), this._endToken([]);
  }
  _consumeDocType(e2) {
    this._beginToken(18, e2), this._endToken([]), this._consumeRawText(false, () => this._cursor.peek() === 62), this._beginToken(19), this._cursor.advance(), this._endToken([]);
  }
  _consumePrefixAndName() {
    let e2 = this._cursor.clone(), r2 = "";
    for (; this._cursor.peek() !== 58 && !mo2(this._cursor.peek()); ) this._cursor.advance();
    let n2;
    this._cursor.peek() === 58 ? (r2 = this._cursor.getChars(e2), this._cursor.advance(), n2 = this._cursor.clone()) : n2 = e2, this._requireCharCodeUntilFn($s, r2 === "" ? 0 : 1);
    let s2 = this._cursor.getChars(n2);
    return [r2, s2];
  }
  _consumeTagOpen(e2) {
    let r2, n2, s2, i = [];
    try {
      if (!ot2(this._cursor.peek())) throw this._createError(je2(this._cursor.peek()), this._cursor.getSpan(e2));
      for (s2 = this._consumeTagOpenStart(e2), n2 = s2.parts[0], r2 = s2.parts[1], this._attemptCharCodeUntilFn(b2); this._cursor.peek() !== 47 && this._cursor.peek() !== 62 && this._cursor.peek() !== 60 && this._cursor.peek() !== 0; ) {
        let [o2, u] = this._consumeAttributeName();
        if (this._attemptCharCodeUntilFn(b2), this._attemptCharCode(61)) {
          this._attemptCharCodeUntilFn(b2);
          let p = this._consumeAttributeValue();
          i.push({ prefix: o2, name: u, value: p });
        } else i.push({ prefix: o2, name: u });
        this._attemptCharCodeUntilFn(b2);
      }
      this._consumeTagOpenEnd();
    } catch (o2) {
      if (o2 instanceof dt2) {
        s2 ? s2.type = 4 : (this._beginToken(5, e2), this._endToken(["<"]));
        return;
      }
      throw o2;
    }
    if (this._canSelfClose && this.tokens[this.tokens.length - 1].type === 2) return;
    let a = this._getTagContentType(r2, n2, this._fullNameStack.length > 0, i);
    this._handleFullNameStackForTagOpen(n2, r2), a === I3.RAW_TEXT ? this._consumeRawTextWithTagClose(n2, r2, false) : a === I3.ESCAPABLE_RAW_TEXT && this._consumeRawTextWithTagClose(n2, r2, true);
  }
  _consumeRawTextWithTagClose(e2, r2, n2) {
    this._consumeRawText(n2, () => !this._attemptCharCode(60) || !this._attemptCharCode(47) || (this._attemptCharCodeUntilFn(b2), !this._attemptStrCaseInsensitive(e2 ? `${e2}:${r2}` : r2)) ? false : (this._attemptCharCodeUntilFn(b2), this._attemptCharCode(62))), this._beginToken(3), this._requireCharCodeUntilFn((s2) => s2 === 62, 3), this._cursor.advance(), this._endToken([e2, r2]), this._handleFullNameStackForTagClose(e2, r2);
  }
  _consumeTagOpenStart(e2) {
    this._beginToken(0, e2);
    let r2 = this._consumePrefixAndName();
    return this._endToken(r2);
  }
  _consumeAttributeName() {
    let e2 = this._cursor.peek();
    if (e2 === 39 || e2 === 34) throw this._createError(je2(e2), this._cursor.getSpan());
    this._beginToken(14);
    let r2 = this._consumePrefixAndName();
    return this._endToken(r2), r2;
  }
  _consumeAttributeValue() {
    let e2;
    if (this._cursor.peek() === 39 || this._cursor.peek() === 34) {
      let r2 = this._cursor.peek();
      this._consumeQuote(r2);
      let n2 = () => this._cursor.peek() === r2;
      e2 = this._consumeWithInterpolation(16, 17, n2, n2), this._consumeQuote(r2);
    } else {
      let r2 = () => $s(this._cursor.peek());
      e2 = this._consumeWithInterpolation(16, 17, r2, r2);
    }
    return e2;
  }
  _consumeQuote(e2) {
    this._beginToken(15), this._requireCharCode(e2), this._endToken([String.fromCodePoint(e2)]);
  }
  _consumeTagOpenEnd() {
    let e2 = this._attemptCharCode(47) ? 2 : 1;
    this._beginToken(e2), this._requireCharCode(62), this._endToken([]);
  }
  _consumeTagClose(e2) {
    if (this._beginToken(3, e2), this._attemptCharCodeUntilFn(b2), this._allowHtmComponentClosingTags && this._attemptCharCode(47)) this._attemptCharCodeUntilFn(b2), this._requireCharCode(62), this._endToken([]);
    else {
      let [r2, n2] = this._consumePrefixAndName();
      this._attemptCharCodeUntilFn(b2), this._requireCharCode(62), this._endToken([r2, n2]), this._handleFullNameStackForTagClose(r2, n2);
    }
  }
  _consumeExpansionFormStart() {
    this._beginToken(20), this._requireCharCode(123), this._endToken([]), this._expansionCaseStack.push(20), this._beginToken(7);
    let e2 = this._readUntil(44), r2 = this._processCarriageReturns(e2);
    if (this._i18nNormalizeLineEndingsInICUs) this._endToken([r2]);
    else {
      let s2 = this._endToken([e2]);
      r2 !== e2 && this.nonNormalizedIcuExpressions.push(s2);
    }
    this._requireCharCode(44), this._attemptCharCodeUntilFn(b2), this._beginToken(7);
    let n2 = this._readUntil(44);
    this._endToken([n2]), this._requireCharCode(44), this._attemptCharCodeUntilFn(b2);
  }
  _consumeExpansionCaseStart() {
    this._beginToken(21);
    let e2 = this._readUntil(123).trim();
    this._endToken([e2]), this._attemptCharCodeUntilFn(b2), this._beginToken(22), this._requireCharCode(123), this._endToken([]), this._attemptCharCodeUntilFn(b2), this._expansionCaseStack.push(22);
  }
  _consumeExpansionCaseEnd() {
    this._beginToken(23), this._requireCharCode(125), this._endToken([]), this._attemptCharCodeUntilFn(b2), this._expansionCaseStack.pop();
  }
  _consumeExpansionFormEnd() {
    this._beginToken(24), this._requireCharCode(125), this._endToken([]), this._expansionCaseStack.pop();
  }
  _consumeWithInterpolation(e2, r2, n2, s2) {
    this._beginToken(e2);
    let i = [];
    for (; !n2(); ) {
      let o2 = this._cursor.clone();
      this._interpolationConfig && this._attemptStr(this._interpolationConfig.start) ? (this._endToken([this._processCarriageReturns(i.join(""))], o2), i.length = 0, this._consumeInterpolation(r2, o2, s2), this._beginToken(e2)) : this._cursor.peek() === 38 ? (this._endToken([this._processCarriageReturns(i.join(""))]), i.length = 0, this._consumeEntity(e2), this._beginToken(e2)) : i.push(this._readChar());
    }
    this._inInterpolation = false;
    let a = this._processCarriageReturns(i.join(""));
    return this._endToken([a]), a;
  }
  _consumeInterpolation(e2, r2, n2) {
    let s2 = [];
    this._beginToken(e2, r2), s2.push(this._interpolationConfig.start);
    let i = this._cursor.clone(), a = null, o2 = false;
    for (; this._cursor.peek() !== 0 && (n2 === null || !n2()); ) {
      let u = this._cursor.clone();
      if (this._isTagStart()) {
        this._cursor = u, s2.push(this._getProcessedChars(i, u)), this._endToken(s2);
        return;
      }
      if (a === null) if (this._attemptStr(this._interpolationConfig.end)) {
        s2.push(this._getProcessedChars(i, u)), s2.push(this._interpolationConfig.end), this._endToken(s2);
        return;
      } else this._attemptStr("//") && (o2 = true);
      let p = this._cursor.peek();
      this._cursor.advance(), p === 92 ? this._cursor.advance() : p === a ? a = null : !o2 && a === null && $t2(p) && (a = p);
    }
    s2.push(this._getProcessedChars(i, this._cursor)), this._endToken(s2);
  }
  _getProcessedChars(e2, r2) {
    return this._processCarriageReturns(r2.getChars(e2));
  }
  _isTextEnd() {
    return !!(this._isTagStart() || this._cursor.peek() === 0 || this._tokenizeIcu && !this._inInterpolation && (this.isExpansionFormStart() || this._cursor.peek() === 125 && this._isInExpansionCase()) || this._tokenizeBlocks && !this._inInterpolation && !this._isInExpansion() && (this._isBlockStart() || this._cursor.peek() === 64 || this._cursor.peek() === 125));
  }
  _isTagStart() {
    if (this._cursor.peek() === 60) {
      let e2 = this._cursor.clone();
      e2.advance();
      let r2 = e2.peek();
      if (97 <= r2 && r2 <= 122 || 65 <= r2 && r2 <= 90 || r2 === 47 || r2 === 33) return true;
    }
    return false;
  }
  _isBlockStart() {
    if (this._tokenizeBlocks && this._cursor.peek() === 64) {
      let e2 = this._cursor.clone();
      if (e2.advance(), Ms(e2.peek())) return true;
    }
    return false;
  }
  _readUntil(e2) {
    let r2 = this._cursor.clone();
    return this._attemptUntilChar(e2), this._cursor.getChars(r2);
  }
  _isInExpansion() {
    return this._isInExpansionCase() || this._isInExpansionForm();
  }
  _isInExpansionCase() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 22;
  }
  _isInExpansionForm() {
    return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === 20;
  }
  isExpansionFormStart() {
    if (this._cursor.peek() !== 123) return false;
    if (this._interpolationConfig) {
      let e2 = this._cursor.clone(), r2 = this._attemptStr(this._interpolationConfig.start);
      return this._cursor = e2, !r2;
    }
    return true;
  }
  _handleFullNameStackForTagOpen(e2, r2) {
    let n2 = ze2(e2, r2);
    (this._fullNameStack.length === 0 || this._fullNameStack[this._fullNameStack.length - 1] === n2) && this._fullNameStack.push(n2);
  }
  _handleFullNameStackForTagClose(e2, r2) {
    let n2 = ze2(e2, r2);
    this._fullNameStack.length !== 0 && this._fullNameStack[this._fullNameStack.length - 1] === n2 && this._fullNameStack.pop();
  }
};
function b2(t9) {
  return !at2(t9) || t9 === 0;
}
function $s(t9) {
  return at2(t9) || t9 === 62 || t9 === 60 || t9 === 47 || t9 === 39 || t9 === 34 || t9 === 61 || t9 === 0;
}
function mo2(t9) {
  return (t9 < 97 || 122 < t9) && (t9 < 65 || 90 < t9) && (t9 < 48 || t9 > 57);
}
function fo2(t9) {
  return t9 === 59 || t9 === 0 || !Cs(t9);
}
function go2(t9) {
  return t9 === 59 || t9 === 0 || !ot2(t9);
}
function Co(t9) {
  return t9 !== 125;
}
function So(t9, e2) {
  return Os(t9) === Os(e2);
}
function Os(t9) {
  return t9 >= 97 && t9 <= 122 ? t9 - 97 + 65 : t9;
}
function Ms(t9) {
  return ot2(t9) || It2(t9) || t9 === 95;
}
function qs(t9) {
  return t9 !== 59 && b2(t9);
}
function _o2(t9) {
  let e2 = [], r2;
  for (let n2 = 0; n2 < t9.length; n2++) {
    let s2 = t9[n2];
    r2 && r2.type === 5 && s2.type === 5 || r2 && r2.type === 16 && s2.type === 16 ? (r2.parts[0] += s2.parts[0], r2.sourceSpan.end = s2.sourceSpan.end) : (r2 = s2, e2.push(r2));
  }
  return e2;
}
var rr2 = class t4 {
  constructor(e2, r2) {
    if (e2 instanceof t4) {
      this.file = e2.file, this.input = e2.input, this.end = e2.end;
      let n2 = e2.state;
      this.state = { peek: n2.peek, offset: n2.offset, line: n2.line, column: n2.column };
    } else {
      if (!r2) throw new Error("Programming error: the range argument must be provided with a file argument.");
      this.file = e2, this.input = e2.content, this.end = r2.endPos, this.state = { peek: -1, offset: r2.startPos, line: r2.startLine, column: r2.startCol };
    }
  }
  clone() {
    return new t4(this);
  }
  peek() {
    return this.state.peek;
  }
  charsLeft() {
    return this.end - this.state.offset;
  }
  diff(e2) {
    return this.state.offset - e2.state.offset;
  }
  advance() {
    this.advanceState(this.state);
  }
  init() {
    this.updatePeek(this.state);
  }
  getSpan(e2, r2) {
    e2 = e2 || this;
    let n2 = e2;
    if (r2) for (; this.diff(e2) > 0 && r2.indexOf(e2.peek()) !== -1; ) n2 === e2 && (e2 = e2.clone()), e2.advance();
    let s2 = this.locationFromCursor(e2), i = this.locationFromCursor(this), a = n2 !== e2 ? this.locationFromCursor(n2) : s2;
    return new h(s2, i, a);
  }
  getChars(e2) {
    return this.input.substring(e2.state.offset, this.state.offset);
  }
  charAt(e2) {
    return this.input.charCodeAt(e2);
  }
  advanceState(e2) {
    if (e2.offset >= this.end) throw this.state = e2, new gt2('Unexpected character "EOF"', this);
    let r2 = this.charAt(e2.offset);
    r2 === 10 ? (e2.line++, e2.column = 0) : Rt2(r2) || e2.column++, e2.offset++, this.updatePeek(e2);
  }
  updatePeek(e2) {
    e2.peek = e2.offset >= this.end ? 0 : this.charAt(e2.offset);
  }
  locationFromCursor(e2) {
    return new ae2(e2.file, e2.state.offset, e2.state.line, e2.state.column);
  }
};
var Mr2 = class t5 extends rr2 {
  constructor(e2, r2) {
    e2 instanceof t5 ? (super(e2), this.internalState = { ...e2.internalState }) : (super(e2, r2), this.internalState = this.state);
  }
  advance() {
    this.state = this.internalState, super.advance(), this.processEscapeSequence();
  }
  init() {
    super.init(), this.processEscapeSequence();
  }
  clone() {
    return new t5(this);
  }
  getChars(e2) {
    let r2 = e2.clone(), n2 = "";
    for (; r2.internalState.offset < this.internalState.offset; ) n2 += String.fromCodePoint(r2.peek()), r2.advance();
    return n2;
  }
  processEscapeSequence() {
    let e2 = () => this.internalState.peek;
    if (e2() === 92) if (this.internalState = { ...this.state }, this.advanceState(this.internalState), e2() === 110) this.state.peek = 10;
    else if (e2() === 114) this.state.peek = 13;
    else if (e2() === 118) this.state.peek = 11;
    else if (e2() === 116) this.state.peek = 9;
    else if (e2() === 98) this.state.peek = 8;
    else if (e2() === 102) this.state.peek = 12;
    else if (e2() === 117) if (this.advanceState(this.internalState), e2() === 123) {
      this.advanceState(this.internalState);
      let r2 = this.clone(), n2 = 0;
      for (; e2() !== 125; ) this.advanceState(this.internalState), n2++;
      this.state.peek = this.decodeHexDigits(r2, n2);
    } else {
      let r2 = this.clone();
      this.advanceState(this.internalState), this.advanceState(this.internalState), this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(r2, 4);
    }
    else if (e2() === 120) {
      this.advanceState(this.internalState);
      let r2 = this.clone();
      this.advanceState(this.internalState), this.state.peek = this.decodeHexDigits(r2, 2);
    } else if (yr2(e2())) {
      let r2 = "", n2 = 0, s2 = this.clone();
      for (; yr2(e2()) && n2 < 3; ) s2 = this.clone(), r2 += String.fromCodePoint(e2()), this.advanceState(this.internalState), n2++;
      this.state.peek = parseInt(r2, 8), this.internalState = s2.internalState;
    } else Rt2(this.internalState.peek) ? (this.advanceState(this.internalState), this.state = this.internalState) : this.state.peek = this.internalState.peek;
  }
  decodeHexDigits(e2, r2) {
    let n2 = this.input.slice(e2.internalState.offset, e2.internalState.offset + r2), s2 = parseInt(n2, 16);
    if (isNaN(s2)) throw e2.state = e2.internalState, new gt2("Invalid hexadecimal escape sequence", e2);
    return s2;
  }
};
var gt2 = class {
  constructor(e2, r2) {
    this.msg = e2, this.cursor = r2;
  }
};
var L2 = class t6 extends Ue2 {
  static create(e2, r2, n2) {
    return new t6(e2, r2, n2);
  }
  constructor(e2, r2, n2) {
    super(r2, n2), this.elementName = e2;
  }
};
var Vr2 = class {
  constructor(e2, r2) {
    this.rootNodes = e2, this.errors = r2;
  }
};
var nr2 = class {
  constructor(e2) {
    this.getTagDefinition = e2;
  }
  parse(e2, r2, n2, s2 = false, i) {
    let a = (D) => (R2, ...F) => D(R2.toLowerCase(), ...F), o2 = s2 ? this.getTagDefinition : a(this.getTagDefinition), u = (D) => o2(D).getContentType(), p = s2 ? i : a(i), f = Ws(e2, r2, i ? (D, R2, F, c2) => {
      let g = p(D, R2, F, c2);
      return g !== void 0 ? g : u(D);
    } : u, n2), d = n2 && n2.canSelfClose || false, C = n2 && n2.allowHtmComponentClosingTags || false, A = new Ur2(f.tokens, o2, d, C, s2);
    return A.build(), new Vr2(A.rootNodes, f.errors.concat(A.errors));
  }
};
var Ur2 = class t7 {
  constructor(e2, r2, n2, s2, i) {
    this.tokens = e2, this.getTagDefinition = r2, this.canSelfClose = n2, this.allowHtmComponentClosingTags = s2, this.isTagNameCaseSensitive = i, this._index = -1, this._containerStack = [], this.rootNodes = [], this.errors = [], this._advance();
  }
  build() {
    for (; this._peek.type !== 34; ) this._peek.type === 0 || this._peek.type === 4 ? this._consumeStartTag(this._advance()) : this._peek.type === 3 ? (this._closeVoidElement(), this._consumeEndTag(this._advance())) : this._peek.type === 12 ? (this._closeVoidElement(), this._consumeCdata(this._advance())) : this._peek.type === 10 ? (this._closeVoidElement(), this._consumeComment(this._advance())) : this._peek.type === 5 || this._peek.type === 7 || this._peek.type === 6 ? (this._closeVoidElement(), this._consumeText(this._advance())) : this._peek.type === 20 ? this._consumeExpansion(this._advance()) : this._peek.type === 25 ? (this._closeVoidElement(), this._consumeBlockOpen(this._advance())) : this._peek.type === 27 ? (this._closeVoidElement(), this._consumeBlockClose(this._advance())) : this._peek.type === 29 ? (this._closeVoidElement(), this._consumeIncompleteBlock(this._advance())) : this._peek.type === 30 ? (this._closeVoidElement(), this._consumeLet(this._advance())) : this._peek.type === 18 ? this._consumeDocType(this._advance()) : this._peek.type === 33 ? (this._closeVoidElement(), this._consumeIncompleteLet(this._advance())) : this._advance();
    for (let e2 of this._containerStack) e2 instanceof Z2 && this.errors.push(L2.create(e2.name, e2.sourceSpan, `Unclosed block "${e2.name}"`));
  }
  _advance() {
    let e2 = this._peek;
    return this._index < this.tokens.length - 1 && this._index++, this._peek = this.tokens[this._index], e2;
  }
  _advanceIf(e2) {
    return this._peek.type === e2 ? this._advance() : null;
  }
  _consumeCdata(e2) {
    let r2 = this._advance(), n2 = this._getText(r2), s2 = this._advanceIf(13);
    this._addToParent(new Wt2(n2, new h(e2.sourceSpan.start, (s2 || r2).sourceSpan.end), [r2]));
  }
  _consumeComment(e2) {
    let r2 = this._advanceIf(7), n2 = this._advanceIf(11), s2 = r2 != null ? r2.parts[0].trim() : null, i = n2 == null ? e2.sourceSpan : new h(e2.sourceSpan.start, n2.sourceSpan.end, e2.sourceSpan.fullStart);
    this._addToParent(new jt2(s2, i));
  }
  _consumeDocType(e2) {
    let r2 = this._advanceIf(7), n2 = this._advanceIf(19), s2 = r2 != null ? r2.parts[0].trim() : null, i = new h(e2.sourceSpan.start, (n2 || r2 || e2).sourceSpan.end);
    this._addToParent(new Kt2(s2, i));
  }
  _consumeExpansion(e2) {
    let r2 = this._advance(), n2 = this._advance(), s2 = [];
    for (; this._peek.type === 21; ) {
      let a = this._parseExpansionCase();
      if (!a) return;
      s2.push(a);
    }
    if (this._peek.type !== 24) {
      this.errors.push(L2.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '}'."));
      return;
    }
    let i = new h(e2.sourceSpan.start, this._peek.sourceSpan.end, e2.sourceSpan.fullStart);
    this._addToParent(new zt2(r2.parts[0], n2.parts[0], s2, i, r2.sourceSpan)), this._advance();
  }
  _parseExpansionCase() {
    let e2 = this._advance();
    if (this._peek.type !== 22) return this.errors.push(L2.create(null, this._peek.sourceSpan, "Invalid ICU message. Missing '{'.")), null;
    let r2 = this._advance(), n2 = this._collectExpansionExpTokens(r2);
    if (!n2) return null;
    let s2 = this._advance();
    n2.push({ type: 34, parts: [], sourceSpan: s2.sourceSpan });
    let i = new t7(n2, this.getTagDefinition, this.canSelfClose, this.allowHtmComponentClosingTags, this.isTagNameCaseSensitive);
    if (i.build(), i.errors.length > 0) return this.errors = this.errors.concat(i.errors), null;
    let a = new h(e2.sourceSpan.start, s2.sourceSpan.end, e2.sourceSpan.fullStart), o2 = new h(r2.sourceSpan.start, s2.sourceSpan.end, r2.sourceSpan.fullStart);
    return new Gt2(e2.parts[0], i.rootNodes, a, e2.sourceSpan, o2);
  }
  _collectExpansionExpTokens(e2) {
    let r2 = [], n2 = [22];
    for (; ; ) {
      if ((this._peek.type === 20 || this._peek.type === 22) && n2.push(this._peek.type), this._peek.type === 23) if (zs(n2, 22)) {
        if (n2.pop(), n2.length === 0) return r2;
      } else return this.errors.push(L2.create(null, e2.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
      if (this._peek.type === 24) if (zs(n2, 20)) n2.pop();
      else return this.errors.push(L2.create(null, e2.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
      if (this._peek.type === 34) return this.errors.push(L2.create(null, e2.sourceSpan, "Invalid ICU message. Missing '}'.")), null;
      r2.push(this._advance());
    }
  }
  _getText(e2) {
    let r2 = e2.parts[0];
    if (r2.length > 0 && r2[0] == `
`) {
      let n2 = this._getClosestParentElement();
      n2 != null && n2.children.length == 0 && this.getTagDefinition(n2.name).ignoreFirstLf && (r2 = r2.substring(1));
    }
    return r2;
  }
  _consumeText(e2) {
    let r2 = [e2], n2 = e2.sourceSpan, s2 = e2.parts[0];
    if (s2.length > 0 && s2[0] === `
`) {
      let i = this._getContainer();
      i != null && i.children.length === 0 && this.getTagDefinition(i.name).ignoreFirstLf && (s2 = s2.substring(1), r2[0] = { type: e2.type, sourceSpan: e2.sourceSpan, parts: [s2] });
    }
    for (; this._peek.type === 8 || this._peek.type === 5 || this._peek.type === 9; ) e2 = this._advance(), r2.push(e2), e2.type === 8 ? s2 += e2.parts.join("").replace(/&([^;]+);/g, Gs) : e2.type === 9 ? s2 += e2.parts[0] : s2 += e2.parts.join("");
    if (s2.length > 0) {
      let i = e2.sourceSpan;
      this._addToParent(new Ut2(s2, new h(n2.start, i.end, n2.fullStart, n2.details), r2));
    }
  }
  _closeVoidElement() {
    let e2 = this._getContainer();
    e2 instanceof G2 && this.getTagDefinition(e2.name).isVoid && this._containerStack.pop();
  }
  _consumeStartTag(e2) {
    let [r2, n2] = e2.parts, s2 = [];
    for (; this._peek.type === 14; ) s2.push(this._consumeAttr(this._advance()));
    let i = this._getElementFullName(r2, n2, this._getClosestParentElement()), a = false;
    if (this._peek.type === 2) {
      this._advance(), a = true;
      let C = this.getTagDefinition(i);
      this.canSelfClose || C.canSelfClose || We2(i) !== null || C.isVoid || this.errors.push(L2.create(i, e2.sourceSpan, `Only void, custom and foreign elements can be self closed "${e2.parts[1]}"`));
    } else this._peek.type === 1 && (this._advance(), a = false);
    let o2 = this._peek.sourceSpan.fullStart, u = new h(e2.sourceSpan.start, o2, e2.sourceSpan.fullStart), p = new h(e2.sourceSpan.start, o2, e2.sourceSpan.fullStart), l2 = new h(e2.sourceSpan.start.moveBy(1), e2.sourceSpan.end), f = new G2(i, s2, [], u, p, void 0, l2), d = this._getContainer();
    this._pushContainer(f, d instanceof G2 && this.getTagDefinition(d.name).isClosedByChild(f.name)), a ? this._popContainer(i, G2, u) : e2.type === 4 && (this._popContainer(i, G2, null), this.errors.push(L2.create(i, u, `Opening tag "${i}" not terminated.`)));
  }
  _pushContainer(e2, r2) {
    r2 && this._containerStack.pop(), this._addToParent(e2), this._containerStack.push(e2);
  }
  _consumeEndTag(e2) {
    let r2 = this.allowHtmComponentClosingTags && e2.parts.length === 0 ? null : this._getElementFullName(e2.parts[0], e2.parts[1], this._getClosestParentElement());
    if (r2 && this.getTagDefinition(r2).isVoid) this.errors.push(L2.create(r2, e2.sourceSpan, `Void elements do not have end tags "${e2.parts[1]}"`));
    else if (!this._popContainer(r2, G2, e2.sourceSpan)) {
      let n2 = `Unexpected closing tag "${r2}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;
      this.errors.push(L2.create(r2, e2.sourceSpan, n2));
    }
  }
  _popContainer(e2, r2, n2) {
    let s2 = false;
    for (let i = this._containerStack.length - 1; i >= 0; i--) {
      let a = this._containerStack[i];
      if (We2(a.name) ? a.name === e2 : (e2 == null || a.name.toLowerCase() === e2.toLowerCase()) && a instanceof r2) return a.endSourceSpan = n2, a.sourceSpan.end = n2 !== null ? n2.end : a.sourceSpan.end, this._containerStack.splice(i, this._containerStack.length - i), !s2;
      (a instanceof Z2 || a instanceof G2 && !this.getTagDefinition(a.name).closedByParent) && (s2 = true);
    }
    return false;
  }
  _consumeAttr(e2) {
    let r2 = ze2(e2.parts[0], e2.parts[1]), n2 = e2.sourceSpan.end, s2;
    this._peek.type === 15 && (s2 = this._advance());
    let i = "", a = [], o2, u;
    if (this._peek.type === 16) for (o2 = this._peek.sourceSpan, u = this._peek.sourceSpan.end; this._peek.type === 16 || this._peek.type === 17 || this._peek.type === 9; ) {
      let f = this._advance();
      a.push(f), f.type === 17 ? i += f.parts.join("").replace(/&([^;]+);/g, Gs) : f.type === 9 ? i += f.parts[0] : i += f.parts.join(""), u = n2 = f.sourceSpan.end;
    }
    this._peek.type === 15 && (u = n2 = this._advance().sourceSpan.end);
    let l2 = o2 && u && new h((s2 == null ? void 0 : s2.sourceSpan.start) ?? o2.start, u, (s2 == null ? void 0 : s2.sourceSpan.fullStart) ?? o2.fullStart);
    return new Yt2(r2, i, new h(e2.sourceSpan.start, n2, e2.sourceSpan.fullStart), e2.sourceSpan, l2, a.length > 0 ? a : void 0, void 0);
  }
  _consumeBlockOpen(e2) {
    let r2 = [];
    for (; this._peek.type === 28; ) {
      let o2 = this._advance();
      r2.push(new ct2(o2.parts[0], o2.sourceSpan));
    }
    this._peek.type === 26 && this._advance();
    let n2 = this._peek.sourceSpan.fullStart, s2 = new h(e2.sourceSpan.start, n2, e2.sourceSpan.fullStart), i = new h(e2.sourceSpan.start, n2, e2.sourceSpan.fullStart), a = new Z2(e2.parts[0], r2, [], s2, e2.sourceSpan, i);
    this._pushContainer(a, false);
  }
  _consumeBlockClose(e2) {
    this._popContainer(null, Z2, e2.sourceSpan) || this.errors.push(L2.create(null, e2.sourceSpan, 'Unexpected closing block. The block may have been closed earlier. If you meant to write the } character, you should use the "&#125;" HTML entity instead.'));
  }
  _consumeIncompleteBlock(e2) {
    let r2 = [];
    for (; this._peek.type === 28; ) {
      let o2 = this._advance();
      r2.push(new ct2(o2.parts[0], o2.sourceSpan));
    }
    let n2 = this._peek.sourceSpan.fullStart, s2 = new h(e2.sourceSpan.start, n2, e2.sourceSpan.fullStart), i = new h(e2.sourceSpan.start, n2, e2.sourceSpan.fullStart), a = new Z2(e2.parts[0], r2, [], s2, e2.sourceSpan, i);
    this._pushContainer(a, false), this._popContainer(null, Z2, null), this.errors.push(L2.create(e2.parts[0], s2, `Incomplete block "${e2.parts[0]}". If you meant to write the @ character, you should use the "&#64;" HTML entity instead.`));
  }
  _consumeLet(e2) {
    let r2 = e2.parts[0], n2, s2;
    if (this._peek.type !== 31) {
      this.errors.push(L2.create(e2.parts[0], e2.sourceSpan, `Invalid @let declaration "${r2}". Declaration must have a value.`));
      return;
    } else n2 = this._advance();
    if (this._peek.type !== 32) {
      this.errors.push(L2.create(e2.parts[0], e2.sourceSpan, `Unterminated @let declaration "${r2}". Declaration must be terminated with a semicolon.`));
      return;
    } else s2 = this._advance();
    let i = s2.sourceSpan.fullStart, a = new h(e2.sourceSpan.start, i, e2.sourceSpan.fullStart), o2 = e2.sourceSpan.toString().lastIndexOf(r2), u = e2.sourceSpan.start.moveBy(o2), p = new h(u, e2.sourceSpan.end), l2 = new pt2(r2, n2.parts[0], a, p, n2.sourceSpan);
    this._addToParent(l2);
  }
  _consumeIncompleteLet(e2) {
    let r2 = e2.parts[0] ?? "", n2 = r2 ? ` "${r2}"` : "";
    if (r2.length > 0) {
      let s2 = e2.sourceSpan.toString().lastIndexOf(r2), i = e2.sourceSpan.start.moveBy(s2), a = new h(i, e2.sourceSpan.end), o2 = new h(e2.sourceSpan.start, e2.sourceSpan.start.moveBy(0)), u = new pt2(r2, "", e2.sourceSpan, a, o2);
      this._addToParent(u);
    }
    this.errors.push(L2.create(e2.parts[0], e2.sourceSpan, `Incomplete @let declaration${n2}. @let declarations must be written as \`@let <name> = <value>;\``));
  }
  _getContainer() {
    return this._containerStack.length > 0 ? this._containerStack[this._containerStack.length - 1] : null;
  }
  _getClosestParentElement() {
    for (let e2 = this._containerStack.length - 1; e2 > -1; e2--) if (this._containerStack[e2] instanceof G2) return this._containerStack[e2];
    return null;
  }
  _addToParent(e2) {
    let r2 = this._getContainer();
    r2 === null ? this.rootNodes.push(e2) : r2.children.push(e2);
  }
  _getElementFullName(e2, r2, n2) {
    if (e2 === "" && (e2 = this.getTagDefinition(r2).implicitNamespacePrefix || "", e2 === "" && n2 != null)) {
      let s2 = ut2(n2.name)[1];
      this.getTagDefinition(s2).preventNamespaceInheritance || (e2 = We2(n2.name));
    }
    return ze2(e2, r2);
  }
};
function zs(t9, e2) {
  return t9.length > 0 && t9[t9.length - 1] === e2;
}
function Gs(t9, e2) {
  return Ye2[e2] !== void 0 ? Ye2[e2] || t9 : /^#x[a-f0-9]+$/i.test(e2) ? String.fromCodePoint(parseInt(e2.slice(2), 16)) : /^#\d+$/.test(e2) ? String.fromCodePoint(parseInt(e2.slice(1), 10)) : t9;
}
var sr2 = class extends nr2 {
  constructor() {
    super(Ge2);
  }
  parse(e2, r2, n2, s2 = false, i) {
    return super.parse(e2, r2, n2, s2, i);
  }
};
var Wr2 = null;
var Eo2 = () => (Wr2 || (Wr2 = new sr2()), Wr2);
function zr2(t9, e2 = {}) {
  let { canSelfClose: r2 = false, allowHtmComponentClosingTags: n2 = false, isTagNameCaseSensitive: s2 = false, getTagContentType: i, tokenizeAngularBlocks: a = false, tokenizeAngularLetDeclaration: o2 = false } = e2;
  return Eo2().parse(t9, "angular-html-parser", { tokenizeExpansionForms: a, interpolationConfig: void 0, canSelfClose: r2, allowHtmComponentClosingTags: n2, tokenizeBlocks: a, tokenizeLet: o2 }, s2, i);
}
function Ao2(t9, e2) {
  let r2 = new SyntaxError(t9 + " (" + e2.loc.start.line + ":" + e2.loc.start.column + ")");
  return Object.assign(r2, e2);
}
var Ys = Ao2;
var Ct = 3;
function Do2(t9) {
  let e2 = t9.slice(0, Ct);
  if (e2 !== "---" && e2 !== "+++") return;
  let r2 = t9.indexOf(`
`, Ct);
  if (r2 === -1) return;
  let n2 = t9.slice(Ct, r2).trim(), s2 = t9.indexOf(`
${e2}`, r2), i = n2;
  if (i || (i = e2 === "+++" ? "toml" : "yaml"), s2 === -1 && e2 === "---" && i === "yaml" && (s2 = t9.indexOf(`
...`, r2)), s2 === -1) return;
  let a = s2 + 1 + Ct, o2 = t9.charAt(a + 1);
  if (!/\s?/u.test(o2)) return;
  let u = t9.slice(0, a);
  return { type: "front-matter", language: i, explicitLanguage: n2, value: t9.slice(r2 + 1, s2), startDelimiter: e2, endDelimiter: u.slice(-Ct), raw: u };
}
function vo(t9) {
  let e2 = Do2(t9);
  if (!e2) return { content: t9 };
  let { raw: r2 } = e2;
  return { frontMatter: e2, content: w(false, r2, /[^\n]/gu, " ") + t9.slice(r2.length) };
}
var js = vo;
var ir2 = { attrs: true, children: true, cases: true, expression: true };
var Ks = /* @__PURE__ */ new Set(["parent"]);
var ar2 = class t8 {
  constructor(e2 = {}) {
    for (let r2 of /* @__PURE__ */ new Set([...Ks, ...Object.keys(e2)])) this.setProperty(r2, e2[r2]);
  }
  setProperty(e2, r2) {
    if (this[e2] !== r2) {
      if (e2 in ir2 && (r2 = r2.map((n2) => this.createChild(n2))), !Ks.has(e2)) {
        this[e2] = r2;
        return;
      }
      Object.defineProperty(this, e2, { value: r2, enumerable: false, configurable: true });
    }
  }
  map(e2) {
    let r2;
    for (let n2 in ir2) {
      let s2 = this[n2];
      if (s2) {
        let i = yo2(s2, (a) => a.map(e2));
        r2 !== s2 && (r2 || (r2 = new t8({ parent: this.parent })), r2.setProperty(n2, i));
      }
    }
    if (r2) for (let n2 in this) n2 in ir2 || (r2[n2] = this[n2]);
    return e2(r2 || this);
  }
  walk(e2) {
    for (let r2 in ir2) {
      let n2 = this[r2];
      if (n2) for (let s2 = 0; s2 < n2.length; s2++) n2[s2].walk(e2);
    }
    e2(this);
  }
  createChild(e2) {
    let r2 = e2 instanceof t8 ? e2.clone() : new t8(e2);
    return r2.setProperty("parent", this), r2;
  }
  insertChildBefore(e2, r2) {
    this.children.splice(this.children.indexOf(e2), 0, this.createChild(r2));
  }
  removeChild(e2) {
    this.children.splice(this.children.indexOf(e2), 1);
  }
  replaceChild(e2, r2) {
    this.children[this.children.indexOf(e2)] = this.createChild(r2);
  }
  clone() {
    return new t8(this);
  }
  get firstChild() {
    var e2;
    return (e2 = this.children) == null ? void 0 : e2[0];
  }
  get lastChild() {
    var e2;
    return (e2 = this.children) == null ? void 0 : e2[this.children.length - 1];
  }
  get prev() {
    var e2, r2;
    return (r2 = (e2 = this.parent) == null ? void 0 : e2.children) == null ? void 0 : r2[this.parent.children.indexOf(this) - 1];
  }
  get next() {
    var e2, r2;
    return (r2 = (e2 = this.parent) == null ? void 0 : e2.children) == null ? void 0 : r2[this.parent.children.indexOf(this) + 1];
  }
  get rawName() {
    return this.hasExplicitNamespace ? this.fullName : this.name;
  }
  get fullName() {
    return this.namespace ? this.namespace + ":" + this.name : this.name;
  }
  get attrMap() {
    return Object.fromEntries(this.attrs.map((e2) => [e2.fullName, e2.value]));
  }
};
function yo2(t9, e2) {
  let r2 = t9.map(e2);
  return r2.some((n2, s2) => n2 !== t9[s2]) ? r2 : t9;
}
var wo2 = [{ regex: /^(\[if([^\]]*)\]>)(.*?)<!\s*\[endif\]$/su, parse: bo }, { regex: /^\[if([^\]]*)\]><!$/u, parse: To }, { regex: /^<!\s*\[endif\]$/u, parse: xo2 }];
function Qs(t9, e2) {
  if (t9.value) for (let { regex: r2, parse: n2 } of wo2) {
    let s2 = t9.value.match(r2);
    if (s2) return n2(t9, e2, s2);
  }
  return null;
}
function bo(t9, e2, r2) {
  let [, n2, s2, i] = r2, a = 4 + n2.length, o2 = t9.sourceSpan.start.moveBy(a), u = o2.moveBy(i.length), [p, l2] = (() => {
    try {
      return [true, e2(i, o2).children];
    } catch {
      return [false, [{ type: "text", value: i, sourceSpan: new h(o2, u) }]];
    }
  })();
  return { type: "ieConditionalComment", complete: p, children: l2, condition: w(false, s2.trim(), /\s+/gu, " "), sourceSpan: t9.sourceSpan, startSourceSpan: new h(t9.sourceSpan.start, o2), endSourceSpan: new h(u, t9.sourceSpan.end) };
}
function To(t9, e2, r2) {
  let [, n2] = r2;
  return { type: "ieConditionalStartComment", condition: w(false, n2.trim(), /\s+/gu, " "), sourceSpan: t9.sourceSpan };
}
function xo2(t9) {
  return { type: "ieConditionalEndComment", sourceSpan: t9.sourceSpan };
}
var or7 = /* @__PURE__ */ new Map([["*", /* @__PURE__ */ new Set(["accesskey", "autocapitalize", "autofocus", "class", "contenteditable", "dir", "draggable", "enterkeyhint", "hidden", "id", "inert", "inputmode", "is", "itemid", "itemprop", "itemref", "itemscope", "itemtype", "lang", "nonce", "popover", "slot", "spellcheck", "style", "tabindex", "title", "translate", "writingsuggestions"])], ["a", /* @__PURE__ */ new Set(["charset", "coords", "download", "href", "hreflang", "name", "ping", "referrerpolicy", "rel", "rev", "shape", "target", "type"])], ["applet", /* @__PURE__ */ new Set(["align", "alt", "archive", "code", "codebase", "height", "hspace", "name", "object", "vspace", "width"])], ["area", /* @__PURE__ */ new Set(["alt", "coords", "download", "href", "hreflang", "nohref", "ping", "referrerpolicy", "rel", "shape", "target", "type"])], ["audio", /* @__PURE__ */ new Set(["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"])], ["base", /* @__PURE__ */ new Set(["href", "target"])], ["basefont", /* @__PURE__ */ new Set(["color", "face", "size"])], ["blockquote", /* @__PURE__ */ new Set(["cite"])], ["body", /* @__PURE__ */ new Set(["alink", "background", "bgcolor", "link", "text", "vlink"])], ["br", /* @__PURE__ */ new Set(["clear"])], ["button", /* @__PURE__ */ new Set(["disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "name", "popovertarget", "popovertargetaction", "type", "value"])], ["canvas", /* @__PURE__ */ new Set(["height", "width"])], ["caption", /* @__PURE__ */ new Set(["align"])], ["col", /* @__PURE__ */ new Set(["align", "char", "charoff", "span", "valign", "width"])], ["colgroup", /* @__PURE__ */ new Set(["align", "char", "charoff", "span", "valign", "width"])], ["data", /* @__PURE__ */ new Set(["value"])], ["del", /* @__PURE__ */ new Set(["cite", "datetime"])], ["details", /* @__PURE__ */ new Set(["name", "open"])], ["dialog", /* @__PURE__ */ new Set(["open"])], ["dir", /* @__PURE__ */ new Set(["compact"])], ["div", /* @__PURE__ */ new Set(["align"])], ["dl", /* @__PURE__ */ new Set(["compact"])], ["embed", /* @__PURE__ */ new Set(["height", "src", "type", "width"])], ["fieldset", /* @__PURE__ */ new Set(["disabled", "form", "name"])], ["font", /* @__PURE__ */ new Set(["color", "face", "size"])], ["form", /* @__PURE__ */ new Set(["accept", "accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "target"])], ["frame", /* @__PURE__ */ new Set(["frameborder", "longdesc", "marginheight", "marginwidth", "name", "noresize", "scrolling", "src"])], ["frameset", /* @__PURE__ */ new Set(["cols", "rows"])], ["h1", /* @__PURE__ */ new Set(["align"])], ["h2", /* @__PURE__ */ new Set(["align"])], ["h3", /* @__PURE__ */ new Set(["align"])], ["h4", /* @__PURE__ */ new Set(["align"])], ["h5", /* @__PURE__ */ new Set(["align"])], ["h6", /* @__PURE__ */ new Set(["align"])], ["head", /* @__PURE__ */ new Set(["profile"])], ["hr", /* @__PURE__ */ new Set(["align", "noshade", "size", "width"])], ["html", /* @__PURE__ */ new Set(["manifest", "version"])], ["iframe", /* @__PURE__ */ new Set(["align", "allow", "allowfullscreen", "allowpaymentrequest", "allowusermedia", "frameborder", "height", "loading", "longdesc", "marginheight", "marginwidth", "name", "referrerpolicy", "sandbox", "scrolling", "src", "srcdoc", "width"])], ["img", /* @__PURE__ */ new Set(["align", "alt", "border", "crossorigin", "decoding", "fetchpriority", "height", "hspace", "ismap", "loading", "longdesc", "name", "referrerpolicy", "sizes", "src", "srcset", "usemap", "vspace", "width"])], ["input", /* @__PURE__ */ new Set(["accept", "align", "alt", "autocomplete", "checked", "dirname", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "height", "ismap", "list", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "popovertarget", "popovertargetaction", "readonly", "required", "size", "src", "step", "type", "usemap", "value", "width"])], ["ins", /* @__PURE__ */ new Set(["cite", "datetime"])], ["isindex", /* @__PURE__ */ new Set(["prompt"])], ["label", /* @__PURE__ */ new Set(["for", "form"])], ["legend", /* @__PURE__ */ new Set(["align"])], ["li", /* @__PURE__ */ new Set(["type", "value"])], ["link", /* @__PURE__ */ new Set(["as", "blocking", "charset", "color", "crossorigin", "disabled", "fetchpriority", "href", "hreflang", "imagesizes", "imagesrcset", "integrity", "media", "referrerpolicy", "rel", "rev", "sizes", "target", "type"])], ["map", /* @__PURE__ */ new Set(["name"])], ["menu", /* @__PURE__ */ new Set(["compact"])], ["meta", /* @__PURE__ */ new Set(["charset", "content", "http-equiv", "media", "name", "scheme"])], ["meter", /* @__PURE__ */ new Set(["high", "low", "max", "min", "optimum", "value"])], ["object", /* @__PURE__ */ new Set(["align", "archive", "border", "classid", "codebase", "codetype", "data", "declare", "form", "height", "hspace", "name", "standby", "type", "typemustmatch", "usemap", "vspace", "width"])], ["ol", /* @__PURE__ */ new Set(["compact", "reversed", "start", "type"])], ["optgroup", /* @__PURE__ */ new Set(["disabled", "label"])], ["option", /* @__PURE__ */ new Set(["disabled", "label", "selected", "value"])], ["output", /* @__PURE__ */ new Set(["for", "form", "name"])], ["p", /* @__PURE__ */ new Set(["align"])], ["param", /* @__PURE__ */ new Set(["name", "type", "value", "valuetype"])], ["pre", /* @__PURE__ */ new Set(["width"])], ["progress", /* @__PURE__ */ new Set(["max", "value"])], ["q", /* @__PURE__ */ new Set(["cite"])], ["script", /* @__PURE__ */ new Set(["async", "blocking", "charset", "crossorigin", "defer", "fetchpriority", "integrity", "language", "nomodule", "referrerpolicy", "src", "type"])], ["select", /* @__PURE__ */ new Set(["autocomplete", "disabled", "form", "multiple", "name", "required", "size"])], ["slot", /* @__PURE__ */ new Set(["name"])], ["source", /* @__PURE__ */ new Set(["height", "media", "sizes", "src", "srcset", "type", "width"])], ["style", /* @__PURE__ */ new Set(["blocking", "media", "type"])], ["table", /* @__PURE__ */ new Set(["align", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "rules", "summary", "width"])], ["tbody", /* @__PURE__ */ new Set(["align", "char", "charoff", "valign"])], ["td", /* @__PURE__ */ new Set(["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"])], ["template", /* @__PURE__ */ new Set(["shadowrootclonable", "shadowrootdelegatesfocus", "shadowrootmode"])], ["textarea", /* @__PURE__ */ new Set(["autocomplete", "cols", "dirname", "disabled", "form", "maxlength", "minlength", "name", "placeholder", "readonly", "required", "rows", "wrap"])], ["tfoot", /* @__PURE__ */ new Set(["align", "char", "charoff", "valign"])], ["th", /* @__PURE__ */ new Set(["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"])], ["thead", /* @__PURE__ */ new Set(["align", "char", "charoff", "valign"])], ["time", /* @__PURE__ */ new Set(["datetime"])], ["tr", /* @__PURE__ */ new Set(["align", "bgcolor", "char", "charoff", "valign"])], ["track", /* @__PURE__ */ new Set(["default", "kind", "label", "src", "srclang"])], ["ul", /* @__PURE__ */ new Set(["compact", "type"])], ["video", /* @__PURE__ */ new Set(["autoplay", "controls", "crossorigin", "height", "loop", "muted", "playsinline", "poster", "preload", "src", "width"])]]);
var Xs = /* @__PURE__ */ new Set(["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "math", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "pre", "progress", "q", "rb", "rbc", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"]);
function ko2(t9) {
  if (t9.type === "block") {
    if (t9.name = w(false, t9.name.toLowerCase(), /\s+/gu, " ").trim(), t9.type = "angularControlFlowBlock", !qe2(t9.parameters)) {
      delete t9.parameters;
      return;
    }
    for (let e2 of t9.parameters) e2.type = "angularControlFlowBlockParameter";
    t9.parameters = { type: "angularControlFlowBlockParameters", children: t9.parameters, sourceSpan: new h(t9.parameters[0].sourceSpan.start, X2(false, t9.parameters, -1).sourceSpan.end) };
  }
}
function Bo2(t9) {
  t9.type === "letDeclaration" && (t9.type = "angularLetDeclaration", t9.id = t9.name, t9.init = { type: "angularLetDeclarationInitializer", sourceSpan: new h(t9.valueSpan.start, t9.valueSpan.end), value: t9.value }, delete t9.name, delete t9.value);
}
function Lo2(t9) {
  (t9.type === "plural" || t9.type === "select") && (t9.clause = t9.type, t9.type = "angularIcuExpression"), t9.type === "expansionCase" && (t9.type = "angularIcuCase");
}
function Zs(t9, e2, r2) {
  let { name: n2, canSelfClose: s2 = true, normalizeTagName: i = false, normalizeAttributeName: a = false, allowHtmComponentClosingTags: o2 = false, isTagNameCaseSensitive: u = false, shouldParseAsRawText: p } = e2, { rootNodes: l2, errors: f } = zr2(t9, { canSelfClose: s2, allowHtmComponentClosingTags: o2, isTagNameCaseSensitive: u, getTagContentType: p ? (...c2) => p(...c2) ? I3.RAW_TEXT : void 0 : void 0, tokenizeAngularBlocks: n2 === "angular" ? true : void 0, tokenizeAngularLetDeclaration: n2 === "angular" ? true : void 0 });
  if (n2 === "vue") {
    if (l2.some((x2) => x2.type === "docType" && x2.value === "html" || x2.type === "element" && x2.name.toLowerCase() === "html")) return Zs(t9, ti2, r2);
    let g, y2 = () => g ?? (g = zr2(t9, { canSelfClose: s2, allowHtmComponentClosingTags: o2, isTagNameCaseSensitive: u })), M2 = (x2) => y2().rootNodes.find(({ startSourceSpan: V3 }) => V3 && V3.start.offset === x2.startSourceSpan.start.offset) ?? x2;
    for (let [x2, V3] of l2.entries()) {
      let { endSourceSpan: jr2, startSourceSpan: ri2 } = V3;
      if (jr2 === null) f = y2().errors, l2[x2] = M2(V3);
      else if (Fo2(V3, r2)) {
        let Kr2 = y2().errors.find((Qr2) => Qr2.span.start.offset > ri2.start.offset && Qr2.span.start.offset < jr2.end.offset);
        Kr2 && Js(Kr2), l2[x2] = M2(V3);
      }
    }
  }
  f.length > 0 && Js(f[0]);
  let d = (c2) => {
    let g = c2.name.startsWith(":") ? c2.name.slice(1).split(":")[0] : null, y2 = c2.nameSpan.toString(), M2 = g !== null && y2.startsWith(`${g}:`), x2 = M2 ? y2.slice(g.length + 1) : y2;
    c2.name = x2, c2.namespace = g, c2.hasExplicitNamespace = M2;
  }, C = (c2) => {
    switch (c2.type) {
      case "element":
        d(c2);
        for (let g of c2.attrs) d(g), g.valueSpan ? (g.value = g.valueSpan.toString(), /["']/u.test(g.value[0]) && (g.value = g.value.slice(1, -1))) : g.value = null;
        break;
      case "comment":
        c2.value = c2.sourceSpan.toString().slice(4, -3);
        break;
      case "text":
        c2.value = c2.sourceSpan.toString();
        break;
    }
  }, A = (c2, g) => {
    let y2 = c2.toLowerCase();
    return g(y2) ? y2 : c2;
  }, D = (c2) => {
    if (c2.type === "element" && (i && (!c2.namespace || c2.namespace === c2.tagDefinition.implicitNamespacePrefix || Se2(c2)) && (c2.name = A(c2.name, (g) => Xs.has(g))), a)) for (let g of c2.attrs) g.namespace || (g.name = A(g.name, (y2) => or7.has(c2.name) && (or7.get("*").has(y2) || or7.get(c2.name).has(y2))));
  }, R2 = (c2) => {
    c2.sourceSpan && c2.endSourceSpan && (c2.sourceSpan = new h(c2.sourceSpan.start, c2.endSourceSpan.end));
  }, F = (c2) => {
    if (c2.type === "element") {
      let g = Ge2(u ? c2.name : c2.name.toLowerCase());
      !c2.namespace || c2.namespace === g.implicitNamespacePrefix || Se2(c2) ? c2.tagDefinition = g : c2.tagDefinition = Ge2("");
    }
  };
  return Qt2(new class extends ht2 {
    visitExpansionCase(c2, g) {
      n2 === "angular" && this.visitChildren(g, (y2) => {
        y2(c2.expression);
      });
    }
    visit(c2) {
      C(c2), F(c2), D(c2), R2(c2);
    }
  }(), l2), l2;
}
function Fo2(t9, e2) {
  var n2;
  if (t9.type !== "element" || t9.name !== "template") return false;
  let r2 = (n2 = t9.attrs.find((s2) => s2.name === "lang")) == null ? void 0 : n2.value;
  return !r2 || Oe2(e2, { language: r2 }) === "html";
}
function Js(t9) {
  let { msg: e2, span: { start: r2, end: n2 } } = t9;
  throw Ys(e2, { loc: { start: { line: r2.line + 1, column: r2.col + 1 }, end: { line: n2.line + 1, column: n2.col + 1 } }, cause: t9 });
}
function ei2(t9, e2, r2 = {}, n2 = true) {
  let { frontMatter: s2, content: i } = n2 ? js(t9) : { frontMatter: null, content: t9 }, a = new Te2(t9, r2.filepath), o2 = new ae2(a, 0, 0, 0), u = o2.moveBy(t9.length), p = { type: "root", sourceSpan: new h(o2, u), children: Zs(i, e2, r2) };
  if (s2) {
    let d = new ae2(a, 0, 0, 0), C = d.moveBy(s2.raw.length);
    s2.sourceSpan = new h(d, C), p.children.unshift(s2);
  }
  let l2 = new ar2(p), f = (d, C) => {
    let { offset: A } = C, D = w(false, t9.slice(0, A), /[^\n\r]/gu, " "), F = ei2(D + d, e2, r2, false);
    F.sourceSpan = new h(C, X2(false, F.children, -1).sourceSpan.end);
    let c2 = F.children[0];
    return c2.length === A ? F.children.shift() : (c2.sourceSpan = new h(c2.sourceSpan.start.moveBy(A), c2.sourceSpan.end), c2.value = c2.value.slice(A)), F;
  };
  return l2.walk((d) => {
    if (d.type === "comment") {
      let C = Qs(d, f);
      C && d.parent.replaceChild(d, C);
    }
    ko2(d), Bo2(d), Lo2(d);
  }), l2;
}
function ur2(t9) {
  return { parse: (e2, r2) => ei2(e2, t9, r2), hasPragma: os, astFormat: "html", locStart: se2, locEnd: ie2 };
}
var ti2 = { name: "html", normalizeTagName: true, normalizeAttributeName: true, allowHtmComponentClosingTags: true };
var No = ur2(ti2);
var Po2 = ur2({ name: "angular" });
var Io2 = ur2({ name: "vue", isTagNameCaseSensitive: true, shouldParseAsRawText(t9, e2, r2, n2) {
  return t9.toLowerCase() !== "html" && !r2 && (t9 !== "template" || n2.some(({ name: s2, value: i }) => s2 === "lang" && i !== "html" && i !== "" && i !== void 0));
} });
var Ro2 = ur2({ name: "lwc", canSelfClose: false });
var $o2 = { html: As };
var Ih = Yr2;

// node_modules/@react-email/render/dist/node/index.mjs
import { Writable } from "node:stream";
import { jsx } from "react/jsx-runtime";
import { Suspense as Suspense2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b3) => {
  for (var prop in b3 || (b3 = {}))
    if (__hasOwnProp2.call(b3, prop))
      __defNormalProp(a, prop, b3[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b3)) {
      if (__propIsEnum.call(b3, prop))
        __defNormalProp(a, prop, b3[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var defaults = {
  endOfLine: "lf",
  tabWidth: 2,
  plugins: [Ih],
  parser: "html"
};
var pretty = (str, options = {}) => {
  return gu(str, __spreadValues(__spreadValues({}, defaults), options));
};
var plainTextSelectors = [
  { selector: "img", format: "skip" },
  { selector: "#__react-email-preview", format: "skip" },
  {
    selector: "a",
    options: { linkBrackets: false }
  }
];
var decoder = new TextDecoder("utf-8");
var readStream = (stream) => __async(void 0, null, function* () {
  let result = "";
  if ("pipeTo" in stream) {
    const writableStream = new WritableStream({
      write(chunk) {
        result += decoder.decode(chunk);
      }
    });
    yield stream.pipeTo(writableStream);
  } else {
    const writable = new Writable({
      write(chunk, _encoding, callback) {
        result += decoder.decode(chunk);
        callback();
      }
    });
    stream.pipe(writable);
    yield new Promise((resolve, reject) => {
      writable.on("error", reject);
      writable.on("close", () => {
        resolve();
      });
    });
  }
  return result;
});
var render2 = (element, options) => __async(void 0, null, function* () {
  const suspendedElement = /* @__PURE__ */ jsx(Suspense, { children: element });
  const reactDOMServer = yield import("react-dom/server");
  let html2;
  if (Object.hasOwn(reactDOMServer, "renderToReadableStream")) {
    html2 = yield readStream(
      yield reactDOMServer.renderToReadableStream(suspendedElement)
    );
  } else {
    yield new Promise((resolve, reject) => {
      const stream = reactDOMServer.renderToPipeableStream(suspendedElement, {
        onAllReady() {
          return __async(this, null, function* () {
            html2 = yield readStream(stream);
            resolve();
          });
        },
        onError(error) {
          reject(error);
        }
      });
    });
  }
  if (options == null ? void 0 : options.plainText) {
    return convert(html2, __spreadValues({
      selectors: plainTextSelectors
    }, options.htmlToTextOptions));
  }
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  const document = `${doctype}${html2.replace(/<!DOCTYPE.*?>/, "")}`;
  if (options == null ? void 0 : options.pretty) {
    return pretty(document);
  }
  return document;
});

// server/emails/sendEmail.ts
async function sendEmail(template, opts) {
  if (!emails_default) {
    logger_default.warn("Email client not configured, skipping email send");
    return;
  }
  if (!opts.from || !opts.to || !opts.subject) {
    logger_default.error("Email missing required fields", opts);
    return;
  }
  const emailHtml = await render2(template);
  await emails_default.sendMail({
    from: {
      name: opts.name || "Pangolin",
      address: opts.from
    },
    to: opts.to,
    subject: opts.subject,
    html: emailHtml
  });
}

// server/emails/index.ts
import nodemailer from "nodemailer";
function createEmailClient() {
  const emailConfig = config_default.getRawConfig().email;
  if (!emailConfig) {
    logger_default.warn(
      "Email SMTP configuration is missing. Emails will not be sent."
    );
    return;
  }
  const settings = {
    host: emailConfig.smtp_host,
    port: emailConfig.smtp_port,
    secure: emailConfig.smtp_secure || false,
    auth: {
      user: emailConfig.smtp_user,
      pass: emailConfig.smtp_pass
    }
  };
  if (emailConfig.smtp_tls_reject_unauthorized !== void 0) {
    settings.tls = {
      rejectUnauthorized: emailConfig.smtp_tls_reject_unauthorized
    };
  }
  return nodemailer.createTransport(settings);
}
var emailClient = createEmailClient();
var emails_default = emailClient;

// server/emails/templates/ResourceOTPCode.tsx
import {
  Body,
  Head,
  Html,
  Preview,
  Tailwind
} from "@react-email/components";
import * as React3 from "react";

// server/emails/templates/components/Email.tsx
import { Container } from "@react-email/components";
import React from "react";
function EmailContainer({ children }) {
  return /* @__PURE__ */ React.createElement(Container, { className: "bg-white border border-solid border-gray-200 p-6 max-w-lg mx-auto my-8 rounded-lg" }, children);
}
function EmailLetterHead() {
  return /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement(
    "table",
    {
      role: "presentation",
      width: "100%",
      style: {
        marginBottom: "24px"
      }
    },
    /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(
      "td",
      {
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#F97317"
        }
      },
      "Pangolin"
    ), /* @__PURE__ */ React.createElement(
      "td",
      {
        style: {
          fontSize: "14px",
          textAlign: "right",
          color: "#6B7280"
        }
      },
      (/* @__PURE__ */ new Date()).getFullYear()
    ))
  ));
}
function EmailHeading({ children }) {
  return /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-semibold text-gray-800 text-center" }, children);
}
function EmailGreeting({ children }) {
  return /* @__PURE__ */ React.createElement("p", { className: "text-base text-gray-700 my-4" }, children);
}
function EmailText({
  children,
  className
}) {
  return /* @__PURE__ */ React.createElement("p", { className: `my-2 text-base text-gray-700 ${className}` }, children);
}
function EmailSection({
  children,
  className
}) {
  return /* @__PURE__ */ React.createElement("div", { className: `text-center my-6 ${className}` }, children);
}
function EmailFooter({ children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-500 mt-6" }, children);
}
function EmailSignature() {
  return /* @__PURE__ */ React.createElement("p", null, "Best regards,", /* @__PURE__ */ React.createElement("br", null), "Fossorial");
}

// server/emails/templates/lib/theme.ts
var themeColors = {
  theme: {
    extend: {
      colors: {
        primary: "#F97317"
      }
    }
  }
};

// server/emails/templates/components/CopyCodeBox.tsx
import React2 from "react";
function CopyCodeBox({ text: text2 }) {
  return /* @__PURE__ */ React2.createElement("div", { className: "text-center rounded-lg bg-neutral-100 p-2" }, /* @__PURE__ */ React2.createElement("span", { className: "text-2xl font-mono text-neutral-600 tracking-wide" }, text2));
}

// server/emails/templates/ResourceOTPCode.tsx
var ResourceOTPCode = ({
  email,
  resourceName,
  orgName: organizationName,
  otp
}) => {
  const previewText = `Your one-time password for ${resourceName} is ${otp}`;
  return /* @__PURE__ */ React3.createElement(Html, null, /* @__PURE__ */ React3.createElement(Head, null), /* @__PURE__ */ React3.createElement(Preview, null, previewText), /* @__PURE__ */ React3.createElement(Tailwind, { config: themeColors }, /* @__PURE__ */ React3.createElement(Body, { className: "font-sans" }, /* @__PURE__ */ React3.createElement(EmailContainer, null, /* @__PURE__ */ React3.createElement(EmailLetterHead, null), /* @__PURE__ */ React3.createElement(EmailHeading, null, "Your One-Time Code for ", resourceName), /* @__PURE__ */ React3.createElement(EmailGreeting, null, "Hi ", email || "there", ","), /* @__PURE__ */ React3.createElement(EmailText, null, "You\u2019ve requested a one-time password to access", " ", /* @__PURE__ */ React3.createElement("strong", null, resourceName), " in", " ", /* @__PURE__ */ React3.createElement("strong", null, organizationName), ". Use the code below to complete your authentication:"), /* @__PURE__ */ React3.createElement(EmailSection, null, /* @__PURE__ */ React3.createElement(CopyCodeBox, { text: otp })), /* @__PURE__ */ React3.createElement(EmailFooter, null, /* @__PURE__ */ React3.createElement(EmailSignature, null))))));
};
var ResourceOTPCode_default = ResourceOTPCode;

// server/auth/resourceOtp.ts
async function sendResourceOtpEmail(email, resourceId, resourceName, orgName) {
  const otp = await generateResourceOtpCode(resourceId, email);
  await sendEmail(
    ResourceOTPCode_default({
      email,
      resourceName,
      orgName,
      otp
    }),
    {
      to: email,
      from: config_default.getNoReplyEmail(),
      subject: `Your one-time code to access ${resourceName}`
    }
  );
}
async function generateResourceOtpCode(resourceId, email) {
  const otp = generateRandomString2(8, alphabet("0-9", "A-Z", "a-z"));
  await db_default.transaction(async (trx) => {
    await trx.delete(resourceOtp).where(
      and29(
        eq78(resourceOtp.email, email),
        eq78(resourceOtp.resourceId, resourceId)
      )
    );
    const otpHash = await hashPassword(otp);
    await trx.insert(resourceOtp).values({
      resourceId,
      email,
      otpHash,
      expiresAt: createDate(new TimeSpan(15, "m")).getTime()
    });
  });
  return otp;
}
async function isValidOtp(email, resourceId, otp) {
  const record = await db_default.select().from(resourceOtp).where(
    and29(
      eq78(resourceOtp.email, email),
      eq78(resourceOtp.resourceId, resourceId)
    )
  ).limit(1);
  if (record.length === 0) {
    return false;
  }
  const validCode = await verifyPassword(otp, record[0].otpHash);
  if (!validCode) {
    return false;
  }
  if (!isWithinExpirationDate(new Date(record[0].expiresAt))) {
    return false;
  }
  return true;
}

// server/routers/resource/authWithWhitelist.ts
var authWithWhitelistBodySchema = z53.object({
  email: z53.string().email().transform((v2) => v2.toLowerCase()),
  otp: z53.string().optional()
}).strict();
var authWithWhitelistParamsSchema = z53.object({
  resourceId: z53.string().transform(Number).pipe(z53.number().int().positive())
}).strict();
async function authWithWhitelist(req, res, next2) {
  const parsedBody = authWithWhitelistBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError67(
        HttpCode_default.BAD_REQUEST,
        fromError46(parsedBody.error).toString()
      )
    );
  }
  const parsedParams = authWithWhitelistParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return next2(
      createHttpError67(
        HttpCode_default.BAD_REQUEST,
        fromError46(parsedParams.error).toString()
      )
    );
  }
  const { resourceId } = parsedParams.data;
  const { email, otp } = parsedBody.data;
  try {
    const [result] = await db_default.select().from(resourceWhitelist).where(
      and30(
        eq79(resourceWhitelist.resourceId, resourceId),
        eq79(resourceWhitelist.email, email)
      )
    ).leftJoin(
      resources,
      eq79(resources.resourceId, resourceWhitelist.resourceId)
    ).leftJoin(orgs, eq79(orgs.orgId, resources.orgId)).limit(1);
    let resource = result?.resources;
    let org = result?.orgs;
    let whitelistedEmail = result?.resourceWhitelist;
    if (!whitelistedEmail) {
      const wildcard = "*@" + email.split("@")[1];
      logger_default.debug("Checking for wildcard email: " + wildcard);
      const [result2] = await db_default.select().from(resourceWhitelist).where(
        and30(
          eq79(resourceWhitelist.resourceId, resourceId),
          eq79(resourceWhitelist.email, wildcard)
        )
      ).leftJoin(
        resources,
        eq79(resources.resourceId, resourceWhitelist.resourceId)
      ).leftJoin(orgs, eq79(orgs.orgId, resources.orgId)).limit(1);
      resource = result2?.resources;
      org = result2?.orgs;
      whitelistedEmail = result2?.resourceWhitelist;
      if (!whitelistedEmail) {
        if (config_default.getRawConfig().app.log_failed_attempts) {
          logger_default.info(
            `Email is not whitelisted. Email: ${email}. IP: ${req.ip}.`
          );
        }
        return next2(
          createHttpError67(
            HttpCode_default.UNAUTHORIZED,
            createHttpError67(
              HttpCode_default.BAD_REQUEST,
              "Email is not whitelisted"
            )
          )
        );
      }
    }
    if (!org) {
      return next2(
        createHttpError67(HttpCode_default.BAD_REQUEST, "Resource does not exist")
      );
    }
    if (!resource) {
      return next2(
        createHttpError67(HttpCode_default.BAD_REQUEST, "Resource does not exist")
      );
    }
    if (otp && email) {
      const isValidCode2 = await isValidOtp(
        email,
        resource.resourceId,
        otp
      );
      if (!isValidCode2) {
        if (config_default.getRawConfig().app.log_failed_attempts) {
          logger_default.info(
            `Resource email otp incorrect. Resource ID: ${resource.resourceId}. Email: ${email}. IP: ${req.ip}.`
          );
        }
        return next2(
          createHttpError67(HttpCode_default.UNAUTHORIZED, "Incorrect OTP")
        );
      }
      await db_default.delete(resourceOtp).where(
        and30(
          eq79(resourceOtp.email, email),
          eq79(resourceOtp.resourceId, resource.resourceId)
        )
      );
    } else if (email) {
      try {
        await sendResourceOtpEmail(
          email,
          resource.resourceId,
          resource.name,
          org.name
        );
        return response_default(res, {
          data: { otpSent: true },
          success: true,
          error: false,
          message: "Sent one-time otp to email address",
          status: HttpCode_default.ACCEPTED
        });
      } catch (e2) {
        logger_default.error(e2);
        return next2(
          createHttpError67(
            HttpCode_default.INTERNAL_SERVER_ERROR,
            "Failed to send one-time otp. Make sure the email address is correct and try again."
          )
        );
      }
    } else {
      return next2(
        createHttpError67(
          HttpCode_default.BAD_REQUEST,
          "Email is required for whitelist authentication"
        )
      );
    }
    const token2 = generateSessionToken();
    await createResourceSession({
      resourceId,
      token: token2,
      whitelistId: whitelistedEmail.whitelistId,
      isRequestToken: true,
      expiresAt: Date.now() + 1e3 * 30,
      // 30 seconds
      sessionLength: 1e3 * 30,
      doNotExtend: true
    });
    return response_default(res, {
      data: {
        session: token2
      },
      success: true,
      error: false,
      message: "Authenticated with resource successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    logger_default.error(e2);
    return next2(
      createHttpError67(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to authenticate with resource"
      )
    );
  }
}

// server/routers/resource/authWithAccessToken.ts
import { eq as eq81 } from "drizzle-orm";
import createHttpError68 from "http-errors";
import { z as z54 } from "zod";
import { fromError as fromError47 } from "zod-validation-error";

// server/auth/verifyResourceAccessToken.ts
import { and as and31, eq as eq80 } from "drizzle-orm";
import { isWithinExpirationDate as isWithinExpirationDate2 } from "oslo";
async function verifyResourceAccessToken({
  resource,
  accessTokenId,
  accessToken
}) {
  const [result] = await db_default.select().from(resourceAccessToken).where(
    and31(
      eq80(resourceAccessToken.resourceId, resource.resourceId),
      eq80(resourceAccessToken.accessTokenId, accessTokenId)
    )
  ).limit(1);
  const tokenItem = result;
  if (!tokenItem) {
    return {
      valid: false,
      error: "Access token does not exist for resource"
    };
  }
  const validCode = await verifyPassword(accessToken, tokenItem.tokenHash);
  if (!validCode) {
    return {
      valid: false,
      error: "Invalid access token"
    };
  }
  if (tokenItem.expiresAt && !isWithinExpirationDate2(new Date(tokenItem.expiresAt))) {
    return {
      valid: false,
      error: "Access token has expired"
    };
  }
  return {
    valid: true,
    tokenItem
  };
}

// server/routers/resource/authWithAccessToken.ts
var authWithAccessTokenBodySchema = z54.object({
  accessToken: z54.string(),
  accessTokenId: z54.string()
}).strict();
var authWithAccessTokenParamsSchema = z54.object({
  resourceId: z54.string().transform(Number).pipe(z54.number().int().positive())
}).strict();
async function authWithAccessToken(req, res, next2) {
  const parsedBody = authWithAccessTokenBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError68(
        HttpCode_default.BAD_REQUEST,
        fromError47(parsedBody.error).toString()
      )
    );
  }
  const parsedParams = authWithAccessTokenParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return next2(
      createHttpError68(
        HttpCode_default.BAD_REQUEST,
        fromError47(parsedParams.error).toString()
      )
    );
  }
  const { resourceId } = parsedParams.data;
  const { accessToken, accessTokenId } = parsedBody.data;
  try {
    const [resource] = await db_default.select().from(resources).where(eq81(resources.resourceId, resourceId)).limit(1);
    if (!resource) {
      return next2(
        createHttpError68(HttpCode_default.NOT_FOUND, "Resource not found")
      );
    }
    const { valid, error, tokenItem } = await verifyResourceAccessToken({
      resource,
      accessTokenId,
      accessToken
    });
    if (!valid) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Resource access token invalid. Resource ID: ${resource.resourceId}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError68(
          HttpCode_default.UNAUTHORIZED,
          error || "Invalid access token"
        )
      );
    }
    if (!tokenItem || !resource) {
      return next2(
        createHttpError68(
          HttpCode_default.UNAUTHORIZED,
          "Access token does not exist for resource"
        )
      );
    }
    const token2 = generateSessionToken();
    await createResourceSession({
      resourceId,
      token: token2,
      accessTokenId: tokenItem.accessTokenId,
      isRequestToken: true,
      expiresAt: Date.now() + 1e3 * 30,
      // 30 seconds
      sessionLength: 1e3 * 30,
      doNotExtend: true
    });
    return response_default(res, {
      data: {
        session: token2
      },
      success: true,
      error: false,
      message: "Authenticated with resource successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    logger_default.error(e2);
    return next2(
      createHttpError68(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to authenticate with resource"
      )
    );
  }
}

// server/routers/resource/transferResource.ts
import { z as z55 } from "zod";
import { eq as eq82 } from "drizzle-orm";
import createHttpError69 from "http-errors";
import { fromError as fromError48 } from "zod-validation-error";
var transferResourceParamsSchema = z55.object({
  resourceId: z55.string().transform(Number).pipe(z55.number().int().positive())
}).strict();
var transferResourceBodySchema = z55.object({
  siteId: z55.number().int().positive()
}).strict();
async function transferResource(req, res, next2) {
  try {
    const parsedParams = transferResourceParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError69(
          HttpCode_default.BAD_REQUEST,
          fromError48(parsedParams.error).toString()
        )
      );
    }
    const parsedBody = transferResourceBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError69(
          HttpCode_default.BAD_REQUEST,
          fromError48(parsedBody.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const { siteId } = parsedBody.data;
    const [oldResource] = await db.select().from(resources).where(eq82(resources.resourceId, resourceId)).limit(1);
    if (!oldResource) {
      return next2(
        createHttpError69(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    if (oldResource.siteId === siteId) {
      return next2(
        createHttpError69(
          HttpCode_default.BAD_REQUEST,
          `Resource is already assigned to this site`
        )
      );
    }
    const [newSite] = await db.select().from(sites).where(eq82(sites.siteId, siteId)).limit(1);
    if (!newSite) {
      return next2(
        createHttpError69(
          HttpCode_default.NOT_FOUND,
          `Site with ID ${siteId} not found`
        )
      );
    }
    const [oldSite] = await db.select().from(sites).where(eq82(sites.siteId, oldResource.siteId)).limit(1);
    if (!oldSite) {
      return next2(
        createHttpError69(
          HttpCode_default.NOT_FOUND,
          `Site with ID ${oldResource.siteId} not found`
        )
      );
    }
    const [updatedResource] = await db.update(resources).set({ siteId }).where(eq82(resources.resourceId, resourceId)).returning();
    if (!updatedResource) {
      return next2(
        createHttpError69(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    const resourceTargets = await db.select().from(targets).where(eq82(targets.resourceId, resourceId));
    if (resourceTargets.length > 0) {
      if (oldSite.pubKey) {
        if (oldSite.type == "wireguard") {
          await addPeer(oldSite.exitNodeId, {
            publicKey: oldSite.pubKey,
            allowedIps: await getAllowedIps(oldSite.siteId)
          });
        } else if (oldSite.type == "newt") {
          const [newt] = await db.select().from(newts).where(eq82(newts.siteId, oldSite.siteId)).limit(1);
          removeTargets(
            newt.newtId,
            resourceTargets,
            updatedResource.protocol
          );
        }
      }
      if (newSite.pubKey) {
        if (newSite.type == "wireguard") {
          await addPeer(newSite.exitNodeId, {
            publicKey: newSite.pubKey,
            allowedIps: await getAllowedIps(newSite.siteId)
          });
        } else if (newSite.type == "newt") {
          const [newt] = await db.select().from(newts).where(eq82(newts.siteId, newSite.siteId)).limit(1);
          addTargets(
            newt.newtId,
            resourceTargets,
            updatedResource.protocol
          );
        }
      }
    }
    return response_default(res, {
      data: updatedResource,
      success: true,
      error: false,
      message: "Resource transferred successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError69(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/getExchangeToken.ts
import { z as z56 } from "zod";
import { eq as eq83 } from "drizzle-orm";
import createHttpError70 from "http-errors";
import { fromError as fromError49 } from "zod-validation-error";
import {
  encodeHexLowerCase as encodeHexLowerCase5
} from "@oslojs/encoding";
import { sha256 as sha2566 } from "@oslojs/crypto/sha2";
var getExchangeTokenParams = z56.object({
  resourceId: z56.string().transform(Number).pipe(z56.number().int().positive())
}).strict();
async function getExchangeToken(req, res, next2) {
  try {
    const parsedParams = getExchangeTokenParams.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError70(
          HttpCode_default.BAD_REQUEST,
          fromError49(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const resource = await db.select().from(resources).where(eq83(resources.resourceId, resourceId)).limit(1);
    if (resource.length === 0) {
      return next2(
        createHttpError70(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    const ssoSession = req.cookies[config_default.getRawConfig().server.session_cookie_name];
    if (!ssoSession) {
      logger_default.debug(ssoSession);
      return next2(
        createHttpError70(
          HttpCode_default.UNAUTHORIZED,
          "Missing SSO session cookie"
        )
      );
    }
    const sessionId = encodeHexLowerCase5(
      sha2566(new TextEncoder().encode(ssoSession))
    );
    const token2 = generateSessionToken();
    await createResourceSession({
      resourceId,
      token: token2,
      userSessionId: sessionId,
      isRequestToken: true,
      expiresAt: Date.now() + 1e3 * 30,
      // 30 seconds
      sessionLength: 1e3 * 30,
      doNotExtend: true
    });
    logger_default.debug("Request token created successfully");
    return response(res, {
      data: {
        requestToken: token2
      },
      success: true,
      error: false,
      message: "Request token created successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError70(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/createResourceRule.ts
import { z as z58 } from "zod";
import { eq as eq84 } from "drizzle-orm";
import createHttpError71 from "http-errors";
import { fromError as fromError50 } from "zod-validation-error";

// server/lib/validators.ts
import z57 from "zod";
function isValidCIDR(cidr) {
  return z57.string().cidr().safeParse(cidr).success;
}
function isValidIP(ip) {
  return z57.string().ip().safeParse(ip).success;
}
function isValidUrlGlobPattern(pattern) {
  pattern = pattern.startsWith("/") ? pattern.slice(1) : pattern;
  if (!pattern) {
    return false;
  }
  const segments = pattern.split("/");
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!segment && i !== segments.length - 1) {
      return false;
    }
    for (let j3 = 0; j3 < segment.length; j3++) {
      const char = segment[j3];
      if (char === "%" && j3 + 2 < segment.length) {
        const hex1 = segment[j3 + 1];
        const hex2 = segment[j3 + 2];
        if (!/^[0-9A-Fa-f]$/.test(hex1) || !/^[0-9A-Fa-f]$/.test(hex2)) {
          return false;
        }
        j3 += 2;
        continue;
      }
      if (!/^[A-Za-z0-9\-._~!$&'()*+,;#=@:]$/.test(char)) {
        return false;
      }
    }
  }
  return true;
}
function isTargetValid(value) {
  if (!value) return true;
  const DOMAIN_REGEX = /^[a-zA-Z0-9_](?:[a-zA-Z0-9-_]{0,61}[a-zA-Z0-9_])?(?:\.[a-zA-Z0-9_](?:[a-zA-Z0-9-_]{0,61}[a-zA-Z0-9_])?)*$/;
  const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const IPV6_REGEX = /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i;
  if (IPV4_REGEX.test(value) || IPV6_REGEX.test(value)) {
    return true;
  }
  return DOMAIN_REGEX.test(value);
}

// server/routers/resource/createResourceRule.ts
var createResourceRuleSchema = z58.object({
  action: z58.enum(["ACCEPT", "DROP"]),
  match: z58.enum(["CIDR", "IP", "PATH"]),
  value: z58.string().min(1),
  priority: z58.number().int(),
  enabled: z58.boolean().optional()
}).strict();
var createResourceRuleParamsSchema = z58.object({
  resourceId: z58.string().transform(Number).pipe(z58.number().int().positive())
}).strict();
async function createResourceRule(req, res, next2) {
  try {
    const parsedBody = createResourceRuleSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError71(
          HttpCode_default.BAD_REQUEST,
          fromError50(parsedBody.error).toString()
        )
      );
    }
    const { action, match, value, priority, enabled } = parsedBody.data;
    const parsedParams = createResourceRuleParamsSchema.safeParse(
      req.params
    );
    if (!parsedParams.success) {
      return next2(
        createHttpError71(
          HttpCode_default.BAD_REQUEST,
          fromError50(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const [resource] = await db.select().from(resources).where(eq84(resources.resourceId, resourceId)).limit(1);
    if (!resource) {
      return next2(
        createHttpError71(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    if (!resource.http) {
      return next2(
        createHttpError71(
          HttpCode_default.BAD_REQUEST,
          "Cannot create rule for non-http resource"
        )
      );
    }
    if (match === "CIDR") {
      if (!isValidCIDR(value)) {
        return next2(
          createHttpError71(
            HttpCode_default.BAD_REQUEST,
            "Invalid CIDR provided"
          )
        );
      }
    } else if (match === "IP") {
      if (!isValidIP(value)) {
        return next2(
          createHttpError71(HttpCode_default.BAD_REQUEST, "Invalid IP provided")
        );
      }
    } else if (match === "PATH") {
      if (!isValidUrlGlobPattern(value)) {
        return next2(
          createHttpError71(
            HttpCode_default.BAD_REQUEST,
            "Invalid URL glob pattern provided"
          )
        );
      }
    }
    const [newRule] = await db.insert(resourceRules).values({
      resourceId,
      action,
      match,
      value,
      priority,
      enabled
    }).returning();
    return response_default(res, {
      data: newRule,
      success: true,
      error: false,
      message: "Resource rule created successfully",
      status: HttpCode_default.CREATED
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError71(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/deleteResourceRule.ts
import { z as z59 } from "zod";
import { eq as eq85 } from "drizzle-orm";
import createHttpError72 from "http-errors";
import { fromError as fromError51 } from "zod-validation-error";
var deleteResourceRuleSchema = z59.object({
  ruleId: z59.string().transform(Number).pipe(z59.number().int().positive()),
  resourceId: z59.string().transform(Number).pipe(z59.number().int().positive())
}).strict();
async function deleteResourceRule(req, res, next2) {
  try {
    const parsedParams = deleteResourceRuleSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError72(
          HttpCode_default.BAD_REQUEST,
          fromError51(parsedParams.error).toString()
        )
      );
    }
    const { ruleId } = parsedParams.data;
    const [deletedRule] = await db.delete(resourceRules).where(eq85(resourceRules.ruleId, ruleId)).returning();
    if (!deletedRule) {
      return next2(
        createHttpError72(
          HttpCode_default.NOT_FOUND,
          `Resource rule with ID ${ruleId} not found`
        )
      );
    }
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Resource rule deleted successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError72(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/listResourceRules.ts
import { eq as eq86, sql as sql6 } from "drizzle-orm";
import createHttpError73 from "http-errors";
import { z as z60 } from "zod";
import { fromError as fromError52 } from "zod-validation-error";
var listResourceRulesParamsSchema = z60.object({
  resourceId: z60.string().transform(Number).pipe(z60.number().int().positive())
}).strict();
var listResourceRulesSchema = z60.object({
  limit: z60.string().optional().default("1000").transform(Number).pipe(z60.number().int().positive()),
  offset: z60.string().optional().default("0").transform(Number).pipe(z60.number().int().nonnegative())
});
function queryResourceRules(resourceId) {
  let baseQuery = db.select({
    ruleId: resourceRules.ruleId,
    resourceId: resourceRules.resourceId,
    action: resourceRules.action,
    match: resourceRules.match,
    value: resourceRules.value,
    priority: resourceRules.priority,
    enabled: resourceRules.enabled
  }).from(resourceRules).leftJoin(resources, eq86(resourceRules.resourceId, resources.resourceId)).where(eq86(resourceRules.resourceId, resourceId));
  return baseQuery;
}
async function listResourceRules(req, res, next2) {
  try {
    const parsedQuery = listResourceRulesSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError73(
          HttpCode_default.BAD_REQUEST,
          fromError52(parsedQuery.error)
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const parsedParams = listResourceRulesParamsSchema.safeParse(
      req.params
    );
    if (!parsedParams.success) {
      return next2(
        createHttpError73(
          HttpCode_default.BAD_REQUEST,
          fromError52(parsedParams.error)
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const [resource] = await db.select().from(resources).where(eq86(resources.resourceId, resourceId)).limit(1);
    if (!resource) {
      return next2(
        createHttpError73(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    const baseQuery = queryResourceRules(resourceId);
    let countQuery = db.select({ count: sql6`cast(count(*) as integer)` }).from(resourceRules).where(eq86(resourceRules.resourceId, resourceId));
    let rulesList = await baseQuery.limit(limit).offset(offset);
    const totalCountResult = await countQuery;
    const totalCount = totalCountResult[0].count;
    rulesList = rulesList.sort((a, b3) => a.priority - b3.priority);
    return response_default(res, {
      data: {
        rules: rulesList,
        pagination: {
          total: totalCount,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Resource rules retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError73(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/resource/updateResourceRule.ts
import { z as z61 } from "zod";
import { eq as eq87 } from "drizzle-orm";
import createHttpError74 from "http-errors";
import { fromError as fromError53 } from "zod-validation-error";
var updateResourceRuleParamsSchema = z61.object({
  ruleId: z61.string().transform(Number).pipe(z61.number().int().positive()),
  resourceId: z61.string().transform(Number).pipe(z61.number().int().positive())
}).strict();
var updateResourceRuleSchema = z61.object({
  action: z61.enum(["ACCEPT", "DROP"]).optional(),
  match: z61.enum(["CIDR", "IP", "PATH"]).optional(),
  value: z61.string().min(1).optional(),
  priority: z61.number().int(),
  enabled: z61.boolean().optional()
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});
async function updateResourceRule(req, res, next2) {
  try {
    const parsedParams = updateResourceRuleParamsSchema.safeParse(
      req.params
    );
    if (!parsedParams.success) {
      return next2(
        createHttpError74(
          HttpCode_default.BAD_REQUEST,
          fromError53(parsedParams.error).toString()
        )
      );
    }
    const parsedBody = updateResourceRuleSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError74(
          HttpCode_default.BAD_REQUEST,
          fromError53(parsedBody.error).toString()
        )
      );
    }
    const { ruleId, resourceId } = parsedParams.data;
    const updateData = parsedBody.data;
    const [resource] = await db.select().from(resources).where(eq87(resources.resourceId, resourceId)).limit(1);
    if (!resource) {
      return next2(
        createHttpError74(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    if (!resource.http) {
      return next2(
        createHttpError74(
          HttpCode_default.BAD_REQUEST,
          "Cannot create rule for non-http resource"
        )
      );
    }
    const [existingRule] = await db.select().from(resourceRules).where(eq87(resourceRules.ruleId, ruleId)).limit(1);
    if (!existingRule) {
      return next2(
        createHttpError74(
          HttpCode_default.NOT_FOUND,
          `Resource rule with ID ${ruleId} not found`
        )
      );
    }
    if (existingRule.resourceId !== resourceId) {
      return next2(
        createHttpError74(
          HttpCode_default.FORBIDDEN,
          `Resource rule ${ruleId} does not belong to resource ${resourceId}`
        )
      );
    }
    const match = updateData.match || existingRule.match;
    const { value } = updateData;
    if (value !== void 0) {
      if (match === "CIDR") {
        if (!isValidCIDR(value)) {
          return next2(
            createHttpError74(
              HttpCode_default.BAD_REQUEST,
              "Invalid CIDR provided"
            )
          );
        }
      } else if (match === "IP") {
        if (!isValidIP(value)) {
          return next2(
            createHttpError74(
              HttpCode_default.BAD_REQUEST,
              "Invalid IP provided"
            )
          );
        }
      } else if (match === "PATH") {
        if (!isValidUrlGlobPattern(value)) {
          return next2(
            createHttpError74(
              HttpCode_default.BAD_REQUEST,
              "Invalid URL glob pattern provided"
            )
          );
        }
      }
    }
    const [updatedRule] = await db.update(resourceRules).set(updateData).where(eq87(resourceRules.ruleId, ruleId)).returning();
    return response_default(res, {
      data: updatedRule,
      success: true,
      error: false,
      message: "Resource rule updated successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError74(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/domain/listDomains.ts
import { z as z62 } from "zod";
import createHttpError75 from "http-errors";
import { eq as eq88, sql as sql7 } from "drizzle-orm";
import { fromError as fromError54 } from "zod-validation-error";
var listDomainsParamsSchema = z62.object({
  orgId: z62.string()
}).strict();
var listDomainsSchema = z62.object({
  limit: z62.string().optional().default("1000").transform(Number).pipe(z62.number().int().nonnegative()),
  offset: z62.string().optional().default("0").transform(Number).pipe(z62.number().int().nonnegative())
}).strict();
async function queryDomains(orgId, limit, offset) {
  const res = await db.select({
    domainId: domains.domainId,
    baseDomain: domains.baseDomain
  }).from(orgDomains).where(eq88(orgDomains.orgId, orgId)).innerJoin(domains, eq88(domains.domainId, orgDomains.domainId)).limit(limit).offset(offset);
  return res;
}
async function listDomains(req, res, next2) {
  try {
    const parsedQuery = listDomainsSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError75(
          HttpCode_default.BAD_REQUEST,
          fromError54(parsedQuery.error).toString()
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const parsedParams = listDomainsParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError75(
          HttpCode_default.BAD_REQUEST,
          fromError54(parsedParams.error).toString()
        )
      );
    }
    const { orgId } = parsedParams.data;
    const domains2 = await queryDomains(orgId.toString(), limit, offset);
    const [{ count: count7 }] = await db.select({ count: sql7`count(*)` }).from(users);
    return response_default(res, {
      data: {
        domains: domains2,
        pagination: {
          total: count7,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Users retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError75(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/target/getTarget.ts
import { z as z63 } from "zod";
import { eq as eq89 } from "drizzle-orm";
import createHttpError76 from "http-errors";
import { fromError as fromError55 } from "zod-validation-error";
var getTargetSchema = z63.object({
  targetId: z63.string().transform(Number).pipe(z63.number().int().positive())
}).strict();
async function getTarget(req, res, next2) {
  try {
    const parsedParams = getTargetSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError76(
          HttpCode_default.BAD_REQUEST,
          fromError55(parsedParams.error).toString()
        )
      );
    }
    const { targetId } = parsedParams.data;
    const target = await db.select().from(targets).where(eq89(targets.targetId, targetId)).limit(1);
    if (target.length === 0) {
      return next2(
        createHttpError76(
          HttpCode_default.NOT_FOUND,
          `Target with ID ${targetId} not found`
        )
      );
    }
    return response_default(res, {
      data: target[0],
      success: true,
      error: false,
      message: "Target retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError76(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/target/createTarget.ts
import { z as z64 } from "zod";
import createHttpError77 from "http-errors";
import { fromError as fromError56 } from "zod-validation-error";
import { eq as eq90 } from "drizzle-orm";
var createTargetParamsSchema = z64.object({
  resourceId: z64.string().transform(Number).pipe(z64.number().int().positive())
}).strict();
var createTargetSchema = z64.object({
  ip: z64.string().refine(isTargetValid),
  method: z64.string().optional().nullable(),
  port: z64.number().int().min(1).max(65535),
  enabled: z64.boolean().default(true)
}).strict();
async function createTarget(req, res, next2) {
  try {
    const parsedBody = createTargetSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError77(
          HttpCode_default.BAD_REQUEST,
          fromError56(parsedBody.error).toString()
        )
      );
    }
    const targetData = parsedBody.data;
    const parsedParams = createTargetParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError77(
          HttpCode_default.BAD_REQUEST,
          fromError56(parsedParams.error).toString()
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const [resource] = await db.select().from(resources).where(eq90(resources.resourceId, resourceId));
    if (!resource) {
      return next2(
        createHttpError77(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${resourceId} not found`
        )
      );
    }
    const [site] = await db.select().from(sites).where(eq90(sites.siteId, resource.siteId)).limit(1);
    if (!site) {
      return next2(
        createHttpError77(
          HttpCode_default.NOT_FOUND,
          `Site with ID ${resource.siteId} not found`
        )
      );
    }
    let newTarget = [];
    if (site.type == "local") {
      newTarget = await db.insert(targets).values({
        resourceId,
        ...targetData
      }).returning();
    } else {
      if (site.type == "wireguard" && !isIpInCidr(targetData.ip, site.subnet)) {
        return next2(
          createHttpError77(
            HttpCode_default.BAD_REQUEST,
            `Target IP is not within the site subnet`
          )
        );
      }
      const { internalPort: internalPort2, targetIps } = await pickPort(site.siteId);
      if (!internalPort2) {
        return next2(
          createHttpError77(
            HttpCode_default.BAD_REQUEST,
            `No available internal port`
          )
        );
      }
      newTarget = await db.insert(targets).values({
        resourceId,
        internalPort: internalPort2,
        ...targetData
      }).returning();
      targetIps.push(`${targetData.ip}/32`);
      if (site.pubKey) {
        if (site.type == "wireguard") {
          await addPeer(site.exitNodeId, {
            publicKey: site.pubKey,
            allowedIps: targetIps.flat()
          });
        } else if (site.type == "newt") {
          const [newt] = await db.select().from(newts).where(eq90(newts.siteId, site.siteId)).limit(1);
          addTargets(newt.newtId, newTarget, resource.protocol);
        }
      }
    }
    return response_default(res, {
      data: newTarget[0],
      success: true,
      error: false,
      message: "Target created successfully",
      status: HttpCode_default.CREATED
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError77(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/target/deleteTarget.ts
import { z as z65 } from "zod";
import { eq as eq91 } from "drizzle-orm";
import createHttpError78 from "http-errors";
import { fromError as fromError57 } from "zod-validation-error";
var deleteTargetSchema = z65.object({
  targetId: z65.string().transform(Number).pipe(z65.number().int().positive())
}).strict();
async function deleteTarget(req, res, next2) {
  try {
    const parsedParams = deleteTargetSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError78(
          HttpCode_default.BAD_REQUEST,
          fromError57(parsedParams.error).toString()
        )
      );
    }
    const { targetId } = parsedParams.data;
    const [deletedTarget] = await db.delete(targets).where(eq91(targets.targetId, targetId)).returning();
    if (!deletedTarget) {
      return next2(
        createHttpError78(
          HttpCode_default.NOT_FOUND,
          `Target with ID ${targetId} not found`
        )
      );
    }
    const [resource] = await db.select().from(resources).where(eq91(resources.resourceId, deletedTarget.resourceId));
    if (!resource) {
      return next2(
        createHttpError78(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${deletedTarget.resourceId} not found`
        )
      );
    }
    const [site] = await db.select().from(sites).where(eq91(sites.siteId, resource.siteId)).limit(1);
    if (!site) {
      return next2(
        createHttpError78(
          HttpCode_default.NOT_FOUND,
          `Site with ID ${resource.siteId} not found`
        )
      );
    }
    if (site.pubKey) {
      if (site.type == "wireguard") {
        await addPeer(site.exitNodeId, {
          publicKey: site.pubKey,
          allowedIps: await getAllowedIps(site.siteId)
        });
      } else if (site.type == "newt") {
        const [newt] = await db.select().from(newts).where(eq91(newts.siteId, site.siteId)).limit(1);
        removeTargets(newt.newtId, [deletedTarget], resource.protocol);
      }
    }
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Target deleted successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError78(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/target/updateTarget.ts
import { z as z66 } from "zod";
import { eq as eq92 } from "drizzle-orm";
import createHttpError79 from "http-errors";
import { fromError as fromError58 } from "zod-validation-error";
var updateTargetParamsSchema = z66.object({
  targetId: z66.string().transform(Number).pipe(z66.number().int().positive())
}).strict();
var updateTargetBodySchema = z66.object({
  ip: z66.string().refine(isTargetValid),
  method: z66.string().min(1).max(10).optional().nullable(),
  port: z66.number().int().min(1).max(65535).optional(),
  enabled: z66.boolean().optional()
}).strict().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided for update"
});
async function updateTarget(req, res, next2) {
  try {
    const parsedParams = updateTargetParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError79(
          HttpCode_default.BAD_REQUEST,
          fromError58(parsedParams.error).toString()
        )
      );
    }
    const parsedBody = updateTargetBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError79(
          HttpCode_default.BAD_REQUEST,
          fromError58(parsedBody.error).toString()
        )
      );
    }
    const { targetId } = parsedParams.data;
    const [target] = await db.select().from(targets).where(eq92(targets.targetId, targetId)).limit(1);
    if (!target) {
      return next2(
        createHttpError79(
          HttpCode_default.NOT_FOUND,
          `Target with ID ${targetId} not found`
        )
      );
    }
    const [resource] = await db.select().from(resources).where(eq92(resources.resourceId, target.resourceId));
    if (!resource) {
      return next2(
        createHttpError79(
          HttpCode_default.NOT_FOUND,
          `Resource with ID ${target.resourceId} not found`
        )
      );
    }
    const [site] = await db.select().from(sites).where(eq92(sites.siteId, resource.siteId)).limit(1);
    if (!site) {
      return next2(
        createHttpError79(
          HttpCode_default.NOT_FOUND,
          `Site with ID ${resource.siteId} not found`
        )
      );
    }
    const { internalPort: internalPort2, targetIps } = await pickPort(site.siteId);
    if (!internalPort2) {
      return next2(
        createHttpError79(
          HttpCode_default.BAD_REQUEST,
          `No available internal port`
        )
      );
    }
    const [updatedTarget] = await db.update(targets).set({
      ...parsedBody.data,
      internalPort: internalPort2
    }).where(eq92(targets.targetId, targetId)).returning();
    if (site.pubKey) {
      if (site.type == "wireguard") {
        await addPeer(site.exitNodeId, {
          publicKey: site.pubKey,
          allowedIps: targetIps.flat()
        });
      } else if (site.type == "newt") {
        const [newt] = await db.select().from(newts).where(eq92(newts.siteId, site.siteId)).limit(1);
        addTargets(newt.newtId, [updatedTarget], resource.protocol);
      }
    }
    return response_default(res, {
      data: updatedTarget,
      success: true,
      error: false,
      message: "Target updated successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError79(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/target/listTargets.ts
import { eq as eq93, sql as sql8 } from "drizzle-orm";
import createHttpError80 from "http-errors";
import { z as z67 } from "zod";
import { fromError as fromError59 } from "zod-validation-error";
var listTargetsParamsSchema = z67.object({
  resourceId: z67.string().transform(Number).pipe(z67.number().int().positive())
}).strict();
var listTargetsSchema = z67.object({
  limit: z67.string().optional().default("1000").transform(Number).pipe(z67.number().int().positive()),
  offset: z67.string().optional().default("0").transform(Number).pipe(z67.number().int().nonnegative())
});
function queryTargets(resourceId) {
  let baseQuery = db.select({
    targetId: targets.targetId,
    ip: targets.ip,
    method: targets.method,
    port: targets.port,
    enabled: targets.enabled,
    resourceId: targets.resourceId
    // resourceName: resources.name,
  }).from(targets).where(eq93(targets.resourceId, resourceId));
  return baseQuery;
}
async function listTargets(req, res, next2) {
  try {
    const parsedQuery = listTargetsSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError80(
          HttpCode_default.BAD_REQUEST,
          fromError59(parsedQuery.error)
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const parsedParams = listTargetsParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError80(
          HttpCode_default.BAD_REQUEST,
          fromError59(parsedParams.error)
        )
      );
    }
    const { resourceId } = parsedParams.data;
    const baseQuery = queryTargets(resourceId);
    let countQuery = db.select({ count: sql8`cast(count(*) as integer)` }).from(targets).where(eq93(targets.resourceId, resourceId));
    const targetsList = await baseQuery.limit(limit).offset(offset);
    const totalCountResult = await countQuery;
    const totalCount = totalCountResult[0].count;
    return response_default(res, {
      data: {
        targets: targetsList,
        pagination: {
          total: totalCount,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Targets retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError80(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/user/getUser.ts
import { eq as eq94 } from "drizzle-orm";
import createHttpError81 from "http-errors";
async function queryUser(userId) {
  const [user] = await db.select({
    userId: users.userId,
    email: users.email,
    twoFactorEnabled: users.twoFactorEnabled,
    emailVerified: users.emailVerified,
    serverAdmin: users.serverAdmin
  }).from(users).where(eq94(users.userId, userId)).limit(1);
  return user;
}
async function getUser(req, res, next2) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return next2(
        createHttpError81(HttpCode_default.UNAUTHORIZED, "User not found")
      );
    }
    const user = await queryUser(userId);
    if (!user) {
      return next2(
        createHttpError81(
          HttpCode_default.NOT_FOUND,
          `User with ID ${userId} not found`
        )
      );
    }
    return response_default(res, {
      data: user,
      success: true,
      error: false,
      message: "User retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError81(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/user/removeUserOrg.ts
import { z as z68 } from "zod";
import { and as and32, eq as eq95 } from "drizzle-orm";
import createHttpError82 from "http-errors";
import { fromError as fromError60 } from "zod-validation-error";
var removeUserSchema = z68.object({
  userId: z68.string(),
  orgId: z68.string()
}).strict();
async function removeUserOrg(req, res, next2) {
  try {
    const parsedParams = removeUserSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError82(
          HttpCode_default.BAD_REQUEST,
          fromError60(parsedParams.error).toString()
        )
      );
    }
    const { userId, orgId } = parsedParams.data;
    const user = await db.select().from(userOrgs).where(eq95(userOrgs.userId, userId));
    if (!user || user.length === 0) {
      return next2(createHttpError82(HttpCode_default.NOT_FOUND, "User not found"));
    }
    if (user[0].isOwner) {
      return next2(
        createHttpError82(
          HttpCode_default.BAD_REQUEST,
          "Cannot remove owner from org"
        )
      );
    }
    await db.transaction(async (trx) => {
      await trx.delete(userOrgs).where(
        and32(eq95(userOrgs.userId, userId), eq95(userOrgs.orgId, orgId))
      );
      await trx.delete(userResources).where(eq95(userResources.userId, userId));
      await trx.delete(userSites).where(eq95(userSites.userId, userId));
    });
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "User removed from org successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError82(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/user/listUsers.ts
import { z as z69 } from "zod";
import createHttpError83 from "http-errors";
import { sql as sql9 } from "drizzle-orm";
var listUsersParamsSchema = z69.object({
  orgId: z69.string()
}).strict();
var listUsersSchema = z69.object({
  limit: z69.string().optional().default("1000").transform(Number).pipe(z69.number().int().nonnegative()),
  offset: z69.string().optional().default("0").transform(Number).pipe(z69.number().int().nonnegative())
}).strict();
async function queryUsers2(orgId, limit, offset) {
  return await db.select({
    id: users.userId,
    email: users.email,
    emailVerified: users.emailVerified,
    dateCreated: users.dateCreated,
    orgId: userOrgs.orgId,
    roleId: userOrgs.roleId,
    roleName: roles.name,
    isOwner: userOrgs.isOwner
  }).from(users).leftJoin(userOrgs, sql9`${users.userId} = ${userOrgs.userId}`).leftJoin(roles, sql9`${userOrgs.roleId} = ${roles.roleId}`).where(sql9`${userOrgs.orgId} = ${orgId}`).limit(limit).offset(offset);
}
async function listUsers(req, res, next2) {
  try {
    const parsedQuery = listUsersSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError83(
          HttpCode_default.BAD_REQUEST,
          parsedQuery.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const parsedParams = listUsersParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError83(
          HttpCode_default.BAD_REQUEST,
          parsedParams.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { orgId } = parsedParams.data;
    const usersWithRoles = await queryUsers2(
      orgId.toString(),
      limit,
      offset
    );
    const [{ count: count7 }] = await db.select({ count: sql9`count(*)` }).from(users);
    return response_default(res, {
      data: {
        users: usersWithRoles,
        pagination: {
          total: count7,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Users retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError83(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/user/addUserRole.ts
import { z as z70 } from "zod";
import { eq as eq96, and as and33 } from "drizzle-orm";
import createHttpError84 from "http-errors";
import { fromError as fromError61 } from "zod-validation-error";
var addUserRoleParamsSchema = z70.object({
  userId: z70.string(),
  roleId: z70.string().transform(stoi).pipe(z70.number())
}).strict();
async function addUserRole(req, res, next2) {
  try {
    const parsedParams = addUserRoleParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError84(
          HttpCode_default.BAD_REQUEST,
          fromError61(parsedParams.error).toString()
        )
      );
    }
    const { userId, roleId } = parsedParams.data;
    if (!req.userOrg) {
      return next2(
        createHttpError84(
          HttpCode_default.FORBIDDEN,
          "You do not have access to this organization"
        )
      );
    }
    const orgId = req.userOrg.orgId;
    const existingUser = await db.select().from(userOrgs).where(and33(eq96(userOrgs.userId, userId), eq96(userOrgs.orgId, orgId))).limit(1);
    if (existingUser.length === 0) {
      return next2(
        createHttpError84(
          HttpCode_default.NOT_FOUND,
          "User not found or does not belong to the specified organization"
        )
      );
    }
    if (existingUser[0].isOwner) {
      return next2(
        createHttpError84(
          HttpCode_default.FORBIDDEN,
          "Cannot change the role of the owner of the organization"
        )
      );
    }
    const roleExists = await db.select().from(roles).where(and33(eq96(roles.roleId, roleId), eq96(roles.orgId, orgId))).limit(1);
    if (roleExists.length === 0) {
      return next2(
        createHttpError84(
          HttpCode_default.NOT_FOUND,
          "Role not found or does not belong to the specified organization"
        )
      );
    }
    const newUserRole = await db.update(userOrgs).set({ roleId }).where(and33(eq96(userOrgs.userId, userId), eq96(userOrgs.orgId, orgId))).returning();
    return response_default(res, {
      data: newUserRole[0],
      success: true,
      error: false,
      message: "Role added to user successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError84(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/user/inviteUser.ts
import { z as z71 } from "zod";
import { and as and34, eq as eq97 } from "drizzle-orm";
import createHttpError85 from "http-errors";
import { alphabet as alphabet2, generateRandomString as generateRandomString3 } from "oslo/crypto";
import { createDate as createDate2, TimeSpan as TimeSpan2 } from "oslo";
import { fromError as fromError62 } from "zod-validation-error";

// server/emails/templates/SendInviteLink.tsx
import {
  Body as Body2,
  Head as Head2,
  Html as Html2,
  Preview as Preview2,
  Tailwind as Tailwind2
} from "@react-email/components";
import * as React5 from "react";

// server/emails/templates/components/ButtonLink.tsx
import React4 from "react";
function ButtonLink({
  href,
  children,
  className = ""
}) {
  return /* @__PURE__ */ React4.createElement(
    "a",
    {
      href,
      className: `rounded-full bg-primary px-4 py-2 text-center font-semibold text-white text-xl no-underline inline-block ${className}`
    },
    children
  );
}

// server/emails/templates/SendInviteLink.tsx
var SendInviteLink = ({
  email,
  inviteLink,
  orgName,
  inviterName,
  expiresInDays
}) => {
  const previewText = `${inviterName} invited you to join ${orgName}`;
  return /* @__PURE__ */ React5.createElement(Html2, null, /* @__PURE__ */ React5.createElement(Head2, null), /* @__PURE__ */ React5.createElement(Preview2, null, previewText), /* @__PURE__ */ React5.createElement(Tailwind2, { config: themeColors }, /* @__PURE__ */ React5.createElement(Body2, { className: "font-sans" }, /* @__PURE__ */ React5.createElement(EmailContainer, null, /* @__PURE__ */ React5.createElement(EmailLetterHead, null), /* @__PURE__ */ React5.createElement(EmailHeading, null, "Invited to Join ", orgName), /* @__PURE__ */ React5.createElement(EmailGreeting, null, "Hi ", email || "there", ","), /* @__PURE__ */ React5.createElement(EmailText, null, "You\u2019ve been invited to join the organization", " ", /* @__PURE__ */ React5.createElement("strong", null, orgName), inviterName ? ` by ${inviterName}.` : ".", " Please access the link below to accept the invite."), /* @__PURE__ */ React5.createElement(EmailText, null, "This invite will expire in", " ", /* @__PURE__ */ React5.createElement("strong", null, expiresInDays, " ", expiresInDays === "1" ? "day" : "days", ".")), /* @__PURE__ */ React5.createElement(EmailSection, null, /* @__PURE__ */ React5.createElement(ButtonLink, { href: inviteLink }, "Accept Invite to ", orgName)), /* @__PURE__ */ React5.createElement(EmailFooter, null, /* @__PURE__ */ React5.createElement(EmailSignature, null))))));
};
var SendInviteLink_default = SendInviteLink;

// server/routers/user/inviteUser.ts
var inviteUserParamsSchema = z71.object({
  orgId: z71.string()
}).strict();
var inviteUserBodySchema = z71.object({
  email: z71.string().email().transform((v2) => v2.toLowerCase()),
  roleId: z71.number(),
  validHours: z71.number().gt(0).lte(168),
  sendEmail: z71.boolean().optional()
}).strict();
var inviteTracker = {};
async function inviteUser(req, res, next2) {
  try {
    const parsedParams = inviteUserParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError85(
          HttpCode_default.BAD_REQUEST,
          fromError62(parsedParams.error).toString()
        )
      );
    }
    const parsedBody = inviteUserBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError85(
          HttpCode_default.BAD_REQUEST,
          fromError62(parsedBody.error).toString()
        )
      );
    }
    const { orgId } = parsedParams.data;
    const {
      email,
      validHours,
      roleId,
      sendEmail: doEmail
    } = parsedBody.data;
    const currentTime = Date.now();
    const oneHourAgo = currentTime - 36e5;
    if (!inviteTracker[email]) {
      inviteTracker[email] = { timestamps: [] };
    }
    inviteTracker[email].timestamps = inviteTracker[email].timestamps.filter((timestamp) => timestamp > oneHourAgo);
    if (inviteTracker[email].timestamps.length >= 3) {
      return next2(
        createHttpError85(
          HttpCode_default.TOO_MANY_REQUESTS,
          "User has already been invited 3 times in the last hour"
        )
      );
    }
    inviteTracker[email].timestamps.push(currentTime);
    const org = await db.select().from(orgs).where(eq97(orgs.orgId, orgId)).limit(1);
    if (!org.length) {
      return next2(
        createHttpError85(HttpCode_default.NOT_FOUND, "Organization not found")
      );
    }
    const existingUser = await db.select().from(users).innerJoin(userOrgs, eq97(users.userId, userOrgs.userId)).where(eq97(users.email, email)).limit(1);
    if (existingUser.length && existingUser[0].userOrgs?.orgId === orgId) {
      return next2(
        createHttpError85(
          HttpCode_default.BAD_REQUEST,
          "User is already a member of this organization"
        )
      );
    }
    const inviteId = generateRandomString3(
      10,
      alphabet2("a-z", "A-Z", "0-9")
    );
    const token2 = generateRandomString3(32, alphabet2("a-z", "A-Z", "0-9"));
    const expiresAt = createDate2(new TimeSpan2(validHours, "h")).getTime();
    const tokenHash = await hashPassword(token2);
    await db.transaction(async (trx) => {
      await trx.delete(userInvites).where(
        and34(
          eq97(userInvites.email, email),
          eq97(userInvites.orgId, orgId)
        )
      ).execute();
      await trx.insert(userInvites).values({
        inviteId,
        orgId,
        email,
        expiresAt,
        tokenHash,
        roleId
      });
    });
    const inviteLink = `${config_default.getRawConfig().app.dashboard_url}/invite?token=${inviteId}-${token2}`;
    if (doEmail) {
      await sendEmail(
        SendInviteLink_default({
          email,
          inviteLink,
          expiresInDays: (validHours / 24).toString(),
          orgName: org[0].name || orgId,
          inviterName: req.user?.email
        }),
        {
          to: email,
          from: config_default.getNoReplyEmail(),
          subject: "You're invited to join a Fossorial organization"
        }
      );
    }
    return response_default(res, {
      data: {
        inviteLink,
        expiresAt
      },
      success: true,
      error: false,
      message: "User invited successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError85(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/user/acceptInvite.ts
import { z as z72 } from "zod";
import { eq as eq99 } from "drizzle-orm";
import createHttpError86 from "http-errors";
import { fromError as fromError63 } from "zod-validation-error";

// server/auth/checkValidInvite.ts
import { isWithinExpirationDate as isWithinExpirationDate3 } from "oslo";
import { eq as eq98 } from "drizzle-orm";
async function checkValidInvite({
  inviteId,
  token: token2
}) {
  const existingInvite = await db_default.select().from(userInvites).where(eq98(userInvites.inviteId, inviteId)).limit(1);
  if (!existingInvite.length) {
    return {
      error: "Invite ID or token is invalid"
    };
  }
  if (!isWithinExpirationDate3(new Date(existingInvite[0].expiresAt))) {
    return {
      error: "Invite has expired"
    };
  }
  const validToken = await verifyPassword(token2, existingInvite[0].tokenHash);
  if (!validToken) {
    return {
      error: "Invite ID or token is invalid"
    };
  }
  return {
    existingInvite: existingInvite[0]
  };
}

// server/routers/user/acceptInvite.ts
var acceptInviteBodySchema = z72.object({
  token: z72.string(),
  inviteId: z72.string()
}).strict();
async function acceptInvite(req, res, next2) {
  try {
    const parsedBody = acceptInviteBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError86(
          HttpCode_default.BAD_REQUEST,
          fromError63(parsedBody.error).toString()
        )
      );
    }
    const { token: token2, inviteId } = parsedBody.data;
    const { error, existingInvite } = await checkValidInvite({
      token: token2,
      inviteId
    });
    if (error) {
      return next2(createHttpError86(HttpCode_default.BAD_REQUEST, error));
    }
    if (!existingInvite) {
      return next2(
        createHttpError86(HttpCode_default.BAD_REQUEST, "Invite does not exist")
      );
    }
    const existingUser = await db.select().from(users).where(eq99(users.email, existingInvite.email)).limit(1);
    if (!existingUser.length) {
      return next2(
        createHttpError86(
          HttpCode_default.BAD_REQUEST,
          "User does not exist. Please create an account first."
        )
      );
    }
    const { user, session } = await verifySession(req);
    if (!user) {
      return next2(
        createHttpError86(
          HttpCode_default.UNAUTHORIZED,
          "You must be logged in to accept an invite"
        )
      );
    }
    if (user && user.email !== existingInvite.email) {
      return next2(
        createHttpError86(
          HttpCode_default.BAD_REQUEST,
          "Invite is not for this user"
        )
      );
    }
    let roleId;
    const existingRole = await db.select().from(roles).where(eq99(roles.roleId, existingInvite.roleId)).limit(1);
    if (existingRole.length) {
      roleId = existingRole[0].roleId;
    } else {
      return next2(
        createHttpError86(
          HttpCode_default.BAD_REQUEST,
          "Role does not exist. Please contact an admin."
        )
      );
    }
    await db.transaction(async (trx) => {
      await trx.insert(userOrgs).values({
        userId: existingUser[0].userId,
        orgId: existingInvite.orgId,
        roleId: existingInvite.roleId
      });
      await trx.delete(userInvites).where(eq99(userInvites.inviteId, inviteId));
    });
    return response_default(res, {
      data: { accepted: true, orgId: existingInvite.orgId },
      success: true,
      error: false,
      message: "Invite accepted",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError86(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/user/getOrgUser.ts
import { z as z73 } from "zod";
import { and as and35, eq as eq100 } from "drizzle-orm";
import createHttpError87 from "http-errors";
import { fromError as fromError64 } from "zod-validation-error";
async function queryUser2(orgId, userId) {
  const [user] = await db.select({
    orgId: userOrgs.orgId,
    userId: users.userId,
    email: users.email,
    roleId: userOrgs.roleId,
    roleName: roles.name,
    isOwner: userOrgs.isOwner,
    isAdmin: roles.isAdmin
  }).from(userOrgs).leftJoin(roles, eq100(userOrgs.roleId, roles.roleId)).leftJoin(users, eq100(userOrgs.userId, users.userId)).where(and35(eq100(userOrgs.userId, userId), eq100(userOrgs.orgId, orgId))).limit(1);
  return user;
}
var getOrgUserParamsSchema = z73.object({
  userId: z73.string(),
  orgId: z73.string()
}).strict();
async function getOrgUser(req, res, next2) {
  try {
    const parsedParams = getOrgUserParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError87(
          HttpCode_default.BAD_REQUEST,
          fromError64(parsedParams.error).toString()
        )
      );
    }
    const { orgId, userId } = parsedParams.data;
    if (!req.userOrg) {
      return next2(
        createHttpError87(
          HttpCode_default.FORBIDDEN,
          "You do not have access to this organization"
        )
      );
    }
    let user;
    user = await queryUser2(orgId, userId);
    if (!user) {
      const [fullUser] = await db.select().from(users).where(eq100(users.email, userId)).limit(1);
      if (fullUser) {
        user = await queryUser2(orgId, fullUser.userId);
      }
    }
    if (!user) {
      return next2(
        createHttpError87(
          HttpCode_default.NOT_FOUND,
          `User with ID ${userId} not found in org`
        )
      );
    }
    if (user.userId !== req.userOrg.userId) {
      const hasPermission = await checkUserActionPermission(
        "getOrgUser" /* getOrgUser */,
        req
      );
      if (!hasPermission) {
        return next2(
          createHttpError87(
            HttpCode_default.FORBIDDEN,
            "User does not have permission perform this action"
          )
        );
      }
    }
    return response_default(res, {
      data: user,
      success: true,
      error: false,
      message: "User retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError87(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/user/adminListUsers.ts
import { z as z74 } from "zod";
import createHttpError88 from "http-errors";
import { sql as sql10, eq as eq101 } from "drizzle-orm";
var listUsersSchema2 = z74.object({
  limit: z74.string().optional().default("1000").transform(Number).pipe(z74.number().int().nonnegative()),
  offset: z74.string().optional().default("0").transform(Number).pipe(z74.number().int().nonnegative())
}).strict();
async function queryUsers3(limit, offset) {
  return await db.select({
    id: users.userId,
    email: users.email,
    dateCreated: users.dateCreated
  }).from(users).where(eq101(users.serverAdmin, false)).limit(limit).offset(offset);
}
async function adminListUsers(req, res, next2) {
  try {
    const parsedQuery = listUsersSchema2.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError88(
          HttpCode_default.BAD_REQUEST,
          parsedQuery.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const allUsers = await queryUsers3(
      limit,
      offset
    );
    const [{ count: count7 }] = await db.select({ count: sql10`count(*)` }).from(users);
    return response_default(res, {
      data: {
        users: allUsers,
        pagination: {
          total: count7,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Users retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError88(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/user/adminRemoveUser.ts
import { z as z75 } from "zod";
import { eq as eq102 } from "drizzle-orm";
import createHttpError89 from "http-errors";
import { fromError as fromError65 } from "zod-validation-error";
var removeUserSchema2 = z75.object({
  userId: z75.string()
}).strict();
async function adminRemoveUser(req, res, next2) {
  try {
    const parsedParams = removeUserSchema2.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError89(
          HttpCode_default.BAD_REQUEST,
          fromError65(parsedParams.error).toString()
        )
      );
    }
    const { userId } = parsedParams.data;
    const user = await db.select().from(userOrgs).where(eq102(userOrgs.userId, userId));
    if (!user || user.length === 0) {
      return next2(createHttpError89(HttpCode_default.NOT_FOUND, "User not found"));
    }
    await db.delete(users).where(eq102(users.userId, userId));
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "User removed successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError89(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/auth/login.ts
import { eq as eq104 } from "drizzle-orm";
import createHttpError90 from "http-errors";
import { z as z76 } from "zod";
import { fromError as fromError66 } from "zod-validation-error";

// server/auth/totp.ts
import { eq as eq103 } from "drizzle-orm";
import { decodeHex } from "oslo/encoding";
import { TOTPController } from "oslo/otp";
async function verifyTotpCode(code, secret, userId) {
  const isTotp = /^\d+$/.test(code);
  if (!isTotp) {
    const validBackupCode = await verifyBackUpCode(code, userId);
    return validBackupCode;
  } else {
    const validOTP = await new TOTPController().verify(
      code,
      decodeHex(secret)
    );
    return validOTP;
  }
}
async function verifyBackUpCode(code, userId) {
  const allHashed = await db_default.select().from(twoFactorBackupCodes).where(eq103(twoFactorBackupCodes.userId, userId));
  if (!allHashed || !allHashed.length) {
    return false;
  }
  let validId;
  for (const hashedCode of allHashed) {
    const validCode = await verifyPassword(code, hashedCode.codeHash);
    if (validCode) {
      validId = hashedCode.codeId;
    }
  }
  if (validId) {
    await db_default.delete(twoFactorBackupCodes).where(eq103(twoFactorBackupCodes.codeId, validId));
  }
  return validId ? true : false;
}

// server/routers/auth/login.ts
var loginBodySchema = z76.object({
  email: z76.string().email().transform((v2) => v2.toLowerCase()),
  password: z76.string(),
  code: z76.string().optional()
}).strict();
async function login(req, res, next2) {
  const parsedBody = loginBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError90(
        HttpCode_default.BAD_REQUEST,
        fromError66(parsedBody.error).toString()
      )
    );
  }
  const { email, password, code } = parsedBody.data;
  try {
    const { session: existingSession } = await verifySession(req);
    if (existingSession) {
      return response_default(res, {
        data: null,
        success: true,
        error: false,
        message: "Already logged in",
        status: HttpCode_default.OK
      });
    }
    const existingUserRes = await db_default.select().from(users).where(eq104(users.email, email));
    if (!existingUserRes || !existingUserRes.length) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Username or password incorrect. Email: ${email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError90(
          HttpCode_default.UNAUTHORIZED,
          "Username or password is incorrect"
        )
      );
    }
    const existingUser = existingUserRes[0];
    const validPassword = await verifyPassword(
      password,
      existingUser.passwordHash
    );
    if (!validPassword) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Username or password incorrect. Email: ${email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError90(
          HttpCode_default.UNAUTHORIZED,
          "Username or password is incorrect"
        )
      );
    }
    if (existingUser.twoFactorEnabled) {
      if (!code) {
        return response_default(res, {
          data: { codeRequested: true },
          success: true,
          error: false,
          message: "Two-factor authentication required",
          status: HttpCode_default.ACCEPTED
        });
      }
      const validOTP = await verifyTotpCode(
        code,
        existingUser.twoFactorSecret,
        existingUser.userId
      );
      if (!validOTP) {
        if (config_default.getRawConfig().app.log_failed_attempts) {
          logger_default.info(
            `Two-factor code incorrect. Email: ${email}. IP: ${req.ip}.`
          );
        }
        return next2(
          createHttpError90(
            HttpCode_default.UNAUTHORIZED,
            "The two-factor code you entered is incorrect"
          )
        );
      }
    }
    const token2 = generateSessionToken();
    const sess = await createSession(token2, existingUser.userId);
    const isSecure = req.protocol === "https";
    const cookie = serializeSessionCookie(
      token2,
      isSecure,
      new Date(sess.expiresAt)
    );
    res.appendHeader("Set-Cookie", cookie);
    if (!existingUser.emailVerified && config_default.getRawConfig().flags?.require_email_verification) {
      return response_default(res, {
        data: { emailVerificationRequired: true },
        success: true,
        error: false,
        message: "Email verification code sent",
        status: HttpCode_default.OK
      });
    }
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Logged in successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    logger_default.error(e2);
    return next2(
      createHttpError90(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to authenticate user"
      )
    );
  }
}

// server/routers/auth/signup.ts
import { z as z77 } from "zod";
import { fromError as fromError67 } from "zod-validation-error";
import createHttpError91 from "http-errors";
import { SqliteError as SqliteError3 } from "better-sqlite3";

// server/auth/sendEmailVerificationCode.ts
import { TimeSpan as TimeSpan3, createDate as createDate3 } from "oslo";
import { generateRandomString as generateRandomString4, alphabet as alphabet3 } from "oslo/crypto";
import { eq as eq105 } from "drizzle-orm";

// server/emails/templates/VerifyEmailCode.tsx
import { Body as Body3, Head as Head3, Html as Html3, Preview as Preview3, Tailwind as Tailwind3 } from "@react-email/components";
import * as React6 from "react";
var VerifyEmail = ({
  username,
  verificationCode,
  verifyLink
}) => {
  const previewText = `Your verification code is ${verificationCode}`;
  return /* @__PURE__ */ React6.createElement(Html3, null, /* @__PURE__ */ React6.createElement(Head3, null), /* @__PURE__ */ React6.createElement(Preview3, null, previewText), /* @__PURE__ */ React6.createElement(Tailwind3, { config: themeColors }, /* @__PURE__ */ React6.createElement(Body3, { className: "font-sans" }, /* @__PURE__ */ React6.createElement(EmailContainer, null, /* @__PURE__ */ React6.createElement(EmailLetterHead, null), /* @__PURE__ */ React6.createElement(EmailHeading, null, "Please Verify Your Email"), /* @__PURE__ */ React6.createElement(EmailGreeting, null, "Hi ", username || "there", ","), /* @__PURE__ */ React6.createElement(EmailText, null, "You\u2019ve requested to verify your email. Please use the code below to complete the verification process upon logging in."), /* @__PURE__ */ React6.createElement(EmailSection, null, /* @__PURE__ */ React6.createElement(CopyCodeBox, { text: verificationCode })), /* @__PURE__ */ React6.createElement(EmailText, null, "If you didn\u2019t request this, you can safely ignore this email."), /* @__PURE__ */ React6.createElement(EmailFooter, null, /* @__PURE__ */ React6.createElement(EmailSignature, null))))));
};

// server/auth/sendEmailVerificationCode.ts
async function sendEmailVerificationCode(email, userId) {
  const code = await generateEmailVerificationCode(userId, email);
  await sendEmail(
    VerifyEmail({
      username: email,
      verificationCode: code,
      verifyLink: `${config_default.getRawConfig().app.dashboard_url}/auth/verify-email`
    }),
    {
      to: email,
      from: config_default.getNoReplyEmail(),
      subject: "Verify your email address"
    }
  );
}
async function generateEmailVerificationCode(userId, email) {
  const code = generateRandomString4(8, alphabet3("0-9"));
  await db_default.transaction(async (trx) => {
    await trx.delete(emailVerificationCodes).where(eq105(emailVerificationCodes.userId, userId));
    await trx.insert(emailVerificationCodes).values({
      userId,
      email,
      code,
      expiresAt: createDate3(new TimeSpan3(15, "m")).getTime()
    });
  });
  return code;
}

// server/routers/auth/signup.ts
import { eq as eq106 } from "drizzle-orm";
import moment5 from "moment";
var signupBodySchema = z77.object({
  email: z77.string().email().transform((v2) => v2.toLowerCase()),
  password: passwordSchema,
  inviteToken: z77.string().optional(),
  inviteId: z77.string().optional()
});
async function signup(req, res, next2) {
  const parsedBody = signupBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError91(
        HttpCode_default.BAD_REQUEST,
        fromError67(parsedBody.error).toString()
      )
    );
  }
  const { email, password, inviteToken, inviteId } = parsedBody.data;
  logger_default.debug("signup", { email, password, inviteToken, inviteId });
  const passwordHash = await hashPassword(password);
  const userId = generateId(15);
  if (config_default.getRawConfig().flags?.disable_signup_without_invite) {
    if (!inviteToken || !inviteId) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Signup blocked without invite. Email: ${email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError91(
          HttpCode_default.BAD_REQUEST,
          "Signups are disabled without an invite code"
        )
      );
    }
    const { error, existingInvite } = await checkValidInvite({
      token: inviteToken,
      inviteId
    });
    if (error) {
      return next2(createHttpError91(HttpCode_default.BAD_REQUEST, error));
    }
    if (!existingInvite) {
      return next2(
        createHttpError91(HttpCode_default.BAD_REQUEST, "Invite does not exist")
      );
    }
    if (existingInvite.email !== email) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `User attempted to use an invite for another user. Email: ${email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError91(
          HttpCode_default.BAD_REQUEST,
          "Invite is not for this user"
        )
      );
    }
  }
  try {
    const existing = await db_default.select().from(users).where(eq106(users.email, email));
    if (existing && existing.length > 0) {
      if (!config_default.getRawConfig().flags?.require_email_verification) {
        return next2(
          createHttpError91(
            HttpCode_default.BAD_REQUEST,
            "A user with that email address already exists"
          )
        );
      }
      const user = existing[0];
      if (user.emailVerified) {
        return next2(
          createHttpError91(
            HttpCode_default.BAD_REQUEST,
            "A user with that email address already exists"
          )
        );
      }
      const dateCreated = moment5(user.dateCreated);
      const now = moment5();
      const diff = now.diff(dateCreated, "hours");
      if (diff < 2) {
        return response_default(res, {
          data: {
            emailVerificationRequired: true
          },
          success: true,
          error: false,
          message: `A user with that email address already exists. We sent an email to ${email} with a verification code.`,
          status: HttpCode_default.OK
        });
      } else {
        await db_default.delete(users).where(eq106(users.userId, user.userId));
      }
    }
    await db_default.insert(users).values({
      userId,
      email,
      passwordHash,
      dateCreated: moment5().toISOString()
    });
    const token2 = generateSessionToken();
    const sess = await createSession(token2, userId);
    const isSecure = req.protocol === "https";
    const cookie = serializeSessionCookie(
      token2,
      isSecure,
      new Date(sess.expiresAt)
    );
    res.appendHeader("Set-Cookie", cookie);
    if (config_default.getRawConfig().flags?.require_email_verification) {
      sendEmailVerificationCode(email, userId);
      return response_default(res, {
        data: {
          emailVerificationRequired: true
        },
        success: true,
        error: false,
        message: `User created successfully. We sent an email to ${email} with a verification code.`,
        status: HttpCode_default.OK
      });
    }
    return response_default(res, {
      data: {},
      success: true,
      error: false,
      message: "User created successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    if (e2 instanceof SqliteError3 && e2.code === "SQLITE_CONSTRAINT_UNIQUE") {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Account already exists with that email. Email: ${email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError91(
          HttpCode_default.BAD_REQUEST,
          "A user with that email address already exists"
        )
      );
    } else {
      logger_default.error(e2);
      return next2(
        createHttpError91(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "Failed to create user"
        )
      );
    }
  }
}

// server/routers/auth/logout.ts
import createHttpError92 from "http-errors";
async function logout(req, res, next2) {
  const { user, session } = await verifySession(req);
  if (!user || !session) {
    if (config_default.getRawConfig().app.log_failed_attempts) {
      logger_default.info(
        `Log out failed because missing or invalid session. IP: ${req.ip}.`
      );
    }
    return next2(
      createHttpError92(
        HttpCode_default.BAD_REQUEST,
        "You must be logged in to sign out"
      )
    );
  }
  try {
    try {
      await invalidateSession(session.sessionId);
    } catch (error) {
      logger_default.error("Failed to invalidate session", error);
    }
    const isSecure = req.protocol === "https";
    res.setHeader("Set-Cookie", createBlankSessionTokenCookie(isSecure));
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Logged out successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError92(HttpCode_default.INTERNAL_SERVER_ERROR, "Failed to log out")
    );
  }
}

// server/routers/auth/verifyTotp.ts
import createHttpError93 from "http-errors";
import { z as z78 } from "zod";
import { fromError as fromError68 } from "zod-validation-error";
import { eq as eq107 } from "drizzle-orm";
import { alphabet as alphabet4, generateRandomString as generateRandomString5 } from "oslo/crypto";

// server/emails/templates/TwoFactorAuthNotification.tsx
import {
  Body as Body4,
  Head as Head4,
  Html as Html4,
  Preview as Preview4,
  Tailwind as Tailwind4
} from "@react-email/components";
import * as React7 from "react";
var TwoFactorAuthNotification = ({ email, enabled }) => {
  const previewText = `Two-Factor Authentication has been ${enabled ? "enabled" : "disabled"}`;
  return /* @__PURE__ */ React7.createElement(Html4, null, /* @__PURE__ */ React7.createElement(Head4, null), /* @__PURE__ */ React7.createElement(Preview4, null, previewText), /* @__PURE__ */ React7.createElement(Tailwind4, { config: themeColors }, /* @__PURE__ */ React7.createElement(Body4, { className: "font-sans" }, /* @__PURE__ */ React7.createElement(EmailContainer, null, /* @__PURE__ */ React7.createElement(EmailLetterHead, null), /* @__PURE__ */ React7.createElement(EmailHeading, null, "Two-Factor Authentication", " ", enabled ? "Enabled" : "Disabled"), /* @__PURE__ */ React7.createElement(EmailGreeting, null, "Hi ", email || "there", ","), /* @__PURE__ */ React7.createElement(EmailText, null, "This email confirms that Two-Factor Authentication has been successfully", " ", enabled ? "enabled" : "disabled", " on your account."), enabled ? /* @__PURE__ */ React7.createElement(EmailText, null, "With Two-Factor Authentication enabled, your account is now more secure. Please ensure you keep your authentication method safe.") : /* @__PURE__ */ React7.createElement(EmailText, null, "With Two-Factor Authentication disabled, your account may be less secure. We recommend enabling it to protect your account."), /* @__PURE__ */ React7.createElement(EmailFooter, null, /* @__PURE__ */ React7.createElement(EmailSignature, null))))));
};
var TwoFactorAuthNotification_default = TwoFactorAuthNotification;

// server/routers/auth/verifyTotp.ts
var verifyTotpBody = z78.object({
  code: z78.string()
}).strict();
async function verifyTotp(req, res, next2) {
  const parsedBody = verifyTotpBody.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError93(
        HttpCode_default.BAD_REQUEST,
        fromError68(parsedBody.error).toString()
      )
    );
  }
  const { code } = parsedBody.data;
  const user = req.user;
  if (user.twoFactorEnabled) {
    return next2(
      createHttpError93(
        HttpCode_default.BAD_REQUEST,
        "Two-factor authentication is already enabled"
      )
    );
  }
  if (!user.twoFactorSecret) {
    return next2(
      createHttpError93(
        HttpCode_default.BAD_REQUEST,
        "User has not requested two-factor authentication"
      )
    );
  }
  try {
    const valid = await verifyTotpCode(
      code,
      user.twoFactorSecret,
      user.userId
    );
    let codes;
    if (valid) {
      await db.transaction(async (trx) => {
        await trx.update(users).set({ twoFactorEnabled: true }).where(eq107(users.userId, user.userId));
        const backupCodes = await generateBackupCodes();
        codes = backupCodes;
        for (const code2 of backupCodes) {
          const hash2 = await hashPassword(code2);
          await trx.insert(twoFactorBackupCodes).values({
            userId: user.userId,
            codeHash: hash2
          });
        }
      });
    }
    if (!valid) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Two-factor authentication code is incorrect. Email: ${user.email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError93(
          HttpCode_default.BAD_REQUEST,
          "Invalid two-factor authentication code"
        )
      );
    }
    sendEmail(
      TwoFactorAuthNotification_default({
        email: user.email,
        enabled: true
      }),
      {
        to: user.email,
        from: config_default.getRawConfig().email?.no_reply,
        subject: "Two-factor authentication enabled"
      }
    );
    return response(res, {
      data: {
        valid,
        ...valid && codes ? { backupCodes: codes } : {}
      },
      success: true,
      error: false,
      message: valid ? "Code is valid. Two-factor is now enabled" : "Code is invalid",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError93(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to verify two-factor authentication code"
      )
    );
  }
}
async function generateBackupCodes() {
  const codes = [];
  for (let i = 0; i < 10; i++) {
    const code = generateRandomString5(6, alphabet4("0-9", "A-Z", "a-z"));
    codes.push(code);
  }
  return codes;
}

// server/routers/auth/requestTotpSecret.ts
import createHttpError94 from "http-errors";
import { z as z79 } from "zod";
import { fromError as fromError69 } from "zod-validation-error";
import { encodeHex } from "oslo/encoding";
import { eq as eq108 } from "drizzle-orm";
import { createTOTPKeyURI } from "oslo/otp";
var requestTotpSecretBody = z79.object({
  password: z79.string()
}).strict();
async function requestTotpSecret(req, res, next2) {
  const parsedBody = requestTotpSecretBody.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError94(
        HttpCode_default.BAD_REQUEST,
        fromError69(parsedBody.error).toString()
      )
    );
  }
  const { password } = parsedBody.data;
  const user = req.user;
  try {
    const validPassword = await verifyPassword(password, user.passwordHash);
    if (!validPassword) {
      return next2(unauthorized());
    }
    if (user.twoFactorEnabled) {
      return next2(
        createHttpError94(
          HttpCode_default.BAD_REQUEST,
          "User has already enabled two-factor authentication"
        )
      );
    }
    const hex = crypto.getRandomValues(new Uint8Array(20));
    const secret = encodeHex(hex);
    const uri = createTOTPKeyURI("Pangolin", user.email, hex);
    await db.update(users).set({
      twoFactorSecret: secret
    }).where(eq108(users.userId, user.userId));
    return response(res, {
      data: {
        secret,
        uri
      },
      success: true,
      error: false,
      message: "TOTP secret generated successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError94(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to generate TOTP secret"
      )
    );
  }
}

// server/routers/auth/disable2fa.ts
import createHttpError95 from "http-errors";
import { fromError as fromError70 } from "zod-validation-error";
import { z as z80 } from "zod";
import { eq as eq109 } from "drizzle-orm";
var disable2faBody = z80.object({
  password: z80.string(),
  code: z80.string().optional()
}).strict();
async function disable2fa(req, res, next2) {
  const parsedBody = disable2faBody.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError95(
        HttpCode_default.BAD_REQUEST,
        fromError70(parsedBody.error).toString()
      )
    );
  }
  const { password, code } = parsedBody.data;
  const user = req.user;
  try {
    const validPassword = await verifyPassword(password, user.passwordHash);
    if (!validPassword) {
      return next2(unauthorized());
    }
    if (!user.twoFactorEnabled) {
      return next2(
        createHttpError95(
          HttpCode_default.BAD_REQUEST,
          "Two-factor authentication is already disabled"
        )
      );
    } else {
      if (!code) {
        return response(res, {
          data: { codeRequested: true },
          success: true,
          error: false,
          message: "Two-factor authentication required",
          status: HttpCode_default.ACCEPTED
        });
      }
    }
    const validOTP = await verifyTotpCode(
      code,
      user.twoFactorSecret,
      user.userId
    );
    if (!validOTP) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Two-factor authentication code is incorrect. Email: ${user.email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError95(
          HttpCode_default.BAD_REQUEST,
          "The two-factor code you entered is incorrect"
        )
      );
    }
    await db.update(users).set({ twoFactorEnabled: false }).where(eq109(users.userId, user.userId));
    sendEmail(
      TwoFactorAuthNotification_default({
        email: user.email,
        enabled: false
      }),
      {
        to: user.email,
        from: config_default.getRawConfig().email?.no_reply,
        subject: "Two-factor authentication disabled"
      }
    );
    return response(res, {
      data: null,
      success: true,
      error: false,
      message: "Two-factor authentication disabled",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError95(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to disable two-factor authentication"
      )
    );
  }
}

// server/routers/auth/verifyEmail.ts
import createHttpError96 from "http-errors";
import { z as z81 } from "zod";
import { fromError as fromError71 } from "zod-validation-error";
import { eq as eq110 } from "drizzle-orm";
import { isWithinExpirationDate as isWithinExpirationDate4 } from "oslo";
var verifyEmailBody = z81.object({
  code: z81.string()
}).strict();
async function verifyEmail(req, res, next2) {
  if (!config_default.getRawConfig().flags?.require_email_verification) {
    return next2(
      createHttpError96(
        HttpCode_default.BAD_REQUEST,
        "Email verification is not enabled"
      )
    );
  }
  const parsedBody = verifyEmailBody.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError96(
        HttpCode_default.BAD_REQUEST,
        fromError71(parsedBody.error).toString()
      )
    );
  }
  const { code } = parsedBody.data;
  const user = req.user;
  if (user.emailVerified) {
    return next2(
      createHttpError96(HttpCode_default.BAD_REQUEST, "Email is already verified")
    );
  }
  try {
    const valid = await isValidCode(user, code);
    if (valid) {
      await db.transaction(async (trx) => {
        await trx.delete(emailVerificationCodes).where(eq110(emailVerificationCodes.userId, user.userId));
        await trx.update(users).set({
          emailVerified: true
        }).where(eq110(users.userId, user.userId));
      });
    } else {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Email verification code incorrect. Email: ${user.email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError96(
          HttpCode_default.BAD_REQUEST,
          "Invalid verification code"
        )
      );
    }
    return response(res, {
      success: true,
      error: false,
      message: "Email verified",
      status: HttpCode_default.OK,
      data: {
        valid
      }
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError96(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to verify email"
      )
    );
  }
}
async function isValidCode(user, code) {
  const codeRecord = await db.select().from(emailVerificationCodes).where(eq110(emailVerificationCodes.userId, user.userId)).limit(1);
  if (user.email !== codeRecord[0].email) {
    return false;
  }
  if (codeRecord.length === 0) {
    return false;
  }
  if (codeRecord[0].code !== code) {
    return false;
  }
  if (!isWithinExpirationDate4(new Date(codeRecord[0].expiresAt))) {
    return false;
  }
  return true;
}

// server/routers/auth/requestEmailVerificationCode.ts
import createHttpError97 from "http-errors";
async function requestEmailVerificationCode(req, res, next2) {
  if (!config_default.getRawConfig().flags?.require_email_verification) {
    return next2(
      createHttpError97(
        HttpCode_default.BAD_REQUEST,
        "Email verification is not enabled"
      )
    );
  }
  try {
    const user = req.user;
    if (user.emailVerified) {
      return next2(
        createHttpError97(
          HttpCode_default.BAD_REQUEST,
          "Email is already verified"
        )
      );
    }
    await sendEmailVerificationCode(user.email, user.userId);
    return response(res, {
      data: {
        codeSent: true
      },
      status: HttpCode_default.OK,
      success: true,
      error: false,
      message: `Email verification code sent to ${user.email}`
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError97(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to send email verification code"
      )
    );
  }
}

// server/routers/auth/changePassword.ts
import createHttpError98 from "http-errors";
import { fromError as fromError72 } from "zod-validation-error";
import { z as z82 } from "zod";
import { eq as eq111 } from "drizzle-orm";
var changePasswordBody = z82.object({
  oldPassword: z82.string(),
  newPassword: passwordSchema,
  code: z82.string().optional()
}).strict();

// server/routers/auth/requestPasswordReset.ts
import createHttpError99 from "http-errors";
import { z as z83 } from "zod";
import { fromError as fromError73 } from "zod-validation-error";
import { eq as eq112 } from "drizzle-orm";
import { alphabet as alphabet5, generateRandomString as generateRandomString6 } from "oslo/crypto";
import { createDate as createDate4 } from "oslo";
import { TimeSpan as TimeSpan4 } from "oslo";

// server/emails/templates/ResetPasswordCode.tsx
import {
  Body as Body5,
  Head as Head5,
  Html as Html5,
  Preview as Preview5,
  Tailwind as Tailwind5
} from "@react-email/components";
import * as React8 from "react";
var ResetPasswordCode = ({ email, code, link }) => {
  const previewText = `Your password reset code is ${code}`;
  return /* @__PURE__ */ React8.createElement(Html5, null, /* @__PURE__ */ React8.createElement(Head5, null), /* @__PURE__ */ React8.createElement(Preview5, null, previewText), /* @__PURE__ */ React8.createElement(Tailwind5, { config: themeColors }, /* @__PURE__ */ React8.createElement(Body5, { className: "font-sans" }, /* @__PURE__ */ React8.createElement(EmailContainer, null, /* @__PURE__ */ React8.createElement(EmailLetterHead, null), /* @__PURE__ */ React8.createElement(EmailHeading, null, "Password Reset Request"), /* @__PURE__ */ React8.createElement(EmailGreeting, null, "Hi ", email || "there", ","), /* @__PURE__ */ React8.createElement(EmailText, null, "You\u2019ve requested to reset your password. Please", " ", /* @__PURE__ */ React8.createElement("a", { href: link, className: "text-primary" }, "click here"), " ", "and follow the instructions to reset your password, or manually enter the following code:"), /* @__PURE__ */ React8.createElement(EmailSection, null, /* @__PURE__ */ React8.createElement(CopyCodeBox, { text: code })), /* @__PURE__ */ React8.createElement(EmailText, null, "If you didn\u2019t request this, you can safely ignore this email."), /* @__PURE__ */ React8.createElement(EmailFooter, null, /* @__PURE__ */ React8.createElement(EmailSignature, null))))));
};
var ResetPasswordCode_default = ResetPasswordCode;

// server/routers/auth/requestPasswordReset.ts
var requestPasswordResetBody = z83.object({
  email: z83.string().email().transform((v2) => v2.toLowerCase())
}).strict();
async function requestPasswordReset(req, res, next2) {
  const parsedBody = requestPasswordResetBody.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError99(
        HttpCode_default.BAD_REQUEST,
        fromError73(parsedBody.error).toString()
      )
    );
  }
  const { email } = parsedBody.data;
  try {
    const existingUser = await db.select().from(users).where(eq112(users.email, email));
    if (!existingUser || !existingUser.length) {
      return next2(
        createHttpError99(
          HttpCode_default.BAD_REQUEST,
          "A user with that email does not exist"
        )
      );
    }
    const token2 = generateRandomString6(8, alphabet5("0-9", "A-Z", "a-z"));
    await db.transaction(async (trx) => {
      await trx.delete(passwordResetTokens).where(eq112(passwordResetTokens.userId, existingUser[0].userId));
      const tokenHash = await hashPassword(token2);
      await trx.insert(passwordResetTokens).values({
        userId: existingUser[0].userId,
        email: existingUser[0].email,
        tokenHash,
        expiresAt: createDate4(new TimeSpan4(2, "h")).getTime()
      });
    });
    const url = `${config_default.getRawConfig().app.dashboard_url}/auth/reset-password?email=${email}&token=${token2}`;
    if (!config_default.getRawConfig().email) {
      logger_default.info(
        `Password reset requested for ${email}. Token: ${token2}.`
      );
    }
    await sendEmail(
      ResetPasswordCode_default({
        email,
        code: token2,
        link: url
      }),
      {
        from: config_default.getNoReplyEmail(),
        to: email,
        subject: "Reset your password"
      }
    );
    return response(res, {
      data: {
        sentEmail: true
      },
      success: true,
      error: false,
      message: "Password reset requested",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    logger_default.error(e2);
    return next2(
      createHttpError99(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to process password reset request"
      )
    );
  }
}

// server/routers/auth/resetPassword.ts
import createHttpError100 from "http-errors";
import { z as z84 } from "zod";
import { fromError as fromError74 } from "zod-validation-error";
import { eq as eq113 } from "drizzle-orm";
import { isWithinExpirationDate as isWithinExpirationDate5 } from "oslo";

// server/emails/templates/NotifyResetPassword.tsx
import {
  Body as Body6,
  Head as Head6,
  Html as Html6,
  Preview as Preview6,
  Tailwind as Tailwind6
} from "@react-email/components";
import * as React9 from "react";
var ConfirmPasswordReset = ({ email }) => {
  const previewText = `Your password has been reset`;
  return /* @__PURE__ */ React9.createElement(Html6, null, /* @__PURE__ */ React9.createElement(Head6, null), /* @__PURE__ */ React9.createElement(Preview6, null, previewText), /* @__PURE__ */ React9.createElement(Tailwind6, { config: themeColors }, /* @__PURE__ */ React9.createElement(Body6, { className: "font-sans relative" }, /* @__PURE__ */ React9.createElement(EmailContainer, null, /* @__PURE__ */ React9.createElement(EmailLetterHead, null), /* @__PURE__ */ React9.createElement(EmailHeading, null, "Password Reset Confirmation"), /* @__PURE__ */ React9.createElement(EmailGreeting, null, "Hi ", email || "there", ","), /* @__PURE__ */ React9.createElement(EmailText, null, "This email confirms that your password has just been reset. If you made this change, no further action is required."), /* @__PURE__ */ React9.createElement(EmailText, null, "Thank you for keeping your account secure."), /* @__PURE__ */ React9.createElement(EmailFooter, null, /* @__PURE__ */ React9.createElement(EmailSignature, null))))));
};
var NotifyResetPassword_default = ConfirmPasswordReset;

// server/routers/auth/resetPassword.ts
var resetPasswordBody = z84.object({
  email: z84.string().email().transform((v2) => v2.toLowerCase()),
  token: z84.string(),
  // reset secret code
  newPassword: passwordSchema,
  code: z84.string().optional()
  // 2fa code
}).strict();
async function resetPassword(req, res, next2) {
  const parsedBody = resetPasswordBody.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError100(
        HttpCode_default.BAD_REQUEST,
        fromError74(parsedBody.error).toString()
      )
    );
  }
  const { token: token2, newPassword, code, email } = parsedBody.data;
  try {
    const resetRequest = await db.select().from(passwordResetTokens).where(eq113(passwordResetTokens.email, email));
    if (!resetRequest || !resetRequest.length) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Password reset code is incorrect. Email: ${email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError100(
          HttpCode_default.BAD_REQUEST,
          "Invalid password reset token"
        )
      );
    }
    if (!isWithinExpirationDate5(new Date(resetRequest[0].expiresAt))) {
      return next2(
        createHttpError100(
          HttpCode_default.BAD_REQUEST,
          "Password reset token has expired"
        )
      );
    }
    const user = await db.select().from(users).where(eq113(users.userId, resetRequest[0].userId));
    if (!user || !user.length) {
      return next2(
        createHttpError100(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "User not found"
        )
      );
    }
    if (user[0].twoFactorEnabled) {
      if (!code) {
        return response(res, {
          data: { codeRequested: true },
          success: true,
          error: false,
          message: "Two-factor authentication required",
          status: HttpCode_default.ACCEPTED
        });
      }
      const validOTP = await verifyTotpCode(
        code,
        user[0].twoFactorSecret,
        user[0].userId
      );
      if (!validOTP) {
        if (config_default.getRawConfig().app.log_failed_attempts) {
          logger_default.info(
            `Two-factor authentication code is incorrect. Email: ${email}. IP: ${req.ip}.`
          );
        }
        return next2(
          createHttpError100(
            HttpCode_default.BAD_REQUEST,
            "Invalid two-factor authentication code"
          )
        );
      }
    }
    const isTokenValid = await verifyPassword(
      token2,
      resetRequest[0].tokenHash
    );
    if (!isTokenValid) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Password reset code is incorrect. Email: ${email}. IP: ${req.ip}.`
        );
      }
      return next2(
        createHttpError100(
          HttpCode_default.BAD_REQUEST,
          "Invalid password reset token"
        )
      );
    }
    const passwordHash = await hashPassword(newPassword);
    await db.transaction(async (trx) => {
      await trx.update(users).set({ passwordHash }).where(eq113(users.userId, resetRequest[0].userId));
      await trx.delete(passwordResetTokens).where(eq113(passwordResetTokens.email, email));
    });
    try {
      await invalidateAllSessions(resetRequest[0].userId);
    } catch (e2) {
      logger_default.error("Failed to invalidate user sessions", e2);
    }
    try {
      await sendEmail(NotifyResetPassword_default({ email }), {
        from: config_default.getNoReplyEmail(),
        to: email,
        subject: "Password Reset Confirmation"
      });
    } catch (e2) {
      logger_default.error("Failed to send password reset confirmation email", e2);
    }
    return response(res, {
      data: null,
      success: true,
      error: false,
      message: "Password reset successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    logger_default.error(e2);
    return next2(
      createHttpError100(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to reset password"
      )
    );
  }
}

// server/routers/auth/checkResourceSession.ts
import createHttpError101 from "http-errors";
import { z as z85 } from "zod";
import { fromError as fromError75 } from "zod-validation-error";
var params = z85.object({
  token: z85.string(),
  resourceId: z85.string().transform(Number).pipe(z85.number().int().positive())
}).strict();
async function checkResourceSession(req, res, next2) {
  const parsedParams = params.safeParse(req.params);
  if (!parsedParams.success) {
    return next2(
      createHttpError101(
        HttpCode_default.BAD_REQUEST,
        fromError75(parsedParams.error).toString()
      )
    );
  }
  const { token: token2, resourceId } = parsedParams.data;
  try {
    const { resourceSession } = await validateResourceSessionToken(
      token2,
      resourceId
    );
    let valid = false;
    if (resourceSession) {
      valid = true;
    }
    return response(res, {
      data: { valid },
      success: true,
      error: false,
      message: "Checked validity",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    logger_default.error(e2);
    return next2(
      createHttpError101(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to reset password"
      )
    );
  }
}

// server/routers/client/pickClientDefaults.ts
import { eq as eq114 } from "drizzle-orm";
import createHttpError102 from "http-errors";
import { z as z86 } from "zod";
import { fromError as fromError76 } from "zod-validation-error";
var getSiteSchema2 = z86.object({
  siteId: z86.string().transform(Number).pipe(z86.number())
}).strict();
async function pickClientDefaults(req, res, next2) {
  try {
    const parsedParams = getSiteSchema2.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError102(
          HttpCode_default.BAD_REQUEST,
          fromError76(parsedParams.error).toString()
        )
      );
    }
    const { siteId } = parsedParams.data;
    const [site] = await db.select().from(sites).where(eq114(sites.siteId, siteId));
    if (!site) {
      return next2(createHttpError102(HttpCode_default.NOT_FOUND, "Site not found"));
    }
    if (site.type !== "newt") {
      return next2(
        createHttpError102(
          HttpCode_default.BAD_REQUEST,
          "Site is not a newt site"
        )
      );
    }
    const sitesRequiredFields = z86.object({
      address: z86.string(),
      publicKey: z86.string(),
      listenPort: z86.number(),
      endpoint: z86.string()
    });
    const parsedSite = sitesRequiredFields.safeParse(site);
    if (!parsedSite.success) {
      logger_default.error("Unable to pick client defaults because: " + fromError76(parsedSite.error).toString());
      return next2(
        createHttpError102(
          HttpCode_default.BAD_REQUEST,
          "Site is not configured to accept client connectivity"
        )
      );
    }
    const { address, publicKey, listenPort, endpoint } = parsedSite.data;
    const clientsQuery = await db.select({
      subnet: clients.subnet
    }).from(clients).where(eq114(clients.siteId, site.siteId));
    let subnets = clientsQuery.map((client) => client.subnet);
    subnets.push(
      address.replace(
        /\/\d+$/,
        `/${config_default.getRawConfig().newt.site_block_size}`
      )
    );
    const newSubnet = findNextAvailableCidr(
      subnets,
      config_default.getRawConfig().newt.site_block_size,
      address
    );
    if (!newSubnet) {
      return next2(
        createHttpError102(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "No available subnets"
        )
      );
    }
    const olmId = generateId(15);
    const secret = generateId(48);
    return response_default(res, {
      data: {
        siteId: site.siteId,
        address,
        publicKey,
        name: site.name,
        listenPort,
        endpoint,
        // subnet: `${newSubnet.split("/")[0]}/${config.getRawConfig().newt.block_size}`, // we want the block size of the whole subnet
        subnet: newSubnet,
        olmId,
        olmSecret: secret
      },
      success: true,
      error: false,
      message: "Organization retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError102(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/client/createClient.ts
import { z as z87 } from "zod";
import createHttpError103 from "http-errors";
import { eq as eq115, and as and37 } from "drizzle-orm";
import { fromError as fromError77 } from "zod-validation-error";
import moment6 from "moment";
var createClientParamsSchema = z87.object({
  siteId: z87.string().transform((val) => parseInt(val)).pipe(z87.number())
}).strict();
var createClientSchema = z87.object({
  name: z87.string().min(1).max(255),
  siteId: z87.number().int().positive(),
  subnet: z87.string(),
  olmId: z87.string(),
  secret: z87.string(),
  type: z87.enum(["olm"])
}).strict();
async function createClient(req, res, next2) {
  try {
    const parsedBody = createClientSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError103(
          HttpCode_default.BAD_REQUEST,
          fromError77(parsedBody.error).toString()
        )
      );
    }
    const { name: name2, type, siteId, subnet, olmId, secret } = parsedBody.data;
    const parsedParams = createClientParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError103(
          HttpCode_default.BAD_REQUEST,
          fromError77(parsedParams.error).toString()
        )
      );
    }
    const { siteId: paramSiteId } = parsedParams.data;
    if (siteId != paramSiteId) {
      return next2(
        createHttpError103(
          HttpCode_default.BAD_REQUEST,
          "Site ID in body does not match site ID in URL"
        )
      );
    }
    if (!req.userOrgRoleId) {
      return next2(
        createHttpError103(HttpCode_default.FORBIDDEN, "User does not have a role")
      );
    }
    const [site] = await db.select().from(sites).where(eq115(sites.siteId, siteId));
    if (!site) {
      return next2(createHttpError103(HttpCode_default.NOT_FOUND, "Site not found"));
    }
    await db.transaction(async (trx) => {
      const adminRole = await trx.select().from(roles).where(
        and37(eq115(roles.isAdmin, true), eq115(roles.orgId, site.orgId))
      ).limit(1);
      if (adminRole.length === 0) {
        trx.rollback();
        return next2(
          createHttpError103(HttpCode_default.NOT_FOUND, `Admin role not found`)
        );
      }
      const [newClient] = await trx.insert(clients).values({
        siteId,
        orgId: site.orgId,
        name: name2,
        subnet,
        type
      }).returning();
      await trx.insert(roleClients).values({
        roleId: adminRole[0].roleId,
        clientId: newClient.clientId
      });
      if (req.userOrgRoleId != adminRole[0].roleId) {
        trx.insert(userClients).values({
          userId: req.user?.userId,
          clientId: newClient.clientId
        });
      }
      const secretHash = await hashPassword(secret);
      await trx.insert(olms).values({
        olmId,
        secretHash,
        clientId: newClient.clientId,
        dateCreated: moment6().toISOString()
      });
      return response_default(res, {
        data: newClient,
        success: true,
        error: false,
        message: "Site created successfully",
        status: HttpCode_default.CREATED
      });
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError103(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/client/deleteClient.ts
import { z as z88 } from "zod";
import { eq as eq116 } from "drizzle-orm";
import createHttpError104 from "http-errors";
import { fromError as fromError78 } from "zod-validation-error";
var deleteClientSchema = z88.object({
  clientId: z88.string().transform(Number).pipe(z88.number().int().positive())
}).strict();
async function deleteClient(req, res, next2) {
  try {
    const parsedParams = deleteClientSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError104(
          HttpCode_default.BAD_REQUEST,
          fromError78(parsedParams.error).toString()
        )
      );
    }
    const { clientId } = parsedParams.data;
    const [client] = await db.select().from(clients).where(eq116(clients.clientId, clientId)).limit(1);
    if (!client) {
      return next2(
        createHttpError104(
          HttpCode_default.NOT_FOUND,
          `Client with ID ${clientId} not found`
        )
      );
    }
    await db.delete(clients).where(eq116(clients.clientId, clientId));
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Client deleted successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError104(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/client/listClients.ts
import { and as and38, count as count4, eq as eq117, inArray as inArray10, or as or8, sql as sql11 } from "drizzle-orm";
import createHttpError105 from "http-errors";
import { z as z89 } from "zod";
import { fromError as fromError79 } from "zod-validation-error";
var listClientsParamsSchema = z89.object({
  orgId: z89.string()
}).strict();
var listClientsSchema = z89.object({
  limit: z89.string().optional().default("1000").transform(Number).pipe(z89.number().int().positive()),
  offset: z89.string().optional().default("0").transform(Number).pipe(z89.number().int().nonnegative())
});
function queryClients(orgId, accessibleClientIds) {
  return db.select({
    clientId: clients.clientId,
    orgId: clients.orgId,
    siteId: clients.siteId,
    siteNiceId: sites.niceId,
    name: clients.name,
    pubKey: clients.pubKey,
    subnet: clients.subnet,
    megabytesIn: clients.megabytesIn,
    megabytesOut: clients.megabytesOut,
    orgName: orgs.name,
    type: clients.type,
    online: clients.online,
    siteName: sites.name
  }).from(clients).leftJoin(orgs, eq117(clients.orgId, orgs.orgId)).innerJoin(sites, eq117(clients.siteId, sites.siteId)).where(
    and38(
      inArray10(clients.clientId, accessibleClientIds),
      eq117(clients.orgId, orgId)
    )
  );
}
async function listClients(req, res, next2) {
  try {
    const parsedQuery = listClientsSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError105(
          HttpCode_default.BAD_REQUEST,
          fromError79(parsedQuery.error)
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const parsedParams = listClientsParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError105(
          HttpCode_default.BAD_REQUEST,
          fromError79(parsedParams.error)
        )
      );
    }
    const { orgId } = parsedParams.data;
    if (orgId && orgId !== req.userOrgId) {
      return next2(
        createHttpError105(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    }
    const accessibleClients = await db.select({
      clientId: sql11`COALESCE(${userClients.clientId}, ${roleClients.clientId})`
    }).from(userClients).fullJoin(
      roleClients,
      eq117(userClients.clientId, roleClients.clientId)
    ).where(
      or8(
        eq117(userClients.userId, req.user.userId),
        eq117(roleClients.roleId, req.userOrgRoleId)
      )
    );
    const accessibleClientIds = accessibleClients.map(
      (site) => site.clientId
    );
    const baseQuery = queryClients(orgId, accessibleClientIds);
    let countQuery = db.select({ count: count4() }).from(sites).where(
      and38(
        inArray10(sites.siteId, accessibleClientIds),
        eq117(sites.orgId, orgId)
      )
    );
    const clientsList = await baseQuery.limit(limit).offset(offset);
    const totalCountResult = await countQuery;
    const totalCount = totalCountResult[0].count;
    return response_default(res, {
      data: {
        clients: clientsList,
        pagination: {
          total: totalCount,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Clients retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError105(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/supporterKey/validateSupporterKey.ts
import { z as z90 } from "zod";
import createHttpError106 from "http-errors";
import { fromError as fromError80 } from "zod-validation-error";
var validateSupporterKeySchema = z90.object({
  githubUsername: z90.string().nonempty(),
  key: z90.string().nonempty()
}).strict();
async function validateSupporterKey(req, res, next2) {
  try {
    const parsedBody = validateSupporterKeySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return next2(
        createHttpError106(
          HttpCode_default.BAD_REQUEST,
          fromError80(parsedBody.error).toString()
        )
      );
    }
    const { githubUsername, key } = parsedBody.data;
    const response2 = await fetch(
      "https://api.dev.fossorial.io/api/v1/license/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          licenseKey: key,
          githubUsername
        })
      }
    );
    if (!response2.ok) {
      logger_default.error(response2);
      return next2(
        createHttpError106(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "An error occurred"
        )
      );
    }
    const data = await response2.json();
    if (!data || !data.data.valid) {
      return response(res, {
        data: {
          valid: false
        },
        success: true,
        error: false,
        message: "Invalid supporter key",
        status: HttpCode_default.OK
      });
    }
    await db_default.transaction(async (trx) => {
      await trx.delete(supporterKey);
      await trx.insert(supporterKey).values({
        githubUsername,
        key,
        tier: data.data.tier || null,
        phrase: data.data.cutePhrase || null,
        valid: true
      });
    });
    await config_default.checkSupporterKey();
    return response(res, {
      data: {
        valid: true,
        githubUsername: data.data.githubUsername,
        tier: data.data.tier,
        phrase: data.data.cutePhrase
      },
      success: true,
      error: false,
      message: "Valid supporter key",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError106(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/supporterKey/isSupporterKeyVisible.ts
import createHttpError107 from "http-errors";
import { count as count5 } from "drizzle-orm";
var USER_LIMIT = 5;
async function isSupporterKeyVisible(req, res, next2) {
  try {
    const hidden = config_default.isSupporterKeyHidden();
    const key = config_default.getSupporterData();
    let visible = !hidden && key?.valid !== true;
    if (key?.tier === "Limited Supporter") {
      const [numUsers] = await db_default.select({ count: count5() }).from(users);
      if (numUsers.count > USER_LIMIT) {
        visible = true;
      }
    }
    logger_default.debug(`Supporter key visible: ${visible}`);
    logger_default.debug(JSON.stringify(key));
    return response(res, {
      data: {
        visible
      },
      success: true,
      error: false,
      message: "Status",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError107(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/supporterKey/hideSupporterKey.ts
import createHttpError108 from "http-errors";
async function hideSupporterKey(req, res, next2) {
  try {
    config_default.hideSupporterKey();
    return response(res, {
      data: {
        hidden: true
      },
      success: true,
      error: false,
      message: "Hidden",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError108(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/accessToken/generateAccessToken.ts
import { eq as eq118 } from "drizzle-orm";
import createHttpError109 from "http-errors";
import { z as z91 } from "zod";
import { fromError as fromError81 } from "zod-validation-error";
import { createDate as createDate5, TimeSpan as TimeSpan5 } from "oslo";
var generateAccessTokenBodySchema = z91.object({
  validForSeconds: z91.number().int().positive().optional(),
  // seconds
  title: z91.string().optional(),
  description: z91.string().optional()
}).strict();
var generateAccssTokenParamsSchema = z91.object({
  resourceId: z91.string().transform(Number).pipe(z91.number().int().positive())
}).strict();
async function generateAccessToken(req, res, next2) {
  const parsedBody = generateAccessTokenBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError109(
        HttpCode_default.BAD_REQUEST,
        fromError81(parsedBody.error).toString()
      )
    );
  }
  const parsedParams = generateAccssTokenParamsSchema.safeParse(req.params);
  if (!parsedParams.success) {
    return next2(
      createHttpError109(
        HttpCode_default.BAD_REQUEST,
        fromError81(parsedParams.error).toString()
      )
    );
  }
  const { resourceId } = parsedParams.data;
  const { validForSeconds, title, description } = parsedBody.data;
  const [resource] = await db_default.select().from(resources).where(eq118(resources.resourceId, resourceId));
  if (!resource) {
    return next2(createHttpError109(HttpCode_default.NOT_FOUND, "Resource not found"));
  }
  try {
    const sessionLength = validForSeconds ? validForSeconds * 1e3 : SESSION_COOKIE_EXPIRES;
    const expiresAt = validForSeconds ? createDate5(new TimeSpan5(validForSeconds, "s")).getTime() : void 0;
    const token2 = generateIdFromEntropySize(25);
    const tokenHash = await hashPassword(token2);
    const id = generateId(15);
    const [result] = await db_default.insert(resourceAccessToken).values({
      accessTokenId: id,
      orgId: resource.orgId,
      resourceId,
      tokenHash,
      expiresAt: expiresAt || null,
      sessionLength,
      title: title || null,
      description: description || null,
      createdAt: (/* @__PURE__ */ new Date()).getTime()
    }).returning({
      accessTokenId: resourceAccessToken.accessTokenId,
      orgId: resourceAccessToken.orgId,
      resourceId: resourceAccessToken.resourceId,
      expiresAt: resourceAccessToken.expiresAt,
      sessionLength: resourceAccessToken.sessionLength,
      title: resourceAccessToken.title,
      description: resourceAccessToken.description,
      createdAt: resourceAccessToken.createdAt
    }).execute();
    if (!result) {
      return next2(
        createHttpError109(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "Failed to generate access token"
        )
      );
    }
    return response_default(res, {
      data: { ...result, accessToken: token2 },
      success: true,
      error: false,
      message: "Resource access token generated successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    logger_default.error(e2);
    return next2(
      createHttpError109(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to authenticate with resource"
      )
    );
  }
}

// server/routers/accessToken/listAccessTokens.ts
import { z as z92 } from "zod";
import createHttpError110 from "http-errors";
import { sql as sql12, eq as eq119, or as or9, inArray as inArray11, and as and39, count as count6, isNull, gt as gt3 } from "drizzle-orm";
var listAccessTokensParamsSchema = z92.object({
  resourceId: z92.string().optional().transform(stoi).pipe(z92.number().int().positive().optional()),
  orgId: z92.string().optional()
}).strict().refine((data) => !!data.resourceId !== !!data.orgId, {
  message: "Either resourceId or orgId must be provided, but not both"
});
var listAccessTokensSchema = z92.object({
  limit: z92.string().optional().default("1000").transform(Number).pipe(z92.number().int().nonnegative()),
  offset: z92.string().optional().default("0").transform(Number).pipe(z92.number().int().nonnegative())
});
function queryAccessTokens(accessibleResourceIds, orgId, resourceId) {
  const cols = {
    accessTokenId: resourceAccessToken.accessTokenId,
    orgId: resourceAccessToken.orgId,
    resourceId: resourceAccessToken.resourceId,
    sessionLength: resourceAccessToken.sessionLength,
    expiresAt: resourceAccessToken.expiresAt,
    tokenHash: resourceAccessToken.tokenHash,
    title: resourceAccessToken.title,
    description: resourceAccessToken.description,
    createdAt: resourceAccessToken.createdAt,
    resourceName: resources.name,
    siteName: sites.name
  };
  if (orgId) {
    return db.select(cols).from(resourceAccessToken).leftJoin(
      resources,
      eq119(resourceAccessToken.resourceId, resources.resourceId)
    ).leftJoin(
      sites,
      eq119(resources.resourceId, sites.siteId)
    ).where(
      and39(
        inArray11(
          resourceAccessToken.resourceId,
          accessibleResourceIds
        ),
        eq119(resourceAccessToken.orgId, orgId),
        or9(
          isNull(resourceAccessToken.expiresAt),
          gt3(resourceAccessToken.expiresAt, (/* @__PURE__ */ new Date()).getTime())
        )
      )
    );
  } else if (resourceId) {
    return db.select(cols).from(resourceAccessToken).leftJoin(
      resources,
      eq119(resourceAccessToken.resourceId, resources.resourceId)
    ).leftJoin(
      sites,
      eq119(resources.resourceId, sites.siteId)
    ).where(
      and39(
        inArray11(
          resourceAccessToken.resourceId,
          accessibleResourceIds
        ),
        eq119(resourceAccessToken.resourceId, resourceId),
        or9(
          isNull(resourceAccessToken.expiresAt),
          gt3(resourceAccessToken.expiresAt, (/* @__PURE__ */ new Date()).getTime())
        )
      )
    );
  }
}
async function listAccessTokens(req, res, next2) {
  try {
    const parsedQuery = listAccessTokensSchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return next2(
        createHttpError110(
          HttpCode_default.BAD_REQUEST,
          parsedQuery.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { limit, offset } = parsedQuery.data;
    const parsedParams = listAccessTokensParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return next2(
        createHttpError110(
          HttpCode_default.BAD_REQUEST,
          parsedParams.error.errors.map((e2) => e2.message).join(", ")
        )
      );
    }
    const { orgId, resourceId } = parsedParams.data;
    if (orgId && orgId !== req.userOrgId) {
      return next2(
        createHttpError110(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    }
    const accessibleResources = await db.select({
      resourceId: sql12`COALESCE(${userResources.resourceId}, ${roleResources.resourceId})`
    }).from(userResources).fullJoin(
      roleResources,
      eq119(userResources.resourceId, roleResources.resourceId)
    ).where(
      or9(
        eq119(userResources.userId, req.user.userId),
        eq119(roleResources.roleId, req.userOrgRoleId)
      )
    );
    const accessibleResourceIds = accessibleResources.map(
      (resource) => resource.resourceId
    );
    let countQuery = db.select({ count: count6() }).from(resources).where(inArray11(resources.resourceId, accessibleResourceIds));
    const baseQuery = queryAccessTokens(
      accessibleResourceIds,
      orgId,
      resourceId
    );
    const list = await baseQuery.limit(limit).offset(offset);
    const totalCountResult = await countQuery;
    const totalCount = totalCountResult[0].count;
    return response_default(res, {
      data: {
        accessTokens: list,
        pagination: {
          total: totalCount,
          limit,
          offset
        }
      },
      success: true,
      error: false,
      message: "Access tokens retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError110(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/routers/accessToken/deleteAccessToken.ts
import { z as z93 } from "zod";
import createHttpError111 from "http-errors";
import { fromError as fromError82 } from "zod-validation-error";
import { and as and40, eq as eq120 } from "drizzle-orm";
var deleteAccessTokenParamsSchema = z93.object({
  accessTokenId: z93.string()
}).strict();
async function deleteAccessToken(req, res, next2) {
  try {
    const parsedParams = deleteAccessTokenParamsSchema.safeParse(
      req.params
    );
    if (!parsedParams.success) {
      return next2(
        createHttpError111(
          HttpCode_default.BAD_REQUEST,
          fromError82(parsedParams.error).toString()
        )
      );
    }
    const { accessTokenId } = parsedParams.data;
    const [accessToken] = await db_default.select().from(resourceAccessToken).where(and40(eq120(resourceAccessToken.accessTokenId, accessTokenId)));
    if (!accessToken) {
      return next2(
        createHttpError111(
          HttpCode_default.NOT_FOUND,
          "Resource access token not found"
        )
      );
    }
    await db_default.delete(resourceAccessToken).where(and40(eq120(resourceAccessToken.accessTokenId, accessTokenId)));
    return response_default(res, {
      data: null,
      success: true,
      error: false,
      message: "Resource access token deleted successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError111(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred")
    );
  }
}

// server/middlewares/verifyUserHasAction.ts
import createHttpError112 from "http-errors";
function verifyUserHasAction(action) {
  return async function(req, res, next2) {
    try {
      const hasPermission = await checkUserActionPermission(action, req);
      if (!hasPermission) {
        return next2(
          createHttpError112(
            HttpCode_default.FORBIDDEN,
            "User does not have permission perform this action"
          )
        );
      }
      return next2();
    } catch (error) {
      logger_default.error("Error verifying role access:", error);
      return next2(
        createHttpError112(
          HttpCode_default.INTERNAL_SERVER_ERROR,
          "Error verifying role access"
        )
      );
    }
  };
}

// server/middlewares/verifyUserIsOrgOwner.ts
import { and as and41, eq as eq121 } from "drizzle-orm";
import createHttpError113 from "http-errors";
async function verifyUserIsOrgOwner(req, res, next2) {
  const userId = req.user.userId;
  const orgId = req.params.orgId;
  if (!userId) {
    return next2(
      createHttpError113(HttpCode_default.UNAUTHORIZED, "User not authenticated")
    );
  }
  if (!orgId) {
    return next2(
      createHttpError113(
        HttpCode_default.BAD_REQUEST,
        "Organization ID not provided"
      )
    );
  }
  try {
    if (!req.userOrg) {
      const res2 = await db.select().from(userOrgs).where(
        and41(eq121(userOrgs.userId, userId), eq121(userOrgs.orgId, orgId))
      );
      req.userOrg = res2[0];
    }
    if (!req.userOrg) {
      return next2(
        createHttpError113(
          HttpCode_default.FORBIDDEN,
          "User does not have access to this organization"
        )
      );
    }
    if (!req.userOrg.isOwner) {
      return next2(
        createHttpError113(
          HttpCode_default.FORBIDDEN,
          "User is not an organization owner"
        )
      );
    }
    return next2();
  } catch (e2) {
    return next2(
      createHttpError113(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Error verifying organization access"
      )
    );
  }
}

// server/routers/external.ts
import rateLimit2 from "express-rate-limit";
import createHttpError114 from "http-errors";
var unauthenticated = Router2();
unauthenticated.get("/", (_3, res) => {
  res.status(HttpCode_default.OK).json({ message: "Healthy" });
});
var authenticated = Router2();
authenticated.use(verifySessionUserMiddleware);
authenticated.get("/org/checkId", checkId);
authenticated.put("/org", getUserOrgs, createOrg);
authenticated.get("/orgs", getUserOrgs, listOrgs);
authenticated.get(
  "/org/:orgId",
  verifyOrgAccess,
  verifyUserHasAction("getOrg" /* getOrg */),
  getOrg
);
authenticated.post(
  "/org/:orgId",
  verifyOrgAccess,
  verifyUserHasAction("updateOrg" /* updateOrg */),
  updateOrg
);
authenticated.delete(
  "/org/:orgId",
  verifyOrgAccess,
  verifyUserIsOrgOwner,
  deleteOrg
);
authenticated.put(
  "/org/:orgId/site",
  verifyOrgAccess,
  verifyUserHasAction("createSite" /* createSite */),
  createSite
);
authenticated.get(
  "/org/:orgId/sites",
  verifyOrgAccess,
  verifyUserHasAction("listSites" /* listSites */),
  listSites
);
authenticated.get(
  "/org/:orgId/site/:niceId",
  verifyOrgAccess,
  verifyUserHasAction("getSite" /* getSite */),
  getSite
);
authenticated.get(
  "/org/:orgId/pick-site-defaults",
  verifyOrgAccess,
  verifyUserHasAction("createSite" /* createSite */),
  pickSiteDefaults
);
authenticated.get(
  "/site/:siteId",
  verifySiteAccess,
  verifyUserHasAction("getSite" /* getSite */),
  getSite
);
authenticated.get(
  "/site/:siteId/pick-client-defaults",
  verifySiteAccess,
  verifyUserHasAction("createClient" /* createClient */),
  pickClientDefaults
);
authenticated.get(
  "/org/:orgId/clients",
  verifyOrgAccess,
  verifyUserHasAction("listClients" /* listClients */),
  listClients
);
authenticated.put(
  "/site/:siteId/client",
  verifySiteAccess,
  verifyUserHasAction("createClient" /* createClient */),
  createClient
);
authenticated.delete(
  "/client/:clientId",
  verifyClientAccess,
  verifyUserHasAction("deleteClient" /* deleteClient */),
  deleteClient
);
authenticated.post(
  "/site/:siteId",
  verifySiteAccess,
  verifyUserHasAction("updateSite" /* updateSite */),
  updateSite
);
authenticated.delete(
  "/site/:siteId",
  verifySiteAccess,
  verifyUserHasAction("deleteSite" /* deleteSite */),
  deleteSite
);
authenticated.put(
  "/org/:orgId/site/:siteId/resource",
  verifyOrgAccess,
  verifyUserHasAction("createResource" /* createResource */),
  createResource
);
authenticated.get(
  "/site/:siteId/resources",
  verifyUserHasAction("listResources" /* listResources */),
  listResources
);
authenticated.get(
  "/org/:orgId/resources",
  verifyOrgAccess,
  verifyUserHasAction("listResources" /* listResources */),
  listResources
);
authenticated.get(
  "/org/:orgId/domains",
  verifyOrgAccess,
  verifyUserHasAction("listOrgDomains" /* listOrgDomains */),
  listDomains
);
authenticated.post(
  "/org/:orgId/create-invite",
  verifyOrgAccess,
  verifyUserHasAction("inviteUser" /* inviteUser */),
  inviteUser
);
unauthenticated.post("/invite/accept", acceptInvite);
authenticated.get(
  "/resource/:resourceId/roles",
  verifyResourceAccess,
  verifyUserHasAction("listResourceRoles" /* listResourceRoles */),
  listResourceRoles
);
authenticated.get(
  "/resource/:resourceId/users",
  verifyResourceAccess,
  verifyUserHasAction("listResourceUsers" /* listResourceUsers */),
  listResourceUsers
);
authenticated.get(
  "/resource/:resourceId",
  verifyResourceAccess,
  verifyUserHasAction("getResource" /* getResource */),
  getResource
);
authenticated.post(
  "/resource/:resourceId",
  verifyResourceAccess,
  verifyUserHasAction("updateResource" /* updateResource */),
  updateResource
);
authenticated.delete(
  "/resource/:resourceId",
  verifyResourceAccess,
  verifyUserHasAction("deleteResource" /* deleteResource */),
  deleteResource
);
authenticated.put(
  "/resource/:resourceId/target",
  verifyResourceAccess,
  verifyUserHasAction("createTarget" /* createTarget */),
  createTarget
);
authenticated.get(
  "/resource/:resourceId/targets",
  verifyResourceAccess,
  verifyUserHasAction("listTargets" /* listTargets */),
  listTargets
);
authenticated.put(
  "/resource/:resourceId/rule",
  verifyResourceAccess,
  verifyUserHasAction("createResourceRule" /* createResourceRule */),
  createResourceRule
);
authenticated.get(
  "/resource/:resourceId/rules",
  verifyResourceAccess,
  verifyUserHasAction("listResourceRules" /* listResourceRules */),
  listResourceRules
);
authenticated.post(
  "/resource/:resourceId/rule/:ruleId",
  verifyResourceAccess,
  verifyUserHasAction("updateResourceRule" /* updateResourceRule */),
  updateResourceRule
);
authenticated.delete(
  "/resource/:resourceId/rule/:ruleId",
  verifyResourceAccess,
  verifyUserHasAction("deleteResourceRule" /* deleteResourceRule */),
  deleteResourceRule
);
authenticated.get(
  "/target/:targetId",
  verifyTargetAccess,
  verifyUserHasAction("getTarget" /* getTarget */),
  getTarget
);
authenticated.post(
  "/target/:targetId",
  verifyTargetAccess,
  verifyUserHasAction("updateTarget" /* updateTarget */),
  updateTarget
);
authenticated.delete(
  "/target/:targetId",
  verifyTargetAccess,
  verifyUserHasAction("deleteTarget" /* deleteTarget */),
  deleteTarget
);
authenticated.put(
  "/org/:orgId/role",
  verifyOrgAccess,
  verifyUserHasAction("createRole" /* createRole */),
  createRole
);
authenticated.get(
  "/org/:orgId/roles",
  verifyOrgAccess,
  verifyUserHasAction("listRoles" /* listRoles */),
  listRoles
);
authenticated.delete(
  "/role/:roleId",
  verifyRoleAccess,
  verifyUserHasAction("deleteRole" /* deleteRole */),
  deleteRole
);
authenticated.post(
  "/role/:roleId/add/:userId",
  verifyRoleAccess,
  verifyUserAccess,
  verifyUserHasAction("addUserRole" /* addUserRole */),
  addUserRole
);
authenticated.post(
  "/resource/:resourceId/roles",
  verifyResourceAccess,
  verifyRoleAccess,
  verifyUserHasAction("setResourceRoles" /* setResourceRoles */),
  setResourceRoles
);
authenticated.post(
  "/resource/:resourceId/users",
  verifyResourceAccess,
  verifySetResourceUsers,
  verifyUserHasAction("setResourceUsers" /* setResourceUsers */),
  setResourceUsers
);
authenticated.post(
  `/resource/:resourceId/password`,
  verifyResourceAccess,
  verifyUserHasAction("setResourcePassword" /* setResourcePassword */),
  setResourcePassword
);
authenticated.post(
  `/resource/:resourceId/pincode`,
  verifyResourceAccess,
  verifyUserHasAction("setResourcePincode" /* setResourcePincode */),
  setResourcePincode
);
authenticated.post(
  `/resource/:resourceId/whitelist`,
  verifyResourceAccess,
  verifyUserHasAction("setResourceWhitelist" /* setResourceWhitelist */),
  setResourceWhitelist
);
authenticated.get(
  `/resource/:resourceId/whitelist`,
  verifyResourceAccess,
  verifyUserHasAction("getResourceWhitelist" /* getResourceWhitelist */),
  getResourceWhitelist
);
authenticated.post(
  `/resource/:resourceId/transfer`,
  verifyResourceAccess,
  verifyUserHasAction("updateResource" /* updateResource */),
  transferResource
);
authenticated.post(
  `/resource/:resourceId/access-token`,
  verifyResourceAccess,
  verifyUserHasAction("generateAccessToken" /* generateAccessToken */),
  generateAccessToken
);
authenticated.delete(
  `/access-token/:accessTokenId`,
  verifyAccessTokenAccess,
  verifyUserHasAction("deleteAcessToken" /* deleteAcessToken */),
  deleteAccessToken
);
authenticated.get(
  `/org/:orgId/access-tokens`,
  verifyOrgAccess,
  verifyUserHasAction("listAccessTokens" /* listAccessTokens */),
  listAccessTokens
);
authenticated.get(
  `/resource/:resourceId/access-tokens`,
  verifyResourceAccess,
  verifyUserHasAction("listAccessTokens" /* listAccessTokens */),
  listAccessTokens
);
authenticated.get(`/org/:orgId/overview`, verifyOrgAccess, getOrgOverview);
authenticated.post(`/supporter-key/validate`, validateSupporterKey);
authenticated.post(`/supporter-key/hide`, hideSupporterKey);
unauthenticated.get("/resource/:resourceId/auth", getResourceAuthInfo);
unauthenticated.get("/user", verifySessionMiddleware, getUser);
authenticated.get("/users", verifyUserIsServerAdmin, adminListUsers);
authenticated.delete(
  "/user/:userId",
  verifyUserIsServerAdmin,
  adminRemoveUser
);
authenticated.get("/org/:orgId/user/:userId", verifyOrgAccess, getOrgUser);
authenticated.get(
  "/org/:orgId/users",
  verifyOrgAccess,
  verifyUserHasAction("listUsers" /* listUsers */),
  listUsers
);
authenticated.delete(
  "/org/:orgId/user/:userId",
  verifyOrgAccess,
  verifyUserAccess,
  verifyUserHasAction("removeUser" /* removeUser */),
  removeUserOrg
);
authenticated.put("/newt", createNewt);
var authRouter = Router2();
unauthenticated.use("/auth", authRouter);
authRouter.use(
  rateLimitMiddleware({
    windowMin: config_default.getRawConfig().rate_limits.auth?.window_minutes || config_default.getRawConfig().rate_limits.global.window_minutes,
    max: config_default.getRawConfig().rate_limits.auth?.max_requests || config_default.getRawConfig().rate_limits.global.max_requests,
    type: "IP_AND_PATH"
  })
);
authRouter.put("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/newt/get-token", getNewtToken);
authRouter.post("/olm/get-token", getOlmToken);
authRouter.post("/2fa/enable", verifySessionUserMiddleware, verifyTotp);
authRouter.post(
  "/2fa/request",
  verifySessionUserMiddleware,
  requestTotpSecret
);
authRouter.post("/2fa/disable", verifySessionUserMiddleware, disable2fa);
authRouter.post("/verify-email", verifySessionMiddleware, verifyEmail);
authRouter.post(
  "/verify-email/request",
  verifySessionMiddleware,
  rateLimit2({
    windowMs: 15 * 60 * 1e3,
    max: 3,
    keyGenerator: (req) => `requestEmailVerificationCode:${req.body.email}`,
    handler: (req, res, next2) => {
      const message = `You can only request an email verification code ${3} times every ${15} minutes. Please try again later.`;
      return next2(createHttpError114(HttpCode_default.TOO_MANY_REQUESTS, message));
    }
  }),
  requestEmailVerificationCode
);
authRouter.post(
  "/reset-password/request",
  rateLimit2({
    windowMs: 15 * 60 * 1e3,
    max: 3,
    keyGenerator: (req) => `requestPasswordReset:${req.body.email}`,
    handler: (req, res, next2) => {
      const message = `You can only request a password reset ${3} times every ${15} minutes. Please try again later.`;
      return next2(createHttpError114(HttpCode_default.TOO_MANY_REQUESTS, message));
    }
  }),
  requestPasswordReset
);
authRouter.post("/reset-password/", resetPassword);
authRouter.post("/resource/:resourceId/password", authWithPassword);
authRouter.post("/resource/:resourceId/pincode", authWithPincode);
authRouter.post(
  "/resource/:resourceId/whitelist",
  rateLimit2({
    windowMs: 15 * 60 * 1e3,
    max: 10,
    keyGenerator: (req) => `authWithWhitelist:${req.body.email}`,
    handler: (req, res, next2) => {
      const message = `You can only request an email OTP ${10} times every ${15} minutes. Please try again later.`;
      return next2(createHttpError114(HttpCode_default.TOO_MANY_REQUESTS, message));
    }
  }),
  authWithWhitelist
);
authRouter.post(
  "/resource/:resourceId/access-token",
  authWithAccessToken
);

// server/middlewares/logIncoming.ts
function logIncomingMiddleware(req, res, next2) {
  const { method, url, headers, body } = req;
  if (url.includes("/api/v1")) {
    logger_default.debug(`${method} ${url}`);
  }
  next2();
}

// server/middlewares/csrfProtection.ts
function csrfProtectionMiddleware(req, res, next2) {
  const csrfToken = req.headers["x-csrf-token"];
  if (req.method === "GET") {
    next2();
    return;
  }
  if (!csrfToken || csrfToken !== "x-csrf-protection") {
    res.status(403).json({
      error: "CSRF token missing or invalid"
    });
    return;
  }
  next2();
}

// server/apiServer.ts
import helmet from "helmet";
var dev2 = process.env.ENVIRONMENT !== "prod";
var externalPort = config_default.getRawConfig().server.external_port;
function createApiServer() {
  const apiServer = express();
  if (config_default.getRawConfig().server.trust_proxy) {
    apiServer.set("trust proxy", 1);
  }
  const corsConfig = config_default.getRawConfig().server.cors;
  const options = {
    ...corsConfig?.origins ? { origin: corsConfig.origins } : {
      origin: (origin, callback) => {
        callback(null, true);
      }
    },
    ...corsConfig?.methods && { methods: corsConfig.methods },
    ...corsConfig?.allowed_headers && {
      allowedHeaders: corsConfig.allowed_headers
    },
    credentials: !(corsConfig?.credentials === false)
  };
  logger_default.debug("Using CORS options", options);
  apiServer.use(cors(options));
  if (!dev2) {
    apiServer.use(helmet());
    apiServer.use(csrfProtectionMiddleware);
  }
  apiServer.use(cookieParser());
  apiServer.use(express.json());
  if (!dev2) {
    apiServer.use(
      rateLimitMiddleware({
        windowMin: config_default.getRawConfig().rate_limits.global.window_minutes,
        max: config_default.getRawConfig().rate_limits.global.max_requests,
        type: "IP_AND_PATH"
      })
    );
  }
  const prefix = `/api/v1`;
  apiServer.use(logIncomingMiddleware);
  apiServer.use(prefix, unauthenticated);
  apiServer.use(prefix, authenticated);
  apiServer.use(prefix, router);
  apiServer.use(notFoundMiddleware);
  apiServer.use(errorHandlerMiddleware);
  const httpServer = apiServer.listen(externalPort, (err) => {
    if (err) throw err;
    logger_default.info(
      `API server is running on http://localhost:${externalPort}`
    );
  });
  handleWSUpgrade(httpServer);
  return httpServer;
}

// server/nextServer.ts
import next from "next";
import express2 from "express";
import { parse } from "url";
var nextPort = config_default.getRawConfig().server.next_port;
async function createNextServer() {
  const app = next({ dev: process.env.ENVIRONMENT !== "prod" });
  const handle = app.getRequestHandler();
  await app.prepare();
  const nextServer = express2();
  nextServer.all("*", (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });
  nextServer.listen(nextPort, (err) => {
    if (err) throw err;
    logger_default.info(
      `Next.js server is running on http://localhost:${nextPort}`
    );
  });
  return nextServer;
}

// server/internalServer.ts
import express3 from "express";
import helmet2 from "helmet";
import cors2 from "cors";
import cookieParser2 from "cookie-parser";

// server/routers/internal.ts
import { Router as Router3 } from "express";

// server/routers/gerbil/getConfig.ts
import { z as z94 } from "zod";
import { eq as eq122 } from "drizzle-orm";
import createHttpError115 from "http-errors";
import { fromError as fromError83 } from "zod-validation-error";
var getConfigSchema = z94.object({
  publicKey: z94.string(),
  reachableAt: z94.string().optional()
});
async function getConfig(req, res, next2) {
  try {
    const parsedParams = getConfigSchema.safeParse(req.body);
    if (!parsedParams.success) {
      return next2(
        createHttpError115(
          HttpCode_default.BAD_REQUEST,
          fromError83(parsedParams.error).toString()
        )
      );
    }
    const { publicKey, reachableAt } = parsedParams.data;
    if (!publicKey) {
      return next2(createHttpError115(HttpCode_default.BAD_REQUEST, "publicKey is required"));
    }
    let exitNodeQuery = await db.select().from(exitNodes).where(eq122(exitNodes.publicKey, publicKey));
    let exitNode;
    if (exitNodeQuery.length === 0) {
      const address = await getNextAvailableSubnet2();
      const listenPort = config_default.getRawConfig().gerbil.start_port;
      let subEndpoint = "";
      if (config_default.getRawConfig().gerbil.use_subdomain) {
        subEndpoint = await getUniqueExitNodeEndpointName();
      }
      exitNode = await db.insert(exitNodes).values({
        publicKey,
        endpoint: `${subEndpoint}${subEndpoint != "" ? "." : ""}${config_default.getRawConfig().gerbil.base_endpoint}`,
        address,
        listenPort,
        reachableAt,
        name: `Exit Node ${publicKey.slice(0, 8)}`
      }).returning().execute();
      logger_default.info(`Created new exit node ${exitNode[0].name} with address ${exitNode[0].address} and port ${exitNode[0].listenPort}`);
    } else {
      exitNode = exitNodeQuery;
    }
    if (!exitNode) {
      return next2(createHttpError115(HttpCode_default.INTERNAL_SERVER_ERROR, "Failed to create exit node"));
    }
    const sitesRes = await db.select().from(sites).where(eq122(sites.exitNodeId, exitNode[0].exitNodeId));
    const peers = await Promise.all(sitesRes.map(async (site) => {
      return {
        publicKey: site.pubKey,
        allowedIps: await getAllowedIps(site.siteId)
        // put 0.0.0.0/0 for now
      };
    }));
    const configResponse = {
      listenPort: exitNode[0].listenPort || 51820,
      ipAddress: exitNode[0].address,
      peers
    };
    logger_default.debug("Sending config: ", configResponse);
    return res.status(HttpCode_default.OK).send(configResponse);
  } catch (error) {
    logger_default.error(error);
    return next2(createHttpError115(HttpCode_default.INTERNAL_SERVER_ERROR, "An error occurred..."));
  }
}
async function getNextAvailableSubnet2() {
  const existingAddresses = await db.select({
    address: exitNodes.address
  }).from(exitNodes);
  const addresses = existingAddresses.map((a) => a.address);
  let subnet = findNextAvailableCidr(addresses, config_default.getRawConfig().gerbil.block_size, config_default.getRawConfig().gerbil.subnet_group);
  if (!subnet) {
    throw new Error("No available subnets remaining in space");
  }
  subnet = subnet.split(".").slice(0, 3).join(".") + ".1/" + subnet.split("/")[1];
  return subnet;
}

// server/routers/gerbil/receiveBandwidth.ts
import { eq as eq123 } from "drizzle-orm";
import createHttpError116 from "http-errors";
var receiveBandwidth = async (req, res, next2) => {
  try {
    const bandwidthData = req.body;
    if (!Array.isArray(bandwidthData)) {
      throw new Error("Invalid bandwidth data");
    }
    await db_default.transaction(async (trx) => {
      for (const peer of bandwidthData) {
        const { publicKey, bytesIn, bytesOut } = peer;
        const [site] = await trx.select().from(sites).where(eq123(sites.pubKey, publicKey)).limit(1);
        if (!site) {
          continue;
        }
        let online = site.online;
        if (bytesIn > 0 || bytesOut > 0) {
          online = true;
        } else if (site.lastBandwidthUpdate) {
          const lastBandwidthUpdate = new Date(
            site.lastBandwidthUpdate
          );
          const currentTime = /* @__PURE__ */ new Date();
          const diff = currentTime.getTime() - lastBandwidthUpdate.getTime();
          if (diff < 3e5) {
            online = false;
          }
        }
        await trx.update(sites).set({
          megabytesOut: (site.megabytesIn || 0) + bytesIn,
          megabytesIn: (site.megabytesOut || 0) + bytesOut,
          lastBandwidthUpdate: (/* @__PURE__ */ new Date()).toISOString(),
          online
        }).where(eq123(sites.siteId, site.siteId));
      }
    });
    return response_default(res, {
      data: {},
      success: true,
      error: false,
      message: "Organization retrieved successfully",
      status: HttpCode_default.OK
    });
  } catch (error) {
    logger_default.error("Error updating bandwidth data:", error);
    return next2(
      createHttpError116(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "An error occurred..."
      )
    );
  }
};

// server/routers/gerbil/updateHolePunch.ts
import { z as z95 } from "zod";
import { eq as eq124 } from "drizzle-orm";
import createHttpError117 from "http-errors";
import { fromError as fromError84 } from "zod-validation-error";
var updateHolePunchSchema = z95.object({
  olmId: z95.string().optional(),
  newtId: z95.string().optional(),
  token: z95.string(),
  ip: z95.string(),
  port: z95.number(),
  timestamp: z95.number()
});
async function updateHolePunch(req, res, next2) {
  try {
    const parsedParams = updateHolePunchSchema.safeParse(req.body);
    if (!parsedParams.success) {
      return next2(
        createHttpError117(
          HttpCode_default.BAD_REQUEST,
          fromError84(parsedParams.error).toString()
        )
      );
    }
    const { olmId, newtId, ip, port, timestamp, token: token2 } = parsedParams.data;
    let site;
    if (olmId) {
      const { session, olm: olmSession } = await validateOlmSessionToken(token2);
      if (!session || !olmSession) {
        return next2(
          createHttpError117(HttpCode_default.UNAUTHORIZED, "Unauthorized")
        );
      }
      if (olmId !== olmSession.olmId) {
        logger_default.warn(`Olm ID mismatch: ${olmId} !== ${olmSession.olmId}`);
        return next2(
          createHttpError117(HttpCode_default.UNAUTHORIZED, "Unauthorized")
        );
      }
      const [olm] = await db.select().from(olms).where(eq124(olms.olmId, olmId));
      if (!olm || !olm.clientId) {
        logger_default.warn(`Olm not found: ${olmId}`);
        return next2(
          createHttpError117(HttpCode_default.NOT_FOUND, "Olm not found")
        );
      }
      const [client] = await db.update(clients).set({
        endpoint: `${ip}:${port}`,
        lastHolePunch: timestamp
      }).where(eq124(clients.clientId, olm.clientId)).returning();
      [site] = await db.select().from(sites).where(eq124(sites.siteId, client.siteId));
    } else if (newtId) {
      const { session, newt: newtSession } = await validateNewtSessionToken(token2);
      if (!session || !newtSession) {
        return next2(
          createHttpError117(HttpCode_default.UNAUTHORIZED, "Unauthorized")
        );
      }
      if (newtId !== newtSession.newtId) {
        logger_default.warn(`Newt ID mismatch: ${newtId} !== ${newtSession.newtId}`);
        return next2(
          createHttpError117(HttpCode_default.UNAUTHORIZED, "Unauthorized")
        );
      }
      const [newt] = await db.select().from(newts).where(eq124(newts.newtId, newtId));
      if (!newt || !newt.siteId) {
        logger_default.warn(`Newt not found: ${newtId}`);
        return next2(
          createHttpError117(HttpCode_default.NOT_FOUND, "New not found")
        );
      }
      [site] = await db.update(sites).set({
        endpoint: `${ip}:${port}`,
        lastHolePunch: timestamp
      }).where(eq124(sites.siteId, newt.siteId)).returning();
    }
    if (!site || !site.endpoint || !site.subnet) {
      logger_default.warn(
        `Site not found for olmId: ${olmId} or newtId: ${newtId}`
      );
      return next2(createHttpError117(HttpCode_default.NOT_FOUND, "Site not found"));
    }
    return res.status(HttpCode_default.OK).send({
      destinationIp: site.subnet.split("/")[0],
      destinationPort: site.listenPort
    });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError117(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "An error occurred..."
      )
    );
  }
}

// server/routers/gerbil/getAllRelays.ts
import { z as z96 } from "zod";
import { eq as eq125 } from "drizzle-orm";
import createHttpError118 from "http-errors";
import { fromError as fromError85 } from "zod-validation-error";
var getAllRelaysSchema = z96.object({
  publicKey: z96.string().optional()
});
async function getAllRelays(req, res, next2) {
  try {
    const parsedParams = getAllRelaysSchema.safeParse(req.body);
    if (!parsedParams.success) {
      return next2(
        createHttpError118(
          HttpCode_default.BAD_REQUEST,
          fromError85(parsedParams.error).toString()
        )
      );
    }
    const { publicKey } = parsedParams.data;
    if (!publicKey) {
      return next2(createHttpError118(HttpCode_default.BAD_REQUEST, "publicKey is required"));
    }
    let [exitNode] = await db.select().from(exitNodes).where(eq125(exitNodes.publicKey, publicKey));
    if (!exitNode) {
      return next2(createHttpError118(HttpCode_default.NOT_FOUND, "Exit node not found"));
    }
    const sitesRes = await db.select().from(sites).where(eq125(sites.exitNodeId, exitNode.exitNodeId));
    if (sitesRes.length === 0) {
      return {
        mappings: {}
      };
    }
    const sitesAndClients = await Promise.all(sitesRes.map(async (site) => {
      const clientsRes = await db.select().from(clients).where(eq125(clients.siteId, site.siteId));
      return {
        site,
        clients: clientsRes
      };
    }));
    let mappings = {};
    for (const siteAndClients of sitesAndClients) {
      const { site, clients: clients2 } = siteAndClients;
      for (const client of clients2) {
        if (!client.endpoint || !site.endpoint || !site.subnet) {
          continue;
        }
        mappings[client.endpoint] = {
          destinationIp: site.subnet.split("/")[0],
          destinationPort: parseInt(site.endpoint.split(":")[1])
        };
      }
    }
    return res.status(HttpCode_default.OK).send({ mappings });
  } catch (error) {
    logger_default.error(error);
    return next2(
      createHttpError118(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "An error occurred..."
      )
    );
  }
}

// server/routers/traefik/getTraefikConfig.ts
import { and as and42, eq as eq126, inArray as inArray12 } from "drizzle-orm";
async function traefikConfigProvider(_3, res) {
  try {
    const allResources = await db_default.transaction(async (tx) => {
      const resourcesWithRelations = await tx.select({
        // Resource fields
        resourceId: resources.resourceId,
        subdomain: resources.subdomain,
        fullDomain: resources.fullDomain,
        ssl: resources.ssl,
        blockAccess: resources.blockAccess,
        sso: resources.sso,
        emailWhitelistEnabled: resources.emailWhitelistEnabled,
        http: resources.http,
        proxyPort: resources.proxyPort,
        protocol: resources.protocol,
        isBaseDomain: resources.isBaseDomain,
        domainId: resources.domainId,
        // Site fields
        site: {
          siteId: sites.siteId,
          type: sites.type,
          subnet: sites.subnet
        },
        // Org fields
        org: {
          orgId: orgs.orgId
        }
      }).from(resources).innerJoin(sites, eq126(sites.siteId, resources.siteId)).innerJoin(orgs, eq126(resources.orgId, orgs.orgId));
      const resourceIds = resourcesWithRelations.map((r2) => r2.resourceId);
      const allTargets = resourceIds.length > 0 ? await tx.select({
        resourceId: targets.resourceId,
        targetId: targets.targetId,
        ip: targets.ip,
        method: targets.method,
        port: targets.port,
        internalPort: targets.internalPort,
        enabled: targets.enabled
      }).from(targets).where(
        and42(
          inArray12(targets.resourceId, resourceIds),
          eq126(targets.enabled, true)
        )
      ) : [];
      const targetsMap = allTargets.reduce((map2, target) => {
        if (!map2.has(target.resourceId)) {
          map2.set(target.resourceId, []);
        }
        map2.get(target.resourceId).push(target);
        return map2;
      }, /* @__PURE__ */ new Map());
      return resourcesWithRelations.map((resource) => ({
        ...resource,
        targets: targetsMap.get(resource.resourceId) || []
      }));
    });
    if (!allResources.length) {
      return res.status(HttpCode_default.OK).json({});
    }
    const badgerMiddlewareName = "badger";
    const redirectHttpsMiddlewareName = "redirect-to-https";
    const config_output = {
      http: {
        middlewares: {
          [badgerMiddlewareName]: {
            plugin: {
              [badgerMiddlewareName]: {
                apiBaseUrl: new URL(
                  "/api/v1",
                  `http://${config_default.getRawConfig().server.internal_hostname}:${config_default.getRawConfig().server.internal_port}`
                ).href,
                userSessionCookieName: config_default.getRawConfig().server.session_cookie_name,
                accessTokenQueryParam: config_default.getRawConfig().server.resource_access_token_param,
                resourceSessionRequestParam: config_default.getRawConfig().server.resource_session_request_param
              }
            }
          },
          [redirectHttpsMiddlewareName]: {
            redirectScheme: {
              scheme: "https"
            }
          }
        }
      }
    };
    for (const resource of allResources) {
      const targets4 = resource.targets;
      const site = resource.site;
      const org = resource.org;
      const routerName = `${resource.resourceId}-router`;
      const serviceName = `${resource.resourceId}-service`;
      const fullDomain = `${resource.fullDomain}`;
      if (resource.http) {
        if (!resource.domainId) {
          continue;
        }
        if (!resource.fullDomain) {
          logger_default.error(
            `Resource ${resource.resourceId} has no fullDomain`
          );
          continue;
        }
        if (!resource.subdomain && !resource.isBaseDomain) {
          continue;
        }
        if (!config_output.http.routers) {
          config_output.http.routers = {};
        }
        if (!config_output.http.services) {
          config_output.http.services = {};
        }
        const domainParts = fullDomain.split(".");
        let wildCard;
        if (domainParts.length <= 2) {
          wildCard = `*.${domainParts.join(".")}`;
        } else {
          wildCard = `*.${domainParts.slice(1).join(".")}`;
        }
        if (resource.isBaseDomain) {
          wildCard = resource.fullDomain;
        }
        const configDomain = config_default.getDomain(resource.domainId);
        if (!configDomain) {
          logger_default.error(
            `Failed to get domain from config for resource ${resource.resourceId}`
          );
          continue;
        }
        const tls = {
          certResolver: configDomain.cert_resolver,
          ...configDomain.prefer_wildcard_cert ? {
            domains: [
              {
                main: wildCard
              }
            ]
          } : {}
        };
        const additionalMiddlewares = config_default.getRawConfig().traefik.additional_middlewares || [];
        config_output.http.routers[routerName] = {
          entryPoints: [
            resource.ssl ? config_default.getRawConfig().traefik.https_entrypoint : config_default.getRawConfig().traefik.http_entrypoint
          ],
          middlewares: [
            badgerMiddlewareName,
            ...additionalMiddlewares
          ],
          service: serviceName,
          rule: `Host(\`${fullDomain}\`)`,
          ...resource.ssl ? { tls } : {}
        };
        if (resource.ssl) {
          config_output.http.routers[routerName + "-redirect"] = {
            entryPoints: [
              config_default.getRawConfig().traefik.http_entrypoint
            ],
            middlewares: [redirectHttpsMiddlewareName],
            service: serviceName,
            rule: `Host(\`${fullDomain}\`)`
          };
        }
        config_output.http.services[serviceName] = {
          loadBalancer: {
            servers: targets4.filter((target) => {
              if (!target.enabled) {
                return false;
              }
              if (site.type === "local" || site.type === "wireguard") {
                if (!target.ip || !target.port || !target.method) {
                  return false;
                }
              } else if (site.type === "newt") {
                if (!target.internalPort || !target.method) {
                  return false;
                }
              }
              return true;
            }).map((target) => {
              if (site.type === "local" || site.type === "wireguard") {
                return {
                  url: `${target.method}://${target.ip}:${target.port}`
                };
              } else if (site.type === "newt") {
                const ip = site.subnet.split("/")[0];
                return {
                  url: `${target.method}://${ip}:${target.internalPort}`
                };
              }
            })
          }
        };
      } else {
        const protocol = resource.protocol.toLowerCase();
        const port = resource.proxyPort;
        if (!port) {
          continue;
        }
        if (!config_output[protocol]) {
          config_output[protocol] = {
            routers: {},
            services: {}
          };
        }
        config_output[protocol].routers[routerName] = {
          entryPoints: [`${protocol}-${port}`],
          service: serviceName,
          ...protocol === "tcp" ? { rule: "HostSNI(`*`)" } : {}
        };
        config_output[protocol].services[serviceName] = {
          loadBalancer: {
            servers: targets4.filter((target) => {
              if (!target.enabled) {
                return false;
              }
              if (site.type === "local" || site.type === "wireguard") {
                if (!target.ip || !target.port) {
                  return false;
                }
              } else if (site.type === "newt") {
                if (!target.internalPort) {
                  return false;
                }
              }
              return true;
            }).map((target) => {
              if (site.type === "local" || site.type === "wireguard") {
                return {
                  address: `${target.ip}:${target.port}`
                };
              } else if (site.type === "newt") {
                const ip = site.subnet.split("/")[0];
                return {
                  address: `${ip}:${target.internalPort}`
                };
              }
            })
          }
        };
      }
    }
    return res.status(HttpCode_default.OK).json(config_output);
  } catch (e2) {
    logger_default.error(`Failed to build Traefik config: ${e2}`);
    return res.status(HttpCode_default.INTERNAL_SERVER_ERROR).json({
      error: "Failed to build Traefik config"
    });
  }
}

// server/routers/badger/verifySession.ts
import { and as and43, eq as eq127 } from "drizzle-orm";
import createHttpError119 from "http-errors";
import NodeCache from "node-cache";
import { z as z97 } from "zod";
import { fromError as fromError86 } from "zod-validation-error";
var cache = new NodeCache({
  stdTTL: 5
  // seconds
});
var verifyResourceSessionSchema = z97.object({
  sessions: z97.record(z97.string()).optional(),
  originalRequestURL: z97.string().url(),
  scheme: z97.string(),
  host: z97.string(),
  path: z97.string(),
  method: z97.string(),
  accessToken: z97.string().optional(),
  tls: z97.boolean(),
  requestIp: z97.string().optional()
});
async function verifyResourceSession(req, res, next2) {
  logger_default.debug("Verify session: Badger sent", req.body);
  const parsedBody = verifyResourceSessionSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError119(
        HttpCode_default.BAD_REQUEST,
        fromError86(parsedBody.error).toString()
      )
    );
  }
  try {
    const {
      sessions: sessions2,
      host,
      originalRequestURL,
      requestIp,
      path: path4,
      accessToken: token2
    } = parsedBody.data;
    const clientIp = requestIp?.split(":")[0];
    let cleanHost = host;
    if (cleanHost.endsWith(":443")) {
      cleanHost = cleanHost.slice(0, -4);
    } else if (cleanHost.endsWith(":80")) {
      cleanHost = cleanHost.slice(0, -3);
    }
    const resourceCacheKey = `resource:${cleanHost}`;
    let resourceData = cache.get(resourceCacheKey);
    if (!resourceData) {
      const [result] = await db_default.select().from(resources).leftJoin(
        resourcePincode,
        eq127(resourcePincode.resourceId, resources.resourceId)
      ).leftJoin(
        resourcePassword,
        eq127(resourcePassword.resourceId, resources.resourceId)
      ).where(eq127(resources.fullDomain, cleanHost)).limit(1);
      if (!result) {
        logger_default.debug("Resource not found", cleanHost);
        return notAllowed(res);
      }
      resourceData = {
        resource: result.resources,
        pincode: result.resourcePincode,
        password: result.resourcePassword
      };
      cache.set(resourceCacheKey, resourceData);
    }
    const { resource, pincode, password } = resourceData;
    if (!resource) {
      logger_default.debug("Resource not found", cleanHost);
      return notAllowed(res);
    }
    const { sso, blockAccess } = resource;
    if (blockAccess) {
      logger_default.debug("Resource blocked", host);
      return notAllowed(res);
    }
    if (resource.applyRules) {
      const action = await checkRules(
        resource.resourceId,
        clientIp,
        path4
      );
      if (action == "ACCEPT") {
        logger_default.debug("Resource allowed by rule");
        return allowed(res);
      } else if (action == "DROP") {
        logger_default.debug("Resource denied by rule");
        return notAllowed(res);
      }
    }
    if (!resource.sso && !pincode && !password && !resource.emailWhitelistEnabled) {
      logger_default.debug("Resource allowed because no auth");
      return allowed(res);
    }
    const redirectUrl = `${config_default.getRawConfig().app.dashboard_url}/auth/resource/${encodeURIComponent(
      resource.resourceId
    )}?redirect=${encodeURIComponent(originalRequestURL)}`;
    let validAccessToken;
    if (token2) {
      const [accessTokenId, accessToken] = token2.split(".");
      const { valid, error, tokenItem } = await verifyResourceAccessToken(
        { resource, accessTokenId, accessToken }
      );
      if (error) {
        logger_default.debug("Access token invalid: " + error);
      }
      if (!valid) {
        if (config_default.getRawConfig().app.log_failed_attempts) {
          logger_default.info(
            `Resource access token is invalid. Resource ID: ${resource.resourceId}. IP: ${clientIp}.`
          );
        }
      }
      if (valid && tokenItem) {
        validAccessToken = tokenItem;
        if (!sessions2) {
          return await createAccessTokenSession(
            res,
            resource,
            tokenItem
          );
        }
      }
    }
    if (!sessions2) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Missing resource sessions. Resource ID: ${resource.resourceId}. IP: ${clientIp}.`
        );
      }
      return notAllowed(res);
    }
    const resourceSessionToken = sessions2[`${config_default.getRawConfig().server.session_cookie_name}${resource.ssl ? "_s" : ""}`];
    if (resourceSessionToken) {
      const sessionCacheKey = `session:${resourceSessionToken}`;
      let resourceSession = cache.get(sessionCacheKey);
      if (!resourceSession) {
        const result = await validateResourceSessionToken(
          resourceSessionToken,
          resource.resourceId
        );
        resourceSession = result?.resourceSession;
        cache.set(sessionCacheKey, resourceSession);
      }
      if (resourceSession?.isRequestToken) {
        logger_default.debug(
          "Resource not allowed because session is a temporary request token"
        );
        if (config_default.getRawConfig().app.log_failed_attempts) {
          logger_default.info(
            `Resource session is an exchange token. Resource ID: ${resource.resourceId}. IP: ${clientIp}.`
          );
        }
        return notAllowed(res);
      }
      if (resourceSession) {
        if (pincode && resourceSession.pincodeId) {
          logger_default.debug(
            "Resource allowed because pincode session is valid"
          );
          return allowed(res);
        }
        if (password && resourceSession.passwordId) {
          logger_default.debug(
            "Resource allowed because password session is valid"
          );
          return allowed(res);
        }
        if (resource.emailWhitelistEnabled && resourceSession.whitelistId) {
          logger_default.debug(
            "Resource allowed because whitelist session is valid"
          );
          return allowed(res);
        }
        if (resourceSession.accessTokenId) {
          logger_default.debug(
            "Resource allowed because access token session is valid"
          );
          return allowed(res);
        }
        if (resourceSession.userSessionId && sso) {
          const userAccessCacheKey = `userAccess:${resourceSession.userSessionId}:${resource.resourceId}`;
          let isAllowed = cache.get(userAccessCacheKey);
          if (isAllowed === void 0) {
            isAllowed = await isUserAllowedToAccessResource(
              resourceSession.userSessionId,
              resource
            );
            cache.set(userAccessCacheKey, isAllowed);
          }
          if (isAllowed) {
            logger_default.debug(
              "Resource allowed because user session is valid"
            );
            return allowed(res);
          }
        }
      }
    }
    if (validAccessToken) {
      return await createAccessTokenSession(
        res,
        resource,
        validAccessToken
      );
    }
    logger_default.debug("No more auth to check, resource not allowed");
    if (config_default.getRawConfig().app.log_failed_attempts) {
      logger_default.info(
        `Resource access not allowed. Resource ID: ${resource.resourceId}. IP: ${clientIp}.`
      );
    }
    return notAllowed(res, redirectUrl);
  } catch (e2) {
    console.error(e2);
    return next2(
      createHttpError119(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to verify session"
      )
    );
  }
}
function notAllowed(res, redirectUrl) {
  const data = {
    data: { valid: false, redirectUrl },
    success: true,
    error: false,
    message: "Access denied",
    status: HttpCode_default.OK
  };
  logger_default.debug(JSON.stringify(data));
  return response(res, data);
}
function allowed(res) {
  const data = {
    data: { valid: true },
    success: true,
    error: false,
    message: "Access allowed",
    status: HttpCode_default.OK
  };
  logger_default.debug(JSON.stringify(data));
  return response(res, data);
}
async function createAccessTokenSession(res, resource, tokenItem) {
  const token2 = generateSessionToken();
  const sess = await createResourceSession({
    resourceId: resource.resourceId,
    token: token2,
    accessTokenId: tokenItem.accessTokenId,
    sessionLength: tokenItem.sessionLength,
    expiresAt: tokenItem.expiresAt,
    doNotExtend: tokenItem.expiresAt ? true : false
  });
  const cookieName = `${config_default.getRawConfig().server.session_cookie_name}`;
  const cookie = serializeResourceSessionCookie(
    cookieName,
    resource.fullDomain,
    token2,
    !resource.ssl,
    new Date(sess.expiresAt)
  );
  res.appendHeader("Set-Cookie", cookie);
  logger_default.debug("Access token is valid, creating new session");
  return response(res, {
    data: { valid: true },
    success: true,
    error: false,
    message: "Access allowed",
    status: HttpCode_default.OK
  });
}
async function isUserAllowedToAccessResource(userSessionId, resource) {
  const [res] = await db_default.select().from(sessions).leftJoin(users, eq127(users.userId, sessions.userId)).where(eq127(sessions.sessionId, userSessionId));
  const user = res.user;
  const session = res.session;
  if (!user || !session) {
    return false;
  }
  if (config_default.getRawConfig().flags?.require_email_verification && !user.emailVerified) {
    return false;
  }
  const userOrgRole = await db_default.select().from(userOrgs).where(
    and43(
      eq127(userOrgs.userId, user.userId),
      eq127(userOrgs.orgId, resource.orgId)
    )
  ).limit(1);
  if (userOrgRole.length === 0) {
    return false;
  }
  const roleResourceAccess = await db_default.select().from(roleResources).where(
    and43(
      eq127(roleResources.resourceId, resource.resourceId),
      eq127(roleResources.roleId, userOrgRole[0].roleId)
    )
  ).limit(1);
  if (roleResourceAccess.length > 0) {
    return true;
  }
  const userResourceAccess = await db_default.select().from(userResources).where(
    and43(
      eq127(userResources.userId, user.userId),
      eq127(userResources.resourceId, resource.resourceId)
    )
  ).limit(1);
  if (userResourceAccess.length > 0) {
    return true;
  }
  return false;
}
async function checkRules(resourceId, clientIp, path4) {
  const ruleCacheKey = `rules:${resourceId}`;
  let rules = cache.get(ruleCacheKey);
  if (!rules) {
    rules = await db_default.select().from(resourceRules).where(eq127(resourceRules.resourceId, resourceId));
    cache.set(ruleCacheKey, rules);
  }
  if (rules.length === 0) {
    logger_default.debug("No rules found for resource", resourceId);
    return;
  }
  rules = rules.sort((a, b3) => a.priority - b3.priority);
  for (const rule of rules) {
    if (!rule.enabled) {
      continue;
    }
    if (clientIp && rule.match == "CIDR" && isIpInCidr(clientIp, rule.value)) {
      return rule.action;
    } else if (clientIp && rule.match == "IP" && clientIp == rule.value) {
      return rule.action;
    } else if (path4 && rule.match == "PATH" && isPathAllowed(rule.value, path4)) {
      return rule.action;
    }
  }
  return;
}
function isPathAllowed(pattern, path4) {
  logger_default.debug(`
Matching path "${path4}" against pattern "${pattern}"`);
  const normalize2 = (p) => p.split("/").filter(Boolean);
  const patternParts = normalize2(pattern);
  const pathParts = normalize2(path4);
  logger_default.debug(`Normalized pattern parts: [${patternParts.join(", ")}]`);
  logger_default.debug(`Normalized path parts: [${pathParts.join(", ")}]`);
  function matchSegments(patternIndex, pathIndex) {
    const indent = "  ".repeat(pathIndex);
    const currentPatternPart = patternParts[patternIndex];
    const currentPathPart = pathParts[pathIndex];
    logger_default.debug(
      `${indent}Checking patternIndex=${patternIndex} (${currentPatternPart || "END"}) vs pathIndex=${pathIndex} (${currentPathPart || "END"})`
    );
    if (patternIndex >= patternParts.length) {
      const result2 = pathIndex >= pathParts.length;
      logger_default.debug(
        `${indent}Reached end of pattern, remaining path: ${pathParts.slice(pathIndex).join("/")} -> ${result2}`
      );
      return result2;
    }
    if (pathIndex >= pathParts.length) {
      const remainingPattern = patternParts.slice(patternIndex);
      const result2 = remainingPattern.every((p) => p === "*");
      logger_default.debug(
        `${indent}Reached end of path, remaining pattern: ${remainingPattern.join("/")} -> ${result2}`
      );
      return result2;
    }
    if (currentPatternPart === "*") {
      logger_default.debug(
        `${indent}Found wildcard at pattern index ${patternIndex}`
      );
      logger_default.debug(
        `${indent}Trying to skip wildcard (consume 0 segments)`
      );
      if (matchSegments(patternIndex + 1, pathIndex)) {
        logger_default.debug(
          `${indent}Successfully matched by skipping wildcard`
        );
        return true;
      }
      logger_default.debug(
        `${indent}Trying to consume segment "${currentPathPart}" for wildcard`
      );
      if (matchSegments(patternIndex, pathIndex + 1)) {
        logger_default.debug(
          `${indent}Successfully matched by consuming segment for wildcard`
        );
        return true;
      }
      logger_default.debug(`${indent}Failed to match wildcard`);
      return false;
    }
    if (currentPatternPart.includes("*")) {
      logger_default.debug(
        `${indent}Found in-segment wildcard in "${currentPatternPart}"`
      );
      const regexPattern = currentPatternPart.replace(/\*/g, ".*").replace(/\?/g, ".");
      const regex = new RegExp(`^${regexPattern}$`);
      if (regex.test(currentPathPart)) {
        logger_default.debug(
          `${indent}Segment with wildcard matches: "${currentPatternPart}" matches "${currentPathPart}"`
        );
        return matchSegments(patternIndex + 1, pathIndex + 1);
      }
      logger_default.debug(
        `${indent}Segment with wildcard mismatch: "${currentPatternPart}" doesn't match "${currentPathPart}"`
      );
      return false;
    }
    if (currentPatternPart !== currentPathPart) {
      logger_default.debug(
        `${indent}Segment mismatch: "${currentPatternPart}" != "${currentPathPart}"`
      );
      return false;
    }
    logger_default.debug(
      `${indent}Segments match: "${currentPatternPart}" = "${currentPathPart}"`
    );
    return matchSegments(patternIndex + 1, pathIndex + 1);
  }
  const result = matchSegments(0, 0);
  logger_default.debug(`Final result: ${result}`);
  return result;
}

// server/routers/badger/exchangeSession.ts
import createHttpError120 from "http-errors";
import { z as z98 } from "zod";
import { fromError as fromError87 } from "zod-validation-error";
import { eq as eq128 } from "drizzle-orm";
var exchangeSessionBodySchema = z98.object({
  requestToken: z98.string(),
  host: z98.string(),
  requestIp: z98.string().optional()
});
async function exchangeSession(req, res, next2) {
  logger_default.debug("Exchange session: Badger sent", req.body);
  const parsedBody = exchangeSessionBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    return next2(
      createHttpError120(
        HttpCode_default.BAD_REQUEST,
        fromError87(parsedBody.error).toString()
      )
    );
  }
  try {
    const { requestToken, host, requestIp } = parsedBody.data;
    const clientIp = requestIp?.split(":")[0];
    const [resource] = await db_default.select().from(resources).where(eq128(resources.fullDomain, host)).limit(1);
    if (!resource) {
      return next2(
        createHttpError120(
          HttpCode_default.NOT_FOUND,
          `Resource with host ${host} not found`
        )
      );
    }
    const { resourceSession: requestSession } = await validateResourceSessionToken(
      requestToken,
      resource.resourceId
    );
    if (!requestSession) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Exchange token is invalid. Resource ID: ${resource.resourceId}. IP: ${clientIp}.`
        );
      }
      return next2(
        createHttpError120(HttpCode_default.UNAUTHORIZED, "Invalid request token")
      );
    }
    if (!requestSession.isRequestToken) {
      if (config_default.getRawConfig().app.log_failed_attempts) {
        logger_default.info(
          `Exchange token is invalid. Resource ID: ${resource.resourceId}. IP: ${clientIp}.`
        );
      }
      return next2(
        createHttpError120(HttpCode_default.UNAUTHORIZED, "Invalid request token")
      );
    }
    await db_default.delete(sessions).where(eq128(sessions.sessionId, requestToken));
    const token2 = generateSessionToken();
    let expiresAt = null;
    if (requestSession.userSessionId) {
      const [res2] = await db_default.select().from(sessions).where(eq128(sessions.sessionId, requestSession.userSessionId)).limit(1);
      if (res2) {
        await createResourceSession({
          token: token2,
          resourceId: resource.resourceId,
          isRequestToken: false,
          userSessionId: requestSession.userSessionId,
          doNotExtend: false,
          expiresAt: res2.expiresAt,
          sessionLength: SESSION_COOKIE_EXPIRES
        });
        expiresAt = res2.expiresAt;
      }
    } else if (requestSession.accessTokenId) {
      const [res2] = await db_default.select().from(resourceAccessToken).where(
        eq128(
          resourceAccessToken.accessTokenId,
          requestSession.accessTokenId
        )
      ).limit(1);
      if (res2) {
        await createResourceSession({
          token: token2,
          resourceId: resource.resourceId,
          isRequestToken: false,
          accessTokenId: requestSession.accessTokenId,
          doNotExtend: true,
          expiresAt: res2.expiresAt,
          sessionLength: res2.sessionLength
        });
        expiresAt = res2.expiresAt;
      }
    } else {
      const expires = new Date(
        Date.now() + SESSION_COOKIE_EXPIRES
      ).getTime();
      await createResourceSession({
        token: token2,
        resourceId: resource.resourceId,
        isRequestToken: false,
        passwordId: requestSession.passwordId,
        pincodeId: requestSession.pincodeId,
        userSessionId: requestSession.userSessionId,
        whitelistId: requestSession.whitelistId,
        accessTokenId: requestSession.accessTokenId,
        doNotExtend: false,
        expiresAt: expires,
        sessionLength: SESSION_COOKIE_EXPIRES2
      });
      expiresAt = expires;
    }
    const cookieName = `${config_default.getRawConfig().server.session_cookie_name}`;
    const cookie = serializeResourceSessionCookie(
      cookieName,
      resource.fullDomain,
      token2,
      !resource.ssl,
      expiresAt ? new Date(expiresAt) : void 0
    );
    logger_default.debug(JSON.stringify("Exchange cookie: " + cookie));
    return response(res, {
      data: { valid: true, cookie },
      success: true,
      error: false,
      message: "Session exchanged successfully",
      status: HttpCode_default.OK
    });
  } catch (e2) {
    console.error(e2);
    return next2(
      createHttpError120(
        HttpCode_default.INTERNAL_SERVER_ERROR,
        "Failed to exchange session"
      )
    );
  }
}

// server/routers/internal.ts
var internalRouter = Router3();
internalRouter.get("/", (_3, res) => {
  res.status(HttpCode_default.OK).json({ message: "Healthy" });
});
internalRouter.get("/traefik-config", traefikConfigProvider);
internalRouter.get(
  "/resource-session/:resourceId/:token",
  checkResourceSession
);
internalRouter.post(
  `/resource/:resourceId/get-exchange-token`,
  verifySessionUserMiddleware,
  verifyResourceAccess,
  getExchangeToken
);
internalRouter.get(
  `/supporter-key/visible`,
  isSupporterKeyVisible
);
var gerbilRouter = Router3();
internalRouter.use("/gerbil", gerbilRouter);
gerbilRouter.post("/get-config", getConfig);
gerbilRouter.post("/receive-bandwidth", receiveBandwidth);
gerbilRouter.post("/update-hole-punch", updateHolePunch);
gerbilRouter.post("/get-all-relays", getAllRelays);
var badgerRouter = Router3();
internalRouter.use("/badger", badgerRouter);
badgerRouter.post("/verify-session", verifyResourceSession);
badgerRouter.post("/exchange-session", exchangeSession);
var internal_default = internalRouter;

// server/internalServer.ts
var internalPort = config_default.getRawConfig().server.internal_port;
function createInternalServer() {
  const internalServer = express3();
  internalServer.use(helmet2());
  internalServer.use(cors2());
  internalServer.use(cookieParser2());
  internalServer.use(express3.json());
  const prefix = `/api/v1`;
  internalServer.use(prefix, internal_default);
  internalServer.use(notFoundMiddleware);
  internalServer.use(errorHandlerMiddleware);
  internalServer.listen(internalPort, (err) => {
    if (err) throw err;
    logger_default.info(
      `Internal server is running on http://localhost:${internalPort}`
    );
  });
  return internalServer;
}

// server/index.ts
async function startServers() {
  await runSetupFunctions();
  const apiServer = createApiServer();
  const internalServer = createInternalServer();
  const nextServer = await createNextServer();
  return {
    apiServer,
    nextServer,
    internalServer
  };
}
startServers().catch(console.error);
//# sourceMappingURL=server.mjs.map

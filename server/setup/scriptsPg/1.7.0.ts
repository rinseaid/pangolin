import { db } from "@server/db/pg/driver";
import { sql } from "drizzle-orm";

const version = "1.7.0";

export default async function migration() {
    console.log(`Running setup script ${version}...`);

    try {
        db.execute(sql`
            CREATE TABLE "clientSites" (
                "clientId" integer NOT NULL,
                "siteId" integer NOT NULL,
                "isRelayed" boolean DEFAULT false NOT NULL
            );
            --> statement-breakpoint
            CREATE TABLE "clients" (
                "id" serial PRIMARY KEY NOT NULL,
                "orgId" varchar NOT NULL,
                "exitNode" integer,
                "name" varchar NOT NULL,
                "pubKey" varchar,
                "subnet" varchar NOT NULL,
                "bytesIn" integer,
                "bytesOut" integer,
                "lastBandwidthUpdate" varchar,
                "lastPing" varchar,
                "type" varchar NOT NULL,
                "online" boolean DEFAULT false NOT NULL,
                "endpoint" varchar,
                "lastHolePunch" integer,
                "maxConnections" integer
            );
            --> statement-breakpoint
            CREATE TABLE "clientSession" (
                "id" varchar PRIMARY KEY NOT NULL,
                "olmId" varchar NOT NULL,
                "expiresAt" integer NOT NULL
            );
            --> statement-breakpoint
            CREATE TABLE "olms" (
                "id" varchar PRIMARY KEY NOT NULL,
                "secretHash" varchar NOT NULL,
                "dateCreated" varchar NOT NULL,
                "clientId" integer
            );
            --> statement-breakpoint
            CREATE TABLE "roleClients" (
                "roleId" integer NOT NULL,
                "clientId" integer NOT NULL
            );
            --> statement-breakpoint
            CREATE TABLE "webauthnCredentials" (
                "credentialId" varchar PRIMARY KEY NOT NULL,
                "userId" varchar NOT NULL,
                "publicKey" varchar NOT NULL,
                "signCount" integer NOT NULL,
                "transports" varchar,
                "name" varchar,
                "lastUsed" varchar NOT NULL,
                "dateCreated" varchar NOT NULL,
                "securityKeyName" varchar
            );
            --> statement-breakpoint
            CREATE TABLE "userClients" (
                "userId" varchar NOT NULL,
                "clientId" integer NOT NULL
            );
            --> statement-breakpoint
            CREATE TABLE "webauthnChallenge" (
                "sessionId" varchar PRIMARY KEY NOT NULL,
                "challenge" varchar NOT NULL,
                "securityKeyName" varchar,
                "userId" varchar,
                "expiresAt" bigint NOT NULL
            );
            --> statement-breakpoint
            ALTER TABLE "limits" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
            DROP TABLE "limits" CASCADE;--> statement-breakpoint
            ALTER TABLE "sites" ALTER COLUMN "subnet" DROP NOT NULL;--> statement-breakpoint
            ALTER TABLE "sites" ALTER COLUMN "bytesIn" SET DEFAULT 0;--> statement-breakpoint
            ALTER TABLE "sites" ALTER COLUMN "bytesOut" SET DEFAULT 0;--> statement-breakpoint
            ALTER TABLE "domains" ADD COLUMN "type" varchar;--> statement-breakpoint
            ALTER TABLE "domains" ADD COLUMN "verified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
            ALTER TABLE "domains" ADD COLUMN "failed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
            ALTER TABLE "domains" ADD COLUMN "tries" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
            ALTER TABLE "exitNodes" ADD COLUMN "maxConnections" integer;--> statement-breakpoint
            ALTER TABLE "newt" ADD COLUMN "version" varchar;--> statement-breakpoint
            ALTER TABLE "orgs" ADD COLUMN "subnet" varchar NOT NULL;--> statement-breakpoint
            ALTER TABLE "sites" ADD COLUMN "address" varchar;--> statement-breakpoint
            ALTER TABLE "sites" ADD COLUMN "endpoint" varchar;--> statement-breakpoint
            ALTER TABLE "sites" ADD COLUMN "publicKey" varchar;--> statement-breakpoint
            ALTER TABLE "sites" ADD COLUMN "lastHolePunch" bigint;--> statement-breakpoint
            ALTER TABLE "sites" ADD COLUMN "listenPort" integer;--> statement-breakpoint
            ALTER TABLE "user" ADD COLUMN "twoFactorSetupRequested" boolean DEFAULT false;--> statement-breakpoint
            ALTER TABLE "clientSites" ADD CONSTRAINT "clientSites_clientId_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "clientSites" ADD CONSTRAINT "clientSites_siteId_sites_siteId_fk" FOREIGN KEY ("siteId") REFERENCES "public"."sites"("siteId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "clients" ADD CONSTRAINT "clients_orgId_orgs_orgId_fk" FOREIGN KEY ("orgId") REFERENCES "public"."orgs"("orgId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "clients" ADD CONSTRAINT "clients_exitNode_exitNodes_exitNodeId_fk" FOREIGN KEY ("exitNode") REFERENCES "public"."exitNodes"("exitNodeId") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "clientSession" ADD CONSTRAINT "clientSession_olmId_olms_id_fk" FOREIGN KEY ("olmId") REFERENCES "public"."olms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "olms" ADD CONSTRAINT "olms_clientId_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "roleClients" ADD CONSTRAINT "roleClients_roleId_roles_roleId_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("roleId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "roleClients" ADD CONSTRAINT "roleClients_clientId_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "webauthnCredentials" ADD CONSTRAINT "webauthnCredentials_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "userClients" ADD CONSTRAINT "userClients_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "userClients" ADD CONSTRAINT "userClients_clientId_clients_id_fk" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "webauthnChallenge" ADD CONSTRAINT "webauthnChallenge_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
            ALTER TABLE "resources" DROP COLUMN "isBaseDomain";
        `);

        console.log(`Migrated database schema`);
    } catch (e) {
        console.log("Unable to migrate database schema");
        console.log(e);
    }

    console.log(`${version} migration complete`);
}

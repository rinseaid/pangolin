import { db } from "@server/db/pg/driver";
import { sql } from "drizzle-orm";

const version = "1.7.0";

export default async function migration() {
    console.log(`Running setup script ${version}...`);

    try {
        await db.execute(sql`
            BEGIN;
            
            
            COMMIT;
        `);

        console.log(`Migrated database schema`);
    } catch (e) {
        console.log("Unable to migrate database schema");
        console.log(e);
        throw e;
    }

    console.log(`${version} migration complete`);
}

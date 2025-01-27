import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

if (!process.env.DATABASE_URL) {
  console.log("🔴 No database URL");
}

const client = postgres(process.env.DATABASE_URL!, { max: 1, prepare: false });
const db = drizzle(client, { schema });

// const migrateDb = async () => {
//   try {
//     console.log("🟠 Migrating client");
//     await migrate(db, { migrationsFolder: "migrations" });
//     console.log("🟢 Successfully Migrated");
//   } catch (error) {
//     console.log("🔴 Error Migrating client", error);
//   }
// };
// migrateDb();

export default db;

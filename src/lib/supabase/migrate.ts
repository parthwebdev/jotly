// To keep our schemas up to date with the database
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
const migrateDb = async () => {
  try {
    console.log("🟠 Migrating client");
    await migrate(drizzle(migrationClient), { migrationsFolder: "migrations" });
    console.log("🟢 Successfully Migrated");
  } catch (error) {
    console.log("🔴 Error Migrating client", error);
  }

  await migrationClient.end();
};

migrateDb();

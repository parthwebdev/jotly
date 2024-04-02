import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../../migrations/schema";

if (!process.env.DATABASE_URL) {
  console.log("🔴 No database URL");
}

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(client, { schema, logger: true });

export default db;

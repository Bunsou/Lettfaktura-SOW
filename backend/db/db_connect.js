import { drizzle } from "drizzle-orm/node-postgres";
import "dotenv/config";

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute("select 1");

if (result.rows.length > 0) {
  console.log("Connection to database successful");
} else {
  console.error("Connection to database failed");
}

export default db;

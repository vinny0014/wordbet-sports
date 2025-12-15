import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!db && process.env.DATABASE_URL) {
    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      db = drizzle(connection, { schema });
      console.log("[Database] Connected successfully");
    } catch (error) {
      console.error("[Database] Connection failed:", error);
      throw error;
    }
  }
  return db;
}

export * from "./schema";

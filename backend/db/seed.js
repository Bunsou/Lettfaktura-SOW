import db from "./db_connect.js";
import { translationSchema } from "./schema.js";

const translations = [
  { key: "login_title", language: "en", value: "Login" },
  { key: "login_title", language: "sv", value: "Logga in" },
  { key: "email_label", language: "en", value: "Email" },
  { key: "email_label", language: "sv", value: "E-post" },
  { key: "password_label", language: "en", value: "Password" },
  { key: "password_label", language: "sv", value: "Lösenord" },
];

async function seed() {
  try {
    const inserted = await db
      .insert(translationSchema)
      .values(translations)
      .onConflictDoNothing()
      .returning();

    console.log("Seed added successfully.");
    process.exit(0);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

seed();

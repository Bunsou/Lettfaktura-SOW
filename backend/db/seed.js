import db from "./db_connect.js";
import { translationSchema } from "./schema.js";

const translations = [
  { key: "home", language: "en", value: "Home" },
  { key: "home", language: "sv", value: "Hem" },
  { key: "order", language: "en", value: "Order" },
  { key: "order", language: "sv", value: "Beställ" },
  { key: "our_customers", language: "en", value: "Our Customers" },
  { key: "our_customers", language: "sv", value: "Våra Kunder" },
  { key: "about_us", language: "en", value: "About us" },
  { key: "about_us", language: "sv", value: "Om oss" },
  { key: "contact_us", language: "en", value: "Contact Us" },
  { key: "contact_us", language: "sv", value: "Kontakta oss" },

  { key: "log_in", language: "en", value: "Log in" },
  { key: "log_in", language: "sv", value: "Logga in" },
  {
    key: "enter_your_email_address",
    language: "en",
    value: "Enter your email address",
  },
  {
    key: "enter_your_email_address",
    language: "sv",
    value: "Skriv in din epost adress",
  },
  { key: "email_address", language: "en", value: "Email address" },
  { key: "email_address", language: "sv", value: "Epost adress" },
  { key: "enter_your_password", language: "en", value: "Enter your password" },
  {
    key: "enter_your_password",
    language: "sv",
    value: "Skriv in ditt lösenord",
  },
  { key: "password", language: "en", value: "Password" },
  { key: "password", language: "sv", value: "Lösenord" },
  { key: "register", language: "en", value: "Register" },
  { key: "register", language: "sv", value: "Registrera dig" },
  { key: "forgotten_password", language: "en", value: "Forgotten password?" },
  { key: "forgotten_password", language: "sv", value: "Glömt lösenord?" },
  {
    key: "please_enter_a_valid_email_address",
    language: "en",
    value: "Please enter a valid email address",
  },
  {
    key: "please_enter_a_valid_email_address",
    language: "sv",
    value: "Vänligen skriv in en giltig epost adress",
  },
  {
    key: "this_field_cannot_be_empty",
    language: "en",
    value: "This field cannot be empty",
  },
  {
    key: "this_field_cannot_be_empty",
    language: "sv",
    value: "Detta fält kan inte vara tomt",
  },
  {
    key: "this_field_must_be_at_least_4_characters_long",
    language: "en",
    value: "This field must be at least 4 characters long.",
  },
  {
    key: "this_field_must_be_at_least_4_characters_long",
    language: "sv",
    value: "Detta fält måste innehålla minst 4 tecken.",
  },
  {
    key: "invalid_email_or_password",
    language: "en",
    value: "Invalid email or password, please try again",
  },
  {
    key: "invalid_email_or_password",
    language: "sv",
    value: "Ogiltig epost eller lösenord, försök igen",
  },
  {
    key: "something_went_wrong_with_our_server",
    language: "en",
    value: "Something went wrong with our server, please try again later",
  },
  {
    key: "something_went_wrong_with_our_server",
    language: "sv",
    value: "Något gick fel med vår server, försök igen senare",
  },
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

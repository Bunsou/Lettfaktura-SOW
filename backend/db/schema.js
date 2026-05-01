import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userSchema = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullname: text("fullname").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productSchema = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  articleNo: integer("article_no").notNull(),
  productService: text("product_service").notNull(),
  inPrice: integer("in_price").notNull(),
  price: integer("price").notNull(),
  unit: text("unit").notNull(),
  inStock: integer("in_stock").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at")
    .notNull()
    .default(() => Date.now()),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

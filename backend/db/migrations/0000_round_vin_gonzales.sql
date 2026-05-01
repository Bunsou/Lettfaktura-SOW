CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"article_no" integer NOT NULL,
	"product_service" text NOT NULL,
	"in_price" integer NOT NULL,
	"price" integer NOT NULL,
	"unit" text NOT NULL,
	"in_stock" integer NOT NULL,
	"description" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp NOT NULL
);

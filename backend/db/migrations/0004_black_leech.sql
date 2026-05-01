CREATE TABLE "translations" (
	"key" text NOT NULL,
	"language" text NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "translations_key_language_pk" PRIMARY KEY("key","language")
);

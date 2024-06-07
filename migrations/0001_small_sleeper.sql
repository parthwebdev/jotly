ALTER TABLE "documents" ALTER COLUMN "in_trash" DROP DEFAULT;
ALTER TABLE "documents" ALTER COLUMN "in_trash" TYPE BOOLEAN USING "in_trash"::BOOLEAN;--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "in_trash" SET DEFAULT false;
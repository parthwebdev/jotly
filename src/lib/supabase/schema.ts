import {
  AnyPgColumn,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "../../../migrations/schema";

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  data: text("data"),
  icon: text("icon").notNull(),
  logo: text("logo"),
  banner: text("banner"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  workspaceOwner: uuid("workspace_owner")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  data: text("data"),
  icon: text("icon").notNull(),
  banner: text("banner"),
  inTrash: text("in_trash"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  parentId: uuid("parent_id").references((): AnyPgColumn => documents.id, {
    onDelete: "cascade",
  }),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id),
});

export type InsertWorkspace = typeof workspaces.$inferInsert;
export type SelectWorkspace = typeof workspaces.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;
export type SelectDocument = typeof documents.$inferSelect;

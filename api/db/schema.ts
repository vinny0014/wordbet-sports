import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Tabelas do banco de dados para WordBet AI
 */

export const articles = mysqlTable("articles", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: mysqlEnum("category", ["CHAMPIONS", "BRASILEIRAO", "MERCADO", "TECH", "MASCOTES"]).notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  precision: int("precision").notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  mascotId: int("mascotId"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const mascots = mysqlTable("mascots", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  team: varchar("team", { length: 100 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }).notNull(),
  personality: text("personality"),
  catchphrase: varchar("catchphrase", { length: 255 }),
  archetype: varchar("archetype", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const votes = mysqlTable("votes", {
  id: int("id").autoincrement().primaryKey(),
  articleId: int("articleId").notNull(),
  weekId: varchar("weekId", { length: 20 }).notNull(),
  ipHash: varchar("ipHash", { length: 64 }).notNull(),
  voteCount: int("voteCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const publication_logs = mysqlTable("publication_logs", {
  id: int("id").autoincrement().primaryKey(),
  status: mysqlEnum("status", ["SUCCESS", "ERROR", "PENDING"]).notNull(),
  articlesPublished: int("articlesPublished").default(0).notNull(),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const zoeira_comments = mysqlTable("zoeira_comments", {
  id: int("id").autoincrement().primaryKey(),
  agent: varchar("agent", { length: 100 }).notNull(),
  comment: text("comment").notNull(),
  likes: int("likes").default(0).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// Type exports
export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;

export type Mascot = typeof mascots.$inferSelect;
export type InsertMascot = typeof mascots.$inferInsert;

export type Vote = typeof votes.$inferSelect;
export type InsertVote = typeof votes.$inferInsert;

export type PublicationLog = typeof publication_logs.$inferSelect;
export type InsertPublicationLog = typeof publication_logs.$inferInsert;

export type ZoeiraComment = typeof zoeira_comments.$inferSelect;
export type InsertZoeiraComment = typeof zoeira_comments.$inferInsert;

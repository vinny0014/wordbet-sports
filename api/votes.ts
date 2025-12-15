import { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb, votes, articles } from "./db";
import { eq } from "drizzle-orm";
import crypto from "crypto";

/**
 * API para sistema de votação com anti-fraude
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Database connection failed" });
    }

    if (req.method === "POST") {
      // Registrar voto
      const { articleId } = req.body;

      if (!articleId) {
        return res.status(400).json({ error: "articleId is required" });
      }

      // Gerar hash do IP para anti-fraude
      const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
      const ipHash = crypto.createHash("sha256").update(String(clientIp)).digest("hex");

      // Obter semana atual (ISO week)
      const now = new Date();
      const weekId = `${now.getFullYear()}-W${Math.ceil((now.getDate() + new Date(now.getFullYear(), 0, 1).getDay()) / 7)}`;

      // Verificar se o usuário já votou nesta semana
      const existingVote = await db
        .select()
        .from(votes)
        .where(
          eq(votes.articleId, articleId) &&
          eq(votes.weekId, weekId) &&
          eq(votes.ipHash, ipHash)
        );

      if (existingVote.length > 0) {
        return res.status(400).json({ error: "Você já votou neste artigo esta semana" });
      }

      // Registrar novo voto
      await db.insert(votes).values({
        articleId,
        weekId,
        ipHash,
        voteCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(200).json({ success: true, message: "Voto registrado com sucesso" });
    } else if (req.method === "GET") {
      // Obter top 10 artigos da semana
      const now = new Date();
      const weekId = `${now.getFullYear()}-W${Math.ceil((now.getDate() + new Date(now.getFullYear(), 0, 1).getDay()) / 7)}`;

      const topArticles = await db
        .select({
          articleId: votes.articleId,
          totalVotes: votes.voteCount,
        })
        .from(votes)
        .where(eq(votes.weekId, weekId))
        .orderBy(votes.voteCount)
        .limit(10);

      return res.status(200).json({ success: true, topArticles });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("[VOTES API] Erro:", error);
    return res.status(500).json({ error: "Internal server error", message: String(error) });
  }
}

import { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb, articles, publication_logs, InsertArticle } from "./db";
import { eq } from "drizzle-orm";

/**
 * Cron job para automação de publicação de notícias
 * Executa a cada 4 horas
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Validar que a requisição vem do Vercel Cron
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("[CRON] Iniciando pipeline de publicação...");

    const db = await getDb();
    if (!db) {
      throw new Error("Database connection failed");
    }

    // 1. Coletar dados (simular com dados estáticos por enquanto)
    const newsData = await collectNews();
    console.log(`[CRON] Coletadas ${newsData.length} notícias`);

    // 2. Processar e publicar artigos
    let publishedCount = 0;
    for (const news of newsData) {
      try {
        const article: InsertArticle = {
          title: news.title,
          content: news.content,
          category: news.category as any,
          author: news.author,
          precision: news.precision,
          slug: generateSlug(news.title),
          imageUrl: news.imageUrl,
          timestamp: new Date(),
        };

        await db.insert(articles).values(article);
        publishedCount++;
        console.log(`[CRON] Publicado: ${article.title}`);
      } catch (error) {
        console.error(`[CRON] Erro ao publicar artigo:`, error);
      }
    }

    // 3. Registrar log de publicação
    await db.insert(publication_logs).values({
      status: "SUCCESS",
      articlesPublished: publishedCount,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(`[CRON] Pipeline concluído. ${publishedCount} artigos publicados.`);

    return res.status(200).json({
      success: true,
      articlesPublished: publishedCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[CRON] Erro fatal:", error);

    const db = await getDb();
    if (db) {
      await db.insert(publication_logs).values({
        status: "ERROR",
        articlesPublished: 0,
        errorMessage: String(error),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return res.status(500).json({
      error: "Cron job failed",
      message: String(error),
    });
  }
}

/**
 * Simular coleta de notícias
 * Em produção, isso integraria com APIs de futebol reais
 */
async function collectNews() {
  return [
    {
      title: "Real Madrid Quebra Recorde de Invencibilidade",
      content: "Análise detalhada sobre o desempenho excepcional do Real Madrid na Champions League...",
      category: "CHAMPIONS",
      author: "IA Tática v2.1",
      precision: 95,
      imageUrl: "https://via.placeholder.com/400x300?text=Real+Madrid",
    },
    {
      title: "Flamengo Investe em Tecnologia de Treinamento",
      content: "O Flamengo adota nova tecnologia de IA para otimizar treinos e reduzir lesões...",
      category: "TECH",
      author: "Bot Inovação",
      precision: 88,
      imageUrl: "https://via.placeholder.com/400x300?text=Flamengo",
    },
    {
      title: "Mercado de Transferências: Tendências 2025",
      content: "Análise das principais movimentações esperadas no mercado de transferências...",
      category: "MERCADO",
      author: "Fabrizio AI",
      precision: 82,
      imageUrl: "https://via.placeholder.com/400x300?text=Mercado",
    },
  ];
}

/**
 * Gerar slug a partir do título
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

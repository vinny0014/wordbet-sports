import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../api/db';
import { articles } from '../api/db/schema';
import { desc, eq, gte } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(503).json({ error: 'Database not available' });
      }

      const { category, hours, id } = req.query;

      // Buscar artigo por ID
      if (id) {
        const article = await db
          .select()
          .from(articles)
          .where(eq(articles.id, parseInt(id as string)))
          .limit(1);

        if (article.length === 0) {
          return res.status(404).json({ error: 'Article not found' });
        }

        return res.status(200).json(article[0]);
      }

      // Buscar artigos das últimas X horas
      if (hours) {
        const hoursNum = parseInt(hours as string);
        const timeAgo = new Date(Date.now() - hoursNum * 60 * 60 * 1000);

        const recentArticles = await db
          .select()
          .from(articles)
          .where(gte(articles.createdAt, timeAgo))
          .orderBy(desc(articles.createdAt))
          .limit(20);

        return res.status(200).json(recentArticles);
      }

      // Buscar artigos por categoria
      if (category) {
        const categoryArticles = await db
          .select()
          .from(articles)
          .where(eq(articles.category, category as string))
          .orderBy(desc(articles.createdAt))
          .limit(20);

        return res.status(200).json(categoryArticles);
      }

      // Buscar todos os artigos
      const allArticles = await db
        .select()
        .from(articles)
        .orderBy(desc(articles.createdAt))
        .limit(50);

      return res.status(200).json(allArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}

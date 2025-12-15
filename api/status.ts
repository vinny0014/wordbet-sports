import { VercelRequest, VercelResponse } from '@vercel/node';
import { getDb } from '../api/db';
import { articles, publication_logs } from '../api/db/schema';
import { desc } from 'drizzle-orm';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const db = await getDb();
      if (!db) {
        return res.status(503).json({ error: 'Database not available' });
      }

      // Contar artigos publicados hoje
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayArticles = await db
        .select()
        .from(articles)
        .where((col) => col.createdAt >= today);

      // Buscar último cron
      const lastLog = await db
        .select()
        .from(publication_logs)
        .orderBy(desc(publication_logs.createdAt))
        .limit(1);

      // Buscar último erro
      const lastError = await db
        .select()
        .from(publication_logs)
        .where((col) => col.status === 'ERROR')
        .orderBy(desc(publication_logs.createdAt))
        .limit(1);

      const startTime = new Date('2025-12-15').getTime();
      const uptime = Math.floor((Date.now() - startTime) / 1000 / 60); // em minutos

      return res.status(200).json({
        lastCron: lastLog[0]?.createdAt?.toLocaleString('pt-BR') || 'Nunca',
        articlesCount: todayArticles.length,
        lastError: lastError[0]?.errorMessage || null,
        systemStatus: 'ONLINE',
        uptime: `${uptime} minutos`,
      });
    } catch (error) {
      console.error('Error fetching status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}

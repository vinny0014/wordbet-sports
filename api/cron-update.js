// /api/cron-update.js
// Cron Job para geração automática de notícias a cada 30 minutos

export const config = {
  // Roda a cada 30 minutos
  maxDuration: 60 // 60 segundos de timeout
};

export default async function handler(req, res) {
  // Verificar se é chamada do Vercel Cron
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET || 'wordbet-cron-2025';
  
  if (authHeader !== `Bearer ${cronSecret}`) {
    console.log('[CRON] Tentativa de acesso não autorizado');
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  console.log('[CRON] Iniciando ciclo de atualização automática...');
  
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';
    
    // 1. GERAR NOTÍCIAS via API news-job
    console.log('[CRON] Chamando API news-job...');
    const newsResponse = await fetch(`${baseUrl}/api/news-job`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!newsResponse.ok) {
      throw new Error(`news-job falhou: ${newsResponse.status}`);
    }
    
    const newsData = await newsResponse.json();
    console.log('[CRON] Resposta news-job:', newsData);
    
    // 2. PUBLICAR ARTIGOS
    let publishedCount = 0;
    
    if (newsData.success && newsData.articles && Array.isArray(newsData.articles)) {
      for (const article of newsData.articles) {
        try {
          const publishResponse = await fetch(`${baseUrl}/api/publish`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ article })
          });
          
          if (publishResponse.ok) {
            publishedCount++;
            console.log(`[CRON] Publicado: ${article.title}`);
          }
        } catch (pubError) {
          console.error('[CRON] Erro ao publicar artigo:', pubError);
        }
      }
    } else {
      console.log('[CRON] Nenhum artigo gerado ou formato inválido');
    }
    
    // 3. ATUALIZAR TIMESTAMPS (já é feito automaticamente pela API /articles)
    
    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      articlesGenerated: newsData.articles?.length || 0,
      articlesPublished: publishedCount,
      message: `Ciclo concluído: ${publishedCount} notícias publicadas`
    };
    
    console.log('[CRON] Resultado:', result);
    
    return res.status(200).json(result);
    
  } catch (error) {
    console.error('[CRON] Erro no ciclo de atualização:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro no ciclo de atualização',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

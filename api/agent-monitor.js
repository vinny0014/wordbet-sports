// AGENTE MONITOR - WordBet AI
// Função: Revisão contínua 24/7 do site para identificar melhorias
// Autor: Grande Mestre Absoluto
// Data: 25/11/2025

export default async function handler(req, res) {
  // Verificar autenticação
  const secret = req.headers['x-cron-secret'];
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const monitoringReport = await performSiteAudit();
    
    // Se houver problemas críticos, enviar alerta
    if (monitoringReport.criticalIssues.length > 0) {
      await sendAlert(monitoringReport);
    }
    
    // Salvar relatório
    await saveMonitoringReport(monitoringReport);
    
    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      report: monitoringReport
    });
    
  } catch (error) {
    console.error('Erro no Agente Monitor:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function performSiteAudit() {
  const report = {
    timestamp: new Date().toISOString(),
    criticalIssues: [],
    warnings: [],
    suggestions: [],
    metrics: {}
  };

  // 1. Verificar quantidade de artigos
  const articlesResponse = await fetch('https://www.wordbet.com.br/api/articles');
  const articles = await articlesResponse.json();
  
  report.metrics.totalArticles = articles.length;
  report.metrics.articlesByCategory = {};
  
  // Contar artigos por categoria
  articles.forEach(article => {
    const cat = article.category;
    report.metrics.articlesByCategory[cat] = (report.metrics.articlesByCategory[cat] || 0) + 1;
  });
  
  // Verificar se há artigos suficientes
  if (articles.length < 10) {
    report.criticalIssues.push({
      type: 'LOW_CONTENT',
      message: `Apenas ${articles.length} artigos no site. Mínimo recomendado: 20`,
      action: 'Aumentar frequência de geração de notícias'
    });
  }
  
  // 2. Verificar distribuição por categoria
  const categories = ['Brasileirão', 'Champions', 'Tech Esportiva', 'Mercado', 'Mascotes', 'Zoeira'];
  categories.forEach(cat => {
    const count = report.metrics.articlesByCategory[cat] || 0;
    if (count === 0) {
      report.warnings.push({
        type: 'EMPTY_CATEGORY',
        message: `Categoria "${cat}" sem artigos`,
        action: 'Gerar conteúdo para essa categoria'
      });
    }
  });
  
  // 3. Verificar freshness (artigos recentes)
  const now = new Date();
  const recentArticles = articles.filter(article => {
    const publishedAt = new Date(article.publishedAt);
    const hoursDiff = (now - publishedAt) / (1000 * 60 * 60);
    return hoursDiff < 24;
  });
  
  report.metrics.articlesLast24h = recentArticles.length;
  
  if (recentArticles.length === 0) {
    report.criticalIssues.push({
      type: 'STALE_CONTENT',
      message: 'Nenhum artigo publicado nas últimas 24h',
      action: 'Verificar se cron job está rodando'
    });
  }
  
  // 4. Verificar qualidade dos títulos
  const shortTitles = articles.filter(a => a.title.length < 30);
  if (shortTitles.length > 0) {
    report.suggestions.push({
      type: 'TITLE_QUALITY',
      message: `${shortTitles.length} artigos com títulos muito curtos`,
      action: 'Melhorar prompt de geração para títulos mais descritivos'
    });
  }
  
  // 5. Verificar breaking news
  const breakingNews = articles.filter(a => a.isBreaking);
  report.metrics.breakingNewsCount = breakingNews.length;
  
  if (breakingNews.length === 0) {
    report.suggestions.push({
      type: 'NO_BREAKING_NEWS',
      message: 'Nenhuma notícia marcada como breaking news',
      action: 'Adicionar lógica para detectar notícias urgentes'
    });
  }
  
  // 6. Sugestões de melhoria baseadas em métricas
  report.suggestions.push({
    type: 'CONTENT_EXPANSION',
    message: 'Criar mais conteúdo sobre mascotes e zoeira',
    action: 'Essas categorias têm alto potencial de engajamento'
  });
  
  report.suggestions.push({
    type: 'SEO_OPTIMIZATION',
    message: 'Adicionar mais tags e palavras-chave',
    action: 'Melhorar descoberta orgânica'
  });
  
  return report;
}

async function sendAlert(report) {
  // Placeholder para envio de alertas
  // Pode ser implementado com email, Slack, etc
  console.log('🚨 ALERTA CRÍTICO:', report.criticalIssues);
}

async function saveMonitoringReport(report) {
  // Salvar relatório em arquivo JSON
  // Por enquanto, apenas log
  console.log('📊 Relatório de Monitoramento:', JSON.stringify(report, null, 2));
}

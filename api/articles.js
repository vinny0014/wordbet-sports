// /api/articles.js
// API para ler artigos do sistema de persistência JSON

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {
    const { category, limit = 20 } = req.query;
    
    // Ler arquivo JSON de artigos
    const filePath = path.join(process.cwd(), 'public', 'data', 'articles.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    let articles = JSON.parse(fileContent);
    
    // Filtrar por categoria se especificado
    if (category && category !== 'all' && category !== 'intelligence') {
      const categoryMap = {
        'champions': 'Champions',
        'transfers': 'Mercado',
        'tech': 'Tech Esportiva',
        'brasileirao': 'Brasileirão',
        'medicina': 'Medicina'
      };
      
      const targetCategory = categoryMap[category] || category;
      articles = articles.filter(a => a.category === targetCategory);
    }
    
    // Atualizar timestamps dinamicamente
    articles = articles.map(article => {
      const published = new Date(article.publishedAt);
      const now = new Date();
      const diffMs = now - published;
      const diffMinutes = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      let timestamp;
      if (diffDays > 0) {
        timestamp = `${diffDays}d atrás`;
      } else if (diffHours > 0) {
        timestamp = `${diffHours}h atrás`;
      } else if (diffMinutes > 0) {
        timestamp = `${diffMinutes}m atrás`;
      } else {
        timestamp = 'Agora mesmo';
      }
      
      return {
        ...article,
        timestamp
      };
    });
    
    // Ordenar por data de publicação (mais recentes primeiro)
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    // Limitar quantidade
    articles = articles.slice(0, parseInt(limit));
    
    return res.status(200).json({
      success: true,
      count: articles.length,
      articles
    });
    
  } catch (error) {
    console.error('Erro ao ler artigos:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao carregar artigos',
      details: error.message
    });
  }
}

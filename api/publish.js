// /api/publish.js
// API para publicar novos artigos no sistema

import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Apenas aceitar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { article } = req.body;
    
    // Validar dados obrigatórios
    if (!article || !article.title || !article.summary || !article.category) {
      return res.status(400).json({
        success: false,
        error: 'Dados incompletos. Necessário: title, summary, category'
      });
    }
    
    // Ler arquivo atual
    const filePath = path.join(process.cwd(), 'public', 'data', 'articles.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const currentArticles = JSON.parse(fileContent);
    
    // Criar novo artigo com dados completos
    const newArticle = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9),
      title: article.title,
      summary: article.summary,
      category: article.category,
      imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1579952363873-27f3bade8f55?q=80&w=800&auto=format&fit=crop',
      timestamp: 'Agora mesmo',
      source: article.source || 'WordBet AI',
      author: article.author || 'Agente Redator',
      tags: article.tags || [],
      aiConfidence: article.precision || article.aiConfidence || 95,
      isBreaking: article.isBreaking || false,
      publishedAt: new Date().toISOString()
    };
    
    // Adicionar no início do array
    const updatedArticles = [newArticle, ...currentArticles];
    
    // Manter apenas as últimas 100 notícias
    const limitedArticles = updatedArticles.slice(0, 100);
    
    // Salvar arquivo atualizado
    fs.writeFileSync(filePath, JSON.stringify(limitedArticles, null, 2), 'utf-8');
    
    console.log(`[PUBLISH] Nova notícia publicada: ${newArticle.title}`);
    
    return res.status(200).json({
      success: true,
      message: 'Artigo publicado com sucesso',
      article: newArticle
    });
    
  } catch (error) {
    console.error('Erro ao publicar artigo:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao publicar artigo',
      details: error.message
    });
  }
}

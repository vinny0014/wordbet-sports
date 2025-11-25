// AGENTE MARKETING - WordBet AI
// Função: Divulgação automática 24/7 para atrair público
// Foco: Clubes, Mascotes, Alegria, Breaking News
// Autor: Grande Mestre Absoluto
// Data: 25/11/2025

export default async function handler(req, res) {
  // Verificar autenticação
  const secret = req.headers['x-cron-secret'];
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const campaigns = await executeMarketingCampaigns();
    
    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      campaigns
    });
    
  } catch (error) {
    console.error('Erro no Agente Marketing:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function executeMarketingCampaigns() {
  const campaigns = [];
  
  // 1. Buscar artigos mais recentes e relevantes
  const articlesResponse = await fetch('https://www.wordbet.com.br/api/articles');
  const articles = await articlesResponse.json();
  
  // Filtrar breaking news e artigos de mascotes/zoeira
  const breakingNews = articles.filter(a => a.isBreaking);
  const mascotesNews = articles.filter(a => 
    a.category === 'Mascotes' || 
    a.tags.some(tag => tag.toLowerCase().includes('mascote'))
  );
  const zoeiraNews = articles.filter(a => 
    a.category === 'Zoeira' || 
    a.tags.some(tag => ['humor', 'zoeira', 'meme'].includes(tag.toLowerCase()))
  );
  
  // 2. Gerar conteúdo para redes sociais
  const socialMediaPosts = [];
  
  // Breaking News (prioridade máxima)
  if (breakingNews.length > 0) {
    const article = breakingNews[0];
    socialMediaPosts.push({
      platform: 'twitter',
      content: generateTweet(article, 'breaking'),
      hashtags: ['BreakingNews', 'WordBetSports', ...article.tags],
      url: `https://www.wordbet.com.br/?article=${article.id}`
    });
  }
  
  // Mascotes (alto engajamento)
  if (mascotesNews.length > 0) {
    const article = mascotesNews[0];
    socialMediaPosts.push({
      platform: 'instagram',
      content: generateInstagramCaption(article, 'mascote'),
      hashtags: ['Mascotes', 'FutebolBrasileiro', 'WordBet', ...article.tags],
      url: `https://www.wordbet.com.br/?article=${article.id}`
    });
  }
  
  // Zoeira (viral potential)
  if (zoeiraNews.length > 0) {
    const article = zoeiraNews[0];
    socialMediaPosts.push({
      platform: 'tiktok',
      content: generateTikTokIdea(article),
      hashtags: ['FutebolHumor', 'Zoeira', 'WordBetSports'],
      url: `https://www.wordbet.com.br/?article=${article.id}`
    });
  }
  
  // 3. Estratégias por clube (torcidas organizadas)
  const clubes = [
    'Flamengo', 'Palmeiras', 'Corinthians', 'São Paulo',
    'Santos', 'Vasco', 'Botafogo', 'Fluminense',
    'Grêmio', 'Internacional'
  ];
  
  clubes.forEach(clube => {
    const clubeArticles = articles.filter(a => 
      a.title.includes(clube) || 
      a.tags.some(tag => tag.includes(clube))
    );
    
    if (clubeArticles.length > 0) {
      const article = clubeArticles[0];
      socialMediaPosts.push({
        platform: 'facebook',
        content: generateFacebookPost(article, clube),
        targetAudience: `Torcedores do ${clube}`,
        hashtags: [clube, 'WordBetSports'],
        url: `https://www.wordbet.com.br/?article=${article.id}`
      });
    }
  });
  
  campaigns.push({
    type: 'SOCIAL_MEDIA',
    posts: socialMediaPosts,
    timestamp: new Date().toISOString()
  });
  
  // 4. SEO e Content Marketing
  const seoStrategy = {
    type: 'SEO',
    keywords: extractTopKeywords(articles),
    suggestions: [
      'Criar backlinks em fóruns de futebol',
      'Submeter ao Google News',
      'Criar conteúdo evergreen sobre história dos clubes',
      'Otimizar meta descriptions com foco em mascotes'
    ]
  };
  
  campaigns.push(seoStrategy);
  
  // 5. Email Marketing (placeholder)
  const emailCampaign = {
    type: 'EMAIL',
    subject: 'Notícias Exclusivas do WordBet Sports! ⚽',
    highlights: [
      breakingNews[0]?.title || 'Últimas notícias',
      mascotesNews[0]?.title || 'Mascotes em destaque',
      'Análises exclusivas com IA'
    ]
  };
  
  campaigns.push(emailCampaign);
  
  return campaigns;
}

function generateTweet(article, type) {
  if (type === 'breaking') {
    return `🚨 URGENTE! ${article.title}\n\n${article.summary.substring(0, 100)}...\n\n⚽ Só no WordBet Sports!`;
  }
  return `⚽ ${article.title}\n\n${article.summary.substring(0, 120)}...`;
}

function generateInstagramCaption(article, type) {
  if (type === 'mascote') {
    return `🦁 MASCOTES EM AÇÃO!\n\n${article.title}\n\n${article.summary}\n\n⚽ Acesse WordBet Sports para mais!\n\n#FutebolBrasileiro #Mascotes #WordBet`;
  }
  return article.summary;
}

function generateTikTokIdea(article) {
  return {
    hook: '🤣 Você não vai acreditar nisso...',
    content: article.title,
    cta: 'Link na bio para ler mais! 👆',
    music: 'Trending sound sobre futebol'
  };
}

function generateFacebookPost(article, clube) {
  return `🔴⚪ ATENÇÃO TORCEDORES DO ${clube.toUpperCase()}!\n\n${article.title}\n\n${article.summary}\n\n⚽ Leia a análise completa no WordBet Sports - onde a IA encontra a paixão pelo futebol!\n\n#${clube} #WordBetSports`;
}

function extractTopKeywords(articles) {
  const keywords = {};
  
  articles.forEach(article => {
    article.tags.forEach(tag => {
      keywords[tag] = (keywords[tag] || 0) + 1;
    });
  });
  
  return Object.entries(keywords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword]) => keyword);
}

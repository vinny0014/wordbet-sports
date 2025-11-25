// GERADOR DE NOTÍCIAS COM OPENAI - WordBet AI
// Usa a API do OpenAI (já configurada no ambiente)
// Autor: Grande Mestre Absoluto
// Data: 25/11/2025

export default async function handler(req, res) {
  try {
    const { category = 'Geral', count = 3 } = req.query;
    
    // Gerar notícias usando OpenAI
    const noticias = [];
    
    for (let i = 0; i < count; i++) {
      const noticia = await gerarNoticiaComIA(category);
      noticias.push(noticia);
      
      // Publicar automaticamente
      await fetch('https://www.wordbet.com.br/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noticia)
      });
    }
    
    return res.status(200).json({
      success: true,
      geradas: noticias.length,
      category,
      noticias
    });
    
  } catch (error) {
    console.error('Erro ao gerar notícias:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function gerarNoticiaComIA(category) {
  const prompts = {
    'Geral': 'Crie uma notícia sobre futebol brasileiro atual, com foco em Brasileirão, times grandes e jogadores em destaque.',
    'Champions': 'Crie uma notícia sobre Champions League, times europeus, Real Madrid, Barcelona, Manchester City ou PSG.',
    'Mascotes': 'Crie uma notícia divertida sobre os mascotes dos clubes brasileiros, com humor e personalidade.',
    'Zoeira': 'Crie uma notícia humorística sobre futebol, com memes, zoeira e situações engraçadas do esporte.',
    'Tech': 'Crie uma notícia sobre tecnologia no futebol: IA, VAR, estatísticas, sensores, inovações.',
    'Mercado': 'Crie uma notícia sobre mercado da bola: transferências, valores, negociações, salários.'
  };
  
  const prompt = prompts[category] || prompts['Geral'];
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: `Você é um redator esportivo especializado em futebol. Crie notícias no estilo do WordBet AI: profissional, com dados, análise técnica e um toque de humor inteligente.

FORMATO DE RESPOSTA (JSON):
{
  "title": "Título chamativo com emoji (máx 100 chars)",
  "summary": "Resumo de 2-3 linhas",
  "content": "Conteúdo completo com 3-4 parágrafos",
  "tags": ["tag1", "tag2", "tag3"],
  "club": "Nome do clube principal ou 'Geral'",
  "precision": 85-95 (número de precisão da análise)
}`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 800
    })
  });
  
  const data = await response.json();
  const conteudo = JSON.parse(data.choices[0].message.content);
  
  return {
    id: `noticia-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: conteudo.title,
    summary: conteudo.summary,
    content: conteudo.content,
    category: category,
    club: conteudo.club || 'Geral',
    tags: conteudo.tags || [category, 'Futebol'],
    author: 'WordBet AI',
    precision: conteudo.precision || Math.floor(85 + Math.random() * 10),
    timestamp: new Date().toISOString(),
    isBreaking: Math.random() > 0.7 // 30% de chance de ser breaking news
  };
}

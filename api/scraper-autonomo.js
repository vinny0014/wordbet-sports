// SCRAPER AUTÔNOMO - WordBet AI
// Função: Buscar notícias de fontes públicas SEM API keys
// Autor: Grande Mestre Absoluto
// Data: 25/11/2025

export default async function handler(req, res) {
  try {
    const noticias = await buscarNoticiasPublicas();
    
    return res.status(200).json({
      success: true,
      total: noticias.length,
      noticias
    });
    
  } catch (error) {
    console.error('Erro no Scraper Autônomo:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function buscarNoticiasPublicas() {
  const fontes = [
    'https://www.espn.com.br/futebol/',
    'https://ge.globo.com/',
    'https://www.lance.com.br/futebol'
  ];
  
  const noticias = [];
  
  // Buscar de cada fonte
  for (const fonte of fontes) {
    try {
      const response = await fetch(fonte, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const html = await response.text();
      
      // Extrair títulos e links (regex simples)
      const matches = html.matchAll(/<a[^>]*href="([^"]*)"[^>]*>([^<]{20,100})<\/a>/gi);
      
      for (const match of matches) {
        const url = match[1];
        const titulo = match[2].trim();
        
        // Filtrar apenas notícias de futebol
        if (isFutebolRelacionado(titulo)) {
          noticias.push({
            titulo,
            url: url.startsWith('http') ? url : fonte + url,
            fonte: new URL(fonte).hostname,
            timestamp: new Date().toISOString()
          });
        }
        
        if (noticias.length >= 20) break;
      }
      
    } catch (error) {
      console.error(`Erro ao buscar de ${fonte}:`, error.message);
    }
  }
  
  return noticias.slice(0, 15); // Retornar top 15
}

function isFutebolRelacionado(texto) {
  const keywords = [
    'flamengo', 'palmeiras', 'corinthians', 'são paulo', 'santos',
    'vasco', 'botafogo', 'fluminense', 'grêmio', 'internacional',
    'gol', 'vitória', 'derrota', 'campeonato', 'brasileirão',
    'libertadores', 'champions', 'técnico', 'jogador', 'escalação'
  ];
  
  const textoLower = texto.toLowerCase();
  return keywords.some(keyword => textoLower.includes(keyword));
}

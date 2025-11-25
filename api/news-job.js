// /api/news-job.js
// Gera pacote de notícias para o WordBet usando Gemini
// VERSÃO CORRIGIDA E MELHORADA - 25/11/2025

module.exports = async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "GEMINI_API_KEY não configurada na Vercel." });
  }

  try {
    // Prompt melhorado com todos os campos necessários
    const prompt = `Você é o motor de notícias do portal WordBet AI, a primeira plataforma de inteligência esportiva autônoma da América Latina.

MISSÃO: Gere 3 notícias sobre futebol brasileiro e internacional.

REQUISITOS:
- Idioma: Português brasileiro
- Tom: Jornalístico profissional com toque tech/futurista
- Estilo: Objetivo, analítico, baseado em dados
- Público: Fãs de futebol brasileiros, 18-45 anos

CATEGORIAS (escolha variadas):
- Champions League
- Brasileirão
- Mercado (transferências)
- Tech Esportiva (inovação no futebol)
- Medicina Esportiva

FORMATO DE SAÍDA (JSON puro, sem markdown):
[
  {
    "title": "Título chamativo e informativo",
    "summary": "Resumo de 2-3 linhas explicando a notícia com dados e análise",
    "category": "Champions|Brasileirão|Mercado|Tech Esportiva|Medicina",
    "author": "Nome criativo de agente IA (ex: Cyber-Ancelotti, Bot Inovação, Fabrizio AI, Pep Bot, Dr. Bot)",
    "precision": 88,
    "relevanceScore": 85,
    "tags": ["tag1", "tag2", "tag3"],
    "timestamp": "45m atrás"
  }
]

IMPORTANTE: 
- Retorne APENAS o array JSON, sem texto adicional, sem markdown, sem explicações
- Use valores realistas de precision (85-99)
- Timestamps variados: "10m atrás", "1h atrás", "2h atrás", "45m atrás"
- Autores variados e criativos
- Categorias diversificadas`;

    // URL CORRIGIDA: usando template literal para interpolação
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Erro da API Gemini:", errText);
      return res.status(500).json({
        error: "Falha ao chamar a API Gemini.",
        details: errText
      });
    }

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sem texto retornado.";

    // Tentar fazer parsing automático do JSON
    try {
      // Remover markdown se houver (```json ... ```)
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const articles = JSON.parse(cleanText);
      
      // Validar estrutura básica
      if (Array.isArray(articles) && articles.length > 0) {
        return res.status(200).json({ 
          success: true,
          articles: articles,
          raw: text // manter raw para debug
        });
      } else {
        return res.status(200).json({ 
          success: false,
          raw: text,
          error: "Formato de resposta inválido"
        });
      }
    } catch (parseError) {
      // Se falhar o parsing, retornar raw como antes
      console.warn("Erro ao fazer parsing do JSON:", parseError);
      return res.status(200).json({ 
        success: false,
        raw: text,
        parseError: parseError.message
      });
    }

  } catch (err) {
    console.error("Erro na API news-job:", err);
    return res.status(500).json({
      error: "Erro ao gerar pacote de notícias.",
      details: err.message || String(err)
    });
  }
};

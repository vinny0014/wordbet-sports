// /api/news-job.js
// Gera pacote de notícias para o WordBet usando Gemini

module.exports = async function handler(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "GEMINI_API_KEY não configurada na Vercel." });
  }

  try {
    const prompt =
      "Você é o motor de notícias do portal WordBet. Gere 3 notícias curtas e bem " +
      "objetivas sobre futebol (jogos recentes, mercado da bola ou bastidores). " +
      "Responda em JSON puro com o seguinte formato: " +
      "[{title, summary, category, relevanceScore, tags}]";

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent" +
      `?key=${apiKey}`;

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

    // Aqui eu devolvo o texto cru da IA.
    // Depois a gente pode melhorar pra já retornar JSON parsed.
    return res.status(200).json({ raw: text });
  } catch (err) {
    console.error("Erro na API news-job:", err);
    return res.status(500).json({
      error: "Erro ao gerar pacote de notícias.",
      details: err.message || String(err)
    });
  }
};

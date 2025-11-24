import { GoogleGenAI } from "@google/genai";

// NOTE: In a real deployment, process.env.API_KEY would be used.
const apiKey = process.env.API_KEY || 'DEMO_KEY'; 
const ai = new GoogleGenAI({ apiKey });

export const generateQuickAnalysis = async (topic: string): Promise<string> => {
  try {
    if (apiKey === 'DEMO_KEY') {
        return `[MODO DEMO - AGENTE OFF-LINE] 
        
        A IA analisou "${topic}" com base em 4.300 pontos de dados históricos.
        
        1. **Análise Tática:** Variação estatística detectada na defesa. O time apresenta sinais de fadiga mental pós-Libertadores, resultando em um aumento de 12% em passes errados no terço final.
        
        2. **Fator Psicológico:** A pressão da torcida está gerando um "Ruído Cognitivo" nos jogadores mais jovens.
        
        3. **Previsão:** 65% de chance de empate se o primeiro gol não sair até os 20 minutos.
        
        Recomendação: Cuidado com contra-ataques pelos flancos e arbitragem rigorosa.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Atue como um Jornalista Esportivo Cibernético do ano 2077. Sua tarefa é fazer uma análise profunda e técnica sobre: "${topic}".
      
      Diretrizes:
      - Use termos técnicos misturados com linguagem futurista (ex: "coeficiente de raça", "algoritmo da cera", "processamento tático").
      - Seja imparcial mas ácido.
      - Estruture a resposta em tópicos curtos para fácil leitura.
      - O tom deve ser sério, mas com um leve toque de superioridade de máquina.
      - Responda em Português do Brasil.`,
    });

    return response.text || "Fluxo de dados interrompido. Tentando reconexão com satélite...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Link neural instável. Usando modelos analíticos em cache de emergência.";
  }
};

export const generateRoast = async (team: string): Promise<string> => {
    try {
        if (apiKey === 'DEMO_KEY') {
            return `Análise completa: O ${team} tem 99% de chance de iludir o torcedor este ano baseando-se em dados históricos de decepção.`;
        }
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Crie uma piada curta ou provocação (zoeira) de futebol sobre o time: ${team}. Estilo "twitter de futebol", engraçada, ácida e original. Não use clichês velhos. Responda em Português.`,
        });
        return response.text || "";
    } catch (error) {
        return "Módulo de humor reiniciando...";
    }
}

// New Function: Generates a full "Breaking News" article optimized for SEO/AdSense
export const generateBreakingNews = async (context: string): Promise<{ title: string, summary: string, category: string, tags: string[] }> => {
  try {
    if (apiKey === 'DEMO_KEY') {
      return {
        title: "BOMBA: Negociação Secreta Revelada por Drones",
        summary: "Imagens de satélite confirmam reunião entre dirigentes e craque mundial em ilha privada. O mercado vai explodir.",
        category: "Mercado",
        tags: ["Bomba", "Exclusivo", "Mercado"]
      };
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Atue como um Editor Chefe Sênior de um portal de notícias esportivas de elite (nível GE, ESPN, The Athletic).
      
      CONTEXTO: Gere uma notícia de "Última Hora" (Breaking News) fictícia mas EXTREMAMENTE realista sobre: "${context}".

      REGRAS DE ESCRITA (FATOR HUMANO & SEO):
      1. **Título:** Deve ser magnético, urgente e otimizado para CTR (Click Through Rate). Use gatilhos mentais.
      2. **Resumo:** Escreva 2 parágrafos curtos. O tom deve ser investigativo e sério. NÃO use frases como "No mundo do futebol..." ou "Em uma reviravolta...". Vá direto ao ponto.
      3. **Humanização:** O texto deve parecer 100% escrito por um humano especialista. Use jargões reais de jornalismo esportivo (ex: "fontes ligadas à diretoria", "bastidores fervendo", "apuração exclusiva").
      4. **SEO:** Inclua palavras-chave de alto valor para AdSense no nicho esportivo.

      FORMATO DE RESPOSTA (JSON PURO):
      { 
        "title": "Titulo aqui", 
        "summary": "Resumo aqui", 
        "category": "Uma destas: Mercado, Brasileirão, Champions, Crise, Polêmica", 
        "tags": ["tag1", "tag2", "tag3"] 
      }
      
      Retorne APENAS o JSON.`,
    });

    const text = response.text || "";
    // Clean markdown if present
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);

  } catch (error) {
    console.error("GenAI Error", error);
    return {
        title: "ERRO NA MATRIZ: Atualização Corrompida",
        summary: "Nossos agentes detectaram uma falha na realidade simulada do futebol. Aguarde reinicialização.",
        category: "System",
        tags: ["Error", "Glitch"]
    };
  }
};

// New Function: Updates Mascot personality based on a "Match Result"
export const generateMascotEvolution = async (mascotName: string, team: string): Promise<{ description: string, specialAbility: string, mood: string }> => {
    try {
        if (apiKey === 'DEMO_KEY') {
            return {
                description: "O mascote está em fúria após o último resultado. Níveis de estresse em 90%.",
                specialAbility: "Grito do Caos",
                mood: "FURIOUS"
            };
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Você é o Agente Coordenador de Mascotes. O Campeonato Brasileiro acabou de ter uma rodada.
            
            Time: ${team}
            Mascote: ${mascotName}
            
            TAREFA:
            1. Invente um resultado para a rodada (Vitória Heroica, Derrota Humilhante ou Empate com Polêmica).
            2. Baseado nisso, altere a personalidade do mascote. Se perdeu, ele está bravo/triste. Se ganhou, está soberbo/feliz.
            3. Escreva uma nova descrição visual e emocional para ele.
            
            FORMATO JSON:
            {
                "description": "Descrição curta e divertida do estado atual dele. Ex: 'Visto chorando no vestiário...' ou 'Está voando alto com capa dourada...'",
                "specialAbility": "Uma nova habilidade baseada no momento (ex: 'Escudo Anti-Crise', 'Ataque de Risada').",
                "mood": "WIN" (se ganhou) ou "LOSS" (se perdeu) ou "NEUTRAL" (empate)
            }
            Retorne APENAS o JSON.`,
        });

        const text = response.text || "";
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        return {
            description: "Dados do mascote indisponíveis momentaneamente.",
            specialAbility: "Recuperação de Sistema",
            mood: "NEUTRAL"
        };
    }
}
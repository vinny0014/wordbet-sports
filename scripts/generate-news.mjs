import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const newsFilePath = path.join(__dirname, '../data/news.json');

// Categorias de notícias
const categories = [
  'CHAMPIONS',
  'BRASILEIRÃO',
  'MERCADO',
  'TECH ESPORTIVA',
  'MEDICINA'
];

// Prompts para gerar notícias
const prompts = {
  'CHAMPIONS': 'Gere uma notícia sobre Champions League com análise de IA e precisão entre 85-99%',
  'BRASILEIRÃO': 'Gere uma notícia sobre Campeonato Brasileiro com análise tática e precisão entre 88-95%',
  'MERCADO': 'Gere uma notícia sobre mercado de transferências com análise de dados e precisão entre 80-92%',
  'TECH ESPORTIVA': 'Gere uma notícia sobre tecnologia no futebol com análise inovadora e precisão entre 85-98%',
  'MEDICINA': 'Gere uma notícia sobre medicina esportiva e lesões com análise médica e precisão entre 82-94%'
};

async function generateNews() {
  try {
    // Ler notícias existentes
    let existingNews = [];
    if (fs.existsSync(newsFilePath)) {
      const data = fs.readFileSync(newsFilePath, 'utf-8');
      existingNews = JSON.parse(data);
    }

    // Selecionar categoria aleatória
    const category = categories[Math.floor(Math.random() * categories.length)];
    const precision = Math.floor(Math.random() * (99 - 85 + 1)) + 85;

    // Gerar notícia (simulada sem ChatGPT para não gastar créditos)
    const newNews = {
      id: Date.now(),
      title: `Análise de IA: ${category} - ${new Date().toLocaleString('pt-BR')}`,
      category: category,
      precision: precision,
      content: `Notícia gerada automaticamente via GitHub Actions. Categoria: ${category}. Precisão: ${precision}%`,
      timestamp: new Date().toISOString(),
      author: 'IA Autônoma'
    };

    // Adicionar nova notícia no início
    existingNews.unshift(newNews);

    // Manter apenas as últimas 50 notícias
    if (existingNews.length > 50) {
      existingNews = existingNews.slice(0, 50);
    }

    // Salvar notícias atualizadas
    fs.writeFileSync(newsFilePath, JSON.stringify(existingNews, null, 2));
    console.log(`✅ Notícia gerada com sucesso: ${newNews.title}`);

  } catch (error) {
    console.error('❌ Erro ao gerar notícia:', error);
    process.exit(1);
  }
}

generateNews();

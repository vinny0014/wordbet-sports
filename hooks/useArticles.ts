import { useState, useEffect } from 'react';
import { Article } from '../types';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/articles');
        if (!response.ok) throw new Error('Failed to fetch articles');
        
        const data = await response.json();
        // Converter dados do banco para formato do frontend
        const formattedArticles = data.map((article: any) => ({
          id: article.id?.toString() || Date.now().toString(),
          title: article.title || 'Sem título',
          summary: article.content?.substring(0, 200) || 'Sem resumo',
          category: article.category || 'Geral',
          imageUrl: article.imageUrl || 'https://images.unsplash.com/photo-1579952363873-27f3bade8f55?q=80&w=800&auto=format&fit=crop',
          author: article.author || 'IA Autônoma',
          precision: article.precision || 85,
          timestamp: article.createdAt ? new Date(article.createdAt).toLocaleTimeString('pt-BR') : 'Agora',
          votes: 0,
        }));
        
        setArticles(formattedArticles);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError(err instanceof Error ? err.message : 'Erro ao buscar artigos');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
    // Atualizar a cada 5 minutos
    const interval = setInterval(fetchArticles, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { articles, loading, error };
}

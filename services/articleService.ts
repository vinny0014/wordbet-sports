import { Article } from '../types';

/**
 * Busca artigos do backend
 */
export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch('/api/articles');
    if (!response.ok) throw new Error('Failed to fetch articles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

/**
 * Busca artigos por categoria
 */
export async function fetchArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const response = await fetch(`/api/articles?category=${encodeURIComponent(category)}`);
    if (!response.ok) throw new Error('Failed to fetch articles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

/**
 * Busca artigos das últimas 4 horas
 */
export async function fetchLatestArticles(hours: number = 4): Promise<Article[]> {
  try {
    const response = await fetch(`/api/articles?hours=${hours}`);
    if (!response.ok) throw new Error('Failed to fetch latest articles');
    return await response.json();
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
}

/**
 * Busca um artigo por ID
 */
export async function fetchArticleById(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`/api/articles/${id}`);
    if (!response.ok) throw new Error('Failed to fetch article');
    return await response.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

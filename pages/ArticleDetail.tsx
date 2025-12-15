import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import VoteButton from '../components/VoteButton';

interface ArticleDetailProps {
  articleId: string;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ articleId }) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/articles/${articleId}`);
        if (!response.ok) throw new Error('Article not found');
        
        const data = await response.json();
        const formattedArticle: Article = {
          id: data.id?.toString() || articleId,
          title: data.title || 'Sem título',
          summary: data.content?.substring(0, 200) || 'Sem resumo',
          category: data.category || 'Geral',
          imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1579952363873-27f3bade8f55?q=80&w=800&auto=format&fit=crop',
          author: data.author || 'IA Autônoma',
          precision: data.precision || 85,
          timestamp: data.createdAt ? new Date(data.createdAt).toLocaleTimeString('pt-BR') : 'Agora',
          votes: 0,
        };
        
        setArticle(formattedArticle);
        
        // SEO: Atualizar meta tags
        document.title = `${formattedArticle.title} | WordBet AI`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', formattedArticle.summary);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return <div style={{ padding: '20px', color: '#00FF00' }}>Carregando artigo...</div>;
  }

  if (!article) {
    return <div style={{ padding: '20px', color: '#FF0000' }}>Artigo não encontrado</div>;
  }

  return (
    <div style={{ padding: '20px', color: '#00FF00', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{article.title}</h1>
      
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#999' }}>
        <p>
          <strong>Categoria:</strong> {article.category} | 
          <strong> Precisão:</strong> {article.precision}% | 
          <strong> Autor:</strong> {article.author} | 
          <strong> Publicado:</strong> {article.timestamp}
        </p>
      </div>

      <img
        src={article.imageUrl}
        alt={article.title}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
      />

      <div style={{ lineHeight: '1.6', marginBottom: '20px' }}>
        {article.summary}
      </div>

      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #333' }}>
        <VoteButton itemId={article.id} itemType="article" initialVotes={article.votes} />
      </div>

      {/* Schema Article para SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.summary,
          image: article.imageUrl,
          author: {
            '@type': 'Person',
            name: article.author,
          },
          datePublished: new Date().toISOString(),
        })}
      </script>
    </div>
  );
};

export default ArticleDetail;

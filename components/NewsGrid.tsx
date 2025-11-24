
import React, { useState, useRef } from 'react';
import { Article } from '../types';
import SpotlightCard from './SpotlightCard';

interface NewsGridProps {
  articles: Article[];
  onAnalyze: (articleId: string) => void;
}

const NewsGrid: React.FC<NewsGridProps> = ({ articles, onAnalyze }) => {
  const featuredArticle = articles.find(a => a.isBreaking) || articles[0];
  const otherArticles = articles.filter(a => a.id !== featuredArticle.id);

  // 3D Tilt Logic for Featured Card
  const featuredRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMoveFeatured = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!featuredRef.current) return;
    const rect = featuredRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -2; // Max rotation deg
    const rotateY = ((x - centerX) / centerX) * 2;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeaveFeatured = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Wrapper to prevent click when selecting text
  const handleSafeClick = (id: string) => {
    const selection = window.getSelection();
    // If there is a text selection, assume the user is reading/highlighting and do not trigger the modal
    if (selection && selection.toString().length > 0) {
      return;
    }
    onAnalyze(id);
  };

  return (
    <div className="space-y-8">
      
      {/* Featured Article - 3D Tilt Effect */}
      <div 
        ref={featuredRef}
        onMouseMove={handleMouseMoveFeatured}
        onMouseLeave={handleMouseLeaveFeatured}
        className="relative group cursor-pointer perspective-1000" 
        onClick={() => handleSafeClick(featuredArticle.id)}
      >
         <div 
            className="relative overflow-hidden rounded-sm border border-white/10 transition-transform duration-200 ease-out shadow-2xl"
            style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)` }}
         >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
            <img 
                src={featuredArticle.imageUrl} 
                alt={featuredArticle.title}
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
            />
            
            {/* Shine Effect on Tilt */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent z-10 pointer-events-none transition-opacity duration-500"></div>

            <div className="absolute bottom-0 left-0 p-8 z-20 max-w-4xl translate-z-10" style={{ transform: 'translateZ(20px)' }}>
                <span className="inline-block px-3 py-1 bg-tesla-red text-white text-xs font-bold uppercase tracking-widest mb-3 animate-pulse shadow-[0_0_10px_#E82127]">
                    DESTAQUE DO ALGORITMO
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-none group-hover:text-neon-blue transition-colors drop-shadow-lg">
                    {featuredArticle.title}
                </h2>
                <p className="text-lg text-gray-200 mb-4 line-clamp-2 font-light drop-shadow-md">
                    {featuredArticle.summary}
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                    <span className="text-neon-blue">AUTOR: {featuredArticle.author}</span>
                    <span>•</span>
                    <span>{featuredArticle.timestamp}</span>
                    <span>•</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded border border-white/5">{featuredArticle.category}</span>
                </div>
            </div>
         </div>
      </div>

      {/* Secondary Grid using SpotlightCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherArticles.map((article) => (
          <SpotlightCard 
            key={article.id} 
            onClick={() => handleSafeClick(article.id)}
            className="h-full cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden border-b border-white/5">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute top-2 right-2 bg-black/90 backdrop-blur-md px-2 py-1 border border-white/10">
                <span className="text-[10px] font-mono text-neon-green font-bold">{article.aiConfidence}% PRECISÃO</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-display uppercase tracking-widest text-neon-blue">{article.category}</span>
                  <span className="text-[10px] font-mono text-gray-500">{article.timestamp}</span>
              </div>
              
              <h3 className="text-lg font-display font-bold text-white mb-3 leading-tight group-hover:text-neon-blue transition-colors">
                {article.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                {article.summary}
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase text-gray-500 font-mono">Por: {article.author}</span>
                  </div>
                  <button 
                    className="text-xs font-bold text-white hover:text-neon-blue flex items-center gap-1 transition-colors uppercase tracking-wider group/btn"
                  >
                    LER ANÁLISE
                    <svg className="w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;

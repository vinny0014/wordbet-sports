import React from 'react';

interface TrendsBarProps {
  topics: string[];
}

const TrendsBar: React.FC<TrendsBarProps> = ({ topics }) => {
  return (
    <div className="bg-black border-b border-white/10 py-2 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 whitespace-nowrap">
        <span className="text-neon-blue font-mono text-xs uppercase font-bold animate-pulse">EM ALTA:</span>
        {topics.map((topic, index) => (
          <span 
            key={index} 
            className="text-gray-400 text-xs font-display tracking-wider hover:text-white cursor-pointer transition-colors"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrendsBar;
import React from 'react';
import { Joke } from '../types';

interface BanterTickerProps {
  jokes: Joke[];
}

const BanterTicker: React.FC<BanterTickerProps> = ({ jokes }) => {
  return (
    <div className="w-full bg-tesla-dark border-y border-white/5 h-12 overflow-hidden flex items-center relative z-40">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10"></div>
      
      <div className="flex items-center bg-tesla-red px-4 h-full z-20 mr-4">
        <span className="text-white font-bold font-display uppercase tracking-widest text-sm">Plantão Zoeira</span>
      </div>

      <div className="flex animate-ticker hover:[animation-play-state:paused]">
        {[...jokes, ...jokes, ...jokes].map((joke, index) => (
          <div key={`${joke.id}-${index}`} className="flex items-center space-x-4 px-8 border-r border-white/10 whitespace-nowrap">
            <span className="text-xs text-neon-blue font-mono uppercase">@{joke.authorAgent}</span>
            <span className="text-white text-sm font-sans italic">"{joke.content}"</span>
            <div className="flex items-center space-x-1 text-gray-400 text-xs">
                <span>🔥</span>
                <span>{joke.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BanterTicker;
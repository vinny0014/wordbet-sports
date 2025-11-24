
import React from 'react';
import { Mascot } from '../types';
import SpotlightCard from './SpotlightCard';

interface MascotShowcaseProps {
  mascots: Mascot[];
}

const MascotShowcase: React.FC<MascotShowcaseProps> = ({ mascots }) => {
  return (
    <div className="space-y-8">
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
            <div>
                <h2 className="text-3xl font-display font-bold text-white uppercase">Laboratório de Mascotes</h2>
                <p className="text-gray-400 font-mono text-sm mt-2">Análise biométrica e mística das entidades dos clubes.</p>
            </div>
            <div className="hidden md:block text-neon-green font-mono text-xs animate-pulse">
                ESCANEAMENTO ATIVO...
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mascots.map((mascot) => (
            <SpotlightCard key={mascot.id} className="flex flex-col">
                <div className="h-48 relative overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                    {/* Fallback image logic handled by browser, utilizing text if image fails, but using placeholder from constants */}
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600">
                         <img src={mascot.imageUrl} alt={mascot.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black to-transparent">
                        <span className="text-neon-blue font-display font-bold text-xl uppercase">{mascot.name}</span>
                    </div>
                </div>
                
                <div className="p-4 space-y-4 flex-grow">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-xs uppercase tracking-widest">{mascot.team}</span>
                        <span className="text-white font-mono text-xs px-2 py-1 bg-white/10 rounded">NVL {mascot.powerLevel}</span>
                    </div>

                    <p className="text-gray-300 text-sm leading-snug h-16 overflow-hidden">
                        {mascot.description}
                    </p>

                    {/* Stats Bars */}
                    <div className="space-y-2 font-mono text-[10px] uppercase text-gray-500">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Agressividade</span>
                                <span className="text-white">{mascot.aggression}%</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1 rounded-full">
                                <div className="bg-tesla-red h-1 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_#E82127]" style={{ width: `${mascot.aggression}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Potencial de Meme</span>
                                <span className="text-white">{mascot.memePotential}%</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1 rounded-full">
                                <div className="bg-neon-green h-1 rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_#0aff00]" style={{ width: `${mascot.memePotential}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 mt-auto">
                        <span className="block text-[10px] text-neon-blue mb-1">Habilidade Especial:</span>
                        <span className="text-white text-xs font-bold">{mascot.specialAbility}</span>
                    </div>
                </div>
            </SpotlightCard>
        ))}
        </div>
    </div>
  );
};

export default MascotShowcase;

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import BanterTicker from './components/BanterTicker';
import TrendsBar from './components/TrendsBar';
import AgentMonitor from './components/AgentMonitor';
import NewsGrid from './components/NewsGrid';
import MascotShowcase from './components/MascotShowcase';
import Footer from './components/Footer';
import MagicCursor from './components/MagicCursor';
import { MOCK_ARTICLES, MOCK_JOKES, MOCK_MASCOTS, INITIAL_LOGS, TRENDING_TOPICS } from './constants';
import { Article, AgentLog, AgentStatus, Mascot, Joke } from './types';
import { generateQuickAnalysis, generateBreakingNews, generateMascotEvolution, generateRoast } from './services/geminiService';

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [mascots, setMascots] = useState<Mascot[]>(MOCK_MASCOTS);
  const [jokes, setJokes] = useState<Joke[]>(MOCK_JOKES);
  const [logs, setLogs] = useState<AgentLog[]>(INITIAL_LOGS);
  const [status, setStatus] = useState<AgentStatus>(AgentStatus.IDLE);
  const [activeTab, setActiveTab] = useState('intelligence');
  const [analysisModal, setAnalysisModal] = useState<{isOpen: boolean, content: string | null}>({ isOpen: false, content: null });
  const [isProcessingRound, setIsProcessingRound] = useState(false);

  // Filter Logic
  useEffect(() => {
    if (activeTab === 'intelligence') {
      setFilteredArticles(articles);
    } else if (activeTab === 'champions') {
      setFilteredArticles(articles.filter(a => a.category === 'Champions'));
    } else if (activeTab === 'transfers') {
        setFilteredArticles(articles.filter(a => a.category === 'Mercado'));
    } else if (activeTab === 'tech') {
        setFilteredArticles(articles.filter(a => a.category === 'Tech Esportiva'));
    } else if (activeTab === 'mascots' || activeTab === 'banter') {
         // These tabs have their own views, no grid needed directly
         setFilteredArticles([]);
    } else {
        setFilteredArticles(articles);
    }
  }, [activeTab, articles]);

  // --- SYSTEM: CENTRAL AGENT ORCHESTRATOR ---
  const addLog = (agent: string, message: string, statusType: 'INFO' | 'SUCCESS' | 'WARNING' = 'INFO') => {
      setLogs(prev => {
          const newLog: AgentLog = {
              id: Date.now().toString() + Math.random(),
              timestamp: new Date().toLocaleTimeString('pt-BR'),
              agent: agent as any,
              message: message,
              status: statusType
          };
          return [...prev, newLog].slice(-20);
      });
  };

  // --- AGENT JOB 1: NEWS SWEEPING & CONTENT GENERATION ---
  useEffect(() => {
    // This effect simulates the autonomous nature of the agents
    // Every 60 seconds, it tries to find "breaking news"
    const sweepInterval = setInterval(async () => {
        // 1. SCANNING
        setStatus(AgentStatus.SCANNING);
        addLog('SCANNER', 'Iniciando varredura global de fontes (Tier 1)...');
        
        await new Promise(r => setTimeout(r, 3000));
        
        // Chance to find news (higher for demo purposes)
        if (Math.random() > 0.4) {
            setStatus(AgentStatus.ANALYZING);
            addLog('RESEARCHER', 'Padrão anômalo detectado nas redes sociais. Cruzando dados...', 'WARNING');
            
            // 2. WRITING (Generative AI)
            await new Promise(r => setTimeout(r, 2000));
            setStatus(AgentStatus.WRITING);
            addLog('WRITER', 'Redigindo artigo otimizado para SEO (High CPC)...');
            
            // Pick a random topic context for variety
            const contexts = [
                "Crise no Flamengo", "Demissão de Técnico Série A", "Venda de Joia do Palmeiras", 
                "Neymar no Santos", "Escândalo de Arbitragem VAR", "Real Madrid contrata Brasileiro",
                "Finanças de SAFs Brasileiras", "Lesão de Craque da Seleção"
            ];
            const randomContext = contexts[Math.floor(Math.random() * contexts.length)];
            
            const newNews = await generateBreakingNews(randomContext);
            
            // 3. HUMANIZING & SEO (Simulated Steps)
            addLog('EDITOR', 'Revisão humana simulada: Aprovado. Tom de voz: Jornalístico.', 'INFO');
            await new Promise(r => setTimeout(r, 1000));
            addLog('SEO_BOT', 'Indexando keywords para AdSense e Google News.', 'SUCCESS');
            
            // 4. PUBLISHING
            setStatus(AgentStatus.PUBLISHING);
            const newArticle: Article = {
                id: Date.now().toString(),
                title: newNews.title,
                summary: newNews.summary,
                category: newNews.category || 'Plantão',
                imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade8f55?q=80&w=800&auto=format&fit=crop", // Generic dynamic Football image
                timestamp: 'Agora mesmo',
                source: 'WordBet News',
                author: 'Agente Redator Sênior',
                tags: newNews.tags || [],
                aiConfidence: 99.5,
                isBreaking: true
            };

            setArticles(prev => [newArticle, ...prev]);
            addLog('PUBLISHER', `Artigo "${newNews.title.substring(0, 25)}..." publicado.`, 'SUCCESS');
            setStatus(AgentStatus.IDLE);
        } else {
            addLog('SCANNER', 'Nenhuma notícia de alto impacto encontrada. Otimizando cache.', 'INFO');
            setStatus(AgentStatus.IDLE);
        }

    }, 60000); // Runs every 60s

    return () => clearInterval(sweepInterval);
  }, []);

  // --- AGENT JOB 2: MASCOT OPERATIONS & BANTER ---
  const handleRoundUpdate = async () => {
      if (isProcessingRound) return;
      setIsProcessingRound(true);
      
      addLog('MASTER', 'INICIANDO PROTOCOLO: PÓS-RODADA', 'WARNING');
      setStatus(AgentStatus.ANALYZING);

      // 1. Update Jokes first (The Banter Agent)
      addLog('JESTER_BOT', 'Varrendo Twitter/X por lágrimas de torcedores...');
      const teamToRoast = mascots[Math.floor(Math.random() * mascots.length)].team;
      const newRoast = await generateRoast(teamToRoast);
      
      const newJoke: Joke = {
          id: Date.now().toString(),
          targetTeam: teamToRoast,
          content: newRoast,
          likes: Math.floor(Math.random() * 5000),
          authorAgent: 'Agente-Zoeira-V2'
      };
      setJokes(prev => [newJoke, ...prev]);
      addLog('JESTER_BOT', 'Nova provocação gerada e rankeada.', 'SUCCESS');

      // 2. Evolve Mascots (The Coordinator Agent)
      addLog('BIO_LAB', 'Recalculando moral e status dos mascotes...');
      
      // Process updated mascots (update 2 random ones to save time/quota)
      const updatedMascots = [...mascots];
      // Shuffle indices
      const indicesToUpdate = Array.from({length: mascots.length}, (_, i) => i).sort(() => 0.5 - Math.random()).slice(0, 2);

      for (const index of indicesToUpdate) {
          const mascot = updatedMascots[index];
          addLog('BIO_LAB', `Simulando partida do ${mascot.team}...`);
          
          const evolution = await generateMascotEvolution(mascot.name, mascot.team);
          
          // Calculate new stats based on mood
          let newPower = mascot.powerLevel;
          let newAggro = mascot.aggression;
          
          if (evolution.mood === 'WIN') {
              newPower = Math.min(100, newPower + Math.floor(Math.random() * 5));
              newAggro = Math.max(20, newAggro - 5); // Less aggressive because happy
          } else if (evolution.mood === 'LOSS') {
              newPower = Math.max(10, newPower - Math.floor(Math.random() * 8));
              newAggro = Math.min(100, newAggro + 10); // Angry
          }

          updatedMascots[index] = {
              ...mascot,
              description: evolution.description,
              specialAbility: evolution.specialAbility,
              powerLevel: newPower,
              aggression: newAggro,
          };
      }
      
      setMascots(updatedMascots);
      addLog('MASTER', 'RODADA FINALIZADA. NOVAS HIERARQUIAS DEFINIDAS.', 'SUCCESS');
      setStatus(AgentStatus.IDLE);
      setIsProcessingRound(false);
  };

  const handleAnalyze = useCallback(async (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;

    setAnalysisModal({ isOpen: true, content: 'Inicializando link com Agente Analista...' });

    const analysis = await generateQuickAnalysis(`${article.title} - ${article.summary}`);
    setAnalysisModal({ isOpen: true, content: analysis });
  }, [articles]);

  const getHeaderImage = () => {
      switch(activeTab) {
          case 'mascots': return "https://images.unsplash.com/photo-1555862124-a5eb48d95d65?q=80&w=2000&auto=format&fit=crop";
          case 'banter': return "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop";
          case 'champions': return "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2000&auto=format&fit=crop";
          case 'transfers': return "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop";
          case 'tech': return "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop";
          default: return "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=2000&auto=format&fit=crop";
      }
  }

  const getHeaderTitle = () => {
      switch(activeTab) {
          case 'mascots': return "LABORATÓRIO DE MASCOTES";
          case 'banter': return "ZONA DE ZOEIRA";
          case 'champions': return "CHAMPIONS LEAGUE";
          case 'transfers': return "MERCADO DA BOLA";
          case 'tech': return "TECNOLOGIA ESPORTIVA";
          default: return "REDAÇÃO AUTÔNOMA";
      }
  }

  const getHeaderSubtitle = () => {
    switch(activeTab) {
        case 'mascots': return "Acompanhe a evolução emocional e física das entidades dos clubes.";
        case 'banter': return "Onde a tecnologia encontra a provocação.";
        case 'champions': return "A elite do futebol mundial sob a ótica da IA.";
        case 'transfers': return "Monitoramento via satélite de movimentações contratuais.";
        case 'tech': return "O futuro do esporte, hoje.";
        default: return "Nossos agentes varrem a internet 24/7 para criar notícias de alto nível antes da mídia tradicional.";
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neon-green selection:text-black flex flex-col relative overflow-x-hidden">
      {/* Magic Cursor Effect */}
      <MagicCursor />

      {/* Background Texture - Subtle Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: `radial-gradient(circle at center, transparent 0%, #000 100%), linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`,
             backgroundSize: '100% 100%, 40px 40px, 40px 40px' 
           }}>
      </div>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="pt-16 z-10 relative">
        <TrendsBar topics={TRENDING_TOPICS} />
        <BanterTicker jokes={jokes} />
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10 relative">
        
        {/* Dynamic Hero Header */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="lg:w-3/4 relative h-[350px] group overflow-hidden rounded-sm border border-white/10 bg-zinc-900 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <img 
                    src={getHeaderImage()}
                    alt="Header" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 max-w-2xl">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-neon-green text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest animate-pulse">
                            {activeTab === 'mascots' ? 'AGENTE COORDENADOR ATIVO' : 'LIVE FEED'}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-2 leading-none text-white drop-shadow-lg">
                        {getHeaderTitle()}
                    </h1>
                    <p className="text-gray-300 text-sm md:text-base mb-0 font-mono max-w-lg opacity-90">
                         {getHeaderSubtitle()}
                    </p>
                </div>
            </div>

            {/* Compact Monitor */}
            <div className="lg:w-1/4 h-[350px]">
                <AgentMonitor logs={logs} status={status} />
            </div>
        </div>

        {/* Main Content Area */}
        {['intelligence', 'champions', 'transfers', 'tech'].includes(activeTab) && (
            <>
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-2">
                    <h2 className="text-xl font-display font-bold uppercase tracking-wider text-neon-green">
                        {activeTab === 'intelligence' ? 'NOTÍCIAS EM TEMPO REAL' : `FEED: ${activeTab}`}
                    </h2>
                    <div className="flex gap-2 items-center">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase">Redator Autônomo: ON</span>
                    </div>
                </div>
                
                {filteredArticles.length > 0 ? (
                    <NewsGrid articles={filteredArticles} onAnalyze={handleAnalyze} />
                ) : (
                    <div className="h-64 flex items-center justify-center border border-white/10 border-dashed rounded-sm">
                        <p className="text-gray-500 font-mono">Nenhuma notícia encontrada para este filtro no momento.</p>
                    </div>
                )}
            </>
        )}

        {activeTab === 'mascots' && (
            <>
                <div className="mb-6 flex justify-between items-center border-b border-white/10 pb-4">
                    <div>
                        <h2 className="text-xl font-display font-bold text-white uppercase">Painel de Controle de Mascotes</h2>
                        <p className="text-gray-400 font-mono text-xs mt-1">Simule o impacto dos jogos na psique das entidades.</p>
                    </div>
                    <button 
                        onClick={handleRoundUpdate}
                        disabled={isProcessingRound}
                        className={`
                            px-6 py-3 bg-tesla-red/90 hover:bg-tesla-red text-white font-bold uppercase tracking-widest text-xs
                            border border-red-500/50 shadow-[0_0_20px_rgba(232,33,39,0.4)] hover:shadow-[0_0_30px_rgba(232,33,39,0.6)]
                            transition-all duration-300 clip-path-slant flex items-center gap-2
                            ${isProcessingRound ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        {isProcessingRound ? (
                            <><span className="animate-spin">⚙️</span> PROCESSANDO RODADA...</>
                        ) : (
                            <>⚠️ SIMULAR PÓS-JOGO</>
                        )}
                    </button>
                </div>
                <MascotShowcase mascots={mascots} />
            </>
        )}

        {activeTab === 'banter' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jokes.map((joke) => (
                    <div key={joke.id} className="bg-zinc-900/80 backdrop-blur-md border border-white/10 p-8 relative hover:border-neon-green transition-colors group rounded-sm">
                        <div className="absolute top-4 right-4 text-6xl opacity-10 text-white font-display group-hover:text-neon-green transition-colors">"</div>
                        <h3 className="text-neon-green font-mono mb-4 uppercase text-xs tracking-widest">Alvo: {joke.targetTeam}</h3>
                        <p className="text-xl md:text-2xl font-display font-bold text-white leading-tight mb-6">
                            {joke.content}
                        </p>
                        <div className="flex justify-between items-center border-t border-white/5 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px]">👾</div>
                                <span className="text-xs text-gray-500 font-mono uppercase">{joke.authorAgent}</span>
                            </div>
                            <button className="text-tesla-red text-xs font-bold hover:text-white transition-colors flex items-center gap-1">
                                ❤️ {joke.likes}
                            </button>
                        </div>
                    </div>
                ))}
             </div>
        )}

      </main>

      {/* Analysis Modal */}
      {analysisModal.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="bg-black border border-neon-green/30 p-8 max-w-2xl w-full relative shadow-[0_0_50px_rgba(10,255,0,0.15)]">
                <button 
                    onClick={() => setAnalysisModal({ isOpen: false, content: null })}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-neon-green animate-pulse"></div>
                    <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Relatório de Inteligência</h3>
                </div>
                
                <div className="font-mono text-sm text-gray-300 leading-relaxed border-l-2 border-neon-green pl-6 py-2 max-h-[60vh] overflow-y-auto pr-2 whitespace-pre-line">
                    {analysisModal.content}
                </div>
                
                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-[10px] text-gray-600 uppercase font-mono">Gerado via Gemini 2.5 Flash API</span>
                    <button className="text-xs text-black bg-neon-green hover:bg-white transition-colors px-4 py-2 font-bold uppercase tracking-wider">
                        Compartilhar Análise
                    </button>
                </div>
            </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;// Force rebuild Mon Dec 15 01:43:09 EST 2025
// Force rebuild - 1766013784

export enum AgentStatus {
  IDLE = 'AGUARDANDO',
  SCANNING = 'ESCANEANDO REDE',
  ANALYZING = 'PROCESSANDO DADOS',
  WRITING = 'GERANDO CONTEÚDO',
  PUBLISHING = 'PUBLICANDO',
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  imageUrl: string;
  timestamp: string;
  source: string;
  author: string; // Obrigatório para credibilidade
  tags: string[];
  aiConfidence: number;
  isBreaking?: boolean;
}

export interface Mascot {
  id: string;
  name: string;
  team: string;
  description: string;
  imageUrl: string;
  powerLevel: number; // 0-100
  aggression: number; // 0-100
  memePotential: number; // 0-100
  specialAbility: string;
}

export interface Joke {
  id: string;
  targetTeam: string;
  content: string;
  likes: number;
  authorAgent: string;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  agent: 'PESQUISADOR' | 'EDITOR' | 'PUBLICADOR' | 'MASTER';
  message: string;
  status: 'INFO' | 'SUCCESS' | 'WARNING';
}
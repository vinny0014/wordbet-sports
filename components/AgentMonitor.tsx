import React, { useEffect, useRef } from 'react';
import { AgentLog, AgentStatus } from '../types';

interface AgentMonitorProps {
  logs: AgentLog[];
  status: AgentStatus;
}

const AgentMonitor: React.FC<AgentMonitorProps> = ({ logs, status }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black border border-white/10 rounded-sm overflow-hidden flex flex-col h-full">
      <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status === AgentStatus.IDLE ? 'bg-gray-500' : 'bg-neon-green animate-pulse'}`}></div>
            <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">System Status: {status}</span>
        </div>
        <span className="text-[10px] text-gray-500 font-mono">V.2.4.0-ALPHA</span>
      </div>
      
      <div 
        ref={containerRef}
        className="p-4 font-mono text-xs overflow-y-auto h-64 scrollbar-hide bg-black/50 backdrop-blur-sm"
      >
        {logs.map((log) => (
          <div key={log.id} className="mb-1.5 opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
            <span className={`mr-2 font-bold ${
                log.agent === 'MASTER' ? 'text-neon-blue' : 
                log.agent === 'RESEARCHER' ? 'text-purple-400' : 
                log.agent === 'EDITOR' ? 'text-yellow-400' : 'text-white'
            }`}>
              {log.agent}
            </span>
            <span className="text-gray-300"> &gt; {log.message}</span>
          </div>
        ))}
      </div>
      
      <div className="h-32 border-t border-white/10 relative overflow-hidden">
        <svg className="w-full h-full absolute inset-0 opacity-20">
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="cyan" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center gap-8">
            {['Research', 'Optimize', 'Publish'].map((step, i) => (
                <div key={step} className="flex flex-col items-center gap-2 z-10">
                    <div className={`w-3 h-3 border border-neon-blue bg-black ${status !== AgentStatus.IDLE ? 'animate-ping' : ''} delay-${i*100}`}></div>
                    <span className="text-[9px] uppercase tracking-widest text-neon-blue">{step}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AgentMonitor;

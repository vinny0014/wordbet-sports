import React, { useState, useEffect } from 'react';

interface StatusData {
  lastCron: string;
  articlesCount: number;
  lastError: string | null;
  systemStatus: 'ONLINE' | 'OFFLINE' | 'PROCESSING';
  uptime: string;
}

const StatusPage: React.FC = () => {
  const [status, setStatus] = useState<StatusData>({
    lastCron: 'Carregando...',
    articlesCount: 0,
    lastError: null,
    systemStatus: 'PROCESSING',
    uptime: 'Calculando...',
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status');
        if (response.ok) {
          const data = await response.json();
          setStatus(data);
        }
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Atualizar a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-page" style={{ padding: '20px', color: '#00FF00', fontFamily: 'monospace' }}>
      <h1>⚙️ STATUS DO SISTEMA</h1>

      <div className="status-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div className="status-card" style={{ border: '2px solid #00FF00', padding: '15px', borderRadius: '5px' }}>
          <h2>Sistema</h2>
          <p>Status: <span style={{ color: status.systemStatus === 'ONLINE' ? '#00FF00' : '#FF0000' }}>{status.systemStatus}</span></p>
          <p>Uptime: {status.uptime}</p>
        </div>

        <div className="status-card" style={{ border: '2px solid #00FF00', padding: '15px', borderRadius: '5px' }}>
          <h2>Últimas Notícias</h2>
          <p>Artigos Publicados: {status.articlesCount}</p>
          <p>Último Cron: {status.lastCron}</p>
        </div>

        {status.lastError && (
          <div className="status-card error" style={{ border: '2px solid #FF0000', padding: '15px', borderRadius: '5px', gridColumn: '1 / -1' }}>
            <h2>⚠️ Último Erro</h2>
            <p>{status.lastError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusPage;

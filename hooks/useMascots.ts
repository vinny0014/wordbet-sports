import { useState, useEffect } from 'react';
import { Mascot } from '../types';

export function useMascots(region?: 'BR' | 'US') {
  const [mascots, setMascots] = useState<Mascot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMascots = async () => {
      try {
        setLoading(true);
        const url = region ? `/api/mascots?region=${region}` : '/api/mascots';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch mascots');
        
        const data = await response.json();
        // Converter dados do banco para formato do frontend
        const formattedMascots = data.map((mascot: any) => ({
          id: mascot.id?.toString() || Date.now().toString(),
          name: mascot.name || 'Mascote Desconhecido',
          team: mascot.team || 'Time Desconhecido',
          description: mascot.description || 'Sem descrição',
          imageUrl: mascot.imageUrl || `https://via.placeholder.com/150?text=${mascot.name}`,
          personality: mascot.personality || 'Misterioso',
          catchphrase: mascot.catchphrase || 'Sem bordão',
          votes: mascot.votes || 0,
          region: mascot.region || 'BR',
        }));
        
        setMascots(formattedMascots);
        setError(null);
      } catch (err) {
        console.error('Error fetching mascots:', err);
        setError(err instanceof Error ? err.message : 'Erro ao buscar mascotes');
      } finally {
        setLoading(false);
      }
    };

    fetchMascots();
    // Atualizar a cada 10 minutos
    const interval = setInterval(fetchMascots, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [region]);

  return { mascots, loading, error };
}

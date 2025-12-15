import React from 'react';
import { useMascots } from '../hooks/useMascots';
import VoteButton from '../components/VoteButton';

const MascotsGalleryUS: React.FC = () => {
  const { mascots, loading } = useMascots('US');

  if (loading) {
    return <div style={{ padding: '20px', color: '#00FF00' }}>Carregando mascotes internacionais...</div>;
  }

  return (
    <div style={{ padding: '20px', color: '#00FF00', fontFamily: 'monospace' }}>
      <h1>🌍 LAB DE MASCOTES - INTERNACIONAL</h1>
      <p>Análise biométrica e mística das entidades dos maiores clubes do mundo.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {mascots.map((mascot) => (
          <div
            key={mascot.id}
            style={{
              border: '2px solid #00FF00',
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src={mascot.imageUrl}
              alt={mascot.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
            />
            <h3>{mascot.name}</h3>
            <p><strong>Clube:</strong> {mascot.team}</p>
            <p><strong>Arquétipo:</strong> {mascot.personality}</p>
            <p><strong>Mantra:</strong> "{mascot.catchphrase}"</p>
            <p style={{ marginTop: '10px' }}>{mascot.description}</p>
            <VoteButton itemId={mascot.id} itemType="mascot" initialVotes={mascot.votes} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MascotsGalleryUS;

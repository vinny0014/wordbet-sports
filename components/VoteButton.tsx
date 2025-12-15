import React, { useState } from 'react';

interface VoteButtonProps {
  itemId: string;
  itemType?: 'article' | 'mascot';
  initialVotes?: number;
  onVoteSuccess?: (votes: number) => void;
}

const VoteButton: React.FC<VoteButtonProps> = ({ 
  itemId, 
  itemType = 'article', 
  initialVotes = 0,
  onVoteSuccess 
}) => {
  const [votes, setVotes] = useState(initialVotes);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async () => {
    if (hasVoted) return;

    try {
      setIsVoting(true);
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          itemType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setVotes(data.votes || votes + 1);
        setHasVoted(true);
        onVoteSuccess?.(data.votes || votes + 1);
        
        // Limpar estado após 24 horas (simulado)
        setTimeout(() => setHasVoted(false), 24 * 60 * 60 * 1000);
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={isVoting || hasVoted}
      style={{
        padding: '8px 16px',
        backgroundColor: hasVoted ? '#666' : '#FF0000',
        color: '#FFF',
        border: 'none',
        borderRadius: '4px',
        cursor: hasVoted ? 'not-allowed' : 'pointer',
        opacity: hasVoted ? 0.6 : 1,
        transition: 'all 0.3s ease',
      }}
    >
      ❤️ {votes} {hasVoted ? '(Votado)' : ''}
    </button>
  );
};

export default VoteButton;

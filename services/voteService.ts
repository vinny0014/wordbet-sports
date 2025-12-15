/**
 * Registra um voto em um artigo ou mascote
 */
export async function submitVote(itemId: string, itemType: 'article' | 'mascot' = 'article'): Promise<{ success: boolean; votes: number }> {
  try {
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

    if (!response.ok) throw new Error('Failed to submit vote');
    return await response.json();
  } catch (error) {
    console.error('Error submitting vote:', error);
    return { success: false, votes: 0 };
  }
}

/**
 * Busca o top 10 de artigos/mascotes mais votados da semana
 */
export async function fetchTopVotes(itemType: 'article' | 'mascot' = 'article'): Promise<any[]> {
  try {
    const response = await fetch(`/api/votes/top?type=${itemType}`);
    if (!response.ok) throw new Error('Failed to fetch top votes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching top votes:', error);
    return [];
  }
}

/**
 * Busca votos por região (BR ou US)
 */
export async function fetchVotesByRegion(region: 'BR' | 'US'): Promise<any[]> {
  try {
    const response = await fetch(`/api/votes/region/${region}`);
    if (!response.ok) throw new Error('Failed to fetch votes by region');
    return await response.json();
  } catch (error) {
    console.error('Error fetching votes by region:', error);
    return [];
  }
}

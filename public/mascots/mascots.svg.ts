// Mascotes Brasileiros (10)
export const BR_MASCOTS = [
  { id: 'mosqueteiro', name: 'Mosqueteiro', team: 'Fluminense', region: 'BR' },
  { id: 'porco-cobbato', name: 'Porco Cobbato', team: 'Corinthians', region: 'BR' },
  { id: 'urubu-rei', name: 'Urubu Rei', team: 'Flamengo', region: 'BR' },
  { id: 'santo-paulo', name: 'Santo Paulo', team: 'São Paulo', region: 'BR' },
  { id: 'galo-doido', name: 'Galo Doido', team: 'Atlético Mineiro', region: 'BR' },
  { id: 'leao-do-planalto', name: 'Leão do Planalto', team: 'Brasília', region: 'BR' },
  { id: 'dragao-da-amazonia', name: 'Dragão da Amazônia', team: 'Paysandu', region: 'BR' },
  { id: 'leao-do-norte', name: 'Leão do Norte', team: 'Sport', region: 'BR' },
  { id: 'camisa-vermelha', name: 'Camisa Vermelha', team: 'Internacional', region: 'BR' },
  { id: 'gremista', name: 'Gremista', team: 'Grêmio', region: 'BR' },
];

// Mascotes Internacionais (10)
export const US_MASCOTS = [
  { id: 'real-madrid-eagle', name: 'Águia Real', team: 'Real Madrid', region: 'US' },
  { id: 'barcelona-blaugrana', name: 'Blaugrana', team: 'Barcelona', region: 'US' },
  { id: 'manchester-city-eagle', name: 'Águia Azul', team: 'Manchester City', region: 'US' },
  { id: 'manchester-united-red', name: 'Demônio Vermelho', team: 'Manchester United', region: 'US' },
  { id: 'liverpool-liver', name: 'Fígado de Liverpool', team: 'Liverpool', region: 'US' },
  { id: 'chelsea-lion', name: 'Leão Azul', team: 'Chelsea', region: 'US' },
  { id: 'arsenal-cannon', name: 'Canhão', team: 'Arsenal', region: 'US' },
  { id: 'psg-fleur', name: 'Flor de Lis', team: 'Paris Saint-Germain', region: 'US' },
  { id: 'juventus-bull', name: 'Touro Preto', team: 'Juventus', region: 'US' },
  { id: 'bayern-lion', name: 'Leão Bávaro', team: 'Bayern Munich', region: 'US' },
];

// Função para gerar SVG simples de mascote
export function generateMascotSVG(mascotId: string): string {
  const colors: { [key: string]: string } = {
    'mosqueteiro': '#FF0000',
    'porco-cobbato': '#000000',
    'urubu-rei': '#FF0000',
    'santo-paulo': '#FF0000',
    'galo-doido': '#000000',
    'leao-do-planalto': '#FFD700',
    'dragao-da-amazonia': '#0000FF',
    'leao-do-norte': '#FF0000',
    'camisa-vermelha': '#FF0000',
    'gremista': '#0000FF',
    'real-madrid-eagle': '#FFFFFF',
    'barcelona-blaugrana': '#004B87',
    'manchester-city-eagle': '#6CABDA',
    'manchester-united-red': '#DA291C',
    'liverpool-liver': '#C8102E',
    'chelsea-lion': '#0051BA',
    'arsenal-cannon': '#EF0107',
    'psg-fleur': '#004494',
    'juventus-bull': '#000000',
    'bayern-lion': '#DC052D',
  };

  const color = colors[mascotId] || '#FF0000';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill="${color}" opacity="0.2" stroke="${color}" stroke-width="2"/>
    <circle cx="50" cy="35" r="20" fill="${color}"/>
    <circle cx="35" cy="55" r="15" fill="${color}"/>
    <circle cx="65" cy="55" r="15" fill="${color}"/>
    <circle cx="50" cy="75" r="12" fill="${color}"/>
  </svg>`;
}

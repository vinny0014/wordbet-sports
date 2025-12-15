// Mascotes SVG inline para carregamento rápido e sem dependências externas

export const MASCOT_IMAGES: { [key: string]: string } = {
  // Mascotes Brasileiros
  'mosqueteiro': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FF0000'/%3E%3Ccircle cx='50' cy='30' r='20' fill='%23FFD700'/%3E%3Crect x='40' y='50' width='20' height='30' fill='%23000000'/%3E%3Crect x='30' y='55' width='15' height='25' fill='%23000000'/%3E%3Crect x='55' y='55' width='15' height='25' fill='%23000000'/%3E%3C/svg%3E`,
  
  'porco-cobbato': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000000'/%3E%3Ccircle cx='50' cy='40' r='25' fill='%23FFFFFF'/%3E%3Ccircle cx='40' cy='35' r='6' fill='%23000000'/%3E%3Ccircle cx='60' cy='35' r='6' fill='%23000000'/%3E%3Cellipse cx='50' cy='50' rx='8' ry='6' fill='%23FF69B4'/%3E%3C/svg%3E`,
  
  'urubu-rei': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FF0000'/%3E%3Cpolygon points='50,20 60,45 85,45 65,60 75,85 50,70 25,85 35,60 15,45 40,45' fill='%23FFD700'/%3E%3Ccircle cx='50' cy='50' r='20' fill='%23000000'/%3E%3C/svg%3E`,
  
  'santo-paulo': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FF0000'/%3E%3Ccircle cx='50' cy='50' r='30' fill='%23FFFFFF'/%3E%3Ctext x='50' y='60' font-size='40' text-anchor='middle' fill='%23FF0000' font-weight='bold'%3ES%3C/text%3E%3C/svg%3E`,
  
  'galo-doido': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000000'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23FFFFFF'/%3E%3Cpolygon points='50,20 55,35 70,35 60,45 65,60 50,50 35,60 40,45 30,35 45,35' fill='%23FFD700'/%3E%3Ccircle cx='45' cy='45' r='4' fill='%23000000'/%3E%3Ccircle cx='55' cy='45' r='4' fill='%23000000'/%3E%3C/svg%3E`,
  
  'leao-do-planalto': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFD700'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23FFA500'/%3E%3Ccircle cx='50' cy='50' r='20' fill='%23FFD700'/%3E%3Ccircle cx='40' cy='45' r='4' fill='%23000000'/%3E%3Ccircle cx='60' cy='45' r='4' fill='%23000000'/%3E%3C/svg%3E`,
  
  'dragao-da-amazonia': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230000FF'/%3E%3Cpolygon points='50,20 70,40 70,70 50,80 30,70 30,40' fill='%23008000'/%3E%3Cpolygon points='40,30 60,30 65,50 50,60 35,50' fill='%23FFD700'/%3E%3C/svg%3E`,
  
  'leao-do-norte': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FF0000'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23FFFFFF'/%3E%3Cpolygon points='50,25 60,35 55,50 50,40 45,50 40,35' fill='%23FFD700'/%3E%3Ccircle cx='45' cy='48' r='3' fill='%23000000'/%3E%3Ccircle cx='55' cy='48' r='3' fill='%23000000'/%3E%3C/svg%3E`,
  
  'camisa-vermelha': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FF0000'/%3E%3Crect x='30' y='20' width='40' height='50' fill='%23FFFFFF'/%3E%3Crect x='35' y='25' width='30' height='40' fill='%23FF0000'/%3E%3Crect x='40' y='30' width='20' height='30' fill='%23FFFFFF'/%3E%3C/svg%3E`,
  
  'gremista': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230000FF'/%3E%3Crect x='25' y='25' width='50' height='50' fill='%23FFFFFF'/%3E%3Crect x='30' y='30' width='40' height='40' fill='%230000FF'/%3E%3Crect x='35' y='35' width='30' height='30' fill='%23FFFFFF'/%3E%3C/svg%3E`,
  
  // Mascotes Internacionais
  'real-madrid-eagle': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23FFFFFF'/%3E%3Cpolygon points='50,15 65,35 80,30 70,45 85,55 65,50 70,70 50,60 30,70 35,50 15,55 30,45 20,30 35,35' fill='%23FFD700'/%3E%3C/svg%3E`,
  
  'barcelona-blaugrana': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23004B87'/%3E%3Crect x='20' y='20' width='60' height='60' fill='%23FFC52F'/%3E%3Crect x='30' y='30' width='40' height='40' fill='%23004B87'/%3E%3C/svg%3E`,
  
  'manchester-city-eagle': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%236CABDA'/%3E%3Cpolygon points='50,20 70,40 75,65 50,75 25,65 30,40' fill='%23FFFFFF'/%3E%3Ccircle cx='50' cy='50' r='15' fill='%236CABDA'/%3E%3C/svg%3E`,
  
  'manchester-united-red': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23DA291C'/%3E%3Cdevil-shape cx='50' cy='50' r='25' fill='%23FFFFFF'/%3E%3Ccircle cx='45' cy='45' r='4' fill='%23DA291C'/%3E%3Ccircle cx='55' cy='45' r='4' fill='%23DA291C'/%3E%3C/svg%3E`,
  
  'liverpool-liver': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23C8102E'/%3E%3Cpath d='M50 20 L60 40 L80 40 L65 55 L75 75 L50 60 L25 75 L35 55 L20 40 L40 40 Z' fill='%23FFFFFF'/%3E%3C/svg%3E`,
  
  'chelsea-lion': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230051BA'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23FFFFFF'/%3E%3Cpolygon points='50,25 60,35 55,50 50,40 45,50 40,35' fill='%230051BA'/%3E%3Ccircle cx='45' cy='48' r='3' fill='%230051BA'/%3E%3Ccircle cx='55' cy='48' r='3' fill='%230051BA'/%3E%3C/svg%3E`,
  
  'arsenal-cannon': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23EF0107'/%3E%3Crect x='35' y='25' width='30' height='50' fill='%23FFFFFF'/%3E%3Ccircle cx='50' cy='70' r='12' fill='%23000000'/%3E%3C/svg%3E`,
  
  'psg-fleur': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23004494'/%3E%3Cpath d='M50 20 L60 40 L80 40 L65 55 L75 75 L50 60 L25 75 L35 55 L20 40 L40 40 Z' fill='%23FFFFFF'/%3E%3C/svg%3E`,
  
  'juventus-bull': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23000000'/%3E%3Ccircle cx='50' cy='45' r='20' fill='%23FFFFFF'/%3E%3Cpolygon points='40,30 45,20 50,25 55,20 60,30' fill='%23000000'/%3E%3Ccircle cx='45' cy='45' r='3' fill='%23000000'/%3E%3Ccircle cx='55' cy='45' r='3' fill='%23000000'/%3E%3C/svg%3E`,
  
  'bayern-lion': `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23DC052D'/%3E%3Ccircle cx='50' cy='50' r='25' fill='%23FFFFFF'/%3E%3Cpolygon points='50,25 60,35 55,50 50,40 45,50 40,35' fill='%23DC052D'/%3E%3Ccircle cx='45' cy='48' r='3' fill='%23DC052D'/%3E%3Ccircle cx='55' cy='48' r='3' fill='%23DC052D'/%3E%3C/svg%3E`,
};

export function getMascotImage(mascotId: string): string {
  return MASCOT_IMAGES[mascotId] || MASCOT_IMAGES['mosqueteiro'];
}

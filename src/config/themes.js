export const themes = [
  {
    id: 'futbol-mexicano',
    name: 'Fútbol mexicano',
    matchup: 'América vs Chivas',
    description: 'Clásico de clásicos',
    sides: [
      {
        id: 'america',
        name: 'América',
        token: '🦅',
        accessibleLabel: 'Águila del Club América',
      },
      {
        id: 'chivas',
        name: 'Chivas',
        token: '🐐',
        accessibleLabel: 'Cabra de las Chivas',
      },
    ],
    scenes: [
      {
        id: 'azteca',
        name: 'Estadio Azteca',
        background: 'linear-gradient(135deg, #183e33, #426b4a 48%, #9a6e38)',
      },
      {
        id: 'metlife',
        name: 'Estadio MetLife',
        background: 'linear-gradient(135deg, #152f3e, #31595a 52%, #947d54)',
      },
    ],
  },
  {
    id: 'futbol-europeo',
    name: 'Fútbol europeo',
    matchup: 'Real Madrid vs Barcelona',
    description: 'El clásico español',
    sides: [
      {
        id: 'real-madrid',
        name: 'Real Madrid',
        token: '👑',
        image: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
        accessibleLabel: 'Escudo del Real Madrid',
      },
      {
        id: 'barcelona',
        name: 'Barcelona',
        token: '🔵🔴',
        image: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
        accessibleLabel: 'Escudo blaugrana del Barcelona',
      },
    ],
    scenes: [
      {
        id: 'bernabeu',
        name: 'Estadio Santiago Bernabéu',
        background: 'linear-gradient(135deg, #244b46, #9a9b7c 55%, #6e7359)',
      },
      {
        id: 'camp-nou',
        name: 'Camp Nou',
        background: 'linear-gradient(135deg, #214a39, #315876 52%, #9c743f)',
      },
    ],
  },
  {
    id: 'animales',
    name: 'Animales',
    matchup: 'Gatos vs Perros',
    description: 'Un duelo de patitas',
    sides: [
      {
        id: 'gatos',
        name: 'Gatos',
        token: '🐱',
        accessibleLabel: 'Gato',
      },
      {
        id: 'perros',
        name: 'Perros',
        token: '🐶',
        accessibleLabel: 'Perro',
      },
    ],
    scenes: [
      {
        id: 'casa',
        name: 'Casa',
        background: 'linear-gradient(135deg, #4c5540, #8f7855 52%, #b78e64)',
      },
      {
        id: 'veterinaria',
        name: 'Veterinaria',
        background: 'linear-gradient(135deg, #2d5d54, #59958b 52%, #a8b58b)',
      },
    ],
  },
  {
    id: 'clasico',
    name: 'Clásico',
    matchup: 'X vs O',
    description: 'El original de siempre',
    sides: [
      {
        id: 'equis',
        name: 'X',
        token: 'X',
        accessibleLabel: 'Ficha X',
      },
      {
        id: 'circulo',
        name: 'O',
        token: 'O',
        accessibleLabel: 'Ficha O',
      },
    ],
    scenes: [
      {
        id: 'tablero-tradicional',
        name: 'Tablero tradicional',
        background: 'linear-gradient(135deg, #314136, #52614a 52%, #8c805b)',
      },
    ],
  },
  {
    id: 'plants-vs-zombies',
    name: 'Plants vs Zombies',
    matchup: 'Plantas vs Zombis',
    description: 'Defiende el jardín',
    sides: [
      {
        id: 'plantas',
        name: 'Plantas',
        token: '🌻',
        accessibleLabel: 'Planta de jardín',
      },
      {
        id: 'zombis',
        name: 'Zombis',
        token: '🧟',
        accessibleLabel: 'Zombi',
      },
    ],
    scenes: [
      {
        id: 'jardin',
        name: 'Jardín de día',
        background: 'linear-gradient(135deg, #376b3c, #7a9d45 52%, #caa95c)',
      },
    ],
  },
  {
    id: 'formula-1',
    name: 'Fórmula 1',
    matchup: 'Piloto vs Rival',
    description: 'Duelo a toda velocidad',
    sides: [
      {
        id: 'piloto',
        name: 'Piloto',
        token: '🏎️',
        accessibleLabel: 'Auto de carreras',
      },
      {
        id: 'rival',
        name: 'Rival',
        token: '🏁',
        accessibleLabel: 'Bandera a cuadros',
      },
    ],
    scenes: [
      {
        id: 'circuito',
        name: 'Circuito nocturno',
        background: 'linear-gradient(135deg, #202b3d, #6d3039 52%, #b47738)',
      },
    ],
  },
  {
    id: 'futbol-americano',
    name: 'Fútbol americano',
    matchup: 'Ataque vs Defensa',
    description: 'Choque en el emparrillado',
    sides: [
      {
        id: 'ataque',
        name: 'Ataque',
        token: '🏈',
        accessibleLabel: 'Balón de fútbol americano',
      },
      {
        id: 'defensa',
        name: 'Defensa',
        token: '🪖',
        accessibleLabel: 'Casco de fútbol americano',
      },
    ],
    scenes: [
      {
        id: 'emparrillado',
        name: 'El emparrillado',
        background: 'linear-gradient(135deg, #1e4e37, #527544 52%, #9b8555)',
      },
    ],
  },
  {
    id: 'chicas-vs-chicos',
    name: 'Chicas vs chicos',
    matchup: 'Chicas vs Chicos',
    description: 'Que gane la mejor jugada',
    sides: [
      {
        id: 'chicas',
        name: 'Chicas',
        token: '👧',
        accessibleLabel: 'Chica',
      },
      {
        id: 'chicos',
        name: 'Chicos',
        token: '👦',
        accessibleLabel: 'Chico',
      },
    ],
    scenes: [
      {
        id: 'cancha',
        name: 'Cancha de colores',
        background: 'linear-gradient(135deg, #763e69, #53618b 52%, #b47558)',
      },
    ],
  },
  {
    id: 'batman-vs-gason',
    name: 'Batman vs Gason',
    matchup: 'Batman vs Gason',
    description: 'Un duelo bajo las luces de la ciudad',
    sides: [
      {
        id: 'batman',
        name: 'Batman',
        token: '🦇',
        accessibleLabel: 'Murciélago de Batman',
      },
      {
        id: 'gason',
        name: 'Gason',
        token: '🦹',
        accessibleLabel: 'Figura enmascarada de Gason',
      },
    ],
    scenes: [
      {
        id: 'ciudad',
        name: 'Ciudad nocturna',
        background: 'linear-gradient(135deg, #17263c, #3e4660 52%, #75624b)',
      },
    ],
  },
]

export function getTheme(themeId) {
  return themes.find((theme) => theme.id === themeId) ?? null
}

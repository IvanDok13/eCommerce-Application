export interface Product {
  id: string;
  name: string;
  price: number;
  artist: string;
  color: string;
  size: string;
  imageUrl: string;
  categories?: string[];
  description?: string;
}

export interface ProductListProps {
  filters: {
    // Define filter fields as needed, e.g.:
    // selectedArtists: string[];
    // selectedColors: string[];
    // priceRange: { min: number; max: number };
  };
  sortBy: string;
  searchQuery: string;
}

const subCategories = [
  'Realism',
  'Graphics and illustration',
  'Traditional tattoo',
  'black & grey realism',
  'color realism',
  'micro-realism',
  'linework',
  'etching & engraving',
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Tattoo Rose',
    price: 150,
    artist: 'Alex',
    color: 'Black',
    size: 'M',
    imageUrl: 'https://i.pinimg.com/736x/1e/25/9e/1e259e06989e429b6a401b2c4cc86bba.jpg',
    categories: ['tattoo', 'Realism'],
    description: 'A classic black rose tattoo symbolizing love and strength.',
  },
  {
    id: '2',
    name: 'Dragon Sleeve',
    price: 300,
    artist: 'Mira',
    color: 'Red',
    size: 'L',
    imageUrl: 'https://i.pinimg.com/236x/6b/95/6b/6b956b6ef1f0c52fcfa604b69d0245a4.jpg',
    categories: ['tattoo', 'linework'],
    description: 'A powerful red dragon wrapped around the arm, embodying fire and courage.',
  },
  {
    id: '3',
    name: 'Floral Sleeve',
    price: 250,
    artist: 'Alex',
    color: 'Black',
    size: 'M',
    imageUrl: 'https://i.pinimg.com/736x/f4/20/b3/f420b30d450c422b92426753eb2be4f5.jpg',
    categories: ['tattoo', 'Traditional tattoo'],
    description: 'A detailed floral sleeve featuring various blooms in fine linework.',
  },
  {
    id: '4',
    name: 'Samurai Backpiece',
    price: 450,
    artist: 'Mira',
    color: 'Blue',
    size: 'XL',
    imageUrl: 'https://i.pinimg.com/736x/b9/7c/58/b97c58bcda1030c3f53a4d360af188fc.jpg',
    categories: ['tattoo', 'color realism'],
    description: 'A large backpiece of a samurai in battle armor, symbolizing honor and tradition.',
  },
  {
    id: '5',
    name: 'Geometric Forearm',
    price: 180,
    artist: 'Kai',
    color: 'Red',
    size: 'S',
    imageUrl: 'https://i.pinimg.com/736x/4f/6e/29/4f6e29c1653b6238ae9f5cebb85266f0.jpg',
    categories: ['tattoo', 'etching & engraving'],
    description: 'A sleek forearm tattoo with geometric lines and symmetry.',
  },
  {
    id: '6',
    name: 'Phoenix Chest',
    price: 400,
    artist: 'Alex',
    color: 'Black',
    size: 'L',
    imageUrl: 'https://i.pinimg.com/736x/3c/72/af/3c72af12bd9e459c93390863248fa2c3.jpg',
    categories: ['tattoo', 'micro-realism'],
    description: 'A majestic phoenix rising from ashes, symbolizing rebirth and immortality.',
  },
  {
    id: 'r1',
    name: 'Realistic Wolf',
    price: 320,
    artist: 'Lena',
    color: 'Black & Grey',
    size: 'L',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'Realism'],
    description: 'A lifelike wolf portrait capturing every detail and expression.',
  },
  {
    id: 'r2',
    name: 'Realistic Portrait',
    price: 350,
    artist: 'Mark',
    color: 'Color',
    size: 'M',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'Realism'],
    description: 'Detailed human portrait tattoo with vibrant color and shading.',
  },
  {
    id: 'r3',
    name: 'Realistic Rose',
    price: 280,
    artist: 'Eva',
    color: 'Red',
    size: 'S',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'Realism'],
    description: 'A realistic red rose with fine details and soft gradients.',
  },

  // Graphics and illustration
  {
    id: 'g1',
    name: 'Comic Style Skull',
    price: 200,
    artist: 'Tom',
    color: 'Black',
    size: 'M',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'Graphics and illustration'],
    description: 'Graphic skull design inspired by comic book art.',
  },
  {
    id: 'g2',
    name: 'Abstract Lines',
    price: 180,
    artist: 'Nina',
    color: 'Black',
    size: 'S',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'Graphics and illustration'],
    description: 'Abstract linework creating a striking visual effect.',
  },
  {
    id: 'g3',
    name: 'Literature Quote',
    price: 150,
    artist: 'Sara',
    color: 'Black',
    size: 'S',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'Graphics and illustration'],
    description: 'Tattoo featuring a stylized quote from classic literature.',
  },

  // Traditional tattoo
  {
    id: 't1',
    name: 'Old School Anchor',
    price: 170,
    artist: 'Jake',
    color: 'Blue & Red',
    size: 'M',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'Traditional tattoo'],
    description: 'Classic traditional tattoo with bold colors and simple shapes.',
  },
  {
    id: 't2',
    name: 'Sailor Swallow',
    price: 160,
    artist: 'Emma',
    color: 'Blue',
    size: 'S',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'Traditional tattoo'],
    description: 'Old school swallow tattoo symbolizing safe travels.',
  },
  {
    id: 't3',
    name: 'Classic Rose',
    price: 180,
    artist: 'Liam',
    color: 'Red & Green',
    size: 'M',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'Traditional tattoo'],
    description: 'Bright rose tattoo in the traditional bold style.',
  },

  // black & grey realism
  {
    id: 'b1',
    name: 'Monochrome Lion',
    price: 300,
    artist: 'Olga',
    color: 'Black & Grey',
    size: 'L',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'black & grey realism'],
    description: 'A detailed monochrome lion with realistic shading.',
  },
  {
    id: 'b2',
    name: 'Grey Skull',
    price: 260,
    artist: 'Ivan',
    color: 'Black & Grey',
    size: 'M',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'black & grey realism'],
    description: 'Realistic skull tattoo using only shades of black and grey.',
  },
  {
    id: 'b3',
    name: 'Black & Grey Owl',
    price: 280,
    artist: 'Svetlana',
    color: 'Black & Grey',
    size: 'S',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'black & grey realism'],
    description: 'Detailed owl portrait in black and grey tones.',
  },

  // color realism
  {
    id: 'c1',
    name: 'Colorful Butterfly',
    price: 290,
    artist: 'Paul',
    color: 'Multicolor',
    size: 'M',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'color realism'],
    description: 'Bright butterfly tattoo with vivid color realism.',
  },
  {
    id: 'c2',
    name: 'Colorful Parrot',
    price: 310,
    artist: 'Diana',
    color: 'Multicolor',
    size: 'L',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'color realism'],
    description: 'Vibrant parrot tattoo showcasing stunning color detail.',
  },
  {
    id: 'c3',
    name: 'Realistic Rose',
    price: 270,
    artist: 'Chris',
    color: 'Red & Green',
    size: 'S',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'color realism'],
    description: 'A realistic rose tattoo with rich, lifelike colors.',
  },

  // micro-realism
  {
    id: 'm1',
    name: 'Miniature Cat',
    price: 180,
    artist: 'Anna',
    color: 'Black & Grey',
    size: 'XS',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'micro-realism'],
    description: 'Highly detailed, tiny cat tattoo in micro-realism style.',
  },
  {
    id: 'm2',
    name: 'Tiny Bird',
    price: 160,
    artist: 'Peter',
    color: 'Black',
    size: 'XS',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'micro-realism'],
    description: 'Small bird tattoo with impressive micro-realistic detail.',
  },
  {
    id: 'm3',
    name: 'Mini Skull',
    price: 190,
    artist: 'Jessica',
    color: 'Black & Grey',
    size: 'XS',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'micro-realism'],
    description: 'A tiny skull rendered with micro-realistic shading.',
  },

  // linework
  {
    id: 'l1',
    name: 'Minimalist Triangle',
    price: 140,
    artist: 'Steve',
    color: 'Black',
    size: 'S',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'linework'],
    description: 'Simple and elegant minimalist triangle design.',
  },
  {
    id: 'l2',
    name: 'Abstract Lines',
    price: 150,
    artist: 'Laura',
    color: 'Black',
    size: 'M',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'linework'],
    description: 'Flowing abstract lines creating a dynamic tattoo.',
  },
  {
    id: 'l3',
    name: 'Geometric Circle',
    price: 160,
    artist: 'George',
    color: 'Black',
    size: 'S',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'linework'],
    description: 'Geometric circle made with fine linework.',
  },

  // etching & engraving
  {
    id: 'e1',
    name: 'Engraved Rose',
    price: 220,
    artist: 'Helen',
    color: 'Black & Grey',
    size: 'M',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'etching & engraving'],
    description: 'Intricate rose design resembling an engraving.',
  },
  {
    id: 'e2',
    name: 'Etched Skull',
    price: 210,
    artist: 'Michael',
    color: 'Black & Grey',
    size: 'L',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'etching & engraving'],
    description: 'Detailed skull tattoo with etched style lines.',
  },
  {
    id: 'e3',
    name: 'Engraved Mandala',
    price: 230,
    artist: 'Isabella',
    color: 'Black',
    size: 'M',
    imageUrl:
      'https://www.ricktamlyn.com/wp-content/uploads/offtheshelf_exports/coffee-landing-page-6355/placeholder-coffee.jpg',
    categories: ['tattoo', 'etching & engraving'],
    description: 'Mandala design inspired by classic engraving techniques.',
  },
];

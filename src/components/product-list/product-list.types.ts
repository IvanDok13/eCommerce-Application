export interface Product {
  id: string;
  name: string;
  price: number;
  artist: string;
  color: string;
  size: string;
  placement: string;
  imageUrl: string;
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

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Tattoo Rose',
    price: 150,
    artist: 'Alex',
    color: 'Black',
    size: 'M',
    placement: 'Arm',
    imageUrl: 'https://i.pinimg.com/736x/1e/25/9e/1e259e06989e429b6a401b2c4cc86bba.jpg',
  },
  {
    id: '2',
    name: 'Dragon Sleeve',
    price: 300,
    artist: 'Mira',
    color: 'Red',
    size: 'L',
    placement: 'Back',
    imageUrl: 'https://i.pinimg.com/236x/6b/95/6b/6b956b6ef1f0c52fcfa604b69d0245a4.jpg',
  },
  {
    id: '3',
    name: 'Floral Sleeve',
    price: 250,
    artist: 'Alex',
    color: 'Black',
    size: 'M',
    placement: 'Arm',
    imageUrl: 'https://i.pinimg.com/736x/f4/20/b3/f420b30d450c422b92426753eb2be4f5.jpg',
  },
  {
    id: '4',
    name: 'Samurai Backpiece',
    price: 450,
    artist: 'Mira',
    color: 'Blue',
    size: 'XL',
    placement: 'Back',
    imageUrl: 'https://i.pinimg.com/736x/b9/7c/58/b97c58bcda1030c3f53a4d360af188fc.jpg',
  },
  {
    id: '5',
    name: 'Geometric Forearm',
    price: 180,
    artist: 'Kai',
    color: 'Red',
    size: 'S',
    placement: 'Arm',
    imageUrl: 'https://i.pinimg.com/736x/4f/6e/29/4f6e29c1653b6238ae9f5cebb85266f0.jpg',
  },
  {
    id: '6',
    name: 'Phoenix Chest',
    price: 400,
    artist: 'Alex',
    color: 'Black',
    size: 'L',
    placement: 'Chest',
    imageUrl: 'https://i.pinimg.com/736x/3c/72/af/3c72af12bd9e459c93390863248fa2c3.jpg',
  },
];

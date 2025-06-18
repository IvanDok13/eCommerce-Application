export interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  artist: string;
  color: string;
  size: string;
  imageUrls: string[];
  isInCart?: boolean;
  quantityInCart?: number;
}

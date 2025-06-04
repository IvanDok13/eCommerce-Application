export interface ProductRenderData {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrls: string[];
  artist: string;
  size: string;
  color: string;
  description: string;
}

export interface ProductQueryParameters {
  limit?: number;
  categoryId?: string;
  filters?: {
    artists?: string[];
    colors?: string[];
    sizes?: string[];
    priceMin?: number;
    priceMax?: number;
  };
  sortBy?: 'price' | '-price' | 'name' | '-name';
  searchQuery?: string;
}

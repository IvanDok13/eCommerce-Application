import type { ProductRenderData } from '@api/products-api/products-api.types';
import type { Filters } from '@components/product-list/product-list.types';

export interface FilterSidebarProps {
  onApply: (filters: Filters) => void;
  products: ProductRenderData[];
}

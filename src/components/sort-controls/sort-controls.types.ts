import type { SortByOption } from '@api/products-api/products-api.types';

export interface SortControlsProps {
  sortBy: SortByOption;
  setSortBy: (sortBy: SortByOption) => void;
}

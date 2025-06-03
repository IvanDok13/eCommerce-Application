import { type CategoryTreeItem } from '@api/category-api/category-api.types';

export interface BreadcrumbsProps {
  categoryId: string;
  categoryTree: CategoryTreeItem[];
  locale?: string;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

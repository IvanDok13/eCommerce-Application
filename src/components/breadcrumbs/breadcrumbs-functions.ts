import { type CategoryTreeItem } from '@api/category-api/category-api.types';
import { type BreadcrumbItem } from './breadcrumbs.types';

export const findPathById = (
  id: string,
  nodes: CategoryTreeItem[],
  path: CategoryTreeItem[] = []
): CategoryTreeItem[] | null => {
  for (const node of nodes) {
    const newPath = [...path, node];
    if (node.id === id) {
      return newPath;
    }
    if (node.children) {
      const found = findPathById(id, node.children, newPath);
      if (found) return found;
    }
  }
  return null;
};

export const getItems = (
  categoryId: string,
  categoryTree: CategoryTreeItem[],
  locale: string = 'en-US'
): BreadcrumbItem[] => {
  console.log('getItems called with:', { categoryId, categoryTree, locale });
  const path = findPathById(categoryId, categoryTree);
  if (!path) return [];

  return path.map(cat => ({
    label: cat.name[locale] || cat.name['en-US'] || Object.values(cat.name)[0] || 'no name',
    path: `/catalog/${cat.slug?.['en-US']}`,
  }));
};

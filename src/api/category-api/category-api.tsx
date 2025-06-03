import { type Category } from '@commercetools/platform-sdk';
import { apiRoot } from '../api-root';
import { type CategoryTreeItem } from './category-api.types';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiRoot
      .categories()
      .get({ queryArgs: { limit: 50 } })
      .execute();
    return response.body.results;
  } catch (error) {
    console.error('Error while getting categories:', error);
    throw error;
  }
};

export const buildCategoryTree = (categories: Category[]): CategoryTreeItem[] => {
  const map = new Map<string, CategoryTreeItem>();
  const tree: CategoryTreeItem[] = [];

  categories.forEach(cat => {
    map.set(cat.id, { ...cat, children: [] });
  });

  for (const cat of categories) {
    const current = map.get(cat.id)!;
    if (cat.parent?.id) {
      const parent = map.get(cat.parent.id);
      if (parent) {
        parent.children.push(current);
      }
    } else {
      tree.push(current);
    }
  }

  return tree;
};

export const fetchCategoryTree = async (): Promise<CategoryTreeItem[]> => {
  const categories = await getAllCategories();
  return buildCategoryTree(categories);
};

export const findRootCategory = (tree: CategoryTreeItem[]): CategoryTreeItem | null => {
  return tree.find(cat => !cat.parent) ?? null;
};

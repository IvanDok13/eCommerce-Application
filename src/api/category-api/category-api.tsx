import { type Category } from '@commercetools/platform-sdk';
import { apiRootWithProjectKey } from '../api-root';
import { type CategoryTreeItem } from './category-api.types';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiRootWithProjectKey
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

export const findCategoryBySlug = (
  nodes: CategoryTreeItem[],
  slug: string,
  locale = 'en-US'
): CategoryTreeItem | null => {
  for (const node of nodes) {
    if (node.slug?.[locale] === slug) return node;
    if (node.children) {
      const found = findCategoryBySlug(node.children, slug, locale);
      if (found) return found;
    }
  }
  return null;
};

export const getCategoryAndChildrenIds = (rootId: string, tree: CategoryTreeItem[]): string[] => {
  const result: string[] = [];

  const findNode = (nodes: CategoryTreeItem[]): CategoryTreeItem | null => {
    for (const node of nodes) {
      if (node.id === rootId) return node;
      const found = findNode(node.children ?? []);
      if (found) return found;
    }
    return null;
  };

  const collectIds = (node: CategoryTreeItem): void => {
    result.push(node.id);
    node.children?.forEach(collectIds);
  };

  const rootNode = findNode(tree);
  if (rootNode) collectIds(rootNode);

  return result;
};

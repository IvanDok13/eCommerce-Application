import { apiRoot } from '../api-root';
import type { Product } from '@commercetools/platform-sdk';

export const fetchProducts = async (limit = 50): Promise<Product[]> => {
  const response = await apiRoot.products().get({ queryArgs: { limit } }).execute();

  return response.body.results;
};

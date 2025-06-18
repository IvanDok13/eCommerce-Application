import { apiRootWithProjectKey } from '../api-root';
import type { Product } from '@commercetools/platform-sdk';
import type { ProductQueryParameters, ProductRenderData } from './products-api.types';

// VALID FUNCTION BUT WITHOUT CATEGORY FILTER
// export const fetchProducts = async (limit = 50, categoryId: string): Promise<Product[]> => {
//   const queryArguments: Record<string, any> = {
//     limit,
//   };

//   if (categoryId) {
//     queryArguments['filter.query'] = `categories.id:"${categoryId}"`;
//   }

//   const response = await apiRoot.products().get({ queryArgs: queryArguments }).execute();
//   return response.body.results;
// };

export const fetchProducts = async (limit: number, categoryIds?: string[]): Promise<Product[]> => {
  const queryArguments: Record<string, any> = { limit };

  if (categoryIds?.length) {
    const categoryFilter = categoryIds.map(id => `"${id}"`).join(', ');

    queryArguments['where'] = `masterData(current(categories(id in (${categoryFilter}))))`;
  }

  const response = await apiRootWithProjectKey.products().get({ queryArgs: queryArguments }).execute();
  return response.body.results;
};

export const mapProductToRenderData = (product: Product): ProductRenderData => {
  const { id, masterData } = product;
  const current = masterData?.current ?? null;

  const name = current.name['en-US'] ?? 'No name';
  const slug = current.slug['en-US'] ?? 'no-slug';
  const description = current.description?.['en-US'] ?? '';

  const images = current.masterVariant.images ?? [];
  const imageUrls = images.map(img => img.url);

  const attributes = current.masterVariant.attributes ?? [];

  const getAttributeValue = (attributeName: string): string => {
    const attribute = attributes.find(a => a.name === attributeName);
    const value: unknown = attribute?.value;
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && 'label' in value) return String(value.label);
    return '';
  };

  const artist = getAttributeValue('artist-name');
  const size = getAttributeValue('tattoo-size');
  const color = getAttributeValue('tattoo-color');
  const priceObject = current.masterVariant.prices?.[0]?.value;
  const price = priceObject ? priceObject.centAmount : 0;

  return {
    id,
    name,
    slug,
    price,
    imageUrls,
    artist,
    size,
    color,
    description,
  };
};

export const getRenderArray = (products: Product[], queryParameters: ProductQueryParameters): ProductRenderData[] => {
  const { filters, searchQuery, sortBy } = queryParameters;

  // Map raw products to render data
  let renderData = products.map(mapProductToRenderData);

  // Filter by attributes and price
  if (filters) {
    const { artists, colors, sizes, priceMin, priceMax } = filters;

    renderData = renderData.filter(product => {
      const matchArtist = !artists?.length || artists.includes(product.artist);
      const matchColor = !colors?.length || colors.includes(product.color);
      const matchSize = !sizes?.length || sizes.includes(product.size);
      const matchPrice =
        (priceMin === undefined || product.price >= priceMin * 100) &&
        (priceMax === undefined || product.price <= priceMax * 100);

      return matchArtist && matchColor && matchSize && matchPrice;
    });
  }

  // Filter by search query
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    renderData = renderData.filter(product => product.name.toLowerCase().includes(lowerQuery));
  }

  // Sort by price or name
  if (sortBy) {
    renderData.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case '-price':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case '-name':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }

  return renderData;
};

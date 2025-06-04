import { apiRoot } from '../api-root';
import type { Product } from '@commercetools/platform-sdk';
import type { ProductQueryParameters, ProductRenderData } from './products-api.types';

export const fetchProducts = async (parameters: ProductQueryParameters): Promise<Product[]> => {
  const { limit = 25, categoryId, filters, sortBy, searchQuery } = parameters;

  const queryArguments: Record<string, any> = {
    limit,
  };

  if (searchQuery) {
    queryArguments['text.en-US'] = searchQuery;
  }

  const filterArguments: string[] = [];

  if (categoryId) {
    filterArguments.push(`categories.id:"${categoryId}"`);
  }

  if (filters?.artists?.length) {
    filters.artists.forEach(artist => filterArguments.push(`variants.attributes.artist-name:"${artist}"`));
  }

  if (filters?.colors?.length) {
    filters.colors.forEach(color => filterArguments.push(`variants.attributes.tattoo-color:"${color}"`));
  }

  if (filters?.sizes?.length) {
    filters.sizes.forEach(size => filterArguments.push(`variants.attributes.tattoo-size:"${size}"`));
  }

  if (filters?.priceMin || filters?.priceMax) {
    const min = filters.priceMin || '0';
    const max = filters.priceMax || '999999';
    filterArguments.push(`variants.price.centAmount:range (${Number(min) * 100} to ${Number(max) * 100})`);
  }

  if (filterArguments.length > 0) {
    queryArguments.filter = filterArguments;
  }

  if (sortBy) {
    queryArguments.sort = {
      price: 'price asc',
      '-price': 'price desc',
      name: 'name.en-US asc',
      '-name': 'name.en-US desc',
    }[sortBy];
  }

  const response = await apiRoot.products().get({ queryArgs: queryArguments }).execute();

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

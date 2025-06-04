import { apiRoot } from '../api-root';
import type { Product } from '@commercetools/platform-sdk';
import type { ProductRenderData } from './products-api.types';

export const fetchProducts = async (limit = 50): Promise<Product[]> => {
  const response = await apiRoot.products().get({ queryArgs: { limit } }).execute();

  return response.body.results;
};

export const mapProductToRenderData = (product: Product): ProductRenderData => {
  const { id, masterData } = product;
  const current = masterData.current;

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
  const price = priceObject ? `${(priceObject.centAmount / 100).toFixed(2)} ${priceObject.currencyCode}` : 'N/A';

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

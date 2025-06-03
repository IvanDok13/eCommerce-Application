import { type FC } from 'react';
import styles from './product-list.module.css';
import { ProductCard } from '@components/product-card/product-card';
import { type ProductListProps, mockProducts } from './product-list.types';

export const ProductList: FC<ProductListProps> = ({ filters, searchQuery }) => {
  const { artists, colors, sizes, priceMin, priceMax } = filters;

  const filteredProductsByFilters = mockProducts.filter(product => {
    const matchArtist = artists.length === 0 || artists.includes(product.artist);

    const productColor =
      product.color.toLowerCase().includes('black') || product.color.toLowerCase().includes('grey')
        ? 'black-white'
        : 'colored';
    const matchColor = colors.length === 0 || colors.includes(productColor);

    const matchSize = sizes.length === 0 || sizes.includes(product.size);

    const matchPriceMin = !priceMin || product.price >= Number(priceMin);
    const matchPriceMax = !priceMax || product.price <= Number(priceMax);

    return matchArtist && matchColor && matchSize && matchPriceMin && matchPriceMax;
  });

  const filteredProducts = filteredProductsByFilters.filter(product => {
    if (!searchQuery.trim()) return true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={styles.productList}>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

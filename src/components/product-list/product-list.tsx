import { type FC } from 'react';
import styles from './product-list.module.css';
import { ProductCard } from '@components/product-card/product-card';
import { type ProductListProps, mockProducts } from './product-list.types';

export const ProductList: FC<ProductListProps> = ({ filters, searchQuery, sortBy }) => {
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

  const filteredProductsBySearch = filteredProductsByFilters.filter(product => {
    if (!searchQuery.trim()) return true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedProducts = [...filteredProductsBySearch].sort((a, b) => {
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

  return (
    <div className={styles.productList}>
      {sortedProducts.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

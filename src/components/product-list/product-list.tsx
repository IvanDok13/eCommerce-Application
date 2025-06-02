import { type FC } from 'react';
import styles from './product-list.module.css';
import { ProductCard } from '@components/product-card/product-card';
import { type ProductListProps, mockProducts } from './product-list.types';

export const ProductList: FC<ProductListProps> = () => {
  // { filters, sortBy, searchQuery }
  // Mock product data for now //

  // Apply filtering (for later)
  let filteredProducts = mockProducts; // You can add filtering logic here

  // Apply search query (for later)
  // filteredProducts = filteredProducts.filter(product =>
  //   product.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // Apply sorting (for later)
  // filteredProducts = filteredProducts.sort((a, b) => {
  //   if (sortBy === 'price') return a.price - b.price;
  //   if (sortBy === 'name') return a.name.localeCompare(b.name);
  //   return 0;
  // });

  return (
    <div className={styles.productList}>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

import { type FC } from 'react';
import styles from './product-list.module.css';
import { ProductCard } from '@components/product-card/product-card';
import type { ProductRenderData } from '@api/products-api/products-api.types';

export const ProductList: FC<{ products: ProductRenderData[] }> = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

import { type FC } from 'react';
import styles from './product-card.module.css';
import { type ProductCardProps } from './product-card.types.ts';

export const ProductCard: FC<ProductCardProps> = ({ name, price, artist, color, size, imageUrls }) => {
  return (
    <div className={styles.productCard}>
      <img src={imageUrls[0]} alt={name} className={styles.productImage} />
      <h4 className={styles.productName}>{name}</h4>
      <p className={styles.productPrice}>${price / 100}</p>
      <p className={styles.productDetails}>
        {artist} | {color} | {size}
      </p>
    </div>
  );
};

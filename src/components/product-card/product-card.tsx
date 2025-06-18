import { useState, type FC, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from './product-card.module.css';
import { type ProductCardProps } from './product-card.types.ts';
import { addProductToCart } from '@api/cart-api/cart-api.tsx';

export const ProductCard: FC<ProductCardProps> = ({
  id,
  name,
  price,
  artist,
  color,
  size,
  imageUrls,
  isInCart = false,
}) => {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(isInCart);

  const handleAddToCart = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault();
    if (added || adding) return;

    try {
      setAdding(true);
      await addProductToCart(id);
      setAdded(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error while adding to cart:', error.message);
      } else {
        console.error('Unknown error while adding to cart');
      }
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${id}`} className={styles.productCardLink}>
        <img src={imageUrls[0]} alt={name} className={styles.productImage} />
        <h4 className={styles.productName}>{name}</h4>
        <p className={styles.productPrice}>${price / 100}</p>
        <p className={styles.productDetails}>
          {artist} | {color} | {size}
        </p>
      </Link>
      <button
        className={styles.addToCartButton}
        onClick={event => void handleAddToCart(event)}
        disabled={added || adding}
      >
        {added ? 'In Cart' : adding ? 'Adding...' : 'Add to Cart 🛒'}
      </button>
    </div>
  );
};

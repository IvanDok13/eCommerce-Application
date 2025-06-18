import { useEffect, useState, type FC } from 'react';
import styles from './cart.module.css';
import { Header } from '@components/header/header';
import { getActiveCart } from '@api/cart-api/cart-api';
import type { Cart, LineItem } from '@commercetools/platform-sdk';

export const CartPage: FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCart(): Promise<void> {
      try {
        const activeCart = await getActiveCart();
        setCart(activeCart);
      } catch {
        setError('Failed to load the cart.');
      } finally {
        setLoading(false);
      }
    }
    void fetchCart();
  }, []);

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;
  if (!cart || cart.lineItems.length === 0) return <div>Your cart is empty.</div>;
  return (
    <div className={styles.cartPage}>
      <Header />
      <h2>Your Cart</h2>
      <ul>
        {cart.lineItems.map((item: LineItem) => (
          <li key={item.id} className={styles.cartItem}>
            <div className={styles.productImageWrapper}>
              <img
                src={item.variant?.images?.[0]?.url || 'placeholder-image-url.jpg'}
                alt={item.name?.['en-US'] || 'Product image'}
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>{item.name?.['en-US'] || 'Unnamed product'}</div>
            <div className={styles.productQuantity}>{item.quantity} pcs</div>
            <div className={styles.productTotalPrice}>
              {((item.price?.value.centAmount ?? 0) * item.quantity) / 100} {item.price?.value.currencyCode}
            </div>
          </li>
        ))}
      </ul>
      <div>
        Total: {cart.totalPrice.centAmount / 100} {cart.totalPrice.currencyCode}
      </div>
    </div>
  );
};

import { getActiveCart } from '@api/cart-api/cart-api';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { useEffect, useState, type FC } from 'react';
import styles from './cart.module.css';

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
      <h2>Your Cart</h2>
      <ul>
        {cart.lineItems.map((item: LineItem) => (
          <li key={item.id} className={styles.cartItem}>
            {item.name?.['en-US'] || 'Unnamed product'} — {item.quantity} pcs —{' '}
            {((item.price?.value.centAmount ?? 0) * item.quantity) / 100} {item.price?.value.currencyCode}
          </li>
        ))}
      </ul>
      <div>
        Total: {cart.totalPrice.centAmount / 100} {cart.totalPrice.currencyCode}
      </div>
    </div>
  );
};

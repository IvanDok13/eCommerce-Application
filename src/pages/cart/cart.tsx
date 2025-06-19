import { getActiveCart, removeLineItem, updateLineItemQuantity } from '@api/cart-api/cart-api';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import { useEffect, useState, type FC } from 'react';
import styles from './cart.module.css';

export const CartPage: FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

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

  const handleIncrease = async (lineItemId: string, currentQuantity: number): Promise<void> => {
    setUpdating(true);
    try {
      if (!cart) return;
      const updatedCart = await updateLineItemQuantity(lineItemId, currentQuantity + 1);
      setCart(updatedCart);
    } catch {
      setError('Failed to update quantity.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDecrease = async (lineItemId: string, currentQuantity: number): Promise<void> => {
    if (currentQuantity <= 1) return;
    setUpdating(true);
    try {
      if (!cart) return;
      const updatedCart = await updateLineItemQuantity(lineItemId, currentQuantity - 1);
      setCart(updatedCart);
    } catch {
      setError('Failed to update quantity.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (lineItemId: string): Promise<void> => {
    setUpdating(true);
    try {
      if (!cart) return;
      const updatedCart = await removeLineItem(lineItemId);
      setCart(updatedCart);
    } catch {
      setError('Failed to remove item.');
    } finally {
      setUpdating(false);
    }
  };

  // if (loading) return <div>Loading cart...</div>;
  // if (error) return <div>{error}</div>;
  // if (!cart || cart.lineItems.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div className={styles.cartPage}>
      <h2>Your Cart</h2>

      {loading && <div>Loading cart...</div>}

      {error && <div>{error}</div>}

      {!loading && !error && (!cart || cart.lineItems.length === 0) && <div>Your cart is empty.</div>}

      {!loading && !error && cart && cart.lineItems.length > 0 && (
        <>
          <ul className={styles.cartList}>
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

                <div className={styles.productQuantity}>
                  <button
                    className={styles.minusButton}
                    onClick={() => {
                      void handleDecrease(item.id, item.quantity);
                    }}
                    disabled={updating || item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className={styles.plusButton}
                    onClick={() => {
                      void handleIncrease(item.id, item.quantity);
                    }}
                    disabled={updating}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className={styles.productTotalPrice}>
                  {((item.price?.value.centAmount ?? 0) * item.quantity) / 100} {item.price?.value.currencyCode}
                </div>

                <button
                  onClick={() => {
                    void handleDelete(item.id);
                  }}
                  disabled={updating}
                  aria-label="Remove item"
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div>
            Total: {cart.totalPrice.centAmount / 100} {cart.totalPrice.currencyCode}
          </div>
        </>
      )}
    </div>
  );
};

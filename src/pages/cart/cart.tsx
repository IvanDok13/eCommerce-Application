// src/pages/cart/cart.tsx
import { type FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './cart.module.css';

import { Header } from '@components/header/header';

export const CartPage: FC = () => {
  return (
    <div className={styles.cartPage}>
      <Header />
      <h1>Shopping Cart</h1>
      <p>Your Cart will appear here ...</p>
      <Link to="/catalog">Back to catalog</Link>
    </div>
  );
};

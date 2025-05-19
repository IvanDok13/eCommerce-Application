import { Header } from '@components/header/header';
import type { FC } from 'react';
import styles from './home.module.css';

export const Home: FC = () => (
  <div className={styles.home}>
    <h1 className={styles.title}>Welcome to the Home Page</h1>
    <Header />
  </div>
);

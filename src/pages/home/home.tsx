import { Footer } from '@components/footer/footer';
import { Header } from '@components/header/header';
import type { FC } from 'react';
import styles from './home.module.css';

export const Home: FC = () => (
  <div className={styles.home}>
    <Header />
    <Footer />
  </div>
);

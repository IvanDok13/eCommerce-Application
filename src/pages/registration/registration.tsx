import { Header } from '@components/header/header';
import styles from './registration.module.css';
import type { FC } from 'react';

export const Registration: FC = () => (
    <div className={styles.registration}>
      <Header />
      <h1 className={styles.title}>Registration Page</h1>
      {/* TO DO: implement Registration form */}
    </div>
  );
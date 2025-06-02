import { Header } from '@components/header/header';
import { RegistrationForm } from '@components/reg-form/reg-form';
import type { FC } from 'react';
import styles from './registration.module.css';

export const Registration: FC = () => (
  <div className={styles.home}>
    <Header />
    <h1 className={styles.pageTitle}>Registration Page</h1>
    <RegistrationForm />
  </div>
);

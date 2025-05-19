import { Header } from '@components/header/header';
import { LoginForm } from '@components/login-form/login-form';
import type { FC } from 'react';
import styles from './login.module.css';

export const Login: FC = () => {
  return (
    <div className={styles.home}>
      <Header />
      <h1 className={styles.pageTitle}>Login page</h1>
      <LoginForm />
    </div>
  );
};

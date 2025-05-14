import { Header } from '@components/header/header';
import type { FC } from 'react';
import styles from './login.module.css';

interface LoginForm {
    email: string;
    password: string;
  }

export const Login: FC = () => {
    return (
        <div className={styles.home}>
        <h1 className={styles.title}>Welcome to the Login Page</h1>
        <Header />
      </div>
    )
}


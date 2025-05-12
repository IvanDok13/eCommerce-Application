import { Header } from '@components/header/header';
import styles from './home.module.css';

export function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to the Home Page</h1>
      <Header />
    </div>
  );
}

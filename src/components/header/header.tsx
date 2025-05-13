import type { FC } from 'react';
import styles from './header.module.css';

export const Header: FC = () => (
  <header className={styles.header}>
    <div className={styles.headerWrapper}>
      <nav className={styles.headerNav}>
        <ul className={styles.headerList}>
          <li className={styles.headerItem}>
            <a className={styles.headerLink} href="#home">
              Home
            </a>
          </li>

          <li className={styles.headerItem}>
            <a className={styles.headerLink} href="#login">
              Log in
            </a>
          </li>

          <li className={styles.headerItem}>
            <a className={styles.headerLink} href="#design">
              Design
            </a>
          </li>

          <li className={styles.headerItem}>
            <a className={styles.headerLink} href="#about">
              About
            </a>
          </li>

          <li className={styles.headerItem}>
            <a className={styles.headerLink} href="#contacts">
              Contacts
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

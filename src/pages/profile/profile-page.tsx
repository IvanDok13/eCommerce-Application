import { Header } from '@components/header/header';
import type { FC } from 'react';
import styles from './profile.module.css';
import { UserProfile } from '@components/profile/profile';

export const Profile: FC = () => {
  return (
    <div className={styles.home}>
      <Header />
      <UserProfile />
    </div>
  );
};

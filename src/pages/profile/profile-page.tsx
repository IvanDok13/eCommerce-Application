import { UserProfile } from '@components/profile/profile';
import type { FC } from 'react';
import styles from './profile.module.css';

export const Profile: FC = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.pageTitle}>Profile page</h1>
      <UserProfile />
    </div>
  );
};

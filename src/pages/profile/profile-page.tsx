import { UserProfile } from '@components/profile/profile';
import type { FC } from 'react';
import styles from './profile.module.css';

export const Profile: FC = () => {
  return (
    <div className={styles.home}>
<<<<<<< feat/user-info
      <h1 className={styles.pageTitle}>Profile page</h1>
=======
      <Header />
>>>>>>> sprint-4/setup
      <UserProfile />
    </div>
  );
};

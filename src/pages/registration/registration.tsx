import { Header } from '@components/header/header';
import styles from './registration.module.css';
import type { FC } from 'react';
import { RegistrationForm } from '@components/registration-form/registration-form';
import { getProject } from 'src/api/commercetools-api';

// debug
const handleTestClick = async (): Promise<void> => {
  try {
    const project = await getProject();
    console.log('Project info:', project);
  } catch (error) {
    console.error('Error fetching project:', error);
  }
};
// debug

export const Registration: FC = () => (
  <div className={styles.registration}>
    <Header />
    <h1 className={styles.title}>Registration Page</h1>
    <RegistrationForm />
    {/* debug */}
    <button
      type="button"
      onClick={() => {
        void handleTestClick();
      }}
      style={{
        backgroundColor: 'red',
        color: 'white',
        border: '2px solid darkred',
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '4px',
      }}
    >
      Test
    </button>
    {/* debug */}
  </div>
);

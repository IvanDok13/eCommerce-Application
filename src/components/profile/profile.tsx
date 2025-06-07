import { useState, useEffect } from 'react';
import { getCustomerData } from '@api/auth-user';
import type { Customer } from '@commercetools/platform-sdk';
import type { FC } from 'react';
import type { ProfileData } from './interfaces-profile';
import styles from './profile.module.css';

export const UserProfile = () => {
  const [user, setUser] = useState<Customer | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getCustomerData()
      .then(setUser)
      .catch(() => console.log('Не авторизован'));
  }, []);

  if (!user) return <div>Loading...</div>;

  const primaryAddress = user.addresses?.[0];

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>Profile User</h2>
      {isEditing ? (
        <form className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input id="firstName" className={styles.input} defaultValue={user.firstName || ''} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input id="lastName" className={styles.input} defaultValue={user.lastName || ''} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input id="email" type="email" className={styles.input} defaultValue={user.email} />
          </div>

          <button type="submit" className={styles.submitButton}>
            Save
          </button>
          <button type="button" className={styles.cancelButton} onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className={styles.profileInfo}>
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <div className={styles.addresses}>
            <h3>Address:</h3>
            {primaryAddress ? (
              <p>
                {primaryAddress.streetName}, {primaryAddress.city}, {primaryAddress.postalCode},{' '}
                {primaryAddress.country}
              </p>
            ) : (
              <p>No address available</p>
            )}
          </div>

          <button className={styles.editButton} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

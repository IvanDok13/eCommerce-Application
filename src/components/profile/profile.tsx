import { useState } from 'react';
import type { FC } from 'react';
import type { ProfileData } from './interfaces-profile';
import styles from './profile.module.css';

const mockProfile: ProfileData = {
  firstName: 'Иван',
  lastName: 'Иванов',
  dateOfBirth: '1990-01-01',
  email: 'ivan@example.com',
  addresses: [
    {
      id: '1',
      streetName: 'ул. Примерная',
      city: 'Москва',
      postalCode: '123456',
      country: 'RU',
    },
  ],
};

export const UserProfile: FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>Profile User</h2>
      {isEditing ? (
        <form className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input id="firstName" className={styles.input} defaultValue={mockProfile.firstName} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input id="lastName" className={styles.input} defaultValue={mockProfile.lastName} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dateOfBirth" className={styles.label}>
              Date of birth
            </label>
            <input id="dateOfBirth" type="date" className={styles.input} defaultValue={mockProfile.dateOfBirth} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input id="email" type="email" className={styles.input} defaultValue={mockProfile.email} />
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
            <strong>First Name:</strong> {mockProfile.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {mockProfile.lastName}
          </p>
          <p>
            <strong>Date of birth:</strong> {mockProfile.dateOfBirth}
          </p>
          <p>
            <strong>Email:</strong> {mockProfile.email}
          </p>
          <div className={styles.addresses}>
            <h3>Address:</h3>
            {mockProfile.addresses.length > 0 ? (
              <ul>
                {mockProfile.addresses.map(address => (
                  <li key={address.id}>
                    {address.streetName}, {address.city}, {address.postalCode}, {address.country}
                  </li>
                ))}
              </ul>
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

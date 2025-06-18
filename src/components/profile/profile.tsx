<<<<<<< feat/user-info
import { getProfile, setUserProfile } from '@api/set-profile';
import type { Customer, CustomerUpdate } from '@commercetools/platform-sdk';
import type { FormData } from '@components/reg-form/reg-form.types';
import { validationRules } from '@utils/validation-rules';
import type { FC, FormEvent } from 'react';
import { useContext, useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { authContext } from 'src/context/auth-provider';
import styles from './profile.module.css';

export const UserProfile: FC = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: 'all' });

  const [profile, setProfile] = useState<Customer | undefined>();

  const { customerId, isLoginned } = useContext(authContext);
  const [version, setNewVersion] = useState(0);
  const [editMode, setEditMode] = useState(false);

  // const [changePassMode, setChangePassMode] = useState(false);

  useEffect(() => {
    if (isLoginned) {
      const fetchProfile = async (): Promise<void> => {
        try {
          const response = await getProfile(customerId);
          if (response.body) {
            setProfile(response.body);
            setNewVersion(response.body.version);
          }
        } catch (error) {
          console.log(error);
        }
      };
      void fetchProfile();
    }
  }, [customerId, isLoginned]);

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        dateOfBirth: profile.dateOfBirth,
        email: profile.email,
      });
    }
  }, [profile, reset]);

  const navigate = useNavigate();

  if (!isLoginned) {
    navigate('/login');
  }

  const saveProfileHandle: SubmitHandler<Omit<FormData, 'password'>> = data => {
    if (profile) {
      const updateData: CustomerUpdate = {
        version: version,
        actions: [
          { action: 'setFirstName', firstName: data.firstName },
          { action: 'setLastName', lastName: data.lastName },
          { action: 'setDateOfBirth', dateOfBirth: data.dateOfBirth },
          { action: 'changeEmail', email: data.email },
        ],
      };
      setUserProfile(customerId, updateData)
        .then((updatedCustomer: { body: Customer }) => {
          setNewVersion(updatedCustomer.body.version);
          setEditMode(false);
        })
        .catch(error => console.log('Error:', error));
    }
  };

  const handleFormSubmit = (event: FormEvent): void => {
    event.preventDefault();
    void handleSubmit(saveProfileHandle)(event);
  };
=======
import { useState, useEffect } from 'react';
import { getCustomerData } from '@api/auth-user';
import type { Customer } from '@commercetools/platform-sdk';
import type { FC } from 'react';
import type { ProfileData } from './interfaces-profile';
import styles from './profile.module.css';

export const UserProfile = () => {
  const [user, setUser] = useState<Customer | null>(null);
  const [isEditing, setIsEditing] = useState(false);
>>>>>>> sprint-4/setup

  useEffect(() => {
    getCustomerData()
      .then(setUser)
      .catch(() => console.log('Не авторизован'));
  }, []);

  if (!user) return <div>Loading...</div>;

  const primaryAddress = user.addresses?.[0];

  return (
<<<<<<< feat/user-info
    // <>
    //   {changePassMode ? (
    //     <ChangePassword version={version} onClose={() => setChangePassMode(false)} />
    //   ) : (
    <main className={styles.profileContainer}>
      <form className={styles.profileForm} onSubmit={handleFormSubmit}>
        <div className={styles.profileBlockContainer}>
          <div className={styles.profileInputContainer}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              id="firstName"
              className={styles.profileInput}
              type="text"
              disabled={!editMode}
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.firstName?.message}
              {...register('firstName', validationRules.name)}
              placeholder="John"
            />
            <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.firstName} />
=======
    <div className={styles.profileContainer}>
      <h2 className={styles.title}>Profile User</h2>
      {isEditing ? (
        <form className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input id="firstName" className={styles.input} defaultValue={user.firstName || ''} />
>>>>>>> sprint-4/setup
          </div>

          <div className={styles.profileInputContainer}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
<<<<<<< feat/user-info
            <input
              id="lastName"
              className={styles.profileInput}
              type="text"
              disabled={!editMode}
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.lastName?.message}
              {...register('lastName', validationRules.name)}
              placeholder="Doe"
            />
            <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.lastName} />
          </div>

          <div className={styles.profileInputContainer}>
            <label htmlFor="dateOfBirth" className={styles.label}>
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              disabled={!editMode}
              className={styles.profileInput}
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.dateOfBirth?.message}
              {...register('dateOfBirth', validationRules.dateOfBirth)}
            />
            <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.dateOfBirth} />
=======
            <input id="lastName" className={styles.input} defaultValue={user.lastName || ''} />
>>>>>>> sprint-4/setup
          </div>

          <div className={styles.profileInputContainer}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
<<<<<<< feat/user-info
            <input
              id="email"
              type="text"
              className={styles.profileInput}
              disabled={!editMode}
              placeholder="example@mail.com"
              data-tooltip-id="tooltip-email"
              data-tooltip-content={errors.email?.message}
              {...register('email', validationRules.email)}
            />
            <Tooltip id="tooltip-email" place="top" variant="error" isOpen={!!errors.email} />
          </div>
=======
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
>>>>>>> sprint-4/setup
        </div>
        <button
          type="button"
          className={styles.editButton}
          style={{ display: !editMode ? 'block' : 'none' }}
          onClick={() => setEditMode(true)}
        >
          Edit profile
        </button>
        <button type="submit" className={styles.editButton} style={{ display: editMode ? 'block' : 'none' }}>
          Save changes
        </button>
      </form>
    </main>
    //   )}
    // </>
  );
};

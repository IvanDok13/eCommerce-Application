import { useForm } from 'react-hook-form';
import styles from './registration-form.module.css';
import type { FC } from 'react';
import type { FormData } from './registration-form.types';
import { validationRules } from '@utils/validation-rules';

export const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, //TO DO: implement error handling
  } = useForm<FormData>();

  const onSubmit = async (data: FormData): Promise<void> => {
    console.log('Form data:', data); //TO DO: implement form submission
  };

  return (
    <form className={styles.registrationForm} onSubmit={event => void handleSubmit(onSubmit)(event)}>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('email', validationRules.email)} placeholder="Email" />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
      </div>
      <input className={styles.registrationInput} {...register('password')} placeholder="Password" />
      <input className={styles.registrationInput} {...register('firstName')} placeholder="First Name" />
      <input className={styles.registrationInput} {...register('lastName')} placeholder="Last Name" />
      <input className={styles.registrationInput} {...register('dateOfBirth')} placeholder="Date of Birth" />
      <input className={styles.registrationInput} {...register('street')} placeholder="Street" />
      <input className={styles.registrationInput} {...register('city')} placeholder="City" />
      <input className={styles.registrationInput} {...register('postalCode')} placeholder="Postal Code" />
      <input className={styles.registrationInput} {...register('country')} placeholder="Country" />

      <button className={styles.submitButton} type="submit">
        Register
      </button>
    </form>
  );
};

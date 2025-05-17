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
  } = useForm<FormData>({
    mode: 'all',
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    console.log('Form data:', data); //TO DO: implement form submission
  };

  return (
    <form className={styles.registrationForm} onSubmit={event => void handleSubmit(onSubmit)(event)}>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('email', validationRules.email)} placeholder="Email" />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('password', validationRules.password)} placeholder="Password" />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('firstName', validationRules.name)} placeholder="First Name" />
        {errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('lastName', validationRules.name)} placeholder="Last Name" />
        {errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} type="date" {...register('dateOfBirth', validationRules.dateOfBirth)} placeholder="Date of Birth" />
        {errors.dateOfBirth && <p className={styles.errorMessage}>{errors.dateOfBirth.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('street', validationRules.street)} placeholder="Street" />
        {errors.street && <p className={styles.errorMessage}>{errors.street.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('city', validationRules.city)} placeholder="City" />
        {errors.city && <p className={styles.errorMessage}>{errors.city.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('postalCode', validationRules.postalCode)} placeholder="Postal Code" />
        {errors.postalCode && <p className={styles.errorMessage}>{errors.postalCode.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('country', validationRules.country)} placeholder="Country" />
        {errors.country && <p className={styles.errorMessage}>{errors.country.message}</p>}
      </div>
      <button className={styles.submitButton} type="submit">
        Register
      </button>
    </form>
  );
};

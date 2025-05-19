import { useForm } from 'react-hook-form';
import styles from './registration-form.module.css';
import type { FC } from 'react';
import type { FormData } from './registration-form.types';
import { validationRules } from '@utils/validation-rules';
import type { CustomerDraft } from '@commercetools/platform-sdk';
import { registerCustomer } from 'src/api/customers-api';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage, showErrorToast } from '@utils/utils';

export const RegistrationForm: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: 'all',
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      const customerDraft = mapFormDataToCustomerDraft(data);
      const result = await registerCustomer(customerDraft);
      console.log('Registered:', result.body.customer);
      navigate('/', { replace: true });
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      if (message.includes('Request body does not contain valid JSON')) {
        showErrorToast(
          'Some of the data entered is invalid. For security reasons, we cannot tell you which ones. Please check the form and try again.',
          'rgb(255, 95, 110)'
        );
      } else showErrorToast(getErrorMessage(error), 'rgb(255, 95, 110');
    }
  };

  return (
    <form className={styles.registrationForm} onSubmit={event => void handleSubmit(onSubmit)(event)}>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('email', validationRules.email)} placeholder="Email" />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input
          className={styles.registrationInput}
          {...register('password', validationRules.password)}
          placeholder="Password"
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input
          className={styles.registrationInput}
          {...register('firstName', validationRules.name)}
          placeholder="First Name"
        />
        {errors.firstName && <p className={styles.errorMessage}>{errors.firstName.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input
          className={styles.registrationInput}
          {...register('lastName', validationRules.name)}
          placeholder="Last Name"
        />
        {errors.lastName && <p className={styles.errorMessage}>{errors.lastName.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input
          className={styles.registrationInput}
          type="date"
          {...register('dateOfBirth', validationRules.dateOfBirth)}
          placeholder="Date of Birth"
        />
        {errors.dateOfBirth && <p className={styles.errorMessage}>{errors.dateOfBirth.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input
          className={styles.registrationInput}
          {...register('street', validationRules.street)}
          placeholder="Street"
        />
        {errors.street && <p className={styles.errorMessage}>{errors.street.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input className={styles.registrationInput} {...register('city', validationRules.city)} placeholder="City" />
        {errors.city && <p className={styles.errorMessage}>{errors.city.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input
          className={styles.registrationInput}
          {...register('postalCode', validationRules.postalCode)}
          placeholder="Postal Code"
        />
        {errors.postalCode && <p className={styles.errorMessage}>{errors.postalCode.message}</p>}
      </div>
      <div className={styles.registrationInputContainer}>
        <input
          className={styles.registrationInput}
          {...register('country', validationRules.country)}
          placeholder="Country"
        />
        {errors.country && <p className={styles.errorMessage}>{errors.country.message}</p>}
      </div>
      <button className={styles.registrationButton} type="submit" disabled={!isDirty || !isValid}>
        Register
      </button>
    </form>
  );
};

export const mapFormDataToCustomerDraft = (data: FormData): CustomerDraft => ({
  email: data.email,
  password: data.password,
  firstName: data.firstName,
  lastName: data.lastName,
  dateOfBirth: data.dateOfBirth,
  addresses: [
    {
      streetName: data.street,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country.toUpperCase(),
    },
  ],
  defaultShippingAddress: 0,
  defaultBillingAddress: 0,
});

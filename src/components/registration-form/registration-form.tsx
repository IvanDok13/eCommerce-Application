import { useForm } from 'react-hook-form';
import styles from './registration-form.module.css';
import type { FC } from 'react';
import type { FormData } from './registration-form.types';
import { validationRules } from '@utils/validation-rules';
import type { CustomerDraft } from '@commercetools/platform-sdk';
import { registerCustomer } from 'src/api/customers-api';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage, showErrorToast } from '@utils/utils';
import { countries } from '@utils/countries-const';

export const RegistrationForm: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
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
  const useSameAddress = watch('useSameAddress');
  return (
    <form className={styles.registrationForm} onSubmit={event => void handleSubmit(onSubmit)(event)}>
      <div className={`${styles.mainInfoContainer}  ${styles.formBlockContainer}`}>
        <div className={styles.registrationInputContainer}>
          <input
            className={styles.registrationInput}
            {...register('email', validationRules.email)}
            placeholder="Email"
          />
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
      </div>
      {/* Shipping Address */}
      <div className={`${styles.shippingAddressContainer} ${styles.formBlockContainer}`}>
        <h3>Shipping Address</h3>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register('defaultShippingAddress')} />
          Set this address as default shipping address
        </label>
        <div className={styles.registrationInputContainer}>
          <input
            className={styles.registrationInput}
            {...register('shippingAddress.street', validationRules.street)}
            placeholder="Street"
          />
          {errors.shippingAddress?.street && (
            <p className={styles.errorMessage}>{errors.shippingAddress.street.message}</p>
          )}
        </div>
        <div className={styles.registrationInputContainer}>
          <input
            className={styles.registrationInput}
            {...register('shippingAddress.city', validationRules.city)}
            placeholder="City"
          />
          {errors.shippingAddress?.city && <p className={styles.errorMessage}>{errors.shippingAddress.city.message}</p>}
        </div>
        <div className={styles.registrationInputContainer}>
          <input
            className={styles.registrationInput}
            {...register('shippingAddress.postalCode', validationRules.postalCode)}
            placeholder="Postal Code"
          />
          {errors.shippingAddress?.postalCode && (
            <p className={styles.errorMessage}>{errors.shippingAddress.postalCode.message}</p>
          )}
        </div>
        <div className={styles.registrationInputContainer}>
          <select
            className={styles.registrationInput}
            {...register('shippingAddress.country', validationRules.country)}
            defaultValue=""
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map(({ code, name }) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
          {errors.shippingAddress?.country && (
            <p className={styles.errorMessage}>{errors.shippingAddress.country.message}</p>
          )}
        </div>
      </div>
      {/* Checkbox for using shipping address as billing address */}
      <div className={styles.registrationInputContainer}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" {...register('useSameAddress')} />
          Use shipping address as billing address
        </label>
      </div>
      {/* Billing Address */}
      {!useSameAddress && (
        <div className={`${styles.billingAddressContainer} ${styles.formBlockContainer}`}>
          <h3>Billing Address</h3>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" {...register('defaultBillingAddress')} />
            Set this address as default billing address
          </label>
          <div className={styles.registrationInputContainer}>
            <input
              className={styles.registrationInput}
              {...register('billingAddress.street', validationRules.street)}
              placeholder="Street"
            />
            {errors.billingAddress?.street && (
              <p className={styles.errorMessage}>{errors.billingAddress.street.message}</p>
            )}
          </div>
          <div className={styles.registrationInputContainer}>
            <input
              className={styles.registrationInput}
              {...register('billingAddress.city', validationRules.city)}
              placeholder="City"
            />
            {errors.billingAddress?.city && <p className={styles.errorMessage}>{errors.billingAddress.city.message}</p>}
          </div>
          <div className={styles.registrationInputContainer}>
            <input
              className={styles.registrationInput}
              {...register('billingAddress.postalCode', validationRules.postalCode)}
              placeholder="Postal Code"
            />
            {errors.billingAddress?.postalCode && (
              <p className={styles.errorMessage}>{errors.billingAddress.postalCode.message}</p>
            )}
          </div>
          <div className={styles.registrationInputContainer}>
            <select
              className={styles.registrationInput}
              {...register('billingAddress.country', validationRules.country)}
              defaultValue=""
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map(({ code, name }) => (
                <option key={code} value={code}>
                  {code} - {name}
                </option>
              ))}
            </select>
            {errors.billingAddress?.country && (
              <p className={styles.errorMessage}>{errors.billingAddress.country.message}</p>
            )}
          </div>
        </div>
      )}
      <button className={styles.registrationButton} type="submit" disabled={!isDirty || !isValid}>
        Register
      </button>
    </form>
  );
};

export const mapFormDataToCustomerDraft = (data: FormData): CustomerDraft => {
  const shippingAddress = {
    streetName: data.shippingAddress.street,
    city: data.shippingAddress.city,
    postalCode: data.shippingAddress.postalCode,
    country: data.shippingAddress.country.toUpperCase(),
  };

  const addresses = [shippingAddress];

  let defaultShippingAddress: number | undefined;
  let defaultBillingAddress: number | undefined;

  if (data.defaultShippingAddress) {
    defaultShippingAddress = 0;
  }

  if (!data.useSameAddress && data.billingAddress.street) {
    const billingAddress = {
      streetName: data.billingAddress.street,
      city: data.billingAddress.city || '',
      postalCode: data.billingAddress.postalCode || '',
      country: (data.billingAddress.country || '').toUpperCase(),
    };
    addresses.push(billingAddress);

    if (data.defaultBillingAddress) {
      defaultBillingAddress = addresses.length - 1;
    }
  } else if (data.useSameAddress) {
    defaultBillingAddress = defaultShippingAddress;
  }

  return {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    addresses,
    defaultShippingAddress,
    defaultBillingAddress,
  };
};

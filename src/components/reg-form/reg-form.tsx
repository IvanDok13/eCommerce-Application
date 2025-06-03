import { registrationRequestResponse } from '@api/reg-user';
import { countries } from '@utils/countries-const';
import 'toastify-js/src/toastify.css';

import { authError } from '@utils/auth-error';
import { validationRules } from '@utils/validation-rules';
import { useContext, useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { authContext } from 'src/context/auth-provider';
import styles from './reg-form.module.css';
import type { FormData } from './reg-form.types';

export const RegistrationForm: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: 'all',
  });

  const [apiError, setApiError] = useState<{
    field: 'email' | 'password' | 'general';
    message: string;
  } | null>(null);

  const { setLogin, setIsLoginned } = useContext(authContext);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      const result = await registrationRequestResponse(
        data,
        !!data.defaultBillingAddress,
        !!data.defaultShippingAddress
      );
      console.log('Registered:', result.body.customer);
      setLogin(result.body.customer.email);
      setIsLoginned(true);
      localStorage.setItem('registrationSuccess', 'true');
      navigate('/');
    } catch (error: unknown) {
      const authApiError = authError(error);
      setApiError(authApiError);

      if (authApiError?.field === 'email') {
        setError('email', { type: 'manual', message: authApiError.message });
      } else if (authApiError?.field === 'general') {
        setError('password', { type: 'manual', message: authApiError.message });
      } else {
        setError(authApiError?.field, { type: 'manual', message: authApiError.message });
      }
    }
    console.log('Form submitted:', data);
  };
  const useSameAddress = watch('useSameAddress');
  return (
    <main>
      <form className={styles.registrationForm} onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <div className={`${styles.mainInfoContainer}  ${styles.formBlockContainer}`}>
          <div className={styles.registrationInputContainer}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              autoComplete="email"
              className={styles.registrationInput}
              type="text"
              data-tooltip-id="tooltip-email"
              data-tooltip-content={errors.email?.message || (apiError?.field === 'email' ? apiError.message : '')}
              {...register('email', validationRules.email)}
              placeholder="email@gmail.com"
            />
          </div>
          <Tooltip
            id="tooltip-email"
            place="top"
            variant="error"
            isOpen={!!errors.email || apiError?.field === 'email'}
          />
          <div className={styles.registrationInputContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              className={styles.registrationInput}
              type={showPassword ? 'text' : 'password'}
              data-tooltip-id="tooltip-password"
              data-tooltip-content={errors.password?.message}
              {...register('password', validationRules.password)}
              placeholder="Abcde123"
            />
            <button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <Tooltip
            id="tooltip-password"
            place="top"
            variant="error"
            isOpen={!!errors.password || apiError?.field === 'password'}
          />
          <div className={styles.registrationInputContainer}>
            <label htmlFor="firstName" className={styles.label}>
              First Name
            </label>
            <input
              id="firstName"
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.firstName?.message}
              className={styles.registrationInput}
              {...register('firstName', validationRules.name)}
              placeholder="John"
            />
          </div>
          <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.firstName} />
          <div className={styles.registrationInputContainer}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name
            </label>
            <input
              id="lastName"
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.lastName?.message}
              className={styles.registrationInput}
              {...register('lastName', validationRules.name)}
              placeholder="Smith"
            />
          </div>
          <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.lastName} />
          <div className={styles.registrationInputContainer}>
            <label htmlFor="dateOfBirth" className={styles.label}>
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.dateOfBirth?.message}
              className={styles.registrationInput}
              type="date"
              {...register('dateOfBirth', validationRules.dateOfBirth)}
              placeholder="Date of Birth"
            />
          </div>
          <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.dateOfBirth} />
        </div>
        {/* Shipping Address */}
        <div className={`${styles.shippingAddressContainer} ${styles.formBlockContainer}`}>
          <h3>Shipping Address</h3>
          <div className={styles.registrationInputContainer}>
            <label htmlFor="street" className={styles.label}>
              Street
            </label>
            <input
              id="street"
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.shippingAddress?.street?.message}
              className={styles.registrationInput}
              {...register('shippingAddress.street', validationRules.street)}
              placeholder="Hollywood Boulevard 123"
            />
          </div>
          <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.shippingAddress?.street} />
          <div className={styles.registrationInputContainer}>
            <label htmlFor="city" className={styles.label}>
              City
            </label>
            <input
              id="city"
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.shippingAddress?.city?.message}
              className={styles.registrationInput}
              {...register('shippingAddress.city', validationRules.city)}
              placeholder="Los Angeles"
            />
          </div>
          <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.shippingAddress?.city} />
          <div className={styles.registrationInputContainer}>
            <label htmlFor="postalCode" className={styles.label}>
              Postal Code
            </label>
            <input
              id="postalCode"
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.shippingAddress?.postalCode?.message}
              className={styles.registrationInput}
              {...register('shippingAddress.postalCode', validationRules.postalCode)}
              placeholder="12345"
            />
          </div>
          <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.shippingAddress?.postalCode} />
          <div className={styles.registrationInputContainer}>
            <label htmlFor="country" className={styles.label}>
              Country
            </label>
            <select
              id="country"
              autoComplete="country"
              className={styles.registrationInput}
              data-tooltip-id="tooltip"
              data-tooltip-content={errors.shippingAddress?.country?.message}
              {...register('shippingAddress.country', validationRules.country)}
              defaultValue="US"
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
          </div>
          {/* Checkbox for setting default shipping address */}
          <label className={styles.checkboxLabel}>
            <input type="checkbox" {...register('defaultShippingAddress')} />
            Set this address as default shipping address
          </label>
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
            <div className={styles.registrationInputContainer}>
              <label htmlFor="billingStreet" className={styles.label}>
                Street
              </label>
              <input
                id="billingStreet"
                data-tooltip-id="tooltip"
                data-tooltip-content={errors.billingAddress?.country?.message}
                className={styles.registrationInput}
                {...register('billingAddress.street', validationRules.street)}
                placeholder="Sana Monica Boulevard 456"
              />
            </div>
            <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.billingAddress?.street} />
            <div className={styles.registrationInputContainer}>
              <label htmlFor="billingCity" className={styles.label}>
                City
              </label>
              <input
                id="billingCity"
                data-tooltip-id="tooltip"
                data-tooltip-content={errors.billingAddress?.city?.message}
                className={styles.registrationInput}
                {...register('billingAddress.city', validationRules.city)}
                placeholder="San Francisco"
              />
            </div>
            <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.billingAddress?.city} />
            <div className={styles.registrationInputContainer}>
              <label htmlFor="billingPostalCode" className={styles.label}>
                Postal Code
              </label>
              <input
                id="billingPostalCode"
                data-tooltip-id="tooltip"
                data-tooltip-content={errors.billingAddress?.postalCode?.message}
                className={styles.registrationInput}
                {...register('billingAddress.postalCode', validationRules.postalCode)}
                placeholder="54321"
              />
            </div>
            <Tooltip id="tooltip" place="top" variant="error" isOpen={!!errors.billingAddress?.postalCode} />
            <div className={styles.registrationInputContainer}>
              <label htmlFor="billingCountry" className={styles.label}>
                Country
              </label>
              <select
                id="billingCountry"
                className={styles.registrationInput}
                {...register('billingAddress.country', validationRules.country)}
                defaultValue="US"
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
            </div>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" {...register('defaultBillingAddress')} />
              Set this address as default billing address
            </label>
          </div>
        )}
        <button className="registrationButton" type="submit" disabled={!isDirty || !isValid}>
          Register
        </button>
      </form>
    </main>
  );
};

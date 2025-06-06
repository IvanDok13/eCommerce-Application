import { authRequestResponse, fetchCustomerData, getCustomerData } from '@api/auth-user';
import { authError } from '@utils/auth-error';
import { validationRules } from '@utils/validation-rules';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { authContext } from 'src/context/auth-provider';
import styles from './login-form.module.css';
import type { LoginFormData } from './login-form.types';

export const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({ mode: 'all' });

  const [apiError, setApiError] = useState<{
    field: 'email' | 'password' | 'general';
    message: string;
  } | null>(null);

  const { isLoginned, setLogin, setIsLoginned, setCustomerId } = useContext(authContext);

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      try {
        const customer = await fetchCustomerData();
        setLogin(customer.email);
        setCustomerId(customer.id);
        setIsLoginned(true);
        console.log('user authorized');
      } catch (error) {
        console.warn('user is not authorized', error);
        setIsLoginned(false);
      }
    };

    void checkAuth();
  }, []);

  const formSubmit: SubmitHandler<LoginFormData> = async data => {
    try {
      const response = await authRequestResponse(data.email, data.password);
      const customer = response.body.customer;
      setLogin(customer.email);
      setIsLoginned(true);
      setCustomerId(customer.id);
      navigate('/');
    } catch (error) {
      const authApiError = authError(error);
      setApiError(authApiError);
      switch (authApiError?.field) {
        case 'email':
          setError('email', { type: 'manual', message: authApiError.message });
          break;
        case 'password':
          setError('password', { type: 'manual', message: authApiError.message });
          break;
        case 'general':
          setError('email', { type: 'manual', message: authApiError.message });
          setError('password', { type: 'manual', message: authApiError.message });
          break;
        default:
          break;
      }
    }
    console.log('Form submitted:', data);
  };

  if (isLoading) {
    return <div className={styles.loginContainer}>Loading...</div>;
  }

  return (
    <main className={styles.loginContainer}>
      <form className={styles.loginForm} action="submit" onSubmit={event => void handleSubmit(formSubmit)(event)}>
        <div className="formBlockContainer">
          <div className={styles.registrationInputContainer}>
            <label htmlFor="email" className={styles.label} form="email">
              Email
            </label>
            <input
              id="email"
              type="text"
              className={styles.input}
              placeholder="email@gmail.com"
              data-tooltip-id="tooltip-email"
              data-tooltip-content={errors.email?.message || (apiError?.field === 'email' ? apiError.message : '')}
              {...register('email', validationRules.email)}
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
              type={showPassword ? 'text' : 'password'}
              className={styles.input}
              placeholder="Abcde123"
              data-tooltip-id="tooltip-password"
              data-tooltip-content={
                errors.password?.message || (apiError?.field === 'password' ? apiError.message : '')
              }
              {...register('password', validationRules.password)}
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
        </div>

        <button type="submit" className="registrationButton">
          Login
        </button>
        <a href="/registration" className={styles.signUpButton}>
          Sign up
        </a>
      </form>
    </main>
  );
};

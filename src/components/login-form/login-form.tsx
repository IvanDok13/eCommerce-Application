import { authRequestResponse } from '@api/auth-user';
import { authError } from '@utils/auth-error';
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
    if (isLoginned) {
      navigate('/');
    }
  }, [isLoginned, navigate]);

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
  };

  return (
    <main className={styles.loginContainer}>
      <form className={styles.loginForm} action="submit" onSubmit={event => void handleSubmit(formSubmit)(event)}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="example@mail.com"
            data-tooltip-id="email-tooltip"
            data-tooltip-content={errors.email?.message || (apiError?.field === 'email' ? apiError.message : '')}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,}$/i,
                message: 'Invalid email format',
              },
            })}
          />
          <Tooltip
            id="email-tooltip"
            place="top"
            variant="error"
            isOpen={!!errors.email || apiError?.field === 'email'}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordInputContainer}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={styles.input}
              placeholder="Password"
              data-tooltip-id="password-tooltip"
              data-tooltip-content={
                errors.password?.message || (apiError?.field === 'password' ? apiError.message : '')
              }
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />

            <button type="button" className={styles.showPasswordButton} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <Tooltip
            id="password-tooltip"
            place="top"
            variant="error"
            isOpen={!!errors.password || apiError?.field === 'password'}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <a href="/registration" className={styles.signUpButton}>
          Sign up
        </a>
      </form>
    </main>
  );
};

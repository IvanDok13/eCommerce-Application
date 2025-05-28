import { getErrorMessage, showErrorToast } from '@utils/utils';
import type { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginCustomer } from 'src/api/customers-api';
import styles from './login-form.module.css';

interface LoginFormData {
  email: string;
  password: string;
}

const validatePassword = (value: string): string | boolean => {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters long';
  if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
  if (!/\d/.test(value)) return 'Password must contain at least one digit';
  if (value.trim() !== value) return 'Password must not contain leading or trailing whitespace';
  return true;
};

export const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const password = watch('password', '');

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      console.log(data);
      const response = await loginCustomer(data);

      if (response.statusCode === 200) {
        navigate('/');
      } else if (response.statusCode === 400) {
        console.log(response.statusCode);
        navigate('/registration');
      }
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      if (message.includes('Request body does not contain valid JSON')) {
        showErrorToast(
          'Some of the data entered is invalid. For security reasons, we cannot tell you which ones. Please check the form and try again.',
          'rgb(255, 95, 110)'
        );
      } else {
        showErrorToast(getErrorMessage(error), 'rgb(255, 95, 110)');
      }
    }
  };

  return (
    <main className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      <form
        className={styles.loginForm}
        onSubmit={element => {
          element.preventDefault();
          void handleSubmit(onSubmit)(element);
        }}
      >
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
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
              {...register('password', {
                validate: validatePassword,
              })}
            />
            <button
              type="button"
              className={styles.showPasswordButton}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}

          <div className={styles.passwordRequirements}>
            <p>Password must:</p>
            <ul>
              <li className={password.length >= 8 ? styles.requirementMet : ''}>Be at least 8 characters long</li>
              <li className={/[A-Z]/.test(password) ? styles.requirementMet : ''}>
                {/* Contain at least one uppercase letter */}
              </li>
              <li className={/[a-z]/.test(password) ? styles.requirementMet : ''}>
                {/* Contain at least one lowercase letter */}
              </li>
              <li className={/\d/.test(password) ? styles.requirementMet : ''}>{/* Contain at least one digit */}</li>
              <li className={password.trim() === password ? styles.requirementMet : ''}>
                {/* Not contain leading/trailing spaces */}
              </li>
            </ul>
          </div>
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

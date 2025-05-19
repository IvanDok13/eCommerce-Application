import { useForm } from 'react-hook-form';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
// import { apiRoot } from '../../../.env';
import styles from './login-form.module.css';
import type { LoginFormData } from './type-login-form';

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      <form
        className={styles.loginForm}
        onSubmit={event => {
          void handleSubmit(onSubmit)(event);
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
              required: 'Email required',
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
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="Password"
            {...register('password', {
              required: 'password required',
              minLength: {
                value: 6,
                message: 'The password must be at least 6 characters long',
              },
            })}
          />
          {errors.password && <p className={styles.error}>{errors.password.message}</p>}
        </div>

        {errors.root && <p className={styles.error}>{errors.root.message}</p>}

        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <a type="button" href="/registration" className={styles.submitButton}>
          Sign up
        </a>
      </form>
    </div>
  );
};

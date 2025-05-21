// registration.test.tsx
import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Registration } from '../pages/registration/registration';

describe('Registration Page', () => {
  it('renders registration form', () => {
    const { getByText } = render(<Registration />);
    expect(getByText('Register')).toBeInTheDocument();
  });

  it('validates email input', () => {
    const { getByPlaceholderText, getByText } = render(<Registration />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(getByText('Invalid email address')).toBeInTheDocument();
  });

  it('validates password input', () => {
    const { getByPlaceholderText, getByText } = render(<Registration />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('submits registration form', async () => {
    const { getByText, getByPlaceholderText } = render(<Registration />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    // const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const submitButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    // fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(getByText('Registration successful')).toBeInTheDocument());
  });
});

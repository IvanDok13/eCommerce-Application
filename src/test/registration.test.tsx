// registration.test.tsx
import type { RenderResult } from '@testing-library/react';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Registration } from '../pages/registration/registration';

const renderInsideRouter = (testedElement: React.ReactElement): RenderResult => {
  return render(<MemoryRouter>{testedElement}</MemoryRouter>);
};

describe('Registration Page', () => {
  it('renders registration form', () => {
    const { getByText } = renderInsideRouter(<Registration />);
    expect(getByText('Register')).toBeInTheDocument();
  });

  it('validates email input', async () => {
    const { getByPlaceholderText, findByText } = renderInsideRouter(<Registration />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    expect(await findByText(/Invalid email format/)).toBeInTheDocument();
  });

  it('validates password input', async () => {
    const { getByPlaceholderText, findByText } = renderInsideRouter(<Registration />);
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    expect(await findByText(/Password must be at least 8 characters/)).toBeInTheDocument();
  });

  it('submits registration form', async () => {
    const { getByText, getByPlaceholderText } = renderInsideRouter(<Registration />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    // const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const submitButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    // fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
  });
});

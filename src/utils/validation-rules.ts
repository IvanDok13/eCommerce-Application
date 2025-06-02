export const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format. Valid email format: example@email.com',
    },
  },
  password: {
    required: 'Password is required',
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      message:
        'Password must be at least 8 characters long and include at least 1 uppercase, 1 lowercase letter and 1 number',
    },
  },
  name: {
    required: 'Last name is required',
    pattern: {
      value: /^[\s'A-Za-z-]+$/,
      message: 'Only English letters, hyphens, apostrophes, and spaces are allowed',
    },
  },
  dateOfBirth: {
    required: 'Date of birth is required',
    validate: (value: string): boolean | string => {
      const age = new Date().getFullYear() - new Date(value).getFullYear();
      return age >= 16 || 'You must be at least 16 years old';
    },
  },
  street: {
    required: 'Street is required',
    minLength: {
      value: 1,
      message: 'Street must contain at least one character',
    },
  },

  city: {
    required: 'City is required',
    pattern: {
      value: /^[\sA-Za-z-]+$/,
      message: 'City must contain at least one character and no special characters or numbers',
    },
  },

  postalCode: {
    required: 'Postal code is required',
    pattern: {
      value: /^[\d\sA-Za-z-]{3,10}$/,
      message: 'Postal code must be 3–10 characters and may contain letters, numbers, spaces, or dashes',
    },
  },

  country: {
    required: 'Country is required',
    pattern: {
      value: /^[A-Z]{2}$/,
      message: 'Country must be a valid 2-letter ISO code (e.g., US, GB, DE)',
    },
  },
};

export const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format. Please enter a valid email address (e.g., example@email.com)',
    },
  },
  password: {
    required: 'Password is required',
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      message:
        'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, and 1 number. Special characters are allowed but not required.',
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
      //TO DO: implement valid regex for postal code after API finishing
      value: /^[\d A-Za-z-]+$/,
      message:
        'Postal code must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S. and Canada, respectively)',
    },
  },

  country: {
    required: 'Country is required',
    pattern: {
      // TO DO: Replace with ISO country code validation from API/autocomplete
      value: /^[\sA-Za-z-]{2,}$/,
      message: 'Country name must contain only letters and be at least 2 characters long',
    },
  },
};

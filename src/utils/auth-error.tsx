export function authError(error: unknown): {
  field: 'email' | 'password' | 'general';
  message: string;
} {
  if (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    typeof error.statusCode === 'number' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    const statusCode = error.statusCode;
    const message = error.message;

    switch (statusCode) {
      case 400:
        if (message.includes('credentials not found')) {
          return { field: 'password', message: '⚠️ Incorrect email or password' };
        }
        if (message.includes('an existing customer with the provided')) {
          return {
            field: 'email',
            message: '⚠️ An account with this email already exists. Please log in or use another email address.',
          };
        }
        return {
          field: 'general',
          message: '⚠️ Registration error. Please check your details.',
        };
      case 401:
        return {
          field: 'general',
          message: '⚠️ Authorization error. Check your details',
        };
      case 500:
        return {
          field: 'general',
          message: '⚠️ Server error occurred. Please try again later.',
        };
      default:
        return {
          field: 'general',
          message: '⚠️ Unknown error occurred. Please try again later.',
        };
    }
  }

  return {
    field: 'general',
    message: '⚠️ Unknown error occurred. Please try again later.',
  };
}

import "toastify-js/src/toastify.css";
import Toastify from 'toastify-js';


export const showErrorToast = (errorMessage: string, backgroundColorValue: string): void => {
    Toastify({
      text: errorMessage,
      duration: 10000,
      close: true,
      gravity: 'top', 
      position: 'center',
      style: {
        background: backgroundColorValue,
      },
      stopOnFocus: true,
    }).showToast();
  };

  export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    return 'An unknown error occurred. Please try later.';
  };
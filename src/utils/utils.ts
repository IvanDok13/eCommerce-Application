import "toastify-js/src/toastify.css";
import Toastify from 'toastify-js';


export const showErrorToast = (errorMessage: string, backgroundColorValue: string): void => {
    Toastify({
      text: errorMessage,
      duration: 5000,
      close: true,
      gravity: 'top', 
      position: 'center',
      style: {
        background: backgroundColorValue,
      },
      stopOnFocus: true,
    }).showToast();
  };
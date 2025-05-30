import { Context, createContext } from 'react';

export type authContextTupe = {
  login: string;
  isLoginned: boolean;
  customerId: string;
  setLogin: (login: string) => void;
  setIsLoginned: (isLoginned: boolean) => void;
  setCustomerId: (customerId: string) => void;
};

const defContext: authContextTupe = {
  login: '',
  isLoginned: false,
  customerId: '',
  setLogin: () => {},
  setIsLoginned: () => {},
  setCustomerId: () => {},
};

export const authContext: Context<authContextTupe> = createContext(defContext);

import type { Context, FC, ReactNode } from 'react';
import { createContext, useState } from 'react';

export type authContextTupe = {
  login: string;
  isLoginned: boolean;
  customerId: string;
  setLogin: (login: string) => void;
  setIsLoginned: (isLoginned: boolean) => void;
  setCustomerId: (customerId: string) => void;
};

const defaultContext: authContextTupe = {
  login: '',
  isLoginned: false,
  customerId: '',
  setLogin: () => {},
  setIsLoginned: () => {},
  setCustomerId: () => {},
};

export const authContext: Context<authContextTupe> = createContext(defaultContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [login, setLogin] = useState('');
  const [isLoginned, setIsLoginned] = useState(() => {
    return Boolean(localStorage.getItem('Token'));
  });
  const [customerId, setCustomerId] = useState('');

  return (
    <authContext.Provider value={{ login, isLoginned, customerId, setLogin, setIsLoginned, setCustomerId }}>
      {children}
    </authContext.Provider>
  );
};

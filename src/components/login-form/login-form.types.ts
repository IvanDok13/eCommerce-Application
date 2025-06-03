export type LoginFormData = {
  email: string;
  password: string;
};

export type contextType = {
  login: string;
  isLoginned: boolean;
  customerId: string;
  setLogin: (login: string) => void;
  setIsLoginned: (isLoginned: boolean) => void;
  setCustomerId: (customerId: string) => void;
};

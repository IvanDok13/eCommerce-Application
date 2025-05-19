export type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;

  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };

  billingAddress: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };

  useSameAddress: boolean;
};
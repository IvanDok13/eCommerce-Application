export interface Address {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  addresses: Address[];
}

export interface Customer {
  id: string;
  version: number;
  email: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses: Address[];
}

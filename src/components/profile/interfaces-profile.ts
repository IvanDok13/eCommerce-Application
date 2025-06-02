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

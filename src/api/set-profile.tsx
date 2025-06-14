import type { ClientResponse, Customer, CustomerUpdate } from '@commercetools/platform-sdk';
import { apiRoot } from './api-root';

export const setUserProfile = async (customerId: string, body: CustomerUpdate): Promise<ClientResponse<Customer>> => {
  return await apiRoot.customers().withId({ ID: customerId }).post({ body }).execute();
};

export const getProfile = async (customerId: string): Promise<ClientResponse<Customer>> => {
  return await apiRoot.customers().withId({ ID: customerId }).get().execute();
};

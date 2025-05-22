import {
  type ClientResponse,
  type CustomerDraft,
  type CustomerSignInResult,
  type CustomerSignin,
} from '@commercetools/platform-sdk';
import { tokenCache } from '@utils/token';
import { v4 as uuidv4 } from 'uuid';
import { apiRoot } from './commercetools-client';
import { CTP_PROJECT_KEY } from './env-const';

// Registration
export const registerCustomer = async (draft: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> => {
  const response = await apiRoot
    .withProjectKey({ projectKey: CTP_PROJECT_KEY })
    .customers()
    .post({ body: draft })
    .execute();

  if (response.body) {
    const token = uuidv4();
    tokenCache.set({
      token,
      expirationTime: 0,
    });
  }

  return response;
};

export const getCustomerName = async (token: string): Promise<string> => {
  const response = await apiRoot
    .withProjectKey({ projectKey: CTP_PROJECT_KEY })
    .me()
    .get({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .execute();

  if (response.body) {
    return response.body.firstName + ' ' + response.body.lastName;
  } else {
    return 'Unknown';
  }
};

// Login
export const loginCustomer = async (credentials: CustomerSignin): Promise<ClientResponse<CustomerSignInResult>> => {
  const response = await apiRoot
    .withProjectKey({ projectKey: CTP_PROJECT_KEY })
    .login()
    .post({ body: credentials })
    .execute();

  if (response.body) {
    console.log('Welcome, ' + (response.body.customer?.firstName ?? 'Customer'));
  }
  return response;
};

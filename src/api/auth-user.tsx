import type { ByProjectKeyRequestBuilder, ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { apiRoot } from './api-root';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Client, PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
import type { Customer } from '@components/profile/interfaces-profile';
import { ClientBuilder } from '@commercetools/ts-client';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } from '@utils/ecomm-const';
import { tokenCache } from '../utils/token';
import { httpMiddlewareOptions } from './middleware-options';

const authenticateUser = (email: string, password: string): Client => {
  const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      user: {
        username: email,
        password: password,
      },
    },
    scopes: SCOPES.split(','),
    tokenCache: tokenCache,
  };

  return new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(authMiddlewareOptions)
    .build();
};

function authRequestClient(email: string, password: string): ByProjectKeyRequestBuilder {
  const client = authenticateUser(email, password);
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
}

export async function authRequestResponse(
  email: string,
  password: string
): Promise<ClientResponse<CustomerSignInResult>> {
  const authLogin = authRequestClient(email, password);
  return authLogin.me().login().post({ body: { email, password } }).execute();
}

// Get User Profile
export const getUserProfile = async (): Promise<ClientResponse<Customer>> => {
  const token = localStorage.getItem('Token');
  console.log('getUserProfile token:', token);
  if (!token) {
    throw new Error('No access token found. Please log in.');
  }
  // return await apiRoot.me().get().execute();
};

// Fetch Customer Data (for auth check)
export const fetchCustomerData = async (): Promise<Customer> => {
  const token = localStorage.getItem('Token');
  console.log('fetchCustomerData token:', token);

  if (!token) {
    throw new Error('No access token found. Please log in.');
  }

  try {
    // const apiRootWithToken = createApiRootWithToken();
    // const response = await apiRootWithToken.me().get().execute();
    // return response.body;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch customer data: ${message}`);
  }
};

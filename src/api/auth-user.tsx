import type { ByProjectKeyRequestBuilder, ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Client, PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
import type { Customer } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/ts-client';
import { AUTH_URL, API_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } from '@utils/ecomm-const';
import { tokenCache } from '../utils/token';
import { httpMiddlewareOptions } from './middleware-options';

type StoredToken = {
  token: string;
  expirationTime?: number;
  refreshToken?: string;
};
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

export function authRequestClient(email: string, password: string): ByProjectKeyRequestBuilder {
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

// Fetch Customer Data (for auth check)
export const getCustomerData = async (): Promise<any> => {
  const stored = localStorage.getItem('Token');
  if (!stored) throw new Error('No token');

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const { token } = JSON.parse(stored) as StoredToken;
  const response = await fetch(`${API_URL}/${PROJECT_KEY}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Not authorized');
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const customer = (await response.json()) as Customer;
  console.log(customer);

  return customer;
};

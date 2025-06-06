import type { ByProjectKeyRequestBuilder, ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Client, PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
import type { Customer } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/ts-client';
import { AUTH_URL, API_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } from '@utils/ecomm-const';
import { tokenCache } from '../utils/token';
import { httpMiddlewareOptions } from './middleware-options';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';

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

// Fetch Customer Data (for auth check)

type StoredToken = {
  token: string;
  refreshToken?: string;
  expirationTime?: number;
};

export async function getCustomerData(): Promise<any> {
  const stored = localStorage.getItem('Token');
  if (!stored) throw new Error('Нет токена в localStorage');

  const parsed = JSON.parse(stored);
  if (!parsed || typeof parsed.token !== 'string') {
    throw new Error('Неверный токен');
  }

  const httpModule = await import('@commercetools/sdk-middleware-http');
  const httpMiddleware = httpModule.default?.createHttpMiddleware || httpModule.createHttpMiddleware;
  const authModule = await import('@commercetools/sdk-middleware-auth');
  const authMiddleware = authModule.default?.authMiddleware || authModule.authMiddleware;

  // Клиент с токеном
  const client = new ClientBuilder()
    .withMiddleware(createHttpMiddleware({ host: API_URL, fetch }))
    .withMiddleware(
      authMiddleware({
        host: AUTH_URL,
        projectKey: PROJECT_KEY,
        fetch,
        credentials: {
          accessToken: parsed.token,
        },
      })
    )
    .build();

  // Запрос к /me
  const response = await client.execute({
    uri: `/${PROJECT_KEY}/me`,
    method: 'GET',
  });
  console.log(response);

  return response.body;
}

export const fetchCustomerData = async (): Promise<Customer> => {
  const stored = localStorage.getItem('Token');
  if (!stored) throw new Error('No token in localStorage');

  const parsed = JSON.parse(stored) as { token: string };
  const token = parsed.token;

  // динамически импортируем оба middleware
  const authModule = await import('@commercetools/sdk-middleware-auth');
  const authMiddleware = authModule.default?.authMiddleware || authModule.authMiddleware;

  const httpModule = await import('@commercetools/sdk-middleware-http');
  const httpMiddleware = httpModule.default?.createHttpMiddleware || httpModule.createHttpMiddleware;

  const client = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withMiddleware(
      httpMiddleware({
        host: 'https://api.europe-west1.gcp.commercetools.com',
        fetch,
      }),
      authMiddleware({
        host: 'https://auth.europe-west1.gcp.commercetools.com',
        projectKey: PROJECT_KEY,
        credentials: {
          accessToken: token,
        },
        fetch,
      })
    )
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
  const response = await apiRoot.me().get().execute();

  return response.body;
};

const createApiRootWithToken = (accessToken: string): ByProjectKeyRequestBuilder => {
  const client = new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withHttpMiddleware({
      host: AUTH_URL,
      credentials: { accessToken },
      fetch,
    })
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
};

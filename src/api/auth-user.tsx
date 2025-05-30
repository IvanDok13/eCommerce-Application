import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { Client, ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } from '@utils/ecomm-const';
import { tokenCache } from '../utils/token';
import { httpMiddlewareOptions } from './middleware-options';

function assertEnvVar(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const authenticateUser = (email: string, password: string): Client => {
  const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: assertEnvVar(AUTH_URL, 'AUTH_URL'),
    projectKey: assertEnvVar(PROJECT_KEY, 'PROJECT_KEY'),
    credentials: {
      clientId: assertEnvVar(CLIENT_ID, 'CLIENT_ID'),
      clientSecret: assertEnvVar(CLIENT_SECRET, 'CLIENT_SECRET'),
      user: {
        username: email,
        password: password,
      },
    },
    scopes: assertEnvVar(SCOPES, 'SCOPES').split(','),
    tokenCache: tokenCache,
  };

  return new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withPasswordFlow(authMiddlewareOptions)
    .build();
};

function authRequestClient(email: string, password: string) {
  const client = authenticateUser(email, password);
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
}

export async function authRequestResponse(email: string, password: string) {
  const authLogin = authRequestClient(email, password);
  return authLogin.me().login().post({ body: { email, password } }).execute();
}

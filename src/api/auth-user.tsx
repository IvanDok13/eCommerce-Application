import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import type { Client, PasswordAuthMiddlewareOptions } from '@commercetools/ts-client';
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

export async function authRequestResponse(email: string, password: string): Promise<any> {
  const authLogin = authRequestClient(email, password);
  return authLogin.me().login().post({ body: { email, password } }).execute();
}

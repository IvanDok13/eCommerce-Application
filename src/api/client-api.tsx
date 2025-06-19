import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/ts-client';
import { PROJECT_KEY } from '@utils/ecomm-const';
import { tokenCache } from '@utils/token';
import { authMiddlewareOptions, httpMiddlewareOptions } from './middleware-options';

interface UserTokens {
  accessToken: string;
  refreshToken?: string;
  expirationTime: number;
}

interface AnonymousTokenStore {
  token: string;
  refreshToken?: string;
  expirationTime: number;
}

function isTokenValid(token: UserTokens | null): boolean {
  if (!token) return false;
  return token.expirationTime - Date.now() > 60_000;
}

export function createApiClient(userTokens: UserTokens | null): ByProjectKeyRequestBuilder {
  console.log('Creating API client with user tokens:', userTokens);

  const client = isTokenValid(userTokens)
    ? new ClientBuilder()
        .withProjectKey(PROJECT_KEY)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withExistingTokenFlow(`Bearer ${userTokens!.accessToken}`, { force: false })
        .build()
    : new ClientBuilder()
        .withProjectKey(PROJECT_KEY)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withClientCredentialsFlow(authMiddlewareOptions)
        .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: PROJECT_KEY });
}

export function getApiClient(): ByProjectKeyRequestBuilder {
  const tokenStore = tokenCache.get();
  const userToken: UserTokens | AnonymousTokenStore | null = tokenStore
    ? {
        accessToken: tokenStore.token,
        refreshToken: tokenStore.refreshToken,
        expirationTime: tokenStore.expirationTime,
      }
    : null;
  return createApiClient(userToken);
}

// Create an anonymous API client for cases where no user token is provided
const anonymousClient = new ClientBuilder()
  .withProjectKey(PROJECT_KEY)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .build();

const anonymousApiClient: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(anonymousClient).withProjectKey({
  projectKey: PROJECT_KEY,
});

// export function getApiClient(userToken?: UserTokens): ByProjectKeyRequestBuilder {
//   return userToken ? createApiClient(userToken) : anonymousApiClient;
// }

import { ClientBuilder } from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import {
  CTP_PROJECT_KEY,
  CTP_CLIENT_ID,
  CTP_CLIENT_SECRET,
  CTP_AUTH_URL,
  CTP_API_URL,
  CTP_SCOPES,
} from './env-const';

if (!CTP_PROJECT_KEY || !CTP_CLIENT_ID || !CTP_CLIENT_SECRET || !CTP_AUTH_URL || !CTP_API_URL || !CTP_SCOPES) {
  throw new Error('Missing CommerceTools environment configs');
}

const projectKey = CTP_PROJECT_KEY;
const scopes = CTP_SCOPES.split(' ');

// middleware
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow({
    host: CTP_AUTH_URL,
    projectKey,
    credentials: {
      clientId: CTP_CLIENT_ID,
      clientSecret: CTP_CLIENT_SECRET,
    },
    scopes,
    httpClient: fetch,
  })
  .withHttpMiddleware({
    host: CTP_API_URL,
    httpClient: fetch,
  })
  .withLoggerMiddleware()
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient);
export const projectApi = apiRoot.withProjectKey({ projectKey });

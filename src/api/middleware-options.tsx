import { AuthMiddlewareOptions, ClientBuilder, HttpMiddlewareOptions } from '@commercetools/ts-client';
import { API_URL, AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } from '@utils/ecomm-const.ts';
import fetch from 'cross-fetch';

const scopes = (SCOPES || '').split(',');

export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes,
  httpClient: fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_URL,
  httpClient: fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

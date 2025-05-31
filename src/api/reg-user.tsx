import { httpMiddlewareOptions } from '@api/middleware-options';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { AuthMiddlewareOptions, ClientBuilder } from '@commercetools/ts-client';
import { FormData } from '@components/reg-form/reg-form.types';
import { AUTH_URL, CLIENT_ID, CLIENT_SECRET, PROJECT_KEY, SCOPES } from '@utils/ecomm-const.ts';
import { tokenCache } from '../utils/token';

const registerUser = () => {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    },
    scopes: SCOPES.split(','),
    tokenCache: tokenCache,
  };

  return new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .build();
};

function registrationRequestClient() {
  const client = registerUser();
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
}

export async function registrationRequestResponse(data: FormData, defaultBilling: boolean, defaultShipping: boolean) {
  const authLogin = registrationRequestClient();

  const defaultBillingIndex = defaultBilling ? 0 : undefined;
  const defaultShippingIndex = defaultShipping ? 1 : undefined;

  return authLogin
    .me()
    .signup()
    .post({
      body: {
        firstName: data.firstName,
        lastName: data.lastName,
        addresses: [
          {
            country: data.shippingAddress.country,
            city: data.shippingAddress.city,
            streetName: data.shippingAddress.street,
            postalCode: data.shippingAddress.postalCode,
          },
          {
            country: data.billingAddress.country,
            city: data.billingAddress.city,
            streetName: data.billingAddress.street,
            postalCode: data.billingAddress.postalCode,
          },
        ],
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        password: data.password,
        defaultBillingAddress: defaultBillingIndex,
        defaultShippingAddress: defaultShippingIndex,
      },
    })
    .execute();
}

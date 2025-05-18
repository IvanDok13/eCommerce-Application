import {
  type ClientResponse,
  type CustomerDraft,
  type CustomerSignInResult,
  type CustomerSignin
} from '@commercetools/platform-sdk';
import { apiRoot } from './commercetools-client';
import { CTP_PROJECT_KEY } from './env-const';

// Registration
export const registerCustomer = async (
  draft: CustomerDraft
): Promise<ClientResponse<CustomerSignInResult>> => {
  return await apiRoot
    .withProjectKey({ projectKey: CTP_PROJECT_KEY })
    .customers()
    .post({ body: draft })
    .execute();
};



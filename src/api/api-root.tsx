import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './middleware-options.tsx';

const projectKey = String(import.meta.env.VITE_CTP_PROJECT_KEY); // KOSTYL' DETECTED:  Ensure this environment variable is set in your .env file

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
});

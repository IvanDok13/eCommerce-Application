import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './middleware-options.tsx';

if (typeof import.meta.env.VITE_CTP_PROJECT_KEY !== 'string' || import.meta.env.VITE_CTP_PROJECT_KEY.trim() === '') {
  throw new Error('VITE_CTP_PROJECT_KEY environment variable is not set or empty');
}
const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey,
});

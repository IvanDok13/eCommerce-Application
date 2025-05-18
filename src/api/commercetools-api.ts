import { type ClientResponse, type Project } from '@commercetools/platform-sdk';
import { projectApi } from './commercetools-client';

export const getProject = async (): Promise<ClientResponse<Project>> => {
  return await projectApi.get().execute();
};

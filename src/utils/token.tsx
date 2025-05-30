import { TokenCache, TokenStore } from '@commercetools/ts-client';

export const tokenCache: TokenCache = {
  get(): TokenStore {
    const tokenStoreJson = localStorage.getItem('Token')!;
    return JSON.parse(tokenStoreJson);
  },
  set(cache: TokenStore): void {
    localStorage.setItem('Token', JSON.stringify(cache));
  },
};

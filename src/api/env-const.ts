function checkVariable(value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '' || value === undefined || value === null) {
    throw new Error(`Missing or empty environment variable`);
  }
  return value;
}

export const CTP_PROJECT_KEY: string = checkVariable(import.meta.env.VITE_CTP_PROJECT_KEY);
export const CTP_CLIENT_ID: string = checkVariable(import.meta.env.VITE_CTP_CLIENT_ID);
export const CTP_CLIENT_SECRET: string = checkVariable(import.meta.env.VITE_CTP_CLIENT_SECRET);
export const CTP_AUTH_URL: string = checkVariable(import.meta.env.VITE_CTP_AUTH_URL);
export const CTP_API_URL: string = checkVariable(import.meta.env.VITE_CTP_API_URL);
export const CTP_SCOPES: string = checkVariable(import.meta.env.VITE_CTP_SCOPES);
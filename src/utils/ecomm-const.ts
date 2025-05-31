function checkVariable(value: string | undefined, name: string): string {
  if (typeof value !== 'string' || value.trim() === '' || value === undefined || value === null) {
    throw new Error(`Missing or empty environment variable ${name}`);
  }
  return value;
}

export const PROJECT_KEY: string = checkVariable(import.meta.env.VITE_CTP_PROJECT_KEY, 'PROJECT_KEY');
export const CLIENT_ID: string = checkVariable(import.meta.env.VITE_CTP_CLIENT_ID, 'CLIENT_ID');
export const CLIENT_SECRET: string = checkVariable(import.meta.env.VITE_CTP_CLIENT_SECRET, 'CLIENT_SECRET');
export const AUTH_URL: string = checkVariable(import.meta.env.VITE_CTP_AUTH_URL, 'AUTH_URL');
export const API_URL: string = checkVariable(import.meta.env.VITE_CTP_API_URL, 'API_URL');
export const SCOPES: string = checkVariable(import.meta.env.VITE_CTP_SCOPES, 'SCOPES');

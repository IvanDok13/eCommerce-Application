import { config } from 'dotenv';

config();

export const client_id = process.env.CLIENT_ID;
export const client_secret = process.env.CLIENT_SECRET;
export const project_key = process.env.PROJECT_KEY;
export const scope = process.env.SCOPE;
export const auth_url = process.env.AUTH_URL;
export const api_url = process.env.API_URL;

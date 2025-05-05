import { config } from 'dotenv';

config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const project_key = process.env.PROJECT_KEY;
const scope = process.env.SCOPE;
const auth_url = process.env.AUTH_URL;
const api_url = process.env.API_URL;

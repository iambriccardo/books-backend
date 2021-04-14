import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
}

export const PORT = (process.env.PORT as string) || 3000;

export const MONGO_DB_URL = (process.env.MONGO_DB_URL as string) || '';

export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY as string;

export const ENABLE_LOGGING = process.env.ENABLE_LOGGING == 'true';

export const API_VERSION = 'v1';

export const APP_NAME = (process.env.APP_NAME as string) || 'books';

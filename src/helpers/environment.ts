import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    console.log('Loading .env file...');
    dotenv.config({ path: '.env' });
}

export const PORT = (process.env.PORT as string) || 3000;

export const MONGO_DB_URL = (process.env.MONGO_DB_URL as string) || '';

export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY as string;

export const API_VERSION = 'v1';

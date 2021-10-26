import dotenv from 'dotenv';

if (process.env.MODE == 'production') {
    console.log('Loading production .env file.');
    dotenv.config({ path: '.env.prod' });
} else if (process.env.MODE == 'development') {
    console.log('Loading development .env file.');
    dotenv.config({ path: '.env.dev' });
}

export const API_VERSION = 'v1';

export const APP_NAME = (process.env.APP_NAME as string) || 'books';

export const DEBUG = process.env.DEBUG === 'true';

export const PORT = (process.env.PORT as string) || 3000;

export const MONGO_DB_URL = (process.env.MONGO_DB_URL as string) || '';

export const SECRET_KEY = process.env.SECRET_KEY as string;

export const ENABLE_LOGGING = process.env.ENABLE_LOGGING === 'true';

export const GCP_API_KEY = process.env.GCP_API_KEY as string;

export const SELL_BOOK_CONFIRM_BASE_URL = process.env
    .SELL_BOOK_CONFIRM_BASE_URL as string;

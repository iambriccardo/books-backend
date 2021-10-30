import express from 'express';
import v1Routes from './routes/v1';
import helmet from 'helmet';
import cors from 'cors';
import { connectToMongo } from './helpers/mongoose';
import passport from 'passport';
import { AuthJwtStrategy, AuthLocalStrategy } from './helpers/authentication';
import { MONGO_DB_URL, PORT } from './helpers/environment';
import { logger } from './helpers/logging';
import swaggerUi from 'swagger-ui-express';
import { readJsonFile } from './helpers/files';
import { healthCheck } from './helpers/utils';
import { defaultRateLimiter } from './helpers/rate-limiting';

class Server {
    app = express();

    configurePassport() {
        passport.use('login', AuthLocalStrategy);
        passport.use(AuthJwtStrategy);
    }

    applyMiddlewares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));
        this.app.use(passport.initialize());
        this.app.use(defaultRateLimiter);
        this.app.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(readJsonFile('openapi.json')),
        );
        this.app.use('/v1', v1Routes);

        this.app.get('/', healthCheck);
    }

    configure() {
        logger.info('Configuring web service.');
        this.configurePassport();
        this.applyMiddlewares();
        logger.info('Configuration finished.');

        this.app.listen(PORT, () => {
            logger.info(`Listening on port ${PORT} 🚀.`);
        });
    }

    async start() {
        try {
            logger.info('Starting web service.');
            await connectToMongo(MONGO_DB_URL);
            this.configure();
            logger.info('Web service started.');
        } catch (error) {
            logger.fatal(
                `An error occurred and the web service cannot be started: ${error}`,
            );
            process.exit(1);
        }
    }
}

export const server = new Server();

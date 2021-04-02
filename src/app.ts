import express from 'express';
import v1Routes from './routes/v1';
import helmet from 'helmet';
import cors from 'cors';
import { connectToMongo } from './helpers/mongoose';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import {
    LocalStrategy,
    userDeserializer,
    userSerializer,
} from './helpers/passport';
import { MONGO_DB_URL, PORT, SESSION_SECRET_KEY } from './helpers/environment';
import { logger } from './helpers/logging';

class Server {
    app = express();

    sessionOptions = {
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET_KEY,
        store: MongoStore.create({
            mongoUrl: MONGO_DB_URL,
            autoRemove: 'interval',
        }),
    };

    configurePassport() {
        passport.serializeUser(userSerializer);
        passport.deserializeUser(userDeserializer);
        passport.use(LocalStrategy);
    }

    applyMiddlewares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(session(this.sessionOptions));
        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use('/v1', v1Routes);
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

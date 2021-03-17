import express from 'express';
import v1Routes from './routes/v1';
import helmet from 'helmet';
import cors from 'cors';
import { connectToMongo } from './helpers/mongoose';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import { LocalStrategy, userDeserializer } from './helpers/passport';
import { MONGO_DB_URL, PORT, SESSION_SECRET_KEY } from './helpers/environment';

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

    initResources() {
        connectToMongo(MONGO_DB_URL).catch((reason) =>
            console.log(`Error while connecting to mongoDB: ${reason}`),
        );
    }

    configurePassport() {
        passport.serializeUser(userDeserializer);
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

    start() {
        this.initResources();
        this.configurePassport();
        this.applyMiddlewares();

        this.app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    }
}

export const server = new Server();

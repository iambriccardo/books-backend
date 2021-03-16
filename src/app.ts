import express from 'express';
import v1Routes from './routes/v1';
import helmet from 'helmet';
import cors from 'cors';
import { connectToMongo } from './helpers/mongoose';

const DEFAULT_PORT = 3000;

class Server {
    app = express();
    port = parseInt(process.env.PORT as string, 10) || DEFAULT_PORT;

    applyMiddlewares() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use('/v1', v1Routes);
    }

    initResources() {
        connectToMongo(
            process.env.MONGO_DB_CONNECTION as string,
        ).catch((reason) =>
            console.log(`Error while connecting to mongoDB: ${reason}`),
        );
    }

    start() {
        this.initResources();
        this.applyMiddlewares();

        this.app.listen(this.port, () => {
            console.log(`Listening on port: ${this.port}`);
        });
    }
}

export const server = new Server();

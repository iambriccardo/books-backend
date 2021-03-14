import express from 'express';
import v1Routes from './routes/v1';
import helmet from 'helmet';
import cors from 'cors';

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

    start() {
        this.applyMiddlewares();

        this.app.listen(this.port, () => {
            console.log(`Listening on port: ${this.port}`);
        });
    }
}

export const server = new Server();

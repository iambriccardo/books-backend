import { connect, Mongoose } from 'mongoose';

export const connectToMongo = (url: string): Promise<Mongoose> => {
    return connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        // We wait 5 seconds before throwing a server selection error.
        serverSelectionTimeoutMS: 5000,
    });
};

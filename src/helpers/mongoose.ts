import { connect, Mongoose } from 'mongoose';

export const connectToMongo = async (url: string): Promise<Mongoose> => {
    return await connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
};

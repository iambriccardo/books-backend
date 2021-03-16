import { connect } from 'mongoose';

export const connectToMongo = async (url: string): Promise<void> => {
    await connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
};

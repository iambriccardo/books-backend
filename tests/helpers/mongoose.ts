import { connect, disconnect, Model, Mongoose } from 'mongoose';

export const initTestMongoose = async (): Promise<Mongoose> => {
    return await connect('mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
};

export const destroyTestMongoose = (...models: [Model<any>]) => {
    return async (): Promise<void> => {
        models.forEach((model) => model.collection.deleteMany({}));
        await disconnect();
    };
};

export const deleteCollections = (...models: [Model<any>]) => {
    return async (): Promise<void> => {
        models.forEach((model) => model.collection.deleteMany({}));
    };
};

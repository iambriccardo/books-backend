import { Document, Model, model, Schema, Types } from 'mongoose';

export interface Transaction {
    transactionId: string;
    bookId: string;
}

export interface TransactionDocument extends Transaction, Document {}

const TransactionSchema: Schema = new Schema(
    {
        transactionId: {
            type: String,
            required: true,
            unique: true,
            default: () => new Types.ObjectId(),
        },
        bookId: { type: String, required: true, unique: true },
    },
    {
        versionKey: false,
    },
);

export const TransactionModel: Model<TransactionDocument> = model(
    'Transaction',
    TransactionSchema,
);

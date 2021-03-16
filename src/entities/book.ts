import { Document, Model, model, Schema } from 'mongoose';

export interface IBook extends Document {
    isbn: string;
    title: string;
    description: string;
}

const BookSchema: Schema = new Schema(
    {
        isbn: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        versionKey: false,
    },
);

export const Book: Model<IBook> = model('Book', BookSchema);

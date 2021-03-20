import { Document, Model, model, Schema } from 'mongoose';

export interface Book {
    isbn: string;
    title: string;
    description: string;
}

export interface BookDocument extends Book, Document {}

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

export const BookModel: Model<BookDocument> = model('Book', BookSchema);

import { Document, Model, model, Schema } from 'mongoose';
import { JTDSchemaType } from 'ajv/dist/jtd';

export interface Book {
    isbn: string;
    title: string;
    description: string;
    price: number;
    condition: 'bad' | 'ok' | 'good' | 'great' | 'na';
    pictures: string[];
    seller: string;
    sellerLocation: string;
    publicationDate: Date;
    saleDate?: Date;
    buyer?: string;
}

export const BookJTDSchemaType: JTDSchemaType<Book> = {
    properties: {
        isbn: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'float32' },
        condition: { enum: ['bad', 'ok', 'good', 'great', 'na'] },
        pictures: {
            elements: {
                type: 'string',
            },
        },
        seller: { type: 'string' },
        sellerLocation: { type: 'string' },
        publicationDate: { type: 'timestamp' },
    },
    optionalProperties: {
        saleDate: { type: 'timestamp' },
        buyer: { type: 'string' },
    },
};

export interface BookDocument extends Book, Document {}

const BookSchema: Schema = new Schema(
    {
        isbn: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        condition: {
            type: String,
            enum: ['bad', 'ok', 'good', 'great', 'na'],
            default: 'na',
            required: true,
        },
        pictures: { type: [String], required: true },
        seller: { type: String, required: true },
        sellerLocation: { type: String, required: true },
        publicationDate: { type: Date, required: true },
        saleDate: { type: Date, required: false },
        buyer: { type: String, required: false },
    },
    {
        versionKey: false,
    },
);

export const BookModel: Model<BookDocument> = model('Book', BookSchema);

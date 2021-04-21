import { Document, Model, model, Schema } from 'mongoose';
import { JTDSchemaType } from 'ajv/dist/jtd';

export interface Book {
    isbn: string;
    title: string;
    description: string;
    currency: string;
    price: number;
    condition: 'bad' | 'ok' | 'good' | 'great' | 'na';
    pictures: string[];
    publicationDate: Date;
    seller: string;
    locationName: string;
    locationLatitude: number;
    locationLongitude: number;
    saleDate?: Date;
    buyer?: string;
}

export const BookJTDSchemaType: JTDSchemaType<Book> = {
    properties: {
        isbn: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        currency: { type: 'string' },
        price: { type: 'float32' },
        condition: { enum: ['bad', 'ok', 'good', 'great', 'na'] },
        pictures: {
            elements: {
                type: 'string',
            },
        },
        publicationDate: { type: 'timestamp' },
        seller: { type: 'string' },
        locationName: { type: 'string' },
        locationLatitude: { type: 'float32' },
        locationLongitude: { type: 'float32' },
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
        currency: { type: String, required: true },
        price: { type: Number, required: true },
        condition: {
            type: String,
            enum: ['bad', 'ok', 'good', 'great', 'na'],
            default: 'na',
            required: true,
        },
        pictures: { type: [String], required: true },
        publicationDate: { type: Date, required: true },
        seller: { type: String, required: true },
        locationName: { type: String, required: true },
        locationLatitude: { type: Number, required: true },
        locationLongitude: { type: Number, required: true },
        saleDate: { type: Date, required: false },
        buyer: { type: String, required: false },
    },
    {
        versionKey: false,
    },
).index({
    isbn: 'text',
    title: 'text',
    description: 'text',
});

export const BookModel: Model<BookDocument> = model('Book', BookSchema);

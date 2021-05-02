import { Document, Model, model, Schema, Types } from 'mongoose';

export interface Book {
    bookId: string;
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

export interface BookDocument extends Book, Document {}

const BookSchema: Schema = new Schema(
    {
        bookId: {
            type: String,
            required: true,
            unique: true,
            default: () => new Types.ObjectId(),
        },
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

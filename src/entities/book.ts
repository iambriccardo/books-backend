import { Document, Error, Model, model, Schema, Types } from 'mongoose';
import { createEdgeNGrams } from '../helpers/utils';

export interface Book {
    bookId: string;
    isbn: string;
    title: string;
    description: string;
    currency: string;
    amount: number;
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

interface BookInternal {
    searchableIsbn: string[];
    searchableTitle: string[];
}

export interface BookDocument extends Book, BookInternal, Document {}

const BookSchema: Schema = new Schema(
    {
        bookId: {
            type: String,
            required: true,
            unique: true,
            default: () => new Types.ObjectId(),
        },
        searchableIsbn: {
            type: [String],
            required: false,
            index: true,
            select: false,
        },
        isbn: { type: String, required: true },
        searchableTitle: {
            type: [String],
            required: false,
            index: true,
            select: false,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        currency: { type: String, required: true },
        amount: { type: Number, required: true },
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

BookSchema.pre('save', function (next) {
    const book = this as BookDocument;

    book.searchableIsbn = createEdgeNGrams(book.isbn);
    book.searchableTitle = createEdgeNGrams(book.title);

    next();
});

export const BookModel: Model<BookDocument> = model('Book', BookSchema);

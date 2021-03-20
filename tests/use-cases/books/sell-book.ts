import { describe, before } from 'mocha';
import { expect } from 'chai';
import mongoose, { mongo } from 'mongoose';
import { sellBookUseCase } from '../../../src/use-cases/books/sell-book';
import { BookDocument, BookModel } from '../../../src/entities/book';

describe('sellBookUseCase', function () {
    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/test', done);
    });

    after(function () {
        BookModel.collection.deleteMany({});
        mongoose.disconnect();
    });

    it('should insert book in the database', async function () {
        const book = {
            isbn: '9781234567897',
            title: 'Alice in Wonderland',
            description: 'Alice is a beautiful girl who lives in the forest',
        };

        await sellBookUseCase(book)();
        expect(BookModel.findOne({ title: 'Alice in Wonderland' })).to.exist;
    });
});

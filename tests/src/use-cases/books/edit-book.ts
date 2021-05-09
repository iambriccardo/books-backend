import { describe } from 'mocha';
import { expect, use } from 'chai';
import { sellBookUseCase } from '../../../../src/use-cases/books/sell-book/sell-book';
import chaiAsPromised from 'chai-as-promised';
import { BookModel } from '../../../../src/entities/book';
import {
    deleteCollections,
    destroyTestMongoose,
    initTestMongoose,
} from '../../../helpers/mongoose';
import { sellBookBodyFixture } from '../../../helpers/fixtures';
import { editBookUseCase } from '../../../../src/use-cases/books/edit-book';

use(chaiAsPromised);

describe('editBookUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    it('should edit the book if the book is present', async function () {
        const body = sellBookBodyFixture();

        const book = await sellBookUseCase(body)();

        const updates = {
            description: 'This book is cool',
        };
        const useCase = editBookUseCase(book.bookId, updates);

        const editedBook = await useCase();
        expect(editedBook.description).to.eq(updates.description);
    });

    it('should not edit the book if the book is not present', async function () {
        const updates = {
            title: 'Huger Games',
            description: 'This book is cool',
        };
        const useCase = editBookUseCase(null, updates);

        await expect(useCase()).to.be.rejected;
    });
});

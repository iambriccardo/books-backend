import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
    deleteCollections,
    destroyTestMongoose,
    initTestMongoose,
} from '../../../helpers/mongoose';
import { BookModel } from '../../../../src/entities/book';
import { sellBookUseCase } from '../../../../src/use-cases/books/sell-book/sell-book';
import { sellBookBodyFixture } from '../../../helpers/fixtures';
import { getBookByIdUseCase } from '../../../../src/use-cases/books/get-book-by-id';

use(chaiAsPromised);

describe('getBookByIdUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    it('should returns the book linked to the transaction', async function () {
        const book = await sellBookUseCase(
            sellBookBodyFixture({
                seller: '608e519d8c2f4a0a88aa8216',
            }),
        )();

        const useCase = getBookByIdUseCase(book.bookId);

        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.exist;
    });

    it('should throw an error if the book is not existing', async function () {
        const useCase = getBookByIdUseCase('5081519d8c2f4a0a88aa8216');

        await expect(useCase()).to.be.rejected;
    });
});

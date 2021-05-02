import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
    deleteCollections,
    destroyTestMongoose,
    initTestMongoose,
} from '../../../helpers/mongoose';
import { BookModel } from '../../../../src/entities/book';
import { TransactionModel } from '../../../../src/entities/transaction';
import { sellBookUseCase } from '../../../../src/use-cases/books/sell-book/sell-book';
import { sellBookBodyFixture } from '../../../helpers/fixtures';
import { createTransactionUseCase } from '../../../../src/use-cases/books/create-transaction';
import { getBookByTransactionUseCase } from '../../../../src/use-cases/books/get-book-by-transaction';

use(chaiAsPromised);

describe('getBookByTransactionUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel, TransactionModel));

    afterEach(deleteCollections(BookModel, TransactionModel));

    it('should returns the book linked to the transaction', async function () {
        const book = await sellBookUseCase(
            sellBookBodyFixture({
                seller: '608e519d8c2f4a0a88aa8216',
            }),
        )();
        const transaction = await createTransactionUseCase(book.bookId)();

        const useCase = getBookByTransactionUseCase(transaction.transactionId);

        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.exist;
    });

    it('should throw an error if the transaction is not existing', async function () {
        const useCase = getBookByTransactionUseCase(null);

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if the book is not existing', async function () {
        const book = await sellBookUseCase(
            sellBookBodyFixture({
                seller: '608e519d8c2f4a0a88aa8216',
            }),
        )();
        const transaction = await createTransactionUseCase(book.bookId)();
        await BookModel.deleteOne({ bookId: book.bookId });

        const useCase = getBookByTransactionUseCase(transaction.transactionId);

        await expect(useCase()).to.be.rejected;
    });
});

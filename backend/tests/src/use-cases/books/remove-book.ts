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
import { removeBookUseCase } from '../../../../src/use-cases/books/remove-book';
import { createTransactionUseCase } from '../../../../src/use-cases/books/create-transaction';
import { TransactionModel } from '../../../../src/entities/transaction';

use(chaiAsPromised);

describe('removeBookUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel, TransactionModel));

    afterEach(deleteCollections(BookModel, TransactionModel));

    it('should remove the book if the seller has uploaded that book', async function () {
        const body = sellBookBodyFixture({
            seller: '608e519d8c2f4a0a88aa8216',
        });

        const book = await sellBookUseCase(body)();

        const useCase = removeBookUseCase(
            '608e519d8c2f4a0a88aa8216',
            book.bookId,
        );

        await expect(useCase()).to.not.be.rejected;
        expect(await BookModel.findOne({ bookId: book.bookId })).to.not.exist;
    });

    it('should remove the book and the transaction if the seller has uploaded that book and created a transaction', async function () {
        const book = await sellBookUseCase(
            sellBookBodyFixture({
                seller: '608e519d8c2f4a0a88aa8216',
            }),
        )();
        const transaction = await createTransactionUseCase(book.bookId)();

        const useCase = removeBookUseCase(
            '608e519d8c2f4a0a88aa8216',
            book.bookId,
        );

        await expect(useCase()).to.not.be.rejected;
        expect(
            await TransactionModel.findOne({
                transactionId: transaction.transactionId,
            }),
        ).to.not.exist;
        expect(await BookModel.findOne({ bookId: book.bookId })).to.not.exist;
    });

    it('should not remove the book if the seller has not uploaded that book', async function () {
        const body = sellBookBodyFixture({
            seller: '608e519d8c2f4a0a88aa8216',
        });

        const book = await sellBookUseCase(body)();

        const useCase = removeBookUseCase(
            '508234e19d8c2f4a0a88aa8216',
            book.bookId,
        );

        await expect(useCase()).to.not.be.rejected;
        expect(await BookModel.findOne({ bookId: book.bookId })).to.exist;
    });
});

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
import { createTransactionUseCase } from '../../../../src/use-cases/books/create-transaction';
import { sellBookConfirmUseCase } from '../../../../src/use-cases/books/sell-book-confirm';
import { TransactionModel } from '../../../../src/entities/transaction';
import { removeBookUseCase } from '../../../../src/use-cases/books/remove-book';

use(chaiAsPromised);

describe('sellBookConfirmUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel, TransactionModel));

    afterEach(deleteCollections(BookModel, TransactionModel));

    it('should mark the book as sold if all the params are correct', async function () {
        const book = await sellBookUseCase(
            sellBookBodyFixture({
                seller: '608e519d8c2f4a0a88aa8216',
            }),
        )();
        const transaction = await createTransactionUseCase(book.bookId)();

        const useCase = sellBookConfirmUseCase(
            '708e519d8c2f4a0a88aa8216',
            transaction.transactionId,
        );

        await expect(useCase()).to.not.be.rejected;
        expect(
            await BookModel.findOne({
                bookId: book.bookId,
                buyer: { $exists: true },
                saleDate: { $exists: true },
            }),
        ).to.exist;
    });

    it('should throw an error if the transaction is invalid', async function () {
        const useCase = sellBookConfirmUseCase(
            '708e519d8c2f4a0a88aa8216',
            '',
        );

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if the book has been removed', async function () {
        const book = await sellBookUseCase(
            sellBookBodyFixture({
                seller: '608e519d8c2f4a0a88aa8216',
            }),
        )();
        const transaction = await createTransactionUseCase(book.bookId)();

        await removeBookUseCase('608e519d8c2f4a0a88aa8216', book.bookId)();

        const useCase = sellBookConfirmUseCase(
            '608e519d8c2f4a0a88aa8216',
            transaction.transactionId,
        );

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if the seller and the buyer are the same', async function () {
        const book = await sellBookUseCase(
            sellBookBodyFixture({
                seller: '608e519d8c2f4a0a88aa8216',
            }),
        )();
        const transaction = await createTransactionUseCase(book.bookId)();

        const useCase = sellBookConfirmUseCase(
            '608e519d8c2f4a0a88aa8216',
            transaction.transactionId,
        );

        await expect(useCase()).to.be.rejected;
    });
});

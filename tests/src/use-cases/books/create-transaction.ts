import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { sellBookBodyFixture } from '../../../helpers/fixtures';
import { sellBookUseCase } from '../../../../src/use-cases/books/sell-book/sell-book';
import {
    deleteCollections,
    destroyTestMongoose,
    initTestMongoose,
} from '../../../helpers/mongoose';
import { BookModel } from '../../../../src/entities/book';
import { TransactionModel } from '../../../../src/entities/transaction';
import { createTransactionUseCase } from '../../../../src/use-cases/books/create-transaction';

use(chaiAsPromised);

describe('createTransactionUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(TransactionModel, BookModel));

    afterEach(deleteCollections(TransactionModel, BookModel));

    it('should create a transaction if the book is existing and not sold', async function () {
        const book = await sellBookUseCase(sellBookBodyFixture())();

        const useCase = createTransactionUseCase(book.bookId);

        await expect(useCase()).to.not.be.rejected;
    });

    it('should throw an error if the transaction is for a sold book', async function () {
        const book = await sellBookUseCase(
            sellBookBodyFixture({
                saleDate: new Date(),
                buyer: '608e4192842f4a0a88aa8216',
            }),
        )();

        const useCase = createTransactionUseCase(book.bookId);

        await expect(useCase()).to.be.rejected;
    });
});

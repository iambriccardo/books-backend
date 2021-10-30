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
import { getTransactionUseCase } from '../../../../src/use-cases/books/get-transaction';

use(chaiAsPromised);

describe('getTransactionUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(TransactionModel, BookModel));

    afterEach(deleteCollections(TransactionModel, BookModel));

    it('should get the transaction if it exists', async function () {
        const book = await sellBookUseCase(sellBookBodyFixture())();
        await createTransactionUseCase(book.bookId)();

        const useCase = getTransactionUseCase(book.bookId);

        expect(await useCase()).to.exist;
    });

    it('should throw an error if the transaction does not exist', async function () {
        const book = await sellBookUseCase(sellBookBodyFixture())();

        const useCase = getTransactionUseCase(book.bookId);

        await expect(useCase()).to.be.rejected;
    });
});

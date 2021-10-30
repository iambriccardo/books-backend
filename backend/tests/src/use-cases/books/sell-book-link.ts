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
import { sellBookLinkUseCase } from '../../../../src/use-cases/books/sell-book-link';

use(chaiAsPromised);

describe('sellBookLink', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(TransactionModel, BookModel));

    afterEach(deleteCollections(TransactionModel, BookModel));

    const baseUrl = 'localhost:3000/confirm';

    it('should return the sell confirmation link if the transaction is valid', async function () {
        const book = await sellBookUseCase(sellBookBodyFixture())();
        const transaction = await createTransactionUseCase(book.bookId)();

        const useCase = sellBookLinkUseCase(baseUrl, transaction);

        expect(await useCase()).to.deep.equal({
            link: `${baseUrl}/${transaction.transactionId}`,
        });
    });

    it('should throw an error if the transaction is invalid', async function () {
        const useCase = sellBookLinkUseCase(baseUrl, {
            transactionId: '',
            bookId: '',
        });

        await expect(useCase()).to.be.rejected;
    });
});

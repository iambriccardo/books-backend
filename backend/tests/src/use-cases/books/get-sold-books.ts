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
import { getSoldBooksUseCase } from '../../../../src/use-cases/books/get-sold-books';
import { sellBookBodyFixture } from '../../../helpers/fixtures';

use(chaiAsPromised);

describe('getSoldBooksUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    it('should return the books sold by the user if it has sold any', async function () {
        const body = sellBookBodyFixture({
            seller: '608e519d8c2f4a0a88aa8216',
            saleDate: new Date(),
            buyer: '608e4192842f4a0a88aa8216',
        });

        await sellBookUseCase(body)();

        const useCase = getSoldBooksUseCase('608e519d8c2f4a0a88aa8216');
        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.above(0);
    });

    it('should return nothing if the user has not sold any books', async function () {
        const useCase = getSoldBooksUseCase('608e519d8c2f4a0a88aa8216');
        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.below(1);
    });
});

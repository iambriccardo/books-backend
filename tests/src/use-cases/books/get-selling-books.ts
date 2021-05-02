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
import { getSellingBooksUseCase } from '../../../../src/use-cases/books/get-selling-books';
import { sellBookBodyFixture } from '../../../helpers/fixtures';

use(chaiAsPromised);

describe('getSellingBooksUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    it('should return the books the user is selling if it is selling any', async function () {
        const body = sellBookBodyFixture({
            seller: '608e519d8c2f4a0a88aa8216',
        });

        await sellBookUseCase(body)();

        const useCase = getSellingBooksUseCase('608e519d8c2f4a0a88aa8216');
        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.above(0);
    });

    it('should return nothing if the user is not selling any books', async function () {
        const useCase = getSellingBooksUseCase('608e519d8c2f4a0a88aa8216');
        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.below(1);
    });
});

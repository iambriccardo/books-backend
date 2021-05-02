import { describe } from 'mocha';
import { expect, use } from 'chai';
import { sellBookUseCase } from '../../../../../src/use-cases/books/sell-book/sell-book';
import chaiAsPromised from 'chai-as-promised';
import { BookModel } from '../../../../../src/entities/book';
import {
    deleteCollections,
    destroyTestMongoose,
    initTestMongoose,
} from '../../../../helpers/mongoose';
import { sellBookBodyFixture } from '../../../../helpers/fixtures';

use(chaiAsPromised);

describe('sellBookUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    it('should insert the book into the database if the book is valid and has optional parameters', async function () {
        const body = sellBookBodyFixture({
            isbn: '978-1-56619-909-4',
            saleDate: new Date(),
            buyer: '608e4192842f4a0a88aa8216',
        });

        const useCase = sellBookUseCase(body);

        await expect(useCase()).to.not.be.rejected;

        await useCase();
        expect(await BookModel.findOne({ isbn: '978-1-56619-909-4' })).to.exist;
    });

    it("should insert the book into the database if the book is valid and doesn't have optional parameters", async function () {
        const body = sellBookBodyFixture();

        const useCase = sellBookUseCase(body);

        await expect(useCase()).to.not.be.rejected;

        await useCase();
        expect(await BookModel.findOne({ isbn: '978-1-56619-909-4' })).to.exist;
    });

    it('should throw an error if the book is invalid', async function () {
        const body: any = {
            isbn: '978-1-56619-909-4',
            title: 'Alice in Wonderland',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipisci elit.',
        };

        const useCase = sellBookUseCase(body);

        await expect(useCase()).to.be.rejected;
    });
});

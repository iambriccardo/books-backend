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
import { searchBooksUseCase } from '../../../../src/use-cases/books/search-books';
import { sellBookBodyFixture } from '../../../helpers/fixtures';
import { SellBookBody } from '../../../../src/controllers/books/sell-book';

use(chaiAsPromised);

describe('searchBooksUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    const bodies: SellBookBody[] = [
        sellBookBodyFixture({
            title: 'Alice in Wonderland',
            description: 'Alice in Wonderland is an amazing book',
        }),
        sellBookBodyFixture({
            title: 'Lord of the Rings',
            description: 'Lord of the Rings is an amazing book.',
        }),
    ];

    it('should return the books if they match with the search query', async function () {
        for (const body of bodies) {
            await sellBookUseCase(body)();
        }

        const useCase = searchBooksUseCase(
            'Alice in Wonderland',
            0,
            '608e4192842f4a0a88aa8216',
        );
        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.above(0);
    });

    it('should not return books if no one matches to the search query', async function () {
        for (const body of bodies) {
            await sellBookUseCase(body)();
        }

        const useCase = searchBooksUseCase('Invisible Man', 0, '');
        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.below(1);
    });
});

import { describe } from 'mocha';
import { expect, use } from 'chai';
import { sellBookUseCase } from '../../../../src/use-cases/books/sell-book';
import chaiAsPromised from 'chai-as-promised';
import { Book, BookModel } from '../../../../src/entities/book';
import {
    deleteCollections,
    destroyTestMongoose,
    initTestMongoose,
} from '../../../helpers/mongoose';
import { searchBooksUseCase } from '../../../../src/use-cases/books/search-books';

use(chaiAsPromised);

describe('sellBookUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    const sampleBooks: Book[] = [
        {
            isbn: '978-1-56619-909-4',
            title: 'Alice in Wonderland',
            description:
                'Alice in Wonderland has been known for its curious story.',
            price: 20,
            condition: 'ok',
            pictures: ['alice_in_wonderland_cover.png'],
            seller: 'riccardo',
            location: 'Trento',
            publicationDate: new Date(),
            saleDate: new Date(),
            buyer: 'marco',
        },
        {
            isbn: '968-1-56319-809-6',
            title: 'Lord of the Rings',
            description: 'Lord of the Rings is an amazing book.',
            price: 20,
            condition: 'ok',
            pictures: ['lord_of_the_rings_cover.png'],
            seller: 'riccardo',
            location: 'Trento',
            publicationDate: new Date(),
            saleDate: new Date(),
            buyer: 'marco',
        },
    ];

    it('should return the books if they match with the search query', async function () {
        for (const book of sampleBooks) {
            await sellBookUseCase(book)();
        }

        const useCase = searchBooksUseCase('Alice in Wonderland');
        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.above(0);
    });

    it('should not return books if no one matches to the search query', async function () {
        for (const book of sampleBooks) {
            await sellBookUseCase(book)();
        }

        const useCase = searchBooksUseCase('Invisible Man');
        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.below(1);
    });
});

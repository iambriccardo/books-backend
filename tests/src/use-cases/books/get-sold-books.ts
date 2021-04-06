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
import { getSoldBooksUseCase } from '../../../../src/use-cases/books/get-sold-books';
import { BaseUser } from '../../../../src/entities/user';

use(chaiAsPromised);

describe('getSoldBooksUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    it('should return the books sold by the user if it has sold any', async function () {
        const book: Book = {
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
        };

        const user: BaseUser = {
            username: 'riccardo',
            password: '1234',
        };

        await sellBookUseCase(book)();

        const useCase = getSoldBooksUseCase(user);
        expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.above(0);
    });

    it('should return nothing if the user has not sold any books', async function () {
        const user: BaseUser = {
            username: 'riccardo',
            password: '1234',
        };

        const useCase = getSoldBooksUseCase(user);
        expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.have.length.below(1);
    });
});

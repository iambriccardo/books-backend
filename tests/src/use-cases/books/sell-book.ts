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

use(chaiAsPromised);

describe('sellBookUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    it('should insert the book into the database if the book is valid and has optional parameters', async function () {
        const book: Book = {
            isbn: '978-1-56619-909-4',
            title: 'Alice in Wonderland',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipisci elit.',
            price: 20,
            condition: 'ok',
            pictures: ['alice_in_wonderland_cover.png'],
            seller: 'riccardo',
            location: 'Trento',
            publicationDate: new Date(),
            saleDate: new Date(),
            buyer: 'marco',
        };

        const useCase = sellBookUseCase(book);

        expect(useCase()).to.not.be.rejected;

        await useCase();
        expect(await BookModel.findOne({ isbn: '978-1-56619-909-4' })).to.exist;
    });

    it("should insert the book into the database if the book is valid and doesn't have optional parameters", async function () {
        const book: Book = {
            isbn: '978-1-56619-909-4',
            title: 'Alice in Wonderland',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipisci elit.',
            price: 20,
            condition: 'ok',
            pictures: ['alice_in_wonderland_cover.png'],
            seller: 'riccardo',
            location: 'Trento',
            publicationDate: new Date(),
        };

        const useCase = sellBookUseCase(book);

        expect(useCase()).to.not.be.rejected;

        await useCase();
        expect(await BookModel.findOne({ isbn: '978-1-56619-909-4' })).to.exist;
    });

    it('should throw an error if the book is invalid', async function () {
        const book: any = {
            isbn: '978-1-56619-909-4',
            title: 'Alice in Wonderland',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipisci elit.',
        };

        const useCase = sellBookUseCase(book);

        expect(useCase()).to.be.rejectedWith(Error);
    });
});

import { before, describe } from 'mocha';
import { expect, use } from 'chai';
import { sellBookUseCase } from '../../../../src/use-cases/books/sell-book';
import { BookModel } from '../../../../src/entities/book';
import {
    deleteCollections,
    destroyTestMongoose,
    initTestMongoose,
} from '../../../helpers/mongoose';
import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised);

describe('sellBookUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(BookModel));

    afterEach(deleteCollections(BookModel));

    it('should insert book in the database', async function () {
        const book = {
            isbn: '9781234567897',
            title: 'Alice in Wonderland',
            description: 'Alice is a beautiful girl who lives in the forest',
        };

        expect(sellBookUseCase(book)()).to.not.be.rejected;
        expect(BookModel.findOne({ title: 'Alice in Wonderland' })).to.exist;
    });

    it('should not insert book in case of malformed input', async function () {
        const book: any = {
            isbn: '9781234567897',
            title: 'Alice in Wonderland',
        };

        expect(sellBookUseCase(book)()).to.be.rejectedWith(Error);
    });
});

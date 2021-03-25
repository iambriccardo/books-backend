import { before, describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
    deleteCollections,
    destroyTestMongoose,
    initTestMongoose,
} from '../../../../helpers/mongoose';
import { User, UserModel } from '../../../../../src/entities/user';
import { signupUseCase } from '../../../../../src/use-cases/authentication/signup/signup';

use(chaiAsPromised);

describe('signupUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(UserModel));

    afterEach(deleteCollections(UserModel));

    it('should insert the user into the database if the user is valid', async function () {
        const user: User = {
            username: 'mario',
            password: '1234',
            name: 'Mario',
            surname: 'Rossi',
            contactInformation: {
                phoneNumber: '3719483759',
                email: 'marco@domain.com',
                telegramUsername: 'mario2000',
                facebookUsername: 'mario2000',
            },
        };

        const useCase = signupUseCase(user);

        expect(useCase()).to.not.be.rejected;
        expect(await UserModel.findOne({ username: 'mario' })).to.exist;
    });

    it('should throw an error if the user is invalid', async function () {
        const user: any = {
            username: 'mario',
            password: '1234',
        };

        const useCase = signupUseCase(user);

        expect(useCase()).to.be.rejectedWith(Error);
    });
});

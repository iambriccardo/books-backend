import { before, describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
    deleteCollections,
    destroyTestMongoose,
    initTestMongoose,
} from '../../../../helpers/mongoose';
import { UserModel } from '../../../../../src/entities/user';
import { signupUseCase } from '../../../../../src/use-cases/authentication/signup/signup';
import { SignupBody } from '../../../../../src/controllers/authentication/signup';

use(chaiAsPromised);

describe('signupUseCase', function () {
    before(initTestMongoose);

    after(destroyTestMongoose(UserModel));

    afterEach(deleteCollections(UserModel));

    it('should insert the user into the database if the body is valid', async function () {
        const body: SignupBody = {
            email: 'mario@domain.com',
            username: 'mario',
            password: '1234',
        };

        const useCase = signupUseCase(body);

        await expect(useCase()).to.not.be.rejected;
        expect(await UserModel.findOne({ username: 'mario' })).to.exist;
    });

    it('should throw an error if the body is invalid', async function () {
        const body: any = {
            username: 'mario',
            password: '1234',
        };

        const useCase = signupUseCase(body);

        await expect(useCase()).to.be.rejected;
    });
});

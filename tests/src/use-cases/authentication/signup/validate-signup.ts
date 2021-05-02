import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { validateSignupUseCase } from '../../../../../src/use-cases/authentication/signup/validate-signup';
import { SignupBody } from '../../../../../src/controllers/authentication/signup';

use(chaiAsPromised);

describe('validateSignupUseCase', function () {
    it('should return the body if the validation has been successful', async function () {
        const body: SignupBody = {
            email: 'mario@domain.com',
            username: 'mario',
            password: '1234567',
        };

        const useCase = validateSignupUseCase(body);

        await expect(useCase()).to.not.be.rejected;
        expect(await useCase()).to.be.deep.equal(body);
    });

    it('should throw an error if email field is invalid', async function () {
        const body: SignupBody = {
            email: 'marioatdomain.com',
            username: 'mario',
            password: '1234',
        };

        const useCase = validateSignupUseCase(body);

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if username field is invalid', async function () {
        const body: SignupBody = {
            email: 'mario@domain.com',
            username: 'MARIO',
            password: '1234567',
        };

        const useCase = validateSignupUseCase(body);

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if password field is invalid', async function () {
        const body: SignupBody = {
            email: 'mario@domain.com',
            username: 'mario',
            password: '',
        };

        const useCase = validateSignupUseCase(body);

        await expect(useCase()).to.be.rejected;
    });
});

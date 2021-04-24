import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { sanitizeSignupUseCase } from '../../../../../src/use-cases/authentication/signup/sanitize-signup';
import { SignupBody } from '../../../../../src/controllers/authentication/signup';

use(chaiAsPromised);

describe('sanitizeSignupUseCase', function () {
    it('should return the sanitized body if the optional fields are set', async function () {
        const body: SignupBody = {
            email: 'mario@domain.com  ',
            username: ' mario ',
            password: '1234 ',
        };

        const sanitizedBody: SignupBody = {
            email: 'mario@domain.com',
            username: 'mario',
            password: '1234',
        };

        const useCase = sanitizeSignupUseCase(body);

        await expect(useCase()).to.not.be.rejected;
        expect(await useCase()).to.deep.equal(sanitizedBody);
    });

    it('should return the sanitized body if the optional fields are not set', async function () {
        const body: SignupBody = {
            email: 'mario@domain.com  ',
            username: ' mario ',
            password: '1234 ',
        };

        const sanitizedBody: SignupBody = {
            email: 'mario@domain.com',
            username: 'mario',
            password: '1234',
        };

        const useCase = sanitizeSignupUseCase(body);

        await expect(useCase()).to.not.be.rejected;
        expect(await useCase()).to.deep.equal(sanitizedBody);
    });

    it('should throw an error if the input is invalid', async function () {
        const user: any = {
            username: 'Mario',
            password: 'Rossi',
        };

        const useCase = sanitizeSignupUseCase(user);

        await expect(useCase()).to.be.rejected;
    });
});

import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { User } from '../../../../../src/entities/user';
import { validateSignupUseCase } from '../../../../../src/use-cases/authentication/signup/validate-signup';

use(chaiAsPromised);

describe('validateSignupUseCase', function () {
    it('should return the user if the validation has been successful', async function () {
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

        const useCase = validateSignupUseCase(user);

        await expect(useCase()).to.not.be.rejected;
        expect(await useCase()).to.be.deep.equal(user);
    });

    it('should throw an error if email field is invalid', async function () {
        const user: User = {
            username: 'mario',
            password: '1234',
            name: 'Mario',
            surname: 'Rossi',
            contactInformation: {
                phoneNumber: '3719483759',
                email: 'marcoatdomain.com',
                telegramUsername: 'mario2000',
                facebookUsername: 'mario2000',
            },
        };

        const useCase = validateSignupUseCase(user);

        await expect(useCase()).to.be.rejected;
    });

    it('should throw an error if password field is invalid', async function () {
        const user: User = {
            username: 'mario',
            password: '',
            name: 'Mario',
            surname: 'Rossi',
            contactInformation: {
                phoneNumber: '3719483759',
                email: 'marco@domain.com',
                telegramUsername: 'mario2000',
                facebookUsername: 'mario2000',
            },
        };

        const useCase = validateSignupUseCase(user);

        await expect(useCase()).to.be.rejected;
    });
});

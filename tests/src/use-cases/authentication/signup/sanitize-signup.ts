import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { sanitizeSignupUseCase } from '../../../../../src/use-cases/authentication/signup/sanitize-signup';
import { User } from '../../../../../src/entities/user';

use(chaiAsPromised);

describe('sanitizeSignupUseCase', function () {
    it('should return the sanitized user if the optional fields are set', async function () {
        const user: User = {
            username: ' mario ',
            password: '1234 ',
            name: 'Mario',
            surname: 'Rossi ',
            contactInformation: {
                phoneNumber: '  3719483759',
                email: 'marco@domain.com  ',
                telegramUsername: 'mario2000',
                facebookUsername: 'mario2000',
            },
            profilePicture: ' https://picsum.photos/536/354  ',
        };

        const sanitizedUser: User = {
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
            profilePicture: 'https://picsum.photos/536/354',
        };

        const useCase = sanitizeSignupUseCase(user);

        await expect(useCase()).to.not.be.rejected;
        expect(await useCase()).to.deep.equal(sanitizedUser);
    });

    it('should return the sanitized user if the optional fields are not set', async function () {
        const user: User = {
            username: ' mario ',
            password: '1234 ',
            name: 'Mario',
            surname: 'Rossi ',
            contactInformation: {
                phoneNumber: '  3719483759',
                email: 'marco@domain.com  ',
            },
        };

        const sanitizedUser: User = {
            username: 'mario',
            password: '1234',
            name: 'Mario',
            surname: 'Rossi',
            contactInformation: {
                phoneNumber: '3719483759',
                email: 'marco@domain.com',
            },
        };

        const useCase = sanitizeSignupUseCase(user);

        await expect(useCase()).to.not.be.rejected;
        expect(await useCase()).to.deep.equal(sanitizedUser);
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

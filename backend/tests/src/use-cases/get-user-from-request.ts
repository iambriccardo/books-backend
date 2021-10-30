import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { getUserFromRequestUseCase } from '../../../src/use-cases/get-user-from-request';
import { IControllerRequest } from '../../../src/controllers/base';

use(chaiAsPromised);

describe('getUserFromRequestUseCase', function () {
    it('should return the user if the user is present in the request', async function () {
        const user = {
            name: 'riccardo',
            surname: 'busetti',
        };

        const request = {
            context: {
                expressRequest: {
                    user: user as unknown,
                },
            },
        };

        const useCase = getUserFromRequestUseCase(
            request as IControllerRequest,
        );

        await expect(useCase()).to.not.be.rejected;
        expect(await useCase()).to.deep.equal(user);
    });

    it('should throw an error if the user is not present in the request', async function () {
        const request = {
            context: {
                expressRequest: {
                    user: undefined,
                },
            },
        };

        const useCase = getUserFromRequestUseCase(
            request as IControllerRequest,
        );

        await expect(useCase()).to.be.rejected;
    });
});

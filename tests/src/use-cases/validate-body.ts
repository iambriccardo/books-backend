import { describe } from 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { IControllerRequest } from '../../../src/controllers/base';
import { validateBodyUseCase } from '../../../src/use-cases/validate-body';
import { JTDSchemaType } from 'ajv/dist/jtd';

use(chaiAsPromised);

describe('validateBodyUseCase', function () {
    interface SimpleUser {
        name: string;
        surname: string;
    }

    const simpleUserSchema: JTDSchemaType<SimpleUser> = {
        properties: {
            name: { type: 'string' },
            surname: { type: 'string' },
        },
    };

    it('should return the serialized object if the body is valid', async function () {
        const simpleUser = {
            name: 'riccardo',
            surname: 'busetti',
        };

        const request = {
            body: simpleUser,
        };

        const useCase = validateBodyUseCase(
            request as IControllerRequest,
            simpleUserSchema,
        );

        await expect(useCase()).to.not.be.rejected;

        expect(await useCase()).to.be.deep.equal(simpleUser);
    });

    it('should throw an error if the body is invalid', async function () {
        const simpleUser = {
            name: 'riccardo',
        };

        const request = {
            body: simpleUser,
        };

        const useCase = validateBodyUseCase(
            request as IControllerRequest,
            simpleUserSchema,
        );

        await expect(useCase()).to.be.rejected;
    });
});

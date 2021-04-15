import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/fp-extensions';
import { chain } from 'fp-ts/TaskEither';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { JTDSchemaType } from 'ajv/dist/jtd';
import { GenericObject } from '../../helpers/types';
import { checkAccountUseCase } from '../../use-cases/authentication/check-account';

export interface CheckAccountBody {
    usernameOrEmail: string;
}

const CheckAccountJTDSchemaType: JTDSchemaType<CheckAccountBody> = {
    properties: {
        usernameOrEmail: { type: 'string' },
    },
};

export const checkAccountController: Controller<AppError, GenericObject> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestBodyUseCase(request, CheckAccountJTDSchemaType),
        toTaskEither,
        chain((body) => pipe(checkAccountUseCase(body), toTaskEither)),
        toResponse(false),
    );

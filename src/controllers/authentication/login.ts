import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { loginUseCase } from '../../use-cases/authentication/login/login';
import { chain } from 'fp-ts/TaskEither';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { JTDSchemaType } from 'ajv/dist/jtd';
import { toTaskEither } from '../../helpers/extensions';

interface LoginBody {
    usernameOrEmail: string;
    password: string;
}

const LoginBodyJTDSchema: JTDSchemaType<LoginBody> = {
    properties: {
        usernameOrEmail: { type: 'string' },
        password: { type: 'string' },
    },
};

export const loginController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestBodyUseCase(request, LoginBodyJTDSchema),
        toTaskEither,
        chain(() => pipe(loginUseCase(request.context), toTaskEither)),
        toResponse(true),
    );

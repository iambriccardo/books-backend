import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { loginUseCase } from '../../use-cases/authentication/login/login';
import { chain } from 'fp-ts/TaskEither';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { BaseUserJDTSchema } from '../../entities/user';

export const loginController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestBodyUseCase(request, BaseUserJDTSchema),
        toTaskEither,
        chain(() => pipe(loginUseCase(request.context), toTaskEither)),
        toResponse(true),
    );

import {
    Controller,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/fp-extensions';
import { loginUseCase } from '../../use-cases/authentication/login/login';
import { chain } from 'fp-ts/TaskEither';
import { sanitizeLoginUseCase } from '../../use-cases/authentication/login/sanitize-login';
import { validateLoginUseCase } from '../../use-cases/authentication/login/validate-login';

export const loginController: Controller<AppError, void> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: IControllerRequest,
) =>
    pipe(
        sanitizeLoginUseCase(request.context),
        toTaskEither,
        chain(() => pipe(validateLoginUseCase(request.context), toTaskEither)),
        chain(() => pipe(loginUseCase(request.context), toTaskEither)),
        mapToControllerResponse(true),
    );

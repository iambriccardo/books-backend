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
import { validateBodyUseCase } from '../../use-cases/validate-body';
import { BaseUserJDTSchema } from '../../entities/user';

export const loginController: Controller<AppError, void> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: IControllerRequest,
) =>
    pipe(
        validateBodyUseCase(request, BaseUserJDTSchema),
        toTaskEither,
        chain(() => pipe(loginUseCase(request.context), toTaskEither)),
        mapToControllerResponse(true),
    );

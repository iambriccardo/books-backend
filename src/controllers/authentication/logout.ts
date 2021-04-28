import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { logoutUseCase } from '../../use-cases/authentication/logout';

export const logoutController: Controller<AppError, void> = (
    request: IControllerRequest,
) => pipe(logoutUseCase(request.context), toTaskEither, toResponse(true));

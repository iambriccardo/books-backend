import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/fp-extensions';
import { chain } from 'fp-ts/TaskEither';
import { signupUseCase } from '../../use-cases/authentication/signup/signup';
import { sanitizeSignupUseCase } from '../../use-cases/authentication/signup/sanitize-signup';
import { AppError } from '../../errors/base';
import { validateBodyUseCase } from '../../use-cases/validate-body';
import { UserJDTSchema } from '../../entities/user';
import { validateSignupUseCase } from '../../use-cases/authentication/signup/validate-signup';

export const signupController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        validateBodyUseCase(request, UserJDTSchema),
        toTaskEither,
        chain((user) => pipe(sanitizeSignupUseCase(user), toTaskEither)),
        chain((user) => pipe(validateSignupUseCase(user), toTaskEither)),
        chain((user) => pipe(signupUseCase(user), toTaskEither)),
        toResponse(false),
    );

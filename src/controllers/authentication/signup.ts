import {
    Controller,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/fp-extensions';
import { validateSignupUseCase } from '../../use-cases/authentication/signup/validate-signup';
import { chain } from 'fp-ts/TaskEither';
import { signupUseCase } from '../../use-cases/authentication/signup/signup';
import { sanitizeSignupUseCase } from '../../use-cases/authentication/signup/sanitize-signup';

export const signupController: Controller<Error, void> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: IControllerRequest,
) =>
    pipe(
        sanitizeSignupUseCase(request.body),
        toTaskEither,
        chain((user) => pipe(validateSignupUseCase(user), toTaskEither)),
        chain((user) => pipe(signupUseCase(user), toTaskEither)),
        mapToControllerResponse,
    );

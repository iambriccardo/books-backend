import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { chain } from 'fp-ts/TaskEither';
import { signupUseCase } from '../../use-cases/authentication/signup/signup';
import { sanitizeSignupUseCase } from '../../use-cases/authentication/signup/sanitize-signup';
import { AppError } from '../../errors/base';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { validateSignupUseCase } from '../../use-cases/authentication/signup/validate-signup';
import { JTDSchemaType } from 'ajv/dist/jtd';

export interface SignupBody {
    email: string;
    username: string;
    password: string;
}

const SignupBodyJTDSchema: JTDSchemaType<SignupBody> = {
    properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
    },
};

export const signupController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        validateRequestBodyUseCase(request, SignupBodyJTDSchema),
        toTaskEither,
        chain((body) => pipe(sanitizeSignupUseCase(body), toTaskEither)),
        chain((body) => pipe(validateSignupUseCase(body), toTaskEither)),
        chain((body) => pipe(signupUseCase(body), toTaskEither)),
        toResponse(false),
    );

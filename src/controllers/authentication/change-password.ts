import { Controller, IControllerRequest, toResponse } from '../base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { chain, map, taskEither } from 'fp-ts/TaskEither';
import { AppError } from '../../errors/base';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { JTDSchemaType } from 'ajv/dist/jtd';
import { changePasswordUseCase } from '../../use-cases/authentication/change-password/change-password';
import { sequenceT } from 'fp-ts/Apply';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { sanitizeChangePasswordUseCase } from '../../use-cases/authentication/change-password/sanitize-change-password';
import { validateChangePasswordUseCase } from '../../use-cases/authentication/change-password/validate-change-password';

export interface ChangePasswordBody {
    oldPassword: string;
    newPassword: string;
}

const ChangePasswordJTDSchema: JTDSchemaType<ChangePasswordBody> = {
    properties: {
        oldPassword: { type: 'string' },
        newPassword: { type: 'string' },
    },
};

export const changePasswordController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        sequenceT(taskEither)(
            pipe(
                getUserFromRequestUseCase(request),
                toTaskEither,
                map((user) => user.userId),
            ),
            pipe(
                validateRequestBodyUseCase(request, ChangePasswordJTDSchema),
                toTaskEither,
            ),
        ),
        chain(([userId, body]) =>
            pipe(
                sanitizeChangePasswordUseCase(body),
                toTaskEither,
                map(
                    (sanitizedBody) =>
                        [userId, sanitizedBody] as [string, ChangePasswordBody],
                ),
            ),
        ),
        chain(([userId, body]) =>
            pipe(
                validateChangePasswordUseCase(userId, body),
                toTaskEither,
                map(
                    (validatedBody) =>
                        [userId, validatedBody] as [string, ChangePasswordBody],
                ),
            ),
        ),
        chain(([userId, body]) =>
            pipe(changePasswordUseCase(userId, body), toTaskEither),
        ),
        toResponse(false),
    );

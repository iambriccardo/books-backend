import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { chain, map, taskEither } from 'fp-ts/TaskEither';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { validateRequestBodyUseCase } from '../../use-cases/validate-request-body';
import { JTDSchemaType } from 'ajv/dist/jtd';
import { editProfileUseCase } from '../../use-cases/profile/edit-profile/edit-profile';
import { sequenceT } from 'fp-ts/Apply';
import { User } from '../../entities/user';
import { validateEditProfileUseCase } from '../../use-cases/profile/edit-profile/validate-edit-profile';

export interface EditProfileBody {
    email?: string;
    name?: string;
    surname?: string;
    contactInformation?: {
        phoneNumber?: string;
        telegramUsername?: string;
        facebookUsername?: string;
    };
}

const EditProfileBodyJTDSchema: JTDSchemaType<EditProfileBody> = {
    optionalProperties: {
        email: { type: 'string' },
        name: { type: 'string' },
        surname: { type: 'string' },
        contactInformation: {
            optionalProperties: {
                phoneNumber: { type: 'string' },
                telegramUsername: { type: 'string' },
                facebookUsername: { type: 'string' },
            },
        },
    },
};

export const editProfileController: Controller<AppError, User> = (
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
                validateRequestBodyUseCase(request, EditProfileBodyJTDSchema),
                toTaskEither,
            ),
        ),
        chain(([userId, body]) =>
            pipe(
                validateEditProfileUseCase(body),
                toTaskEither,
                map(() => [userId, body] as [string, EditProfileBody]),
            ),
        ),
        chain(([userId, body]) =>
            pipe(editProfileUseCase(userId, body), toTaskEither),
        ),
        toResponse(false),
    );

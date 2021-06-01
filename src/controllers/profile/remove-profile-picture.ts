import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { chain, orElse } from 'fp-ts/TaskEither';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { addProfilePictureUseCase } from '../../use-cases/profile/add-profile-picture';
import { deletePictureUseCase } from '../../use-cases/delete-picture';
import { removeProfilePictureUseCase } from '../../use-cases/profile/remove-profile-picture';

export const removeProfilePictureController: Controller<AppError, void> = (
    request: IControllerRequest,
) =>
    pipe(
        getUserFromRequestUseCase(request),
        toTaskEither,
        chain((user) =>
            pipe(
                removeProfilePictureUseCase(user.username),
                toTaskEither,
                orElse(() =>
                    pipe(
                        addProfilePictureUseCase(
                            user.username,
                            user.profilePicture,
                        ),
                        toTaskEither,
                    ),
                ),
                chain(() =>
                    pipe(
                        deletePictureUseCase(user.profilePicture),
                        toTaskEither,
                        orElse(() =>
                            pipe(
                                addProfilePictureUseCase(
                                    user.username,
                                    user.profilePicture,
                                ),
                                toTaskEither,
                            ),
                        ),
                    ),
                ),
            ),
        ),
        toResponse(false),
    );

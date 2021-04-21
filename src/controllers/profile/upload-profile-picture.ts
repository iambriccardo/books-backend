import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { convertFileToBase64UseCase } from '../../use-cases/convert-file-to-base64';
import { chain, map, orElse, taskEither } from 'fp-ts/TaskEither';
import { GenericObject } from '../../helpers/types';
import { uploadPictureUseCase } from '../../use-cases/upload-picture';
import { imageOptions } from '../../helpers/cloudinary';
import { sequenceT } from 'fp-ts/Apply';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { addProfilePictureUseCase } from '../../use-cases/profile/add-profile-picture';
import { deletePictureUseCase } from '../../use-cases/delete-picture';

export const uploadProfilePictureController: Controller<
    AppError,
    GenericObject
> = (request: IControllerRequest) =>
    pipe(
        convertFileToBase64UseCase(request, 'profile-picture'),
        toTaskEither,
        chain((base64File) =>
            // TODO: the TaskEither are run in parallel, thus their errors are independent, fix this.
            sequenceT(taskEither)(
                pipe(
                    getUserFromRequestUseCase(request),
                    toTaskEither,
                    map((user) => user.username),
                ),
                pipe(
                    uploadPictureUseCase(
                        base64File,
                        imageOptions.profilePicture,
                    ),
                    toTaskEither,
                ),
            ),
        ),
        chain(([username, uploadResult]) =>
            pipe(
                addProfilePictureUseCase(username, uploadResult),
                toTaskEither,
                orElse(() =>
                    pipe(
                        deletePictureUseCase(uploadResult.public_id),
                        toTaskEither,
                    ),
                ),
            ),
        ),
        toResponse(false),
    );

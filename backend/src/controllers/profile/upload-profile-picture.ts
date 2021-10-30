import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError, ServerError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither, withError } from '../../helpers/extensions';
import { convertFileToBase64UseCase } from '../../use-cases/convert-file-to-base64';
import { chain, map, orElse, taskEither } from 'fp-ts/TaskEither';
import { uploadPictureUseCase } from '../../use-cases/upload-picture';
import { imageOptions, UploadResult } from '../../helpers/cloudinary';
import { sequenceT } from 'fp-ts/Apply';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { addProfilePictureUseCase } from '../../use-cases/profile/add-profile-picture';
import { deletePictureUseCase } from '../../use-cases/delete-picture';

export const uploadProfilePictureController: Controller<
    AppError,
    UploadResult | null
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
                    map((user) => user.userId),
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
        chain(([userId, uploadResult]) =>
            pipe(
                addProfilePictureUseCase(userId, uploadResult.secureUrl),
                toTaskEither,
                map(() => uploadResult),
                orElse(() =>
                    pipe(
                        deletePictureUseCase(uploadResult.publicId),
                        toTaskEither,
                        chain(() =>
                            pipe(
                                withError<UploadResult | null>(
                                    new ServerError(
                                        'Error while uploading the profile picture.',
                                    ),
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

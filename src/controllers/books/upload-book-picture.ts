import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { convertFileToBase64UseCase } from '../../use-cases/convert-file-to-base64';
import { chain } from 'fp-ts/TaskEither';
import { uploadPictureUseCase } from '../../use-cases/upload-picture';
import { imageOptions, UploadResult } from '../../helpers/cloudinary';

export const uploadBookPictureController: Controller<AppError, UploadResult> = (
    request: IControllerRequest,
) =>
    pipe(
        convertFileToBase64UseCase(request, 'book-picture'),
        toTaskEither,
        chain((base64File) =>
            pipe(
                uploadPictureUseCase(base64File, imageOptions.bookPicture),
                toTaskEither,
            ),
        ),
        toResponse(false),
    );

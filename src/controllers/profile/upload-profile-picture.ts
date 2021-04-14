import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/fp-extensions';
import { uploadProfilePictureUseCase } from '../../use-cases/profile/upload-profile-picture';
import { convertFileToBase64UseCase } from '../../use-cases/convert-file-to-base64';
import { chain } from 'fp-ts/TaskEither';
import { GenericObject } from '../../helpers/types';

export const uploadProfilePictureController: Controller<
    AppError,
    GenericObject
> = (request: IControllerRequest) =>
    pipe(
        convertFileToBase64UseCase(request, 'profile-picture'),
        toTaskEither,
        chain((base64File) =>
            pipe(uploadProfilePictureUseCase(base64File), toTaskEither),
        ),
        toResponse(false),
    );

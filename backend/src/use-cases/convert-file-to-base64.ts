import { IControllerRequest } from '../controllers/base';
import { Lazy } from 'fp-ts/function';
import { FileUploadError } from '../errors/base';

export const convertFileToBase64UseCase = (
    request: IControllerRequest,
    filename: string,
): Lazy<Promise<string>> => {
    return async () => {
        const uploadedFile = request.context.expressRequest.file;
        if (!uploadedFile)
            throw new FileUploadError(filename, 'the file is missing');

        return uploadedFile.buffer.toString('base64');
    };
};

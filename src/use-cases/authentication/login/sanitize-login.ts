import { Lazy } from 'fp-ts/function';
import { IControllerContext } from '../../../controllers/base';

export const sanitizeLoginUseCase = (
    context: IControllerContext,
): Lazy<Promise<void>> => {
    return async () => {
        console.log('Sanitizing login');
    };
};

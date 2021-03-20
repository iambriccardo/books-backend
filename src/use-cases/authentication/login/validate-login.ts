import { Lazy } from 'fp-ts/function';
import { IControllerContext } from '../../../controllers/base';

export const validateLoginUseCase = (
    context: IControllerContext,
): Lazy<Promise<void>> => {
    return async () => {
        console.log('Validating login');
    };
};

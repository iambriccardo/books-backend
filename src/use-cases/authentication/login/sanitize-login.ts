import { Lazy } from 'fp-ts/function';
import { IControllerContext } from '../../../controllers/base';
import { BaseUser } from '../../../entities/user';

export const sanitizeLoginUseCase = (user: BaseUser): Lazy<Promise<void>> => {
    return async () => {
        console.log('Sanitizing login');
    };
};

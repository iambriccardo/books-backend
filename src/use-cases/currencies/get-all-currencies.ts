import { Lazy } from 'fp-ts/function';
import { GenericObject } from '../../helpers/types';
import { readJsonFile } from '../../helpers/files';

export const getAllCurrenciesUseCase = (): Lazy<Promise<GenericObject>> => {
    return async () => {
        return readJsonFile('currencies.json');
    };
};

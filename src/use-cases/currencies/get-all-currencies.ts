import { Lazy } from 'fp-ts/function';
import { readJsonFile } from '../../helpers/files';
import { Currency } from '../../entities/currencies';

export const getAllCurrenciesUseCase = (): Lazy<Promise<Currency[]>> => {
    return async () => {
        return readJsonFile('currencies.json').currencies as Currency[];
    };
};

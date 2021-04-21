import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { GenericObject } from '../../helpers/types';
import { getAllCurrenciesUseCase } from '../../use-cases/currencies/get-all-currencies';

export const getAllCurrenciesController: Controller<
    AppError,
    GenericObject
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = (_: IControllerRequest) =>
    pipe(getAllCurrenciesUseCase(), toTaskEither, toResponse(false));

import {
    Controller,
    IControllerRequest,
    mapToControllerResponse,
} from '../base';
import { AppError } from '../../errors/base';
import { Explore } from '../../entities/explore';
import { pipe } from 'fp-ts/function';
import { exploreBooksUseCase } from '../../use-cases/books/explore-books';
import { toTaskEither } from '../../helpers/fp-extensions';
import { User } from '../../entities/user';

export const exploreBooksController: Controller<AppError, Explore> = (
    request: IControllerRequest,
) =>
    pipe(
        exploreBooksUseCase(request.context.expressRequest.user as User),
        toTaskEither,
        mapToControllerResponse(false),
    );

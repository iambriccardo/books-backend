import { Controller, IControllerRequest, toResponse } from '../base';
import { AppError } from '../../errors/base';
import { pipe } from 'fp-ts/function';
import { toTaskEither } from '../../helpers/extensions';
import { chain, map, orElse } from 'fp-ts/TaskEither';
import { getUserFromRequestUseCase } from '../../use-cases/get-user-from-request';
import { getProfileDetailsUseCase } from '../../use-cases/profile/get-profile-details';
import { validateRequestParamUseCase } from '../../use-cases/validate-request-param';
import { GenericObject } from '../../helpers/types';

export const getProfileDetailsController: Controller<
    AppError,
    GenericObject
> = (request: IControllerRequest) =>
    pipe(
        validateRequestParamUseCase(request, 'username'),
        toTaskEither,
        orElse(() =>
            pipe(
                getUserFromRequestUseCase(request),
                toTaskEither,
                map((user) => user.username),
            ),
        ),
        chain((username) =>
            pipe(getProfileDetailsUseCase(username), toTaskEither),
        ),
        toResponse(false),
    );

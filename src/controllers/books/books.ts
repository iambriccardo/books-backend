import { attachController, Controller, IControllerHttpRequest } from '../base';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';

const controller = async (request: IControllerHttpRequest) => {
    console.log('Fetching');
    await sleep(1000);
    console.log('Fetched');

    return {
        body: 'Fetched new data',
    };
};

export const buildBooksController: Controller<Error, string> = (
    request: IControllerHttpRequest,
) => TE.tryCatch(attachController(request, controller), E.toError);

// TODO: remove after testing.
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

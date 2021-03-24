import { Lazy } from 'fp-ts/function';
import { IControllerRequest } from '../controllers/base';
import Ajv, { JTDSchemaType } from 'ajv/dist/jtd';
import { InvalidBodyError } from '../errors/base';

export const validateBodyUseCase = <T>(
    request: IControllerRequest,
    schema: JTDSchemaType<T>,
): Lazy<Promise<T>> => {
    return async () => {
        const ajv = new Ajv();
        const parse = ajv.compileParser(schema);

        const data = parse(JSON.stringify(request.body));
        if (data === undefined) {
            throw new InvalidBodyError(parse.message as string);
        } else {
            return data;
        }
    };
};

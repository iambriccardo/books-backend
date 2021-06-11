import { Router } from 'express';
import { connectsToController } from '../../controllers/base';
import { signupController } from '../../controllers/authentication/signup';
import '../../helpers/authentication';
import { loginController } from '../../controllers/authentication/login';
import { checkAccountController } from '../../controllers/authentication/check-account';
import {
    useApplyFunctionToRequestBodyField,
    useFieldValueToLowerCase,
} from '../../interceptors/interceptors';
import { changePasswordController } from '../../controllers/authentication/change-password';
import { isAuthenticated } from '../../helpers/authentication';

const router = Router();

router.put(
    '/password/change',
    isAuthenticated,
    connectsToController(changePasswordController),
);

router.post(
    '/check',
    connectsToController(
        checkAccountController,
        useFieldValueToLowerCase('usernameOrEmail'),
    ),
);

router.post(
    '/login',
    connectsToController(
        loginController,
        useFieldValueToLowerCase('usernameOrEmail'),
    ),
);

router.post(
    '/signup',
    connectsToController(
        signupController,
        useFieldValueToLowerCase('username'),
        useFieldValueToLowerCase('email'),
    ),
);

export default router;

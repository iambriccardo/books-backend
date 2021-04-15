import { Router } from 'express';
import { connectsToController } from '../../controllers/base';
import { signupController } from '../../controllers/authentication/signup';
import '../../helpers/passport';
import { loginController } from '../../controllers/authentication/login';
import { checkAccountController } from '../../controllers/authentication/check-account';

const router = Router();

router.post('/check', connectsToController(checkAccountController));

router.post('/login', connectsToController(loginController));

router.post('/signup', connectsToController(signupController));

export default router;

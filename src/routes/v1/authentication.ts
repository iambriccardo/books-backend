import { Router } from 'express';
import { connectsToController } from '../../controllers/base';
import { signupController } from '../../controllers/authentication/signup';
import '../../helpers/authentication';
import { loginController } from '../../controllers/authentication/login';
import { checkAccountController } from '../../controllers/authentication/check-account';
import { logoutController } from '../../controllers/authentication/logout';
import { isAuthenticated } from '../../helpers/authentication';

const router = Router();

router.post('/check', connectsToController(checkAccountController));

router.post('/login', connectsToController(loginController));

router.get('/logout', isAuthenticated, connectsToController(logoutController));

router.post('/signup', connectsToController(signupController));

export default router;

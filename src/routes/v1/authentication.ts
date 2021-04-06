import { Router } from 'express';
import { expressToController } from '../../controllers/base';
import { signupController } from '../../controllers/authentication/signup';
import '../../helpers/passport';
import { loginController } from '../../controllers/authentication/login';

const router = Router();

router.post('/login', expressToController(loginController));

router.post('/signup', expressToController(signupController));

export default router;

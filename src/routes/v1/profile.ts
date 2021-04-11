import { Router } from 'express';
import { isAuthenticated } from '../../helpers/passport';
import { expressToController } from '../../controllers/base';
import { getProfileDetailsController } from '../../controllers/profile/get-profile-details';

const router = Router();

router.get(
    '/details',
    isAuthenticated,
    expressToController(getProfileDetailsController),
);

router.get(
    '/details/:username',
    isAuthenticated,
    expressToController(getProfileDetailsController),
);

export default router;

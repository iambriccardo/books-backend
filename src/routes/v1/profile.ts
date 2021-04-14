import { Router } from 'express';
import { isAuthenticated } from '../../helpers/passport';
import { connectsToController } from '../../controllers/base';
import { getProfileDetailsController } from '../../controllers/profile/get-profile-details';
import { uploadProfilePictureController } from '../../controllers/profile/upload-profile-picture';
import { acceptsSingleFile } from '../../helpers/multer';

const router = Router();

router.get(
    '/details',
    isAuthenticated,
    connectsToController(getProfileDetailsController),
);

router.get(
    '/details/:username',
    isAuthenticated,
    connectsToController(getProfileDetailsController),
);

router.post(
    '/upload/profile-picture',
    isAuthenticated,
    acceptsSingleFile('profile-picture'),
    connectsToController(uploadProfilePictureController),
);

export default router;

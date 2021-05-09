import { Router } from 'express';
import { isAuthenticated } from '../../helpers/authentication';
import { connectsToController } from '../../controllers/base';
import { getProfileDetailsController } from '../../controllers/profile/get-profile-details';
import { uploadProfilePictureController } from '../../controllers/profile/upload-profile-picture';
import { acceptsSingleFile } from '../../helpers/multer';
import { editProfileController } from '../../controllers/profile/edit-profile';

const router = Router();

router.put(
    '/edit',
    isAuthenticated,
    connectsToController(editProfileController),
);

router.get(
    '/details',
    isAuthenticated,
    connectsToController(getProfileDetailsController),
);

router.get(
    '/details/:userId',
    isAuthenticated,
    connectsToController(getProfileDetailsController),
);

router.post(
    '/picture/upload',
    isAuthenticated,
    acceptsSingleFile('profile-picture'),
    connectsToController(uploadProfilePictureController),
);

export default router;

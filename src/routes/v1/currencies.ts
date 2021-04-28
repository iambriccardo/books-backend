import { Router } from 'express';
import { connectsToController } from '../../controllers/base';
import { isAuthenticated } from '../../helpers/authentication';
import { getAllCurrenciesController } from '../../controllers/currencies/get-all-currencies';

const router = Router();

router.get(
    '/all',
    isAuthenticated,
    connectsToController(getAllCurrenciesController),
);

export default router;

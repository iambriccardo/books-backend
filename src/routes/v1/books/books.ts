import { Router } from 'express';
import { dispatchToController } from '../../../controllers/base';
import { buildBooksController } from '../../../controllers/books/books';

const router = Router();

router.get('/all', dispatchToController(buildBooksController));

export default router;

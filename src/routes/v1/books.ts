import { Router } from 'express';
import { expressToController } from '../../controllers/base';
import { buildBooksController } from '../../controllers/books/all-books';

const router = Router();

router.get('/all', expressToController(buildBooksController));

export default router;

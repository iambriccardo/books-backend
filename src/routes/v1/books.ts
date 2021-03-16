import { Router } from 'express';
import { expressToController } from '../../controllers/base';
import { getAllBooksController } from '../../controllers/books/get-all-books';
import { sellBookController } from '../../controllers/books/sell-book';

const router = Router();

router.get('/all', expressToController(getAllBooksController));
router.post('/sell', expressToController(sellBookController));

export default router;

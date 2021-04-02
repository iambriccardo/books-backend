import { Router } from 'express';
import { expressToController } from '../../controllers/base';
import { getAllBooksController } from '../../controllers/books/get-all-books';
import { sellBookController } from '../../controllers/books/sell-book';
import { isAuthenticated } from '../../helpers/passport';
import { exploreBooksController } from '../../controllers/books/explore-books';

const router = Router();

router.get(
    '/explore',
    isAuthenticated,
    expressToController(exploreBooksController),
);
router.get('/all', isAuthenticated, expressToController(getAllBooksController));
router.post('/sell', isAuthenticated, expressToController(sellBookController));

export default router;

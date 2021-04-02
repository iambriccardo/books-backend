import { Router } from 'express';
import { expressToController } from '../../controllers/base';
import { sellBookController } from '../../controllers/books/sell-book';
import { isAuthenticated } from '../../helpers/passport';
import { exploreBooksController } from '../../controllers/books/explore-books';
import { injectUserIntoRequestBodyMiddleware } from '../../middlewares/middlewares';
import { searchBooksController } from '../../controllers/books/search-books';

const router = Router();

router.get(
    '/explore',
    isAuthenticated,
    expressToController(exploreBooksController),
);

router.post(
    '/search',
    isAuthenticated,
    expressToController(searchBooksController),
);

router.post(
    '/sell',
    isAuthenticated,
    expressToController(
        sellBookController,
        injectUserIntoRequestBodyMiddleware('seller'),
    ),
);

export default router;

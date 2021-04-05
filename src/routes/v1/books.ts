import { Router } from 'express';
import { expressToController } from '../../controllers/base';
import { sellBookController } from '../../controllers/books/sell-book';
import { isAuthenticated } from '../../helpers/passport';
import { exploreBooksController } from '../../controllers/books/explore-books';
import { useInjectUserIntoRequestBody } from '../../middlewares/middlewares';
import { searchBooksController } from '../../controllers/books/search-books';
import { getSellingBooksController } from '../../controllers/books/get-selling-books';
import { getSoldBookController } from '../../controllers/books/get-sold-books';

const router = Router();

router.get(
    '/explore',
    isAuthenticated,
    expressToController(exploreBooksController),
);

router.get(
    '/selling',
    isAuthenticated,
    expressToController(getSellingBooksController),
);

router.get(
    '/sold',
    isAuthenticated,
    expressToController(getSoldBookController),
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
        useInjectUserIntoRequestBody('seller'),
    ),
);

export default router;

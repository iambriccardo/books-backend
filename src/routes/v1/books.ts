import { Router } from 'express';
import { connectsToController } from '../../controllers/base';
import { sellBookController } from '../../controllers/books/sell-book';
import { isAuthenticated } from '../../helpers/authentication';
import { exploreBooksController } from '../../controllers/books/explore-books';
import {
    useInjectLocationCoordinatesIntoRequestBody,
    useInjectUserIntoRequestBody,
} from '../../interceptors/interceptors';
import { searchBooksController } from '../../controllers/books/search-books';
import { getSellingBooksController } from '../../controllers/books/get-selling-books';
import { getSoldBookController } from '../../controllers/books/get-sold-books';

const router = Router();

router.get(
    '/explore',
    isAuthenticated,
    connectsToController(exploreBooksController),
);

router.get(
    '/selling',
    isAuthenticated,
    connectsToController(getSellingBooksController),
);

router.get(
    '/sold',
    isAuthenticated,
    connectsToController(getSoldBookController),
);

router.get(
    '/search',
    isAuthenticated,
    connectsToController(searchBooksController),
);

router.post(
    '/sell',
    isAuthenticated,
    connectsToController(
        sellBookController,
        useInjectUserIntoRequestBody('seller'),
        useInjectLocationCoordinatesIntoRequestBody(),
    ),
);

export default router;

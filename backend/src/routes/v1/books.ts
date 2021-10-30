import { Router } from 'express';
import { connectsToController } from '../../controllers/base';
import { sellBookController } from '../../controllers/books/sell-book';
import { isAuthenticated } from '../../helpers/authentication';
import { exploreBooksController } from '../../controllers/books/explore-books';
import {
    useInjectIntoRequestBody,
    useInjectLocationCoordinatesIntoRequestBody,
    useInjectUserIntoRequestBody,
} from '../../interceptors/interceptors';
import { searchBooksController } from '../../controllers/books/search-books';
import { getSellingBooksController } from '../../controllers/books/get-selling-books';
import { getSoldBookController } from '../../controllers/books/get-sold-books';
import { removeBookController } from '../../controllers/books/remove-book';
import { editBookController } from '../../controllers/books/edit-book';
import { acceptsSingleFile } from '../../helpers/multer';
import { uploadBookPictureController } from '../../controllers/books/upload-book-picture';
import { sellBookLinkController } from '../../controllers/books/sell-book-link';
import { sellBookConfirmController } from '../../controllers/books/sell-book-confirm';
import { getBookByTransactionController } from '../../controllers/books/get-book-by-transaction';
import { getBookByIdController } from '../../controllers/books/get-book-by-id';

const router = Router();

router.put(
    '/edit/:bookId',
    isAuthenticated,
    connectsToController(editBookController),
);

router.get(
    '/explore',
    isAuthenticated,
    connectsToController(exploreBooksController),
);

router.get(
    '/by-id/:bookId',
    isAuthenticated,
    connectsToController(getBookByIdController),
);

router.get(
    '/by-transaction/:transactionId',
    isAuthenticated,
    connectsToController(getBookByTransactionController),
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

router.delete(
    '/remove/:bookId',
    isAuthenticated,
    connectsToController(removeBookController),
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
        useInjectIntoRequestBody('publicationDate', new Date()),
        useInjectUserIntoRequestBody('seller'),
        useInjectLocationCoordinatesIntoRequestBody(),
    ),
);

router.post(
    '/sell/confirm/:transactionId',
    isAuthenticated,
    connectsToController(sellBookConfirmController),
);

router.get(
    '/sell/link/:bookId',
    isAuthenticated,
    connectsToController(sellBookLinkController),
);

router.post(
    '/picture/upload',
    isAuthenticated,
    acceptsSingleFile('book-picture'),
    connectsToController(uploadBookPictureController),
);

export default router;

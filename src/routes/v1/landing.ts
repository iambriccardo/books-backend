import { Router } from 'express';
import { connectsToController } from '../../controllers/base';
import { searchBooksController } from '../../controllers/books/search-books';
import { useInjectQueryParameter } from '../../interceptors/interceptors';

const router = Router();

router.get(
    '/search',
    connectsToController(
        searchBooksController,
        useInjectQueryParameter('limit', '15'),
    ),
);

export default router;

import { Router } from 'express';
import booksRoutes from './books';

const router = Router();

router.use('/books', booksRoutes);

export default router;

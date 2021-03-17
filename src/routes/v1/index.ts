import { Router } from 'express';
import booksRoutes from './books';
import authenticationRoutes from './authentication';

const router = Router();

router.use('/books', booksRoutes);
router.use('/auth', authenticationRoutes);

export default router;

import { Router } from 'express';
import booksRoutes from './books';
import authenticationRoutes from './authentication';
import profileRoutes from './profile';

const router = Router();

router.use('/auth', authenticationRoutes);

router.use('/books', booksRoutes);

router.use('/profile', profileRoutes);

export default router;

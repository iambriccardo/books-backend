import { Router } from 'express';
import authenticationRoutes from './authentication';
import booksRoutes from './books';
import currenciesRoutes from './currencies';
import landingRoutes from './landing';
import profileRoutes from './profile';
import { computeUptime } from '../../helpers/utils';

const router = Router();

router.get('/', async (req, res) => {
    const uptime = computeUptime();

    const healthCheck = {
        uptime: `${uptime.hours} Hour(s) ${uptime.minutes} minute(s) ${uptime.seconds} second(s)`,
        message: 'OK',
        timestamp: Date.now(),
    };

    try {
        res.send(healthCheck);
    } catch (e) {
        healthCheck.message = e;
        res.status(503).send();
    }
});

router.use('/auth', authenticationRoutes);

router.use('/books', booksRoutes);

router.use('/currencies', currenciesRoutes);

router.use('/landing', landingRoutes);

router.use('/profile', profileRoutes);

export default router;

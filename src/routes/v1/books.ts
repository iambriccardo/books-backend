import { Router } from 'express';

const router = Router();

router.get('/all', (req, res) => {
    res.send('Welcome');
});

export default router;

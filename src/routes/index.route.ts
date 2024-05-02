import express from 'express';

const router = express.Router();
import serviceRouter from './services/services.route';


router.use('/services', serviceRouter);

export default router;

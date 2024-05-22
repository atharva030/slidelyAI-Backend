import express from 'express';

const router = express.Router();
import serviceRouter from './services/services.route';
import userRouter from './users/user.route'

router.use('/services', serviceRouter);
router.use('/users', userRouter);

export default router;

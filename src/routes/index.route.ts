import express from 'express';

const router = express.Router();
import userRouter from './users/user.route'

router.use('/users', userRouter);

export default router;

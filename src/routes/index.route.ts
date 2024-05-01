import express from 'express';

const router = express.Router();
import userRouter from './user/user.route';


router.use('/user', userRouter);

export default router;

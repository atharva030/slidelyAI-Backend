import express from 'express';
const router = express.Router();

import {
    createUser,
    sendOtp,
    verifyOtp,
} from '../../controllers/users/user.controller';

router.post('/createUser', createUser);
router.post('/sendotp', sendOtp);
router.post('/verifyOtp', verifyOtp);

export default router;

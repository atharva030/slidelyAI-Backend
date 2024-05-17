import express from 'express';
const router = express.Router();

import {
    createUser,
} from '../../controllers/users/user.controller';

router.post('/createUser', createUser);

export default router;

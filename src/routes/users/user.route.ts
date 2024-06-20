import express from 'express';
const router = express.Router();

import {
    createUser,
    getUser,
    deleteEntry
} from '../../controllers/users/user.controller';

router.post('/createUser', createUser);
router.get('/getUser', getUser);
router.post('/deleteEntry', deleteEntry);

export default router;

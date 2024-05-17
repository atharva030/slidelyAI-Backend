import express from 'express';
const router = express.Router();

import {
    createOrder,
} from '../../controllers/services/payment.controller';
import { createService, getServices } from '../../controllers/services/services.controller';

router.get('/createPhonepeOrder/:service_id/:phoneNumber', createOrder);
router.post('/createService', createService);
router.get('/getServices', getServices);


export default router;

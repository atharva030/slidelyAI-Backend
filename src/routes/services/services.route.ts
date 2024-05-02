import express from 'express';
const router = express.Router();

import {
    createPhonepeOrder,
} from '../../controllers/services/payment.controller';
import { createService, getServices } from '../../controllers/services/services.controller';

router.post('/createPhonepeOrder/:service_id/:phoneNumber', createPhonepeOrder);
router.post('/createService', createService);
router.get('/getServices', getServices);


export default router;

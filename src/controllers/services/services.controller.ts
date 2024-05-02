import { Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import axios from 'axios';
import Services from '../../models/services/service.models';
import { SHA256 } from 'crypto-js';
import BookedService from '../../models/services/bookedServices.models';
import logger from '../../configs/logger.config';

const MERCHANT_ID = process.env.MERCHANT_ID;
const PHONE_PE_HOST_URL = process.env.PHONE_PE_HOST_URL;
const SALT_INDEX = process.env.SALT_INDEX;
const SALT_KEY = process.env.SALT_KEY;
const APP_BE_URL = process.env.APP_BE_URL; // our application

export const createService = async (req: Request, res: Response) => {
    try {
        const newService = new Services({
            service_price: req.body.service_price
        });

        await newService.save();

        return res.status(201).json(newService);
        // res.status(httpStatusCodes.OK).json(savedFeedback);
    } catch (error: any) {
        logger.log(error);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(
            'Internal server error',
        );
        return;
    }
};

export const getServices = async (req: Request, res: Response) => {
    try {
        let allServices = await Services.find();

        return res.status(200).json(allServices);
    } catch (error: any) {
        logger.log(error);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json(
            'Internal server error',
        );
    }
};
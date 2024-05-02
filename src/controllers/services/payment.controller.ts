import { Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import axios from 'axios';
import Services from '../../models/services/service.models';
import { SHA256 } from 'crypto-js';
import BookedService from '../../models/services/bookedServices.models';
import uniqid from 'uniqid';
import ShortUniqueId from 'short-unique-id';

const MERCHANT_ID = process.env.MERCHANT_ID;
const PHONE_PE_HOST_URL = process.env.PHONE_PE_HOST_URL;
const SALT_INDEX = process.env.SALT_INDEX;
const SALT_KEY = process.env.SALT_KEY;
const APP_BE_URL = process.env.APP_BE_URL; // our application

export const createPhonepeOrder = async (req: Request, res: Response) => {
    try {
        const phone = req.params.phoneNumber;
        let merchantTransactionId = uniqid();
        const uid = new ShortUniqueId({ length: 10 });
        const merchantUserId = uid.rnd()

        // const booking = await BookedService.findOne({
        //     merchantUserId: merUserId,
        //     merchantTransactionId: mertransId,
        //     phoneNumber: phone
        // }).populate('service');

        // if (!booking) {
        //     return res.status(httpStatusCodes.BAD_GATEWAY).json({
        //         message: "Something went wrong"
        //     });
        // }

        const selectedService = await Services.findOne({ service_id: req.params.service_id });
        if (!selectedService) {
            return res.status(httpStatusCodes.NOT_FOUND).json({
                message: "Action Not allowed"
            });
        }

        // Generate a unique merchant transaction ID for each transaction
        // redirect url => phonePe will redirect the user to this url once payment is completed. It will be a GET request, since redirectMode is "REDIRECT"
        let normalPayLoad = {
            merchantId: MERCHANT_ID, //* PHONEPE_MERCHANT_ID . Unique for each account (private)
            merchantTransactionId: merchantTransactionId,
            merchantUserId: merchantUserId,
            amount:100*100,
            redirectUrl: `${APP_BE_URL}/ourservices/getstatusOrder/${merchantTransactionId}`,
            redirectMode: "REDIRECT",
            mobileNumber: req.params.phoneNumber,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };

        // make base64 encoded payload
        let base64EncodedPayload = Buffer.from(JSON.stringify(normalPayLoad)).toString("base64");

        // X-VERIFY => SHA256(base64EncodedPayload + "/pg/v1/pay" + SALT_KEY) + ### + SALT_INDEX
        let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
        let sha256_val = SHA256(string);
        let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

        axios.post(
            `${PHONE_PE_HOST_URL}/pg/v1/pay`,
            {
                request: base64EncodedPayload,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": xVerifyChecksum,
                    accept: "application/json",
                },
            }
        ).then(function (response) {
            console.log("inside the success")
            res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
        }).catch(function (error) {
            console.log("this is an error")
            console.log(error);
            res.send(error);
        });
    } catch (error: any) {
        console.error(error);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json('Internal server error');
        return;
    }
};


// export const getstatusOrder = async (req: Request, res: Response) => {
//     try {
//         const { merchantTransactionId } = req.params;

//         if (!merchantTransactionId) {
//             return res.status(httpStatusCodes.BAD_GATEWAY).json({
//                 message: "Missing merchant transaction ID"
//             });
//         }

//         const booking = await userBookedServicesRepository.findOne({
//             where: { merchantTransactionId: merchantTransactionId },
//             relations: ['service']
//         });

//         if (!booking) {
//             return res.status(httpStatusCodes.NOT_FOUND).json({
//                 message: "Booking not found"
//             });
//         }

//         const statusUrl =
//             `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` +
//             merchantTransactionId;

//         const string =
//             `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
//         const sha256_val = SHA256(string);
//         const xVerifyChecksum = sha256_val + "###" + SALT_INDEX;

//         axios
//             .get(statusUrl, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-VERIFY": xVerifyChecksum,
//                     "X-MERCHANT-ID": merchantTransactionId,
//                     accept: "application/json",
//                 },
//             })
//             .then(async function (response) {
//                 let resEmail = response.data?.data.transactionId;
//                 if (response.data && response.data.code === "PAYMENT_SUCCESS") {
//                     booking.payment_status = PaymentStatus.SUCCESS;
//                 } else {
//                     booking.payment_status = PaymentStatus.FAILURE;
//                 }

//                 // Save booking status
//                 await userBookedServicesRepository.save(booking);

//                 // Send notifications and emails based on payment status
//                 try {
//                     if (booking.payment_status === PaymentStatus.SUCCESS) {
//                         sendServiceBookingNotificationToAdmin(
//                             process.env.ADMIN_EMAIL,
//                             booking,
//                             booking.service.service_title
//                         );
//                         await sendMessageToUser(booking.phoneNumber);
//                         const name = `${booking.first_name} ${booking.last_name}`;
//                         sendServiceConfirmMail(
//                             booking.email,
//                             name,
//                             booking.service.service_title,
//                             PaymentStatus.SUCCESS,
//                             resEmail
//                         );
//                         return res.redirect(`${process.env.HOSTED_URL}/payment-success`);
//                     } else {
//                         sendServiceBookingNotificationToAdmin(
//                             process.env.ADMIN_EMAIL,
//                             booking,
//                             booking.service.service_title
//                         );
//                         await sendMessageToUser(booking.phoneNumber);
//                         const name = `${booking.first_name} ${booking.last_name}`;
//                         sendServiceConfirmMail(
//                             booking.email,
//                             name,
//                             booking.service.service_title,
//                             PaymentStatus.FAILURE,
//                             resEmail
//                         );
//                         return res.redirect(`${process.env.HOSTED_URL}/payment-fail`);
//                     }
//                 } catch (emailError) {
//                     console.error("Error sending email:", emailError);
//                     return res.redirect(`${process.env.HOSTED_URL}/payment-fail`);
//                 }
//             })
//             .catch(function (error) {
//                 console.error("Error during payment status check:", error);
//                 return res.redirect(`${process.env.HOSTED_URL}/payment-fail`);
//             });

//     } catch (error: any) {
//         console.error("Internal server error:", error);
//         return res.redirect(`${process.env.HOSTED_URL}/payment-fail`);
//     }
// };




import { Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import axios from 'axios';
import Services from '../../models/services/service.models';
import { SHA512, enc } from 'crypto-js'; // Import SHA512 hash function and encodings from crypto-js
import Razorpay from 'razorpay';
import BookedService from '../../models/services/bookedServices.models';
import uniqid from 'uniqid';
import ShortUniqueId from 'short-unique-id';
import hmacSHA512 from 'crypto-js/hmac-sha512';
const MERCHANT_ID = process.env.MERCHANT_ID;
const PHONE_PE_HOST_URL = process.env.PHONE_PE_HOST_URL;
const SALT_INDEX = process.env.SALT_INDEX;
const SALT_KEY = process.env.SALT_KEY;
const APP_BE_URL = process.env.APP_BE_URL; // our application

export const verifyIdentity = async (req: Request, res: Response) => {
    try {
        const secret = "razorpaysecret";

        console.log(req.body);

        // Compute hash of the request body
        const hash = SHA512(secret + JSON.stringify(req.body));

        const digest = hash.toString(enc.Hex); // Convert the hash to a hex string

        console.log(digest, req.headers["x-razorpay-signature"]);
        // Compare computed hash with the signature in request headers
        if (digest === req.headers["x-razorpay-signature"]) {
            console.log("request is legit");
            res.status(httpStatusCodes.OK).json({
                message: "OK",
            });
        } else {
            res.status(httpStatusCodes.FORBIDDEN).json({ message: "Invalid" });
        }
    } catch (error: any) {
        console.error(error);
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json('Internal server error');
        return;
    }
};
function generateRandomId(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let randomId = '';
    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randomId;
}

var razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req: Request, res: Response) => {
    try {
        const payment_capture = 1;
        const amount = 500;
        const currency = "INR";

        const options = {
            amount,
            currency,
            receipt: generateRandomId(),
            payment_capture,
        };

        try {
            const response = await razorpay.orders.create(options);
            console.log(response);
            res.status(200).json({
                id: response.id,
                currency: response.currency,
                amount: response.amount,
            });
        } catch (err) {
            console.log(err);
        }
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




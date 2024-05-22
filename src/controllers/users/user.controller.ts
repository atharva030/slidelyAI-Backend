import { Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import axios from 'axios';
import { Users } from '../../models/users/users.model';
import https from 'https';

export const createUser = async (req: Request, res: Response) => {
    const {
        firstName,
        lastName,
        aadharCardNumber,
        fatherName,
        motherName,
        occupation,
        dob,
        gender,
        isMahant,
        address,
        contactNumber,
        mailID,
        education,
        homeTown,
        religion,
        caste,
        willingnessforseva,
        isFamilyHead,
        relationWithFamilyHead
    } = req.body;

    // Create a new family member instance
    const newFamilyMember = new Users({
        firstName,
        lastName,
        aadharCardNumber,
        fatherName,
        motherName,
        occupation,
        dob,
        gender,
        isMahant,
        address,
        contactNumber,
        mailID,
        education,
        homeTown,
        religion,
        caste,
        willingnessforseva,
        isFamilyHead,
        relationWithFamilyHead
    });

    try {
        // Save the new family member to the database
        await newFamilyMember.save();
        res.status(httpStatusCodes.OK).send(newFamilyMember);
    } catch (error) {
        res.status(400).send(error);
    }
};
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID;

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// In-memory store for OTPs (for demonstration purposes)
const otpStore: { [key: string]: string } = {};

interface RequestOptions extends https.RequestOptions {
    port?: number | null;
}


export const sendOtp = async (req: Request, res: Response) => {
    const { mobile } = req.body;
    if (!mobile) {
        return res.status(400).json({ error: 'Mobile number is required' });
    }
    const otp = generateOTP();

    const data = JSON.stringify({
        mobile: mobile, // Include the mobile number in the request body
        OTP: otp
    });

    const options: RequestOptions = {
        method: 'POST',
        hostname: 'control.msg91.com',
        port: null,
        path: `/api/v5/otp?template_id=${MSG91_TEMPLATE_ID}&mobile=${mobile}&authkey=${MSG91_AUTH_KEY}`,
        headers: {
            'Content-Type': 'application/JSON'
        }
    };  

    const request = https.request(options, (response) => {
        let chunks: any[] = [];

        response.on('data', (chunk) => {
            chunks.push(chunk);
        });

        response.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            // const result = JSON.parse(body);
            console.log(body)
            res.json({ message: 'OTP sent successfully' });
            // if (result.type === 'success') {
            // } else {
            //     res.status(500).json({ error: 'Failed to send OTP', details: result.message });
            // }
        });
    });

    request.write(data);
    request.end();

    request.on('error', (e) => {
        res.status(500).json({ error: 'Failed to send OTP', details: e.message });
    });
};

export const verifyOtp = async (req: Request, res: Response) => {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) {
        return res.status(400).json({ error: 'Mobile number and OTP are required' });
    }

    const data = JSON.stringify({
        mobile: mobile,
        otp: otp,
        authkey: MSG91_AUTH_KEY
    });

    const options: RequestOptions = {
        method: 'POST',
        hostname: 'control.msg91.com',
        port: null,
        path: '/api/v5/otp/verify',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const request = https.request(options, (response) => {
        let chunks: any[] = [];

        response.on('data', (chunk) => {
            chunks.push(chunk);
        });

        response.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            const result = JSON.parse(body);

            if (result.type === 'success') {
                res.json({ message: 'OTP verified successfully' });
            } else {
                res.status(400).json({ error: 'Invalid OTP', details: result.message });
            }
        });
    });

    request.write(data);
    request.end();

    request.on('error', (e) => {
        res.status(500).json({ error: 'Failed to verify OTP', details: e.message });
    });
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




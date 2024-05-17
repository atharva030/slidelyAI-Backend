import { Request, Response } from 'express';
import httpStatusCodes from 'http-status-codes';
import axios from 'axios';
import { Users } from '../../models/users/users.model';

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




// import multer from 'multer';
// import { S3Client } from '@aws-sdk/client-s3';

// const multerS3 = require('multer-s3');
// import path from 'path';

// const s3 = new S3Client({
//     credentials: {
//         accessKeyId: process.env.ACCESS_KEY_ID,
//         secretAccessKey: process.env.SECRET_ACCESS_KEY,
//     },
//     region: process.env.REGION,
// });

// interface CustomRequest extends Request {
//     params: {
//         folder?: string;
//     };
// }

// export const s3Storage = multerS3({
//     s3: s3,
//     bucket: 'uniflik-alpha-storage',
//     acl: 'public-read',
//     ContentDisposition:"inline",
//     contentType: multerS3.AUTO_CONTENT_TYPE, // Dynamically set the ContentType
//     metadata: (
//         req: CustomRequest,
//         file: Express.Multer.File,
//         cb: any,
//     ) => {
//         cb(null, { fieldname: file.fieldname });
//     },
//     key: function (
//         req: CustomRequest,
//         file: Express.Multer.File,
//         cb: (error: any, key: string) => void,
//     ) {
//         const folder = req.params.folder || 'common';
//         const now = new Date();
//         const originalname =
//             new Date(
//                 now.getTime() + now.getTimezoneOffset() * 60000,
//             ).getTime() +
//             '-' +
//             path.basename(file.originalname);
//         const filename = path
//             .join(folder, originalname)
//             .replace(/\\/g, '/');
//         cb(null, filename);
//     },
// });

// // function to sanitize files and send error for unsupported files
// export const sanitizeFile = (file: Express.Multer.File, cb: any) => {
//     const fileExts = [
//         '.pdf',
//         '.doc',
//         '.docx',
//         '.xls',
//         '.xlsx',
//         '.ppt',
//         '.pptx',
//     ];

//     // Check allowed extensions
//     const isAllowedExt = fileExts.includes(
//         path.extname(file.originalname.toLowerCase()),
//     );
//     if (isAllowedExt) {
//         return cb(null, true); // no errors
//     } else {
//         const error = new Error('File type not allowed!');
//         error.name = 'FileTypeNotAllowed';
//         cb(error);
//     }
// };

// // function to sanitize files and send error for unsupported files
// export const sanitizeImage = (file: Express.Multer.File, cb: any) => {
//     const fileExts = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];

//     // Check allowed extensions
//     const isAllowedExt = fileExts.includes(
//         path.extname(file.originalname.toLowerCase()),
//     );

//     if (isAllowedExt) {
//         return cb(null, true); // no errors
//     } else {
//         const error = new Error('File type not allowed!');
//         error.name = 'FileTypeNotAllowed';
//         cb(error);
//     }
// };

// export const uploadImage = multer({
//     storage: s3Storage,
//     fileFilter: (req, file, callback) => {
//         sanitizeImage(file, callback);
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 50, // 50mb file size
//     },
// });

// export const upload = multer({
//     storage: s3Storage,
//     fileFilter: (req, file, callback) => {
//         sanitizeFile(file, callback);
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 50, // 50mb file size
//     },
// });

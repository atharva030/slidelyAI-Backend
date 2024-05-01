// import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import { User } from '../entity/user/user.entity';
// import { AppDataSource } from '../data-source';

// const userRepository = AppDataSource.getRepository(User);
// const protect = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     let token: string | undefined;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             const token = req.headers.authorization.split(' ')[1];

//             // Decodes token id
//             const decoded: any = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET as string,
//             );

//             const decodedId: string = decoded.id;

//             // Get user from the database based on the decoded ID to check if it's a valid user
//             const user = await userRepository.findOneOrFail({
//                 where: { user_id: decodedId },
//             });

//             if (!user) {
//                 throw new Error('Not authorized, user not found');
//             }

//             // The middleware sends the user_id to the next controllers in case the "user_id" has not been sent by the user calling the API
//             req.body.user_id = user.user_id;

//             return next();
//         } catch (error: any) {
//             return res.status(401).json({
//                 message: error.message,
//             });
//         }
//     }

//     if (!token) {
//         return res.status(401).json({
//             message: 'Token not found, User is not authorized!!',
//         });
//     }
// };

// export const applyLoan = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     if (
//         !req.body.user_id &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return next()
//     }
//     else if (
//         req.body.user_id &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     }
    
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             const token = req.headers.authorization.split(' ')[1];

//             // Decodes token id
//             const decoded: any = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET as string,
//             );

//             const decodedId: string = decoded.id;

//             // Get user from the database based on the decoded ID to check if it's a valid user
//             const user = await userRepository.findOneOrFail({
//                 where: { user_id: decodedId },
//             });

//             if (!user) {
//                 throw new Error('Not authorized, user not found');
//             }

//             // The middleware sends the user_id to the next controllers in case the "user_id" has not been sent by the user calling the API
//             req.body.user_id = user.user_id;

//             return next();
//         } catch (error: any) {
//             return res.status(401).json({
//                 message: error.message,
//             });
//         }
//     }
// };
// export const admitrejectprotect = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     if (
//         req.query.ar_status &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } else if (
//         req.query.UNINAME &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } else if (
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         ) &&
//         parseInt(req.query.page as string) === 1
//     ) {
//         return next();
//     } else if (
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         ) &&
//         parseInt(req.query.page as string) > 1
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     }

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             const token = req.headers.authorization.split(' ')[1];

//             // Decodes token id
//             const decoded: any = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET as string,
//             );

//             const decodedId: string = decoded.id;

//             // Get user from the database based on the decoded ID to check if it's a valid user
//             const user = await userRepository.findOneOrFail({
//                 where: { user_id: decodedId },
//             });

//             if (!user) {
//                 throw new Error('Not authorized, user not found');
//             }

//             // The middleware sends the user_id to the next controllers in case the "user_id" has not been sent by the user calling the API
//             req.body.user_id = user.user_id;

//             return next();
//         } catch (error: any) {
//             return res.status(401).json({
//                 message: error.message,
//             });
//         }
//     }
// };

// export const repositoryProtect = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     if (
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         ) &&
//         parseInt(req.query.page as string) === 1 && !req.query.doctypes && !req.query.universityName
//     ) {
//         return next();
//     }
//     else if (
//         req.query.universityName &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } else if (
//         req.query.doctypes &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     }  else if (
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         ) &&
//         parseInt(req.query.page as string) > 1
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     }

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             const token = req.headers.authorization.split(' ')[1];

//             // Decodes token id
//             const decoded: any = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET as string,
//             );

//             const decodedId: string = decoded.id;

//             // Get user from the database based on the decoded ID to check if it's a valid user
//             const user = await userRepository.findOneOrFail({
//                 where: { user_id: decodedId },
//             });

//             if (!user) {
//                 throw new Error('Not authorized, user not found');
//             }

//             // The middleware sends the user_id to the next controllers in case the "user_id" has not been sent by the user calling the API
//             req.body.user_id = user.user_id;

//             return next();
//         } catch (error: any) {
//             return res.status(401).json({
//                 message: error.message,
//             });
//         }
//     }
// };

// export const scholarshipProtect = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     if (
//         req.query.IID && req.query.type==="uni-schol" &&
//         !req.query.major && !req.query.level &&  parseInt(req.query.page as string) < 2 &&

//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//        return next();
//     }
//    else if (
//         req.query.IID &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } 
//     else if (
//         req.query.major &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } else if (
//         req.query.level &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } else if (
//         parseInt(req.query.page as string) === 1 &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return next();
//     } else if (
//         parseInt(req.query.page as string) > 1 &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     }

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             const token = req.headers.authorization.split(' ')[1];

//             // Decodes token id
//             const decoded: any = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET as string,
//             );

//             const decodedId: string = decoded.id;

//             // Get user from the database based on the decoded ID to check if it's a valid user
//             const user = await userRepository.findOneOrFail({
//                 where: { user_id: decodedId },
//             });

//             if (!user) {
//                 throw new Error('Not authorized, user not found');
//             }

//             // The middleware sends the user_id to the next controllers in case the "user_id" has not been sent by the user calling the API
//             req.body.user_id = user.user_id;

//             return next();
//         } catch (error: any) {
//             return res.status(401).json({
//                 message: error.message,
//             });
//         }
//     }
// };

// export const coursesProtect = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     if (
//         req.query.universityId && req.query.type==="uni-course" &&
//         !req.query.degree && !req.query.major && !req.query.level &&  parseInt(req.query.page as string) < 2 &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//        return next();
//     }
//    else if (
//         req.query.universityId &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } 
//     else if (
//         req.query.degree &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } else if (
//         req.query.level &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } 
//     else if (
//         req.query.major &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     }
//     else if (
//         parseInt(req.query.page as string) === 1 &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return next();
//     } else if (
//         parseInt(req.query.page as string) > 1 &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     }

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             const token = req.headers.authorization.split(' ')[1];

//             // Decodes token id
//             const decoded: any = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET as string,
//             );

//             const decodedId: string = decoded.id;

//             // Get user from the database based on the decoded ID to check if it's a valid user
//             const user = await userRepository.findOneOrFail({
//                 where: { user_id: decodedId },
//             });

//             if (!user) {
//                 throw new Error('Not authorized, user not found');
//             }

//             // The middleware sends the user_id to the next controllers in case the "user_id" has not been sent by the user calling the API
//             req.body.user_id = user.user_id;

//             return next();
//         } catch (error: any) {
//             return res.status(401).json({
//                 message: error.message,
//             });
//         }
//     }
// };

// export const feedProtect = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     if (
//         parseInt(req.query.total as string) > 5 &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Not authorized, user not found',
//         });
//     } else if (
//         parseInt(req.query.total as string) <= 5 &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return next();
//     }

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             const token = req.headers.authorization.split(' ')[1];

//             // Decodes token id
//             const decoded: any = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET as string,
//             );

//             const decodedId: string = decoded.id;

//             // Get user from the database based on the decoded ID to check if it's a valid user
//             const user = await userRepository.findOneOrFail({
//                 where: { user_id: decodedId },
//             });

//             if (!user) {
//                 throw new Error('Not authorized, user not found');
//             }

//             // The middleware sends the user_id to the next controllers in case the "user_id" has not been sent by the user calling the API
//             req.body.user_id = user.user_id;

//             return next();
//         } catch (error: any) {
//             return res.status(401).json({
//                 message: error.message,
//             });
//         }
//     }
// };

// export const conditionalProtect = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     if (
//         req.query.type === 'view-profile' &&
//         (req.query.user_id as string) &&
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return next();
//     }
//     const page = parseInt(req.query.page as string);
//     if (page && page === 1) {
//         return next();
//     }
//     if (
//         !(
//             req.headers.authorization &&
//             req.headers.authorization.startsWith('Bearer')
//         )
//     ) {
//         return res.status(401).json({
//             message: 'Token not found, User is not authorized!!',
//         });
//     }
//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith('Bearer')
//     ) {
//         try {
//             const token = req.headers.authorization.split(' ')[1];

//             // Decodes token id
//             const decoded: any = jwt.verify(
//                 token,
//                 process.env.JWT_SECRET as string,
//             );

//             const decodedId: string = decoded.id;

//             // Get user from the database based on the decoded ID to check if it's a valid user
//             const user = await userRepository.findOneOrFail({
//                 where: { user_id: decodedId },
//             });

//             if (!user) {
//                 throw new Error('Not authorized, user not found');
//             }

//             // The middleware sends the user_id to the next controllers in case the "user_id" has not been sent by the user calling the API
//             req.body.user_id = user.user_id;

//             return next();
//         } catch (error: any) {
//             return res.status(401).json({
//                 message: error.message,
//             });
//         }
//     }
// };

// export { protect };

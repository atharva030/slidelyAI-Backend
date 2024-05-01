import express from 'express';
const router = express.Router();

// import {
//     createUser,
//     deleteUser,
//     getUniversityUsers,
//     googleLogin,
//     profileCompletion,
//     sendUserFeedback,
//     topicsFollowed,
//     searchTopicsAndUsers,
//     userSuggestions,
//     searchOverallUsers,
//     getOverallFeed,
//     getOverallFeedForGuest,
//     universitySuggestions,
//     changeMessagePermit,
//     googleSignUp,
// } from '../../controllers/user/user.controller';

// // Will include the protect middleware after the testing is done
// import {
//     feedProtect,
//     protect,
// } from '../../middlewares/jwtAuth.middleware';

// router.route('/createUser').post(createUser);
// router.route('/userSuggestions').get(userSuggestions);
// router.route('/deleteUser/:id').delete(protect, deleteUser);
// router.route('/googleLogin').get(googleLogin);
// router.route('/googleSignUp').get(googleSignUp);

// router.get('/profileCompletion', protect, profileCompletion);
// router.get('/searchOverallUsers/:user_id', protect, searchOverallUsers);
// router.get('/getUniversityUsers', protect, getUniversityUsers);
// router.patch(
//     '/changeMessagePermit/:user_id',
//     protect,
//     changeMessagePermit,
// );
// router.get('/topicsFollowed', protect, topicsFollowed);
// router.post('/sendUserFeedback', protect, sendUserFeedback);
// router
//     .route('/universitySuggestions')
//     .get(universitySuggestions);

// router.route('/searchTopicsAndUsers').get(searchTopicsAndUsers);
// router.route('/getOverallFeed/:user_id').get(protect, getOverallFeed);
// router
//     .route('/getOverallFeed')
//     .get(feedProtect, getOverallFeedForGuest);

export default router;

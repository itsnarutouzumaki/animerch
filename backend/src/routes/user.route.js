import { Router } from "express";
import * as userControllers from "./../controllers/user.controller.js";
import { verifyJWT } from "./../middlewares/auth.middleware.js";
import {upload} from './../middlewares/multer.middleware.js'

const router = Router();

router.route("/register").post(userControllers.userRegister);
router.route("/verifyemail/:id").get( userControllers.userVerifyMail);
router.route("/login").post(userControllers.userLogin);
router.route("/profile").get(verifyJWT, userControllers.userDetails);
router.route("/logout").post(verifyJWT, userControllers.userLogout);
router.route("/updateprofile").post(verifyJWT, userControllers.userUpdateProfile);
router.route("/updatepassword").post(verifyJWT, userControllers.userPasswordUpdate);
router.route("/forgetpassword").post( userControllers.userForgetPassword);
router.route("/resetpassword/:id").get( userControllers.userResetPassword);
router.route("/updateimage").post(verifyJWT,upload.single("profileImage"),userControllers.userUpdateProfileImage);
router.route("/removeimage").post(verifyJWT,userControllers.userRemoveProfileImage);

export default router;

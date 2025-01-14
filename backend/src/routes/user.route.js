import { Router } from "express";
import * as userControllers from "./../controllers/user.controller.js";
import { verifyJWT } from "./../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userControllers.userRegister);
router.route("/login").post(userControllers.userLogin);
router.route("/profile").get(verifyJWT, userControllers.userDetails);
router.route("/logout").post(verifyJWT, userControllers.userLogout);
router.route("/updateprofile").post(verifyJWT, userControllers.userUpdateProfile);
router.route("/updatepassword").post(verifyJWT, userControllers.userPasswordUpdate);
export default router;

import { Router } from "express";
import * as userControllers from "./../controllers/user.controller.js";
import { verifyUserJWT } from "./../middlewares/auth.middleware.js";
import { upload } from "./../middlewares/multer.middleware.js";
import * as addressControllers from "./../controllers/address.controller.js";

const router = Router();

router.route("/register").post(userControllers.userRegister);
router.route("/verifyemail/:id").get(userControllers.userVerifyMail);
router.route("/login").post(userControllers.userLogin);
router.route("/profile").get(verifyUserJWT, userControllers.userDetails);
router.route("/logout").post(verifyUserJWT, userControllers.userLogout);

router
  .route("/updateprofile")
  .post(verifyUserJWT, userControllers.userUpdateProfile);

router
  .route("/updatepassword")
  .post(verifyUserJWT, userControllers.userPasswordUpdate);
router.route("/forgetpassword").post(userControllers.userForgetPassword);
router.route("/resetpassword/:id").get(userControllers.userResetPassword);

router
  .route("/updateimage")
  .post(
    verifyUserJWT,
    upload.single("profileImage"),
    userControllers.userUpdateProfileImage
  );
router
  .route("/removeimage")
  .post(verifyUserJWT, userControllers.userRemoveProfileImage);

router.route("/addaddress").post(verifyUserJWT, addressControllers.addAddress);
router
  .route("/getaddresses")
  .get(verifyUserJWT, addressControllers.getAddresses);
router
  .route("/getaddress/:id")
  .get(verifyUserJWT, addressControllers.getAddress);
router
  .route("/updateaddress/:id")
  .put(verifyUserJWT, addressControllers.updateAddress);
router
  .route("/removeaddress/:id")
  .delete(verifyUserJWT, addressControllers.removeAddress);

export default router;

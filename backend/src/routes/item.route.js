import { Router } from "express";
import * as itemControllers from "./../controllers/item.controller.js";
import { verifySellerJWT } from "./../middlewares/auth.middleware.js";
import { upload } from "./../middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(verifySellerJWT, upload.array("image"), itemControllers.createItem);
router.route("/getitems").get(itemControllers.getItems);
router.route("/getitem/:id").get(itemControllers.getItem);
router.route("/updateitem/:id").put(verifySellerJWT, itemControllers.updateItem);
router.route("/deleteitem/:id").delete(verifySellerJWT, itemControllers.deleteItem);
router.route("/getmyitems").get(verifySellerJWT, itemControllers.getMyItem);
router.route("/searchitem").get(itemControllers.searchItem);


export default router;

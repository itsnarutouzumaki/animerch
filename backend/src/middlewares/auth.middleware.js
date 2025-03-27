import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import { Seller } from "../models/Seller.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const verifyUserJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json(new ApiResponse(401, null, "Unauthorized"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(401).json(new ApiResponse(401, "User not Found", null));
    }

    req.user = user;
    req.role="user";
    next();
  } catch (error) {
    return res.status(401).json(new ApiResponse(401, error.message, error));
  }
};

const verifySellerJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json(new ApiResponse(401, "Unauthorized", null));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Seller.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(401).json(new ApiResponse(401, "User not Found", null));
    }

    req.user = user;
    req.role="seller";
    next();
  } catch (error) {
    return res.status(401).json(new ApiResponse(401, error.message, error));
  }
};

export { verifyUserJWT, verifySellerJWT };

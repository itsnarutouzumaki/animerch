import { ApiResponse } from "../utils/ApiResponse.js";
import { Seller } from "../models/Seller.model.js";
import jwt from "jsonwebtoken";
import { randomString } from "../utils/randomPassword.js";
import mailSender from "./../utils/sendMail.js";
import { fileUpload, deleteImage } from "./../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (sellerID) => {
  const seller = await Seller.findById(sellerID);
  if (!seller) {
    return res.status(404).json(new ApiResponse(404, {}, "seller not found"));
  }

  const accessToken = seller.generateAccessToken();
  const refreshToken = seller.generateRefreshToken();

  seller.refreshToken = refreshToken;
  await seller.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const sellerRegister = async (req, res) => {
  const seller = req.body;

  if (
    !seller.name ||
    !seller.phoneNumber ||
    !seller.password ||
    !seller.email ||
    !seller.gstin ||
    !seller.addressLine_1 ||
    !seller.city ||
    !seller.state ||
    !seller.postalCode ||
    !seller.gstin
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid email format"));
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, {}, "Password must be at least 8 characters long")
      );
  }

  const existingSeller = await Seller.findOne({ email });
  if (existingSeller && existingSeller.verified) {
    return res
      .status(409)
      .json(new ApiResponse(409, {}, "You are already registered"));
  }

  const verifyToken = jwt.sign({ email }, process.env.MAIL_TOKEN_SECRET, {
    expiresIn: process.env.MAIL_TOKEN_EXPIRY,
  });
  const verifyLink = `http://localhost:3000/api/v1/seller/verifyemail/${verifyToken}`;

  await mailSender(email, "Verify Account", verifyLink);

  if (existingSeller) {
    return res
      .status(409)
      .json(
        new ApiResponse(409, {}, "Seller already registered. Verify this email")
      );
  }

  try {
    const newSeller = await Seller.create(seller);

    const sellerData = await Seller.findById(newSeller._id).select(
      "-password -refreshToken -resetToken"
    );

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          sellerData,
          "Email verification link has been sent to your email address"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error, "Error while registering Seller"));
  }
};

const sellerVerifyMail = async (req, res) => {
  const { id: verifyToken } = req.params;

  let email;
  try {
    const decoded = jwt.verify(verifyToken, process.env.MAIL_TOKEN_SECRET);
    email = decoded.email;
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid or expired token"));
  }

  try {
    const seller = await Seller.findOneAndUpdate(
      { email },
      { verified: 1 },
      { new: true }
    ).select("-password -refreshToken");

    if (!seller) {
      return res.status(404).json(new ApiResponse(404, {}, "seller not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, seller, "Your email account is verified"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, {}, "Internal Server Error"));
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Email and password are required"));
  }

  const seller = await Seller.findOne({ email });
  if (!seller) {
    return res.status(401).json(new ApiResponse(401, {}, "Invalid email"));
  }

  if(!seller.verified) {
    const verifyToken = jwt.sign({ email }, process.env.MAIL_TOKEN_SECRET, {
      expiresIn: process.env.MAIL_TOKEN_EXPIRY,
    });
    const verifyLink = `http://localhost:3000/api/v1/seller/verifyemail/${verifyToken}`;
  
    await mailSender(email, "Verify Account", verifyLink);

    return res.status(401).json(new ApiResponse(401, {}, "Verificatin link has been sent to your email,verify your email"));
  }

  const isValidPassword = await seller.isPasswordCorrect(password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "password is incorrect"));
  }

  try {
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      seller._id
    );

    const options = { httpOnly: true, secure: true, sameSite: "Strict" };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user: user.toObject({ getters: true }) },
          "Login successful"
        )
      );
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error, "Error during login"));
  }
};



export { sellerRegister, sellerVerifyMail, userLogin };

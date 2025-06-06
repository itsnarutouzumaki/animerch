import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import { Address } from "../models/Address.model.js";
import { Order } from "../models/Order.model.js";
import jwt from "jsonwebtoken";
import mailSender from "./../utils/sendMail.js";
import { fileUpload, deleteImage } from "./../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const userRegister = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  if (!name || !email || !phoneNumber || !password) {
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

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.verified) {
    return res
      .status(409)
      .json(new ApiResponse(409, {}, "You are already registered"));
  }

  const verifyToken = jwt.sign({ email }, process.env.MAIL_TOKEN_SECRET, {
    expiresIn: process.env.MAIL_TOKEN_EXPIRY,
  });
  const verifyLink = `http://localhost:3000/api/v1/users/verifyemail/${verifyToken}`;
  await mailSender(email, "Verify Account", verifyLink);

  if (existingUser) {
    return res
      .status(409)
      .json(
        new ApiResponse(409, {}, "User already register just verify this email")
      );
  }

  try {
    const newUser = await User.create({ name, email, phoneNumber, password });
    const userData = await User.findById(newUser._id).select(
      "-password -refreshToken -resetToken"
    );

    res
      .status(201)
      .json(
        new ApiResponse(
          201,
          userData,
          "Email verification link has been sent to your email address"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error, "Error while registering user"));
  }
};

const userVerifyMail = async (req, res) => {
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
    const user = await User.findOneAndUpdate(
      { email },
      { verified: 1 },
      { new: true }
    ).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "Your email account is verified"));
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

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json(new ApiResponse(401, {}, "Invalid email"));
  }

  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "password is incorrect"));
  }

  try {
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
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

const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    const addresses = await Address.find({ user: req.user._id });
    const orders = await Order.find({ user: req.user._id });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user, addresses, orders },
          "Profile fetched successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error, "Error fetching user details"));
  }
};

const userLogout = async (req, res) => {
  console.log("hello coder");
  if (!req.user || !req.user._id) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "User not authenticated"));
  }

  try {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, {}, "Logged out successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error, "Error during logout"));
  }
};

const userUpdateProfile = async (req, res) => {
  const updates = req.body;

  if (updates.gender && !["Male", "Female", "Other"].includes(updates.gender)) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid gender value"));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    }).select("-password -refreshToken");

    res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error, "Error updating profile"));
  }
};

const userPasswordUpdate = async (req, res) => {
  const { oldPassword, newPassword, reNewPassword } = req.body;

  if (!oldPassword || !newPassword || !reNewPassword) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  if (newPassword !== reNewPassword) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Passwords do not match"));
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  const isValidPassword = await user.isPasswordCorrect(oldPassword);
  if (!isValidPassword) {
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Incorrect old password"));
  }
  try {
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Password updated successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error, "Error updating password"));
  }
};

const userForgetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(new ApiResponse(400, {}, "Email is required"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json(new ApiResponse(404, {}, "User not found"));
    }

    const resetToken = jwt.sign({ email }, process.env.MAIL_TOKEN_SECRET, {
      expiresIn: process.env.MAIL_TOKEN_EXPIRY,
    });
    await user.updateOne({ resetToken });

    const resetLink = `http://localhost:5173/resetpassword/${resetToken}`;

    await mailSender(email, "Password Reset", resetLink);

    res
      .status(200)
      .json(new ApiResponse(200, {}, `Password reset link sent successfully`));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error, "Error sending reset link"));
  }
};

const userResetPassword = async (req, res) => {
  console.log("hello coder");
  const { resetToken, newPassword, reNewPassword } = req.body;

  if (!resetToken || !newPassword || !reNewPassword) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  if (newPassword !== reNewPassword) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Passwords do not match"));
  }

  let email;
  try {
    const decoded = jwt.verify(resetToken, process.env.MAIL_TOKEN_SECRET);
    email = decoded.email;
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Invalid or expired token"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  if (user.resetToken !== resetToken) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          {},
          "Reset link is invalid or has already been used."
        )
      );
  }

  try {
    user.password = newPassword;
    user.resetToken = "";
    await user.save();

    res
      .status(200)
      .json(
        new ApiResponse(200, {}, `Your Password has been changed successfully.`)
      );
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          {},
          `Error saving temporary password: ${error.message}`
        )
      );
  }
};

const userUpdateProfileImage = async (req, res) => {
  const userId = req.user._id;
  const userImage = req.file?.path;

  if (!userImage) {
    return res.status(400).json(new ApiResponse(400, {}, "Image is required"));
  }

  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  if (user.profileImage !== process.env.DEFAULT_PROFILE_IMAGE) {
    await deleteImage(user.profileImage);
    user.profileImage = process.env.DEFAULT_PROFILE_IMAGE;
  }

  const uloadedImageLink = await fileUpload(userImage);
  user.profileImage = uloadedImageLink;
  await user.save();
  const updatedUser = await User.findById(userId).select(
    "-password -refreshToken"
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { updatedUser },
        "Profile image updated successfully"
      )
    );
};

const userRemoveProfileImage = async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  if (user.profileImage === process.env.DEFAULT_PROFILE_IMAGE) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Profile image already removed"));
  }

  await deleteImage(user.profileImage);

  user.profileImage = process.env.DEFAULT_PROFILE_IMAGE;

  try {
    await user.save();
    const updatedProfile = await User.findById(userId).select(
      "-password -refreshToken"
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { updatedProfile },
          "Profile image removed successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error, "Error removing profile image"));
  }
};

export {
  userRegister,
  userLogin,
  userDetails,
  userLogout,
  userUpdateProfile,
  userPasswordUpdate,
  userForgetPassword,
  userResetPassword,
  userVerifyMail,
  userUpdateProfileImage,
  userRemoveProfileImage,
};

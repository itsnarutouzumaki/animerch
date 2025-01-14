import { ApiError } from "./../utils/ApiError.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

// Function to generate access and refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return res
    .status(500)
    .json(ApiResponse(500,error,"Something went wrong while generating tokens"))
  }
};

// User registration function
const userRegister = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  // Validate required fields
  if (
    [name, email, password].some((field) => {
      return !field || (typeof field === "string" && field.trim() === "");
    }) ||
    !phoneNumber // Check if phoneNumber is missing or falsy
  ) {
    return res
    .status(401)
    .json(new ApiResponse(401,{},"All field are required"))
  }

  // Check if user already exists
  const user = await User.findOne({ email: email });

  if (user) {
    return res
    .status(401)
    .json(new ApiResponse(401,{},"User already exist with this email"))
  }

  try {
    // Create new user
    const registerUser = await User.create({
      name,
      phoneNumber,
      email,
      password,
    });

    // Fetch user data without password
    const userData = await User.findById(registerUser._id).select("-password");

    // Send success response
    res
      .status(201)
      .json(new ApiResponse(201, userData, "User  registered successfully"));
  } catch (error) {
    return res
    .status(500)
    .json(new ApiResponse(500,error,"Somehthing went wrong while registering user"))
  }
};

// User login function
const userLogin = async (req, res) => {
 
    try {
      const { email, password } = req.body;
      
      // Validate required fields
      if (!email || !password) {
        return res
        .status(401)
        .json(new ApiResponse(401,{},"All field are required"))
      }
      
      // Find user by email
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
        .status(401)
        .json(new ApiResponse(401,{},"Invalid email"))
      }
      
      
      // Validate password
      const isValidPassword = await user.isPasswordCorrect(password);
      if (!isValidPassword) {
        return res
        .status(401)
        .json(new ApiResponse(401,{},"Wrong Password"))
      }
      // 
      // Generate access and refresh tokens
      const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
        user._id
      );
  
      // Fetch user data without password and refreshToken
      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );
  
      // Set cookie options
      const options = {
        httpOnly: true,
        secure: true,
      };
  
      // Send response with cookies and user data
      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
          new ApiResponse(
            200,
            {
              user: loggedInUser,
            },
            "User  is logged in successfully"
          )
        );
    } catch (error) {
      return res.status(500).json(new ApiResponse(500, {error}, "Internal Server Error"));
    }
};

// User details function
const userDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(203)
      .json(
        new ApiResponse(203, { user: user }, "Profile successfully fetched")
      );
  } catch (error) {
    return res
    .status(500)
    .json(new ApiResponse(500,error,"something went wrong while fetching user"))
  }
};

const userLogout = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
};

const userUpdateProfile = async (req, res) => {
  const { name, gender } = req.body;
  
  if (gender != "Male" && gender != "Female" && gender != "Other") {
    return res
    .status(401)
    .json(new ApiResponse(401,{},"All field are required"))
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, gender } },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(202).json(new ApiResponse(202, "user details is updated"));
};

const userPasswordUpdate = async (req, res) => {
  const { oldPassword, newPassword, reNewPassword } = req.body;
  if (newPassword != reNewPassword) {
    throw new ApiError(403, "New Password is not matching");
  }
  const user = await User.findById(req.user._id);
  const isValidPassword = await bcrypt.compare(oldPassword, user.password);
  if (!isValidPassword) {
    throw new ApiError(403, "Old Password is not matching");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(202).json(new ApiResponse(202, "Password is updated"));
};

export {
  userRegister,
  userLogin,
  userDetails,
  userLogout,
  userUpdateProfile,
  userPasswordUpdate,
};

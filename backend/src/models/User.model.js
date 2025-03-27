import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      index: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
      match: [/^[0-9]{10}$/, "Phone number must be a 10-digit number."],
    },
    gender: {
      type: String,
      default: "Male",
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be either 'Male', 'Female', or 'Other'.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    addresses: [{
      type: Schema.Types.ObjectId,
      ref: "Address",
    }],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    profileImage: {
      type: String,
      default: process.env.DEFAULT_PROFILE_IMAGE,
    },
    cart: [{
      Item: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      }
    }],
    refreshToken: {
      type: String,
      default: null,
    },
    resetToken: {
      type: String,
      default: "",
    },
    verified:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

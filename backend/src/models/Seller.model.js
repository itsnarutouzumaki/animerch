import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AddressSchema } from "./Address.model.js";

// Define the seller schema
const sellerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required."],
      match: [/^[0-9]{10}$/, "Phone number must be a 10-digit number."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      index: true,
    },
    addressLine_1: {
      type: String,
      required: [true, "Address line 1 is required"],
    },
    addressLine_2: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required."],
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required."],
      validate: {
        validator: (v) => /^\d{6}$/.test(v),
        message: (props) => `${props.value} is not a valid postal code.`,
      },
    },
    country: {
      type: String,
      default: "India",
    },
    landmark: {
      type: String,
    },
    inventory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    gstin: {
      type: String,
      required: [true, "GSTIN is required"],
      unique: [true, "GSTIN must be unique"],
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    refreshToken: {
      type: String,
      default: null,
    },
    resetToken: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

sellerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

sellerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

sellerSchema.methods.generateRefreshToken = function () {
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

export const Seller = mongoose.model("Seller", sellerSchema);

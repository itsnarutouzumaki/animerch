import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AddressSchema = new Schema({
  houseNumber: {
    type: String,
    required: [true, "House number is required."],
  },
  street: {
    type: String,
    required: [true, "Street is required."],
  },
  locality: {
    type: String,
    required: [true, "Locality is required."],
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  state: {
    type: String,
    required: [true, "State is required."],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required."],
    match: {
      validator: /^[1-9][0-9]{5}$/,
      message:
        "Postal code must be a 6-digit number starting with a non-zero digit.",
    },
  },
  country: {
    type: String,
    default: "India",
  },
  landmark: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required."],
    match: {
      validator: /^[0-9]{10}$/,
      message: "Phone number must be a 10-digit number.",
    },
  },
});
// Define the seller schema
const sellerSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    Address: { AddressSchema },
    Inventory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    GSTIN: {
      type: String,
      required: [true, "GSTIN is required"],
      unique: [true, "GSTIN must be unique"],
    },
    Orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
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
      username: this.username,
      fullName: this.fullName,
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

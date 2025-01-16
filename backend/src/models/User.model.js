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
  resetToken :{
    type:String,
    default :""
  }
});

const CartSchema = new Schema({
  Items: [
    {
      Item: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
      Quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

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
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be either 'Male', 'Female', or 'Other'.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    addresses: [AddressSchema],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    avatar: {
      type: String,
    },
    cart: [CartSchema],
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

export const User = mongoose.model("User ", userSchema);

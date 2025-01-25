import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema({
  owner:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Owner is required."],
  },
  fullName: {
    type: String,
    required: [true, "Full name is required."],
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
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required."],
    validate: {
      validator: (v) => /^\d{10}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number.`,
    },
  },
});

AddressSchema.index({ postalCode: 1, phoneNumber: 1 ,owner:1 }, { unique: true });
export { AddressSchema };
export const Address = mongoose.model("Address", AddressSchema);
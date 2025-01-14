import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    items: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Item",
          required: [true, "Item is required."],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required."],
        },
      },
    ],
    total: {
      type: Number,
      required: [true, "Total amount is required."],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User ",
      required: [true, "User  is required."],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "shipped", "delivered"],
        message: "{VALUE} is not a valid status. Valid values are: pending, shipped, delivered.",
      },
      default: "pending",
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: [true, "Address is required."],
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
      required: [true, "Transaction ID is required."],
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
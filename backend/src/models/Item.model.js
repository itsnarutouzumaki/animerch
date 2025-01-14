import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required."],
    },
    Description: {
      type: [String], 
    },
    Price: {
      type: Number,
      required: [true, "Price is required."],
    },
    Seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller", 
      required: [true, "Seller is required."],
    },
    image: {
      type: [String],
      required: [true, "Image is required."],
      validate: {
        validator: function(v) {
          return v.length <= 4;
        },
        message: "A maximum of 4 images is allowed."
      }
    },
    Stock: {
      type: Number,
      required: [true, "Stock is required and must be at least 0."],
      min: [0, "Stock must be at least 0."],
    },
  },
  { timestamps: true } 
);

export const Item = mongoose.model("Item", itemSchema);
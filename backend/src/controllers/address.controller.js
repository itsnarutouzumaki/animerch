import { ApiResponse } from "../utils/ApiResponse.js";
import { Address } from "../models/Address.model.js";
import { User } from "../models/User.model.js";

const addAddress = async (req, res) => {
  const incomingAddress = req.body;

  if (!req.user) {
    return res
      .status(400)
      .json(new ApiResponse(400, "You need to be logged in to add an address"));
  }

  if (
    !incomingAddress.addressLine_1 ||
    !incomingAddress.city ||
    !incomingAddress.state ||
    !incomingAddress.postalCode ||
    !incomingAddress.phoneNumber ||
    !incomingAddress.fullName
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Please provide all the required fields"));
  }

  incomingAddress.owner = req.user._id;

  try {
    const existingAddress = await Address.findOne({
      where: {
        phoneNumber: incomingAddress.phoneNumber,
        postalCode: incomingAddress.postalCode,
        owner: incomingAddress.owner,
      },
    });

    if (existingAddress) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            {},
            "Address with the same phone number and postal code already exists in your account"
          )
        );
    }
    const address = await Address.create(incomingAddress);

    res
      .status(201)
      .json(new ApiResponse(201, "Address added successfully", address));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

const removeAddress = async (req, res) => {
  const addressId = req.params.id;
  if (!addressId) {
    return res.status(400).json(new ApiResponse(400, "No address id provided"));
  }

  try {
    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json(new ApiResponse(404, "Address not found"));
    }

    if (address.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json(
          new ApiResponse(403, "You are not authorized to delete this address")
        );
    }

    const user = await User.findById(req.user._id);
    user.addresses = user.addresses.filter(
      (address) => address.toString() !== addressId
    );
    await user.save();
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

const updateAddress = async (req, res) => {
  const addressId = req.params.id;
  const incomingAddress = req.body;

  if (!addressId) {
    return res.status(400).json(new ApiResponse(400, "No address id provided"));
  }

  if (
    !incomingAddress.addressLine_1 ||
    !incomingAddress.city ||
    !incomingAddress.state ||
    !incomingAddress.postalCode ||
    !incomingAddress.phoneNumber ||
    !incomingAddress.fullName
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Please provide all the required fields"));
  }

  try {
    const address = await Address.findById(addressId);

    if (!address) {
      return res.status(404).json(new ApiResponse(404, "Address not found"));
    }

    if (address.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json(
          new ApiResponse(403, "You are not authorized to update this address")
        );
    }

    address.addressLine_1 = incomingAddress.addressLine_1;
    address.addressLine_2 = incomingAddress.addressLine_2;
    address.city = incomingAddress.city;
    address.state = incomingAddress.state;
    address.postalCode = incomingAddress.postalCode;
    address.country = incomingAddress.country;
    address.landmark = incomingAddress.landmark;
    address.phoneNumber = incomingAddress.phoneNumber;
    address.fullName = incomingAddress.fullName;

    await address.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Address updated successfully", address));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message, null));
  }
};


const getAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json(new ApiResponse(404, "Address not found"));
    }
    if (address.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json(
          new ApiResponse(403, "You are not authorized to view this address")
        );
    }
    res.status(200).json(new ApiResponse(200, "Address fetched", address));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

export { addAddress, removeAddress, updateAddress, getAddress };

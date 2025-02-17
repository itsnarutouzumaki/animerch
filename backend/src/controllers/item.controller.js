import { Item } from "../models/item.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Seller } from "../models/Seller.model.js";

const createItem = async (req, res) => {
  const item = req.body;
  if (!item) {
    return res.status(400).send({ message: "Item cannot be empty" });
  }

  item.Seller = req.user?._id;

  if (!item.Name || !item.Price || !item.Seller || !item.Image || !item.Stock) {
    return res.status(400).send({ message: "Item cannot have empty fields" });
  }

  const sellerExists = await seller.findById(item.Seller);
  if (!sellerExists) {
    return res.status(404).send({ message: "Seller not found" });
  }

  try {
    const newItem = new Item(item);
    const createdItem = await newItem.save();

    return res
      .status(201)
      .json(new ApiResponse(201, "Item created successfully", createdItem));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res
      .status(200)
      .json(new ApiResponse(200, "Items retrieved successfully", items));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

const getItem = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json(new ApiResponse(404, "Item not found", null));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Item retrieved successfully", item));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

const updateItem = async (req, res) => {
  const id = req.params.id;
  const item = req.body;

  if (!item) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Item cannot be empty", null));
  }

  if (!item.Name || !item.Price || !item.Seller || !item.Image || !item.Stock) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Item cannot have empty fields", null));
  }

  const sellerExists = await seller.findById(item.Seller);
  if (!sellerExists) {
    return res.status(404).send({ message: "Seller not found" });
  }

  if (item.Seller !== req.user?._id) {
    return res
      .status(403)
      .json(
        new ApiResponse(403, "You are not authorized to update this item", null)
      );
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });
    if (!updatedItem) {
      return res.status(404).json(new ApiResponse(404, "Item not found", null));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Item updated successfully", updatedItem));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

const deleteItem = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json(new ApiResponse(404, "Item not found", null));
    }
    if (item.Seller !== req.user?._id) {
      return res
        .status(403)
        .json(
          new ApiResponse(
            403,
            "You are not authorized to delete this item",
            null
          )
        );
    }
    await Item.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Item deleted successfully", null));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

const getMyItem = async (req, res) => {
  try {
    const items = await Item.find({ Seller: req.user?._id });
    return res
      .status(200)
      .json(new ApiResponse(200, "Items retrieved successfully", items));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

const searchItem = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Query cannot be empty", null));
  }
  try {
    const items = await Item.find({ $text: { $search: query } });
    return res
      .status(200)
      .json(new ApiResponse(200, "Items retrieved successfully", items));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, error.message, null));
  }
};

export {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  getMyItem,
  searchItem,
};

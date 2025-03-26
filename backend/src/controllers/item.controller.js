import { Item } from "../models/Item.model.js";
import { Seller } from "../models/Seller.model.js";

const createItem = async (req, res) => {
  const item = req.body;
  if (!item) {
    return res.status(400).json({ statusCode: 400, data: null, message: "Item cannot be empty" });
  }

  item.Seller = req.user?._id;

  if (!item.Name || !item.Price || !item.Seller || !item.Image || !item.Stock) {
    return res.status(400).json({ statusCode: 400, data: null, message: "Item cannot have empty fields" });
  }

  const sellerExists = await Seller.findById(item.Seller);
  if (!sellerExists) {
    return res.status(404).json({ statusCode: 404, data: null, message: "Seller not found" });
  }

  try {
    const newItem = new Item(item);
    const createdItem = await newItem.save();

    return res.status(201).json({ statusCode: 201, data: createdItem, message: "Item created successfully" });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, data: null, message: error.message });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    return res.status(200).json({ statusCode: 200, data: items, message: "Items retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, data: null, message: error.message });
  }
};

const getItem = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ statusCode: 404, data: null, message: "Item not found" });
    }
    return res.status(200).json({ statusCode: 200, data: item, message: "Item retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, data: null, message: error.message });
  }
};

const updateItem = async (req, res) => {
  const id = req.params.id;
  const item = req.body;

  if (!item) {
    return res.status(400).json({ statusCode: 400, data: null, message: "Item cannot be empty" });
  }

  if (!item.Name || !item.Price || !item.Seller || !item.Image || !item.Stock) {
    return res.status(400).json({ statusCode: 400, data: null, message: "Item cannot have empty fields" });
  }

  const sellerExists = await Seller.findById(item.Seller);
  if (!sellerExists) {
    return res.status(404).json({ statusCode: 404, data: null, message: "Seller not found" });
  }

  if (item.Seller !== req.user?._id) {
    return res.status(403).json({ statusCode: 403, data: null, message: "You are not authorized to update this item" });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ statusCode: 404, data: null, message: "Item not found" });
    }
    return res.status(200).json({ statusCode: 200, data: updatedItem, message: "Item updated successfully" });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, data: null, message: error.message });
  }
};

const deleteItem = async (req, res) => {
  const id = req.params.id;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ statusCode: 404, data: null, message: "Item not found" });
    }
    if (item.Seller !== req.user?._id) {
      return res.status(403).json({ statusCode: 403, data: null, message: "You are not authorized to delete this item" });
    }
    await Item.findByIdAndDelete(id);
    return res.status(200).json({ statusCode: 200, data: null, message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, data: null, message: error.message });
  }
};

const getMyItem = async (req, res) => {
  try {
    const items = await Item.find({ Seller: req.user?._id });
    return res.status(200).json({ statusCode: 200, data: items, message: "Items retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, data: null, message: error.message });
  }
};

const searchItem = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ statusCode: 400, data: null, message: "Query cannot be empty" });
  }
  try {
    const items = await Item.find({ $text: { $search: query } });
    return res.status(200).json({ statusCode: 200, data: items, message: "Items retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ statusCode: 500, data: null, message: error.message });
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

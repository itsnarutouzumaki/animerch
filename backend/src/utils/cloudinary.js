import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUpload = async (localFilePath, resourceType = "image") => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
    });
    fs.unlinkSync(localFilePath);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.error("Upload failed:", error);
    return null;
  }
};

const deleteImage = async (imageURL) => {
  try {
    const result = await cloudinary.uploader.destroy(getPublicId(imageURL));
    console.log('Image deleted:', result);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

const getPublicId = (url) => {
  const parts = url.split('/upload/');
  if (parts.length < 2) return null;
  const publicIdWithExtension = parts[1].split('.')[0];
  return publicIdWithExtension.replace(/\/v\d+\//, '');
};



export { fileUpload, deleteImage };

import cloudinary from "cloudinary";

const useCloudinary = cloudinary.v2;

useCloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

export { useCloudinary };

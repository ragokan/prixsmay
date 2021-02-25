import cloudinary from "cloudinary"

const useCloudinary = cloudinary.v2

useCloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export { useCloudinary }

import cloudinary from "cloudinary"

const useCloudinary = cloudinary.v2

useCloudinary.config({
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
})

export { useCloudinary }

import { useCloudinary } from "./UseCloudinary"

export const UploadImage = async (path: string): Promise<string> => {
  const result = await useCloudinary.uploader.upload(path, {
    unique_filename: true,
    transformation: { height: 400 },
  })
  const imageUrl = result.secure_url

  return imageUrl
}

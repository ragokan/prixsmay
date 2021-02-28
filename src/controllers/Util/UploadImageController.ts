import { NextFunction } from "express"
import Async from "../../middleware/Async"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { FileType } from "../../types/FileType"
import { IUploadImageResponse } from "../../types/ResponseTypes"
import ErrorObject from "../../utils/ErrorObject"
import { InlineType } from "../../utils/InlineType"
import { useCloudinary } from "../../utils/UseCloudinary"
import fs from "fs"

interface ReqBody extends RequestContext {
  files: FileType
  body: {
    image: any
  }
}

export const UploadImageFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { image } = req.files
  if (!image || !image.type.includes("image"))
    return next(new ErrorObject("Please provide an image to update your profile!", 400))

  const result = await useCloudinary.uploader.upload(image.path, {
    unique_filename: true,
    transformation: { height: 400 },
  })
  const imageUrl = result.secure_url

  res.status(200).json(
    InlineType<IUploadImageResponse>({
      message: "Image is uploaded successfully!",
      success: true,
      imageUrl,
    })
  )
})

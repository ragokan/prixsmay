import { NextFunction } from "express"
import Async from "../../middleware/Async"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { FileType } from "../../types/FileType"
import { IUploadImageResponse } from "../../types/ResponseTypes"
import ErrorObject from "../../utils/ErrorObject"
import { InlineType } from "../../utils/InlineType"
import { useCloudinary } from "../../utils/UseCloudinary"

interface ReqBody extends RequestContext {
  files: FileType
}

export const UploadImageFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { image } = req.files
  if (!image || !image.type.includes("image")) return next(new ErrorObject("Please provide an image!", 400))

  const result = await useCloudinary.uploader.upload(image.path, {
    unique_filename: true,
    transformation: { height: 400 },
  })

  res.status(200).json(
    InlineType<IUploadImageResponse>({
      message: "User profile is updated successfully!",
      success: true,
      imageUrl: result.secure_url,
    })
  )
})

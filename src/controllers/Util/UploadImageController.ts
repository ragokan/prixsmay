import { NextFunction } from "express"
import Async from "../../middleware/Async"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { FileType } from "../../types/FileType"
import { IUploadImageResponse } from "../../types/ResponseTypes"
import ErrorObject from "../../utils/ErrorObject"
import { InlineType } from "../../utils/InlineType"
import { UploadImage } from "../../utils/UploadImage"

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

  const imageUrl = await UploadImage(image.path)

  res.status(200).json(
    InlineType<IUploadImageResponse>({
      message: "Image is uploaded successfully!",
      success: true,
      imageUrl,
    })
  )
})

import { NextFunction } from "express"
import { Community } from "../../database"
import Async from "../../middleware/Async"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { ICommunityResponse } from "../../types/ResponseTypes"
import ErrorObject from "../../utils/ErrorObject"
import { FindImageName } from "../../utils/FindImageNameRegex"
import { InlineType } from "../../utils/InlineType"
import { useCloudinary } from "../../utils/UseCloudinary"

interface ReqBody extends RequestContext {
  params: { id: string }
  files: {
    image: {
      fieldName: string
      originalFilename: string
      path: string
      headers: {
        "content-disposition": string
        "content-type": string
      }
      size: number
      name: string
      type: string
    }
  }
}

export const UploadCommunityPictureFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { image } = req.files
  if (!image || !image.type.includes("image"))
    return next(new ErrorObject("Please provide an image to update community picture!", 400))
  const id = parseInt(req.params.id)

  // Delete Old Picture
  const communityCheck = await Community.findUnique({ where: { id } })
  if (!communityCheck) return next(new ErrorObject("No community with this id is found!", 404))
  const communityCurrentImage = FindImageName(communityCheck.picture || "")
  if (communityCurrentImage) await useCloudinary.uploader.destroy(communityCurrentImage)

  const result = await useCloudinary.uploader.upload(image.path, {
    unique_filename: true,
    transformation: { height: 400 },
  })

  const community = await Community.update({ where: { id }, data: { picture: result.secure_url } })

  res.status(200).json(
    InlineType<ICommunityResponse>({
      message: "Community picture is updated successfully!",
      success: true,
      community,
    })
  )
})

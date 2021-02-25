import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import Async from "../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../utils/InlineType"
import { IUserResponse } from "../../types/ResponseTypes"
import { useCloudinary } from "../../utils/UseCloudinary"
import ErrorObject from "../../utils/ErrorObject"
import { User } from "../../database"
import { omit } from "lodash"
import { FindImageName } from "../../utils/FindImageNameRegex"
import { defaultUserPictureConstants } from "../../constants/CloudinaryConstants"
import { userIncludeOptions } from "./Utils/UserIncludeOptions"
import { FileType } from "../../types/FileType"

interface ReqBody extends RequestContext {
  files: FileType
}

export const AddProfileFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { image } = req.files
  if (!image || !image.type.includes("image"))
    return next(new ErrorObject("Please provide an image to update your profile!", 400))

  // Delete Old Profile Picture
  const userCheck = await User.findUnique({ where: { id: req.session.userId }, include: { profile: true } })
  const userCurrentImage = FindImageName(userCheck!.profile!.picture)
  if (userCurrentImage && !defaultUserPictureConstants.includes(userCurrentImage))
    await useCloudinary.uploader.destroy(userCurrentImage)

  const result = await useCloudinary.uploader.upload(image.path, {
    unique_filename: true,
    transformation: { height: 400 },
  })

  const user = await User.update({
    where: { id: req.session.userId },
    include: userIncludeOptions,
    data: { profile: { update: { picture: result.secure_url } } },
  })
  const filteredUser = omit(user, ["password", "isActivated"])

  res.status(200).json(
    InlineType<IUserResponse>({
      message: "User profile is updated successfully!",
      success: true,
      user: filteredUser,
    })
  )
})

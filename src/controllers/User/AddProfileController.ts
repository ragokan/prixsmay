import { NextFunction } from "express";
import { omit } from "lodash";
import { defaultUserPictureConstants } from "../../constants/CloudinaryConstants";
import { User } from "../../database";
import Async from "../../middleware/Async";
import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import { FileType } from "../../types/FileType";
import { IUserResponse } from "../../types/ResponseTypes";
import ErrorObject from "../../utils/ErrorObject";
import { FindImageName } from "../../utils/FindImageNameRegex";
import { InlineType } from "../../utils/InlineType";
import { UploadImage } from "../../utils/UploadImage";
import { useCloudinary } from "../../utils/UseCloudinary";
import { userIncludeOptions } from "./Utils/UserIncludeOptions";

interface ReqBody extends RequestContext {
  files: FileType;
  body: {
    pictureUrl?: string;
  };
}

export const AddProfileFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const image = req.files?.image || undefined;

  let user;

  if (req.body.pictureUrl) {
    user = await User.update({
      where: { id: req.session.userId },
      include: userIncludeOptions,
      data: { profile: { update: { picture: req.body.pictureUrl } } },
    });
  } else if (image) {
    if (!image.type.includes("image"))
      return next(new ErrorObject("Please provide an image to update your profile!", 400));
    // Delete Old Profile Picture
    const userCheck = await User.findUnique({ where: { id: req.session.userId }, include: { profile: true } });
    const userCurrentImage = FindImageName(userCheck!.profile!.picture);
    if (userCurrentImage && !defaultUserPictureConstants.includes(userCurrentImage))
      await useCloudinary.uploader.destroy(userCurrentImage);

    const picture = await UploadImage(image.path);

    user = await User.update({
      where: { id: req.session.userId },
      include: userIncludeOptions,
      data: { profile: { update: { picture } } },
    });
  } else return next(new ErrorObject("Please provide an image to update your profile!", 400));

  const filteredUser = omit(user, ["password", "isActivated"]);

  res.status(200).json(
    InlineType<IUserResponse>({
      message: "User profile is updated successfully!",
      success: true,
      user: filteredUser,
    })
  );
});

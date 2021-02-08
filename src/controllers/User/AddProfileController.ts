import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IUserResponse } from "../../types/ResponseTypes";
import { useCloudinary } from "../../utils/UseCloudinary";
import ErrorObject from "../../utils/ErrorObject";
import { User } from "../../database";
import { omit } from "lodash";

interface ReqBody extends RequestContext {
  files: {
    image: {
      fieldName: string;
      originalFilename: string;
      path: string;
      headers: {
        "content-disposition": string;
        "content-type": string;
      };
      size: number;
      name: string;
      type: string;
    };
  };
}

export const AddProfileFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { image } = req.files;
  if (!image || !image.type.includes("image"))
    return next(new ErrorObject("Please provide an image to update your profile!", 400));

  // Delete Old Profile Picture
  const userCheck = await User.findUnique({ where: { id: req.session.userId } });
  const url = userCheck!.profile;
  const userCurrentImage = url.match(/upload\/(?:v\d+\/)?([^\.]+)/)?.find((_, i) => i === 1);
  const defaultPic = "user_kkhvsb";
  if (userCurrentImage && userCurrentImage !== defaultPic) await useCloudinary.uploader.destroy(userCurrentImage);

  const result = await useCloudinary.uploader.upload(image.path, {
    unique_filename: true,
    transformation: { height: 400 },
  });

  const user = await User.update({
    where: { id: req.session.userId },
    include: { posts: true },
    data: { profile: result.secure_url },
  });
  const filteredUser = omit(user, ["password", "isActivated"]);

  res.status(200).json(
    InlineType<IUserResponse>({
      message: "User profile is updated successfully!",
      success: true,
      user: filteredUser,
    })
  );
});

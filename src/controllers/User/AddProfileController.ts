import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IUserResponse } from "../../types/ResponseTypes";
import { useCloudinary } from "../../utils/UseCloudinary";
import ErrorObject from "../../utils/ErrorObject";
// import { omit } from "lodash";
// import { User } from "../../database";

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
  //   const user = await User.findUnique({ where: { id: req.session.userId }, include: { posts: true } });
  //   const filteredUser = omit(user, ["password", "isActivated"]);
  const { image } = req.files;
  if (!image || !image.type.includes("image"))
    return next(new ErrorObject("Please provide an image to update your profile!", 400));
  const result = await useCloudinary.uploader.upload(image.path, {
    unique_filename: true,
    transformation: { height: 400 },
  });
  console.log(result.secure_url);

  res.status(200).json(
    InlineType<IUserResponse>({
      message: "User profile is updated successfully!",
      success: true,
      // user: filteredUser
    })
  );
});

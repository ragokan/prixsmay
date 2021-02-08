import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IUserResponse } from "../../types/ResponseTypes";
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

  res.status(200).json(
    InlineType<IUserResponse>({
      message: "User profile is updated successfully!",
      success: true,
      // user: filteredUser
    })
  );
});

import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IUserResponse } from "../../types/ResponseTypes";
import { omit } from "lodash";
import { User } from "../../database";

export const GetUserFunction = Async(async (req: RequestContext, res: ResponseContext, next: NextFunction) => {
  const user = await User.findUnique({ where: { id: req.session.userId }, include: { posts: true } });
  const filteredUser = omit(user, ["password", "isActivated"]);

  res.status(200).json(
    InlineType<IUserResponse>({ message: "User info is received successfully!", success: true, user: filteredUser })
  );
});

import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IUserResponse } from "../../types/ResponseType";
import { omit } from "lodash";

export const GetUserFunction = Async(async (req: RequestContext, res: ResponseContext, next: NextFunction) => {
  const filteredUser = omit(req.user, ["password", "isActivated"]);

  res.status(200).json(
    InlineType<IUserResponse>({ message: "User info is received successfully!", success: true, user: filteredUser })
  );
});

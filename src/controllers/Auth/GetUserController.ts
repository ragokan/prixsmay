import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import ErrorObject from "../../utils/ErrorObject";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { User } from "../../database";
import { InlineType } from "../../utils/InlineType";
import { ResponseJson } from "../../types/ResponseJsonType";
import _ from "lodash";

export const GetUserFunction = Async(async (req: RequestContext, res: ResponseContext, next: NextFunction) => {
  const user = await User.findUnique({ where: { id: req.session.userId } });
  if (!user) return next(new ErrorObject("No user is found!", 400));

  const filteredUser = _.omit(user, ["password", "isActivated"]);

  res.status(201).json(
    InlineType<ResponseJson>({ message: "User info is received successfully!", success: true, user: filteredUser })
  );
});

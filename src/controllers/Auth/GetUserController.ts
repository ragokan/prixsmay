import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IResponse } from "../../types/IResponse";
import _ from "lodash";

export const GetUserFunction = Async(async (req: RequestContext, res: ResponseContext, next: NextFunction) => {
  const filteredUser = _.omit(req.user, ["password", "isActivated"]);

  res.status(200).json(
    InlineType<IResponse>({ message: "User info is received successfully!", success: true, user: filteredUser })
  );
});

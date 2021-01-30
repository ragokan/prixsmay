import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import ErrorObject from "../../utils/ErrorObject";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IResponse } from "../../types/IResponse";

export const LogoutFunction = Async(async (req: RequestContext, res: ResponseContext, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) return next(new ErrorObject(`Error: ${err}`, 400));
  });

  res
    .status(201)
    .clearCookie("qid")
    .json(
      InlineType<IResponse>({ message: "User is logged out successfully!", success: true })
    );
});

import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";

export const CheckAuthFunction = Async(async (req: RequestContext, res: ResponseContext, _: NextFunction) =>
  res.status(200).json({
    message: "User info is received successfully!",
    success: true,
    isLogged: req.session.userId ? true : false,
  })
);

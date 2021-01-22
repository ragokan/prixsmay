import { NextFunction } from "express";
import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { RegisterBodyType, RegisterValidation } from "../../validation/RegisterValidation";
import ErrorObject from "../../utils/ErrorObject";

interface ReqBody extends RequestContext {
  body: RegisterBodyType;
}

export const RegisterFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = RegisterValidation(req.body);
  if (error) return next(new ErrorObject(error.details[0].message, 400));
});

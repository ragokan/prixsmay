import { RegisterBodyType, RegisterValidation } from "../../validation/RegisterValidation";
import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import { CreateConfirmationUrl } from "../../utils/CreateMailUrl";
import ErrorObject from "../../utils/ErrorObject";
import { SendEmail } from "../../utils/SendMail";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { User } from "../../database";
import bcrypt from "bcryptjs";

interface ReqBody extends RequestContext {
  body: RegisterBodyType;
}

export const RegisterFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = RegisterValidation(req.body);
  if (error) return next(new ErrorObject(error.details[0].message, 400));

  const userCheck = await User.findUnique({ where: { email: req.body.email } });
  if (userCheck) return next(new ErrorObject("User already exists!", 400));

  const password = await bcrypt.hash(req.body.password, 11);

  const user = await User.create({ data: { ...req.body, password } });

  await SendEmail(user.email, await CreateConfirmationUrl(user.id));
});

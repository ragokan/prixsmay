import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import ErrorObject from "../../utils/ErrorObject";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { User } from "../../database";
import bcrypt from "bcryptjs";
import { InlineType } from "../../utils/InlineType";
import { ResponseJson } from "../../types/ResponseJsonType";
import { LoginBodyType, LoginValidation } from "../../validation/LoginValidation";
import _ from "lodash";

interface ReqBody extends RequestContext {
  body: LoginBodyType;
}

export const LoginFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = LoginValidation(req.body);
  if (error) return next(new ErrorObject(error.details[0].message, 400));
  const { email, password } = req.body;

  const user = await User.findUnique({ where: { email } });
  if (!user) return next(new ErrorObject("Invalid credentials!", 400));

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return next(new ErrorObject("Invalid credentials!", 400));

  if (!user.isActivated) return next(new ErrorObject("Please activate your email!", 400));

  req.session.userId = user.id;
  const filteredUser = _.omit(user, ["password", "isActivated"]);

  res.status(201).json(
    InlineType<ResponseJson>({ message: "User is logged in successfully!", success: true, user: filteredUser })
  );
});

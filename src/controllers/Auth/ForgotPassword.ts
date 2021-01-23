import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import ErrorObject from "../../utils/ErrorObject";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { User } from "../../database";
import bcrypt from "bcryptjs";
import { InlineType } from "../../utils/InlineType";
import { ResponseJson } from "../../types/ResponseJsonType";
import {
  PasswordResetBodyType,
  PasswordResetValidation,
  PasswordResetMailBodyType,
  PasswordResetMailValidation,
} from "../../validation/PasswordResetValidation";
import { CreatePasswordResetUrl } from "../../utils/CreateMailUrl";
import { SendEmail } from "../../utils/SendMail";
import { redis } from "../../redis";
import { forgotPasswordConstant } from "../../constants/RedisConstants";

interface ReqBodyMail extends RequestContext {
  body: PasswordResetMailBodyType;
}

export const SendPasswordResetMailFunction = Async(
  async (req: ReqBodyMail, res: ResponseContext, next: NextFunction) => {
    const { error } = PasswordResetMailValidation(req.body);
    if (error) return next(new ErrorObject(error.details[0].message, 400));
    const { email } = req.body;
    const user = await User.findUnique({ where: { email } });

    if (user)
      await SendEmail(
        email,
        await CreatePasswordResetUrl(user.id),
        "Reset Password",
        "Please click here to reset your password."
      );

    res.status(201).json(
      InlineType<ResponseJson>({ message: "Mail is sent successfully!", success: true })
    );
  }
);

interface ReqBodyPassword extends RequestContext {
  body: PasswordResetBodyType;
}

export const ResetPasswordFunction = Async(async (req: ReqBodyPassword, res: ResponseContext, next: NextFunction) => {
  const { error } = PasswordResetValidation(req.body);
  if (error) return next(new ErrorObject(error.details[0].message, 400));

  const { password, token } = req.body;

  const userId = await redis.get(forgotPasswordConstant + token);
  if (!userId) return next(new ErrorObject("The token is not valid anymore!", 400));

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.update({ where: { id: parseInt(userId) }, data: { password: hashedPassword } });

  req.session.userId = user.id;

  redis.del(forgotPasswordConstant + token);

  res.status(201).json(
    InlineType<ResponseJson>({ message: "Password is resetted successfully!", success: true })
  );
});

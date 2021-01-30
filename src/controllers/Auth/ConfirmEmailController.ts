import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import ErrorObject from "../../utils/ErrorObject";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { User } from "../../database";
import { InlineType } from "../../utils/InlineType";
import { IResponse } from "../../types/ResponseType";
import { redis } from "../../redis";
import { confirmMailConstant } from "../../constants/RedisConstants";

interface ReqBody extends RequestContext {
  body: {
    token: string;
  };
}

export const ConfirmEmailFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { token } = req.body;
  if (!token) return next(new ErrorObject("You should provide a confirm token!", 400));

  const id = await redis.get(confirmMailConstant + token);
  if (!id) return next(new ErrorObject("No id is found!", 404));

  const user = await User.update({ where: { id: parseInt(id) }, data: { isActivated: true } });
  if (!user) return next(new ErrorObject("User doesnt exists!", 404));

  req.session.userId = user.id;

  redis.del(confirmMailConstant + token);

  res.status(200).json(
    InlineType<IResponse>({ message: "User is confirmed successfully!", success: true })
  );
});

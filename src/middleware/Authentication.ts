import Async from "./Async";
import ErrorObject from "../utils/ErrorObject";
import { NextFunction } from "express";
import { RequestContext, ResponseContext } from "../types/ExpressTypes";
import { UserRoleType } from "../types/UserType";

const noPermissionError = (next: NextFunction) =>
  next(new ErrorObject("You don't have permission to do this action!", 401));

const LoginRequired = Async(async (req: RequestContext, _: ResponseContext, next: NextFunction) => {
  const userId: string = req.session.userId;
  if (!userId) return noPermissionError(next);

  req.user.id = parseInt(userId);

  next();
});

const AdminRequired = Async(async (req: RequestContext, _: ResponseContext, next: NextFunction) => {
  if (req.user && req.user.type === UserRoleType.admin) next();
  else return noPermissionError(next);
});

export { LoginRequired, AdminRequired };

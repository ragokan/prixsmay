import Async from "./Async";
import ErrorObject from "../utils/ErrorObject";
import { NextFunction } from "express";
import { RequestContext, ResponseContext } from "../types/ExpressTypes";
import { EUserRole } from "../types/IUser";
import { User } from "../database";

const noPermissionError = (next: NextFunction) =>
  next(new ErrorObject("You don't have permission to do this action!", 401));

const LoginRequired = Async(async (req: RequestContext, res: ResponseContext, next: NextFunction) => {
  if (!req.session.userId) return noPermissionError(next);

  // Add user here
  const user = await User.findUnique({ where: { id: req.session.userId } });
  if (!user) return noPermissionError(next);
  req.user = { ...user, type: EUserRole[user.type] };

  next();
});

const AdminRequired = Async(async (req: RequestContext, _: ResponseContext, next: NextFunction) => {
  if (req.user && req.user.type === EUserRole.admin) next();
  else return noPermissionError(next);
});

export { LoginRequired, AdminRequired };

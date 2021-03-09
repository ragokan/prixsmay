import Async from "./Async"
import ErrorObject from "../utils/ErrorObject"
import { NextFunction } from "express"
import { RequestContext, ResponseContext } from "../types/ExpressTypes"
import { IUser, UserRole } from "../types/UserType"
import { User } from "../database"

const noPermissionError = (next: NextFunction) => next(new ErrorObject("You have to login to do this action!", 401))

const LoginRequired = Async(async (req: RequestContext, res: ResponseContext, next: NextFunction) => {
  if (!req.session.userId) return noPermissionError(next)

  // Add user here
  const user = await User.findUnique({ where: { id: req.session.userId }, include: { profile: true } })
  if (!user) return noPermissionError(next)
  req.user = { ...user, type: UserRole[user.type], posts: [] }

  next()
})

const AdminRequired = Async(async (req: RequestContext, _: ResponseContext, next: NextFunction) => {
  if (req.user && req.user.type === UserRole.admin) next()
  else return noPermissionError(next)
})

export { LoginRequired, AdminRequired }

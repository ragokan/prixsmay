import { NextFunction } from "express"
import { omit } from "lodash"
import { User } from "../../database"
import Async from "../../middleware/Async"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { IUserResponse } from "../../types/ResponseTypes"
import ErrorObject from "../../utils/ErrorObject"
import { InlineType } from "../../utils/InlineType"
import { userIncludeOptions } from "../User/Utils/UserIncludeOptions"

interface ReqBody extends RequestContext {
  params: { username: string }
}

export const GetPublicProfileFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  console.log(req.params)
  const user = await User.findUnique({ where: { username: req.params.username }, include: userIncludeOptions })
  if (!user) return next(new ErrorObject("No profile is found with this username!", 404))

  const filteredUser = omit(user, ["password", "isActivated", "email", "isActivated", "type"])

  res.status(200).json(
    InlineType<IUserResponse>({ message: "Profile info is received successfully!", success: true, user: filteredUser })
  )
})

import { NextFunction } from "express"
import { omit } from "lodash"
import { User } from "../../database"
import Async from "../../middleware/Async"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { IUserResponse } from "../../types/ResponseTypes"
import { InlineType } from "../../utils/InlineType"
import { userIncludeOptions } from "../User/Utils/UserIncludeOptions"

interface ReqBody extends RequestContext {
  params: { id: string }
}

export const GetPublicProfileFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const user = await User.findUnique({ where: { id: parseInt(req.params.id) }, include: userIncludeOptions })
  const filteredUser = omit(user, ["password", "isActivated", "email", "isActivated", "type"])

  res.status(200).json(
    InlineType<IUserResponse>({ message: "Profile info is received successfully!", success: true, user: filteredUser })
  )
})

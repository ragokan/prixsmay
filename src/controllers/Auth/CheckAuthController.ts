import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import Async from "../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../utils/InlineType"
import { ICheckAuthResponse } from "../../types/ResponseTypes"

export const CheckAuthFunction = Async(async (req: RequestContext, res: ResponseContext, _: NextFunction) =>
  res.status(200).json(
    InlineType<ICheckAuthResponse>({
      message: "Auth info is received successfully!",
      success: true,
      isLogged: req.session.userId ? true : false,
    })
  )
)

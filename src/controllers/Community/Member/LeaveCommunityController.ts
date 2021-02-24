import { NextFunction } from "express"
import { Community } from "../../../database"
import Async from "../../../middleware/Async"
import { RequestContext, ResponseContext } from "../../../types/ExpressTypes"
import { ICommunityResponse } from "../../../types/ResponseTypes"
import ErrorObject from "../../../utils/ErrorObject"
import { InlineType } from "../../../utils/InlineType"

interface ReqBody extends RequestContext {
  params: {
    id: string
  }
}

export const LeaveCommunityFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const id = parseInt(req.params.id)
  if (!id) return next(new ErrorObject("You should provide a community id!", 400))

  const communityCheck = await Community.findUnique({ where: { id }, include: { members: { select: { id: true } } } })
  if (!communityCheck) return next(new ErrorObject("The community with that id is not found!", 404))
  if (communityCheck.members.findIndex((user) => user.id === req.user.id) === -1)
    return next(new ErrorObject("You are not a member of this community!", 400))

  await Community.update({
    where: { id },
    data: { members: { disconnect: { id: req.user.id } } },
  })

  res.status(201).json(
    InlineType<ICommunityResponse>({ message: "You leaved the community successfully!", success: true })
  )
})

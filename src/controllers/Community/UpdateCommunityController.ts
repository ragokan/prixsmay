import { NextFunction } from "express"
import { Community } from "../../database"
import Async from "../../middleware/Async"
import { ICommunity } from "../../types/CommunityType"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { ICommunityResponse } from "../../types/ResponseTypes"
import ErrorObject from "../../utils/ErrorObject"
import { InlineType } from "../../utils/InlineType"
import { CommunityBodyType, CommunityValidation } from "../../validation/CommunityValidation"
import { communityIncludeOptions } from "./Utils/CommunityIncludeOptions"

interface ReqBody extends RequestContext {
  params: { id: string }
  body: CommunityBodyType
}

export const UpdateCommunityFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = CommunityValidation(req.body)
  if (error) return next(new ErrorObject(error.details[0].message, 400))
  const id = parseInt(req.params.id)

  const communityCheck = await Community.findUnique({ where: { id } })
  if (!communityCheck) return next(new ErrorObject("No community is found with this id!", 404))

  const community: ICommunity = await Community.update({
    where: { id },
    data: { ...req.body, name: req.body.name.trim().toLowerCase() },
    include: communityIncludeOptions(),
  })

  res.status(200).json(
    InlineType<ICommunityResponse>({ message: "Community is updated successfully!", success: true, community })
  )
})

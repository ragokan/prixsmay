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
  body: CommunityBodyType
}

export const CreateCommunityFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = CommunityValidation(req.body)
  if (error) return next(new ErrorObject(error.details[0].message, 400))

  const communityCheck = await Community.findFirst({ where: { name: req.body.name.trim().toLowerCase() } })
  if (communityCheck) return next(new ErrorObject("A community with this name already exists!", 400))

  const community: ICommunity = await Community.create({
    data: { ...req.body, name: req.body.name.trim().toLowerCase() },
    include: communityIncludeOptions(),
  })

  res.status(201).json(
    InlineType<ICommunityResponse>({ message: "Community is created successfully!", success: true, community })
  )
})

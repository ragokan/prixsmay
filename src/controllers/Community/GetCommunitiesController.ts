import { NextFunction } from "express"
import { Community } from "../../database"
import Async from "../../middleware/Async"
import { ICommunity } from "../../types/CommunityType"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { ICommunityResponse } from "../../types/ResponseTypes"
import { InlineType } from "../../utils/InlineType"
import { communityIncludeOptions } from "./Utils/CommunityIncludeOptions"

export const GetCommunitiesFunction = Async(async (req: RequestContext, res: ResponseContext, next: NextFunction) => {
  const communities: ICommunity[] = await Community.findMany({ include: communityIncludeOptions(0) })

  res.status(201).json(
    InlineType<ICommunityResponse>({ message: "Communities are received successfully!", success: true, communities })
  )
})

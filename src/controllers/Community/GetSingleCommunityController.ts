import { NextFunction } from "express"
import { Community } from "../../database"
import Async from "../../middleware/Async"
import { ICommunity } from "../../types/CommunityType"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { ICommunityResponse } from "../../types/ResponseTypes"
import ErrorObject from "../../utils/ErrorObject"
import { InlineType } from "../../utils/InlineType"
import { communityIncludeOptions } from "./Utils/CommunityIncludeOptions"

interface ReqBody extends RequestContext {
  params: {
    id: string
  }
  query: {
    limit?: string
    page?: string
  }
}

export const GetSingleCommunityFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const community: ICommunity | null = await Community.findUnique({
    where: { id: parseInt(req.params.id) },
    include: communityIncludeOptions(
      req.query.limit ? parseInt(req.query.limit) : 10,
      req.query.page ? parseInt(req.query.page) : 1
    ),
  })
  if (!community) return next(new ErrorObject("No community with this id is found!", 404))

  res.status(201).json(
    InlineType<ICommunityResponse>({ message: "Community is received successfully!", success: true, community })
  )
})

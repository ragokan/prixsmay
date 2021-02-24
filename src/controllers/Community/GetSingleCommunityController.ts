import { NextFunction } from "express"
import { Community } from "../../database"
import Async from "../../middleware/Async"
import { ICommunity } from "../../types/CommunityType"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { IPost } from "../../types/PostType"
import { ICommunityResponse } from "../../types/ResponseTypes"
import ErrorObject from "../../utils/ErrorObject"
import { InlineType } from "../../utils/InlineType"
import { PaginatePosts } from "../Post/Utils/PostPaginateFunction"
import { communityIncludeOptions } from "./Utils/CommunityIncludeOptions"

interface ReqBody extends RequestContext {
  params: {
    id: string
  }
  query: {
    limit?: string
    page?: string
    orderBy?: "newest" | "highest"
  }
}

export const GetSingleCommunityFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  let community: ICommunity | null
  const orderBy = req.query.orderBy || "newest"
  const limit = req.query.limit && parseInt(req.query.limit)
  const page = req.query.page && parseInt(req.query.page)

  if (orderBy === "newest") {
    community = await Community.findUnique({
      where: { id: parseInt(req.params.id) },
      include: communityIncludeOptions(limit ? limit : 10, page ? page : 1),
    })
  } else {
    community = await Community.findUnique({
      where: { id: parseInt(req.params.id) },
      include: communityIncludeOptions(999999),
    })

    community = {
      ...(community as any),
      posts: PaginatePosts<IPost>(community?.posts!),
    }
  }

  if (!community) return next(new ErrorObject("No community with this id is found!", 404))

  res.status(201).json(
    InlineType<ICommunityResponse>({ message: "Community is received successfully!", success: true, community })
  )
})

import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import Async from "../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../utils/InlineType"
import { IPostResponse } from "../../types/ResponseTypes"
import { Post } from "../../database"
import { postIncludeOptions } from "./Utils/PostIncludeOptions"

interface ReqBody extends RequestContext {
  query: {
    limit?: string
    page?: string
  }
}

export const GetPostsFunction = Async(async (req: ReqBody, res: ResponseContext, _: NextFunction) => {
  const limit = req.query.limit && parseInt(req.query.limit)
  const page = req.query.page && parseInt(req.query.page)

  const posts = await Post.findMany({
    include: postIncludeOptions,
    orderBy: { id: "desc" },
    skip: page ? (page - 1) * 10 : 0,
    take: limit || 10,
  })

  res.status(200).json(
    InlineType<IPostResponse>({ message: "Posts are received successfully!", success: true, posts })
  )
})

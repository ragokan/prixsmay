import { NextFunction } from "express"
import { Post } from "../../database"
import Async from "../../middleware/Async"
import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import { IPost } from "../../types/PostType"
import { IPostResponse } from "../../types/ResponseTypes"
import { InlineType } from "../../utils/InlineType"
import { postIncludeOptions } from "./Utils/PostIncludeOptions"
import { PaginatePosts } from "./Utils/PostPaginateFunction"

interface ReqBody extends RequestContext {
  query: {
    limit?: string
    page?: string
    orderBy?: "newest" | "highest"
  }
}

export const GetPostsFunction = Async(async (req: ReqBody, res: ResponseContext, _: NextFunction) => {
  const limit = req.query.limit && parseInt(req.query.limit)
  const page = req.query.page && parseInt(req.query.page)
  const orderBy = req.query.orderBy || "newest"
  let posts: IPost[] = []

  if (orderBy === "newest") {
    posts = await Post.findMany({
      include: postIncludeOptions,
      orderBy: { createdAt: "desc" },
      skip: page ? (page - 1) * 10 : 0,
      take: limit || 10,
    })
  } else {
    const allPosts = await Post.findMany({
      include: postIncludeOptions,
    })
    posts = PaginatePosts<IPost>(allPosts)
  }

  res.status(200).json(
    InlineType<IPostResponse>({ message: "Posts are received successfully!", success: true, posts })
  )
})

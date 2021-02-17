import { RequestContext, ResponseContext } from "../../../types/ExpressTypes"
import Async from "../../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../../utils/InlineType"
import { IPostResponse } from "../../../types/ResponseTypes"
import { Comment, Post } from "../../../database"
import ErrorObject from "../../../utils/ErrorObject"
import { postIncludeOptions } from "../Utils/PostIncludeOptions"

interface ReqBody extends RequestContext {
  params: { id: string }
}

export const DeleteCommentFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const id = parseInt(req.params.id)

  const commentCheck = await Comment.findUnique({ where: { id } })
  if (!commentCheck) return next(new ErrorObject("No post is found with this id!", 404))

  const postCheck = await Post.findUnique({ where: { id: commentCheck.postId } })
  if (!postCheck) return next(new ErrorObject("No post is found with this id!", 404))

  const post = await Post.update({
    where: { id: commentCheck.postId },
    data: { comments: { delete: { id } } },
    include: postIncludeOptions,
  })

  res.status(201).json(
    InlineType<IPostResponse>({ message: "Comment is delete successfully!", success: true, post })
  )
})

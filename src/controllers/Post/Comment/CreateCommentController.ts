import { RequestContext, ResponseContext } from "../../../types/ExpressTypes"
import Async from "../../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../../utils/InlineType"
import { ICommentResponse } from "../../../types/ResponseTypes"
import { Comment, Post } from "../../../database"
import ErrorObject from "../../../utils/ErrorObject"
import { CommentBodyType, CommentValidation } from "../../../validation/CommentValidation"
import { IComment } from "../../../types/CommentType"
import { commentIncludeOptions } from "./Utils/CommentIncludeOptions"

interface ReqBody extends RequestContext {
  body: CommentBodyType
}

export const CreateCommentFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = CommentValidation(req.body)
  if (error) return next(new ErrorObject(error.details[0].message, 400))

  const postCheck = await Post.findUnique({ where: { id: req.body.postId } })
  if (!postCheck) return next(new ErrorObject("No post is found with this id!", 404))

  const comment: IComment = await Comment.create({
    data: { text: req.body.text, userId: req.user.id, postId: req.body.postId },
    include: commentIncludeOptions,
  })

  res.status(201).json(
    InlineType<ICommentResponse>({ message: "Comment is created successfully!", success: true, comment })
  )
})

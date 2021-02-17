import { RequestContext, ResponseContext } from "../../../types/ExpressTypes"
import Async from "../../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../../utils/InlineType"
import { ICommentResponse } from "../../../types/ResponseTypes"
import { Comment, Post } from "../../../database"
import ErrorObject from "../../../utils/ErrorObject"
import { CommentUpdateValidation, CommentUpdateBodyType } from "../../../validation/CommentUpdateValidation"
import { IComment } from "../../../types/CommentType"
import { commentIncludeOptions } from "./Utils/CommentIncludeOptions"

interface ReqBody extends RequestContext {
  body: CommentUpdateBodyType
  params: { id: string }
}

export const UpdateCommentFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = CommentUpdateValidation(req.body)
  if (error) return next(new ErrorObject(error.details[0].message, 400))
  const id = parseInt(req.params.id)

  const commentCheck = await Comment.findUnique({ where: { id } })
  if (!commentCheck) return next(new ErrorObject("No comment is found with this id!", 404))

  const postCheck = await Post.findUnique({ where: { id: commentCheck.postId } })
  if (!postCheck) return next(new ErrorObject("No post is found with this id!", 404))

  if (commentCheck.userId !== req.user.id) return next(new ErrorObject("You can't update others' comments!", 401))

  const comment: IComment = await Comment.update({
    where: { id },
    data: { ...req.body },
    include: commentIncludeOptions,
  })

  res.status(201).json(
    InlineType<ICommentResponse>({ message: "Comment is updated successfully!", success: true, comment })
  )
})

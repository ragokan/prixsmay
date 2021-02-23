import { NextFunction } from "express"
import { Comment } from "../../../database"
import Async from "../../../middleware/Async"
import { IComment } from "../../../types/CommentType"
import { RequestContext, ResponseContext } from "../../../types/ExpressTypes"
import { ICommentResponse } from "../../../types/ResponseTypes"
import ErrorObject from "../../../utils/ErrorObject"
import { InlineType } from "../../../utils/InlineType"
import { CommentUpdateBodyType, CommentUpdateValidation } from "../../../validation/CommentUpdateValidation"
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

  if (commentCheck.userId !== req.user.id) return next(new ErrorObject("You can't update others' comments!", 401))

  const comment: IComment = await Comment.update({
    where: { id },
    data: { ...req.body },
    include: commentIncludeOptions,
  })

  res.status(200).json(
    InlineType<ICommentResponse>({ message: "Comment is updated successfully!", success: true, comment })
  )
})

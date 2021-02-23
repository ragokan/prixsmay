import { NextFunction } from "express"
import { Comment, CommentVote } from "../../../database"
import Async from "../../../middleware/Async"
import { RequestContext, ResponseContext } from "../../../types/ExpressTypes"
import { ICommentResponse } from "../../../types/ResponseTypes"
import ErrorObject from "../../../utils/ErrorObject"
import { InlineType } from "../../../utils/InlineType"

interface ReqBody extends RequestContext {
  params: { id: string }
}

export const DeleteCommentFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const id = parseInt(req.params.id)

  const commentCheck = await Comment.findUnique({ where: { id } })
  if (!commentCheck) return next(new ErrorObject("No comment is found with this id!", 404))

  if (commentCheck.userId !== req.user.id) return next(new ErrorObject("You can't delete others' comments!", 401))

  // CASCADE
  await CommentVote.deleteMany({ where: { commentId: id } })
  await Comment.delete({ where: { id } })

  res.status(200).json(
    InlineType<ICommentResponse>({ message: "Comment is deleted successfully!", success: true })
  )
})

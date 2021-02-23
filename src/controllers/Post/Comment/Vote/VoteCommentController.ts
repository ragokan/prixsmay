import { NextFunction } from "express"
import { Comment } from "../../../../database"
import Async from "../../../../middleware/Async"
import { IComment } from "../../../../types/CommentType"
import { RequestContext, ResponseContext } from "../../../../types/ExpressTypes"
import { IVoteResponse } from "../../../../types/ResponseTypes"
import ErrorObject from "../../../../utils/ErrorObject"
import { InlineType } from "../../../../utils/InlineType"
import { CommentVoteBodyType, CommentVoteValidation } from "../../../../validation/CommentVoteValidation"
import { commentIncludeOptions } from "../Utils/CommentIncludeOptions"

interface ReqBody extends RequestContext {
  body: CommentVoteBodyType
}

export const VoteCommentFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = CommentVoteValidation(req.body)
  if (error) return next(new ErrorObject(error.details[0].message, 400))
  const id = req.body.commentId

  let comment: IComment | null = await Comment.findUnique({ where: { id }, include: commentIncludeOptions })
  if (!comment) return next(new ErrorObject("No comment is found with this id!", 404))

  const isVoted = comment.votes!.find((vote) => vote.userId === req.user.id)
  if (isVoted) {
    const voteType = isVoted.type

    if (voteType === req.body.type) {
      comment = await Comment.update({
        where: { id },
        data: { votes: { delete: { id: isVoted.id } } },
        include: commentIncludeOptions,
      })
    } else {
      comment = await Comment.update({
        where: { id },
        data: { votes: { update: { where: { id: isVoted.id }, data: { type: req.body.type } } } },
        include: commentIncludeOptions,
      })
    }
  } else {
    comment = await Comment.update({
      where: { id },
      data: { votes: { create: { user: { connect: { id: req.user.id } }, type: req.body.type } } },
      include: commentIncludeOptions,
    })
  }

  res.status(200).json(
    InlineType<IVoteResponse>({ message: "Comment is voted successfully!", success: true, votes: comment.votes })
  )
})

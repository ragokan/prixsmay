import { RequestContext, ResponseContext } from "../../../types/ExpressTypes"
import Async from "../../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../../utils/InlineType"
import { IVoteResponse } from "../../../types/ResponseTypes"
import { Post } from "../../../database"
import ErrorObject from "../../../utils/ErrorObject"
import { VoteBodyType, VoteValidation } from "../../../validation/VoteValidation"
import { IPost } from "../../../types/PostType"
import { postIncludeOptions } from "../Utils/PostIncludeOptions"

interface ReqBody extends RequestContext {
  body: VoteBodyType
}

export const VotePostFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = VoteValidation(req.body)
  if (error) return next(new ErrorObject(error.details[0].message, 400))
  const id = req.body.postId

  const postControl = await Post.findUnique({ where: { id }, include: { votes: true } })
  if (!postControl) return next(new ErrorObject("No post is found with this id!", 404))
  let post: IPost

  const isVoted = postControl.votes.find((vote) => vote.userId === req.user.id)
  if (isVoted) {
    const voteType = isVoted.type

    if (voteType === req.body.type) {
      post = await Post.update({
        where: { id },
        data: { votes: { delete: { id: isVoted.id } } },
        include: postIncludeOptions,
      })
    } else {
      post = await Post.update({
        where: { id },
        data: { votes: { update: { where: { id: isVoted.id }, data: { type: req.body.type } } } },
        include: postIncludeOptions,
      })
    }
  } else {
    post = await Post.update({
      where: { id },
      data: { votes: { create: { user: { connect: { id: req.user.id } }, type: req.body.type } } },
      include: postIncludeOptions,
    })
  }

  res.status(200).json(
    InlineType<IVoteResponse>({ message: "Post is voted successfully!", success: true, votes: post.votes || [] })
  )
})

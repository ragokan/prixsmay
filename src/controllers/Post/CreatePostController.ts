import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import Async from "../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../utils/InlineType"
import { IPostResponse } from "../../types/ResponseTypes"
import { Community, Post } from "../../database"
import { PostBodyType, PostValidation } from "../../validation/PostValidation"
import ErrorObject from "../../utils/ErrorObject"
import { postIncludeOptions } from "./Utils/PostIncludeOptions"

interface ReqBody extends RequestContext {
  body: PostBodyType
}

export const CreatePostFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = PostValidation(req.body)
  if (error) return next(new ErrorObject(error.details[0].message, 400))

  if (req.body.communityId) {
    const community = await Community.findUnique({ where: { id: req.body.communityId } })
    if (!community) return next(new ErrorObject("No community with this id is found!", 404))
  }

  const post = await Post.create({
    data: { ...req.body, authorId: req.session.userId! },
    include: postIncludeOptions,
  })

  res.status(201).json(
    InlineType<IPostResponse>({ message: "Post is created successfully!", success: true, post })
  )
})

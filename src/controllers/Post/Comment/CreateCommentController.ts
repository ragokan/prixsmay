import { RequestContext, ResponseContext } from "../../../types/ExpressTypes"
import Async from "../../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../../utils/InlineType"
import { IPostResponse } from "../../../types/ResponseTypes"
import { Post } from "../../../database"
import ErrorObject from "../../../utils/ErrorObject"
import { postIncludeOptions } from "../Utils/PostIncludeOptions"
import { CommentBodyType, CommentValidation } from "../../../validation/CommentValidation"

interface ReqBody extends RequestContext {
  body: CommentBodyType
}

export const CreatePostFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = CommentValidation(req.body)
  if (error) return next(new ErrorObject(error.details[0].message, 400))

  const post = await Post.update({
    where: { id: req.body.postId },
    data: { comments: { create: { text: req.body.text, userId: req.user.id } } },
    include: postIncludeOptions,
  })

  res.status(201).json(
    InlineType<IPostResponse>({ message: "Post is created successfully!", success: true, post })
  )
})

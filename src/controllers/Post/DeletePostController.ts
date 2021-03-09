import { RequestContext, ResponseContext } from "../../types/ExpressTypes"
import Async from "../../middleware/Async"
import { NextFunction } from "express"
import { InlineType } from "../../utils/InlineType"
import { IResponse } from "../../types/ResponseTypes"
import { Post } from "../../database"
import ErrorObject from "../../utils/ErrorObject"

interface ReqBody extends RequestContext {
  params: { id: string }
}

export const DeletePostFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const id = parseInt(req.params.id)

  const postControl = await Post.findUnique({ where: { id } })

  if (!postControl) return next(new ErrorObject("No post is found with this id!", 404))
  if (postControl.authorId !== req.session.userId) return next(new ErrorObject("You can't delete others posts!", 400))

  await Post.delete({ where: { id } })

  res.status(200).json(
    InlineType<IResponse>({ message: "Post is deleted successfully!", success: true })
  )
})

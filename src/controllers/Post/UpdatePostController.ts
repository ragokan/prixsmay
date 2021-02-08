import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IPostResponse } from "../../types/ResponseTypes";
import { Post } from "../../database";
import { PostBodyType, PostValidation } from "../../validation/PostValidation";
import ErrorObject from "../../utils/ErrorObject";
import { postIncludeOptions } from "./Utils/PostIncludeOptions";

interface ReqBody extends RequestContext {
  body: PostBodyType;
  params: { id: string };
}

export const UpdatePostFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = PostValidation(req.body);
  if (error) return next(new ErrorObject(error.details[0].message, 400));
  const id = parseInt(req.params.id);

  const postControl = await Post.findUnique({ where: { id } });

  if (!postControl) return next(new ErrorObject("No post is found with this id!", 404));
  if (postControl.authorId !== req.session.userId) return next(new ErrorObject("You can't update others posts!", 400));

  const post = await Post.update({
    where: { id },
    data: { ...req.body },
    include: postIncludeOptions,
  });

  res.status(200).json(
    InlineType<IPostResponse>({ message: "Post is updated successfully!", success: true, post })
  );
});

import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IPostResponse } from "../../types/ResponseTypes";
import { Post } from "../../database";
import { PostBodyType, PostValidation } from "../../validation/PostValidation";
import ErrorObject from "../../utils/ErrorObject";

interface ReqBody extends RequestContext {
  body: PostBodyType;
}

export const CreatePostFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = PostValidation(req.body);
  if (error) return next(new ErrorObject(error.details[0].message, 400));

  const post = await Post.create({
    data: { ...req.body, authorId: req.session.userId! },
    include: { author: { select: { email: true, id: true, name: true } } },
  });

  res.status(201).json(
    InlineType<IPostResponse>({ message: "Post is created successfully!", success: true, post })
  );
});

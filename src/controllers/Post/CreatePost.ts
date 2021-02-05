import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IPostResponse } from "../../types/ResponseTypes";
import { Post } from "../../database";
import { PostBodyType } from "../../validation/PostValidation";

interface ReqBody extends RequestContext {
  body: PostBodyType;
}

export const CreatePostFunction = Async(async (req: ReqBody, res: ResponseContext, _: NextFunction) => {
  const post = await Post.create({
    data: { ...req.body, authorId: req.session.userId! },
    include: { author: { select: { email: true, id: true, name: true } } },
  });

  res.status(200).json(
    InlineType<IPostResponse>({ message: "Post is created successfully!", success: true, post })
  );
});

import { RequestContext, ResponseContext } from "../../../types/ExpressTypes";
import Async from "../../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../../utils/InlineType";
import { IPostResponse } from "../../../types/ResponseTypes";
import { Post } from "../../../database";
import ErrorObject from "../../../utils/ErrorObject";
import { VoteBodyType, VoteValidation } from "../../../validation/VoteValidation";
import { IPost } from "../../../types/PostType";
import { postIncludeOptions } from "../Utils/PostIncludeOptions";

interface ReqBody extends RequestContext {
  body: VoteBodyType;
}

export const VotePostFunction = Async(async (req: ReqBody, res: ResponseContext, next: NextFunction) => {
  const { error } = VoteValidation(req.body);
  if (error) return next(new ErrorObject(error.details[0].message, 400));
  const id = req.body.postId;

  const postControl = await Post.findUnique({ where: { id }, include: { votes: true } });
  if (!postControl) return next(new ErrorObject("No post is found with this id!", 404));
  let post: IPost;

  const isVoted = postControl.votes.find((vote) => vote.authorId === req.user.id);
  if (isVoted) {
  } else {
    post = await Post.update({
      where: { id },
      data: { votes: { create: { author: { connect: { id: req.user.id } }, type: req.body.type } } },
      include: postIncludeOptions,
    });
  }

  res.status(201).json(
    InlineType<IPostResponse>({ message: "Post is voted successfully!", success: true })
  );
});

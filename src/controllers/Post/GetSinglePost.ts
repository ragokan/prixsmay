import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IPostResponse } from "../../types/ResponseTypes";
import { Post } from "../../database";

interface ReqBody extends RequestContext {
  params: {
    id: string;
  };
}

export const GetSinglePostFunction = Async(async (req: ReqBody, res: ResponseContext, _: NextFunction) => {
  const post = await Post.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { author: { select: { email: true, name: true, id: true } }, votes: true },
  });

  res
    .status(post ? 200 : 404)
    .json(
      InlineType<IPostResponse>(
        post
          ? { message: "Post is received successfully!", success: true, post }
          : { message: "No post is found with this id!", success: false }
      )
    );
});

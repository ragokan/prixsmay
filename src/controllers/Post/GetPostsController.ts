import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IPostResponse } from "../../types/ResponseTypes";
import { Post } from "../../database";
import { postIncludeOptions } from "./Utils/PostIncludeOptions";

export const GetPostsFunction = Async(async (req: RequestContext, res: ResponseContext, _: NextFunction) => {
  const posts = await Post.findMany({
    include: postIncludeOptions,
  });

  res.status(200).json(
    InlineType<IPostResponse>({ message: "Posts are received successfully!", success: true, posts })
  );
});

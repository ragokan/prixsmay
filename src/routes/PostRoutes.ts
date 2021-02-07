import express from "express";
import { CreatePostFunction } from "../controllers/Post/CreatePost";
import { DeletePostFunction } from "../controllers/Post/DeletePost";
import { GetPostsFunction } from "../controllers/Post/GetPosts";
import { GetSinglePostFunction } from "../controllers/Post/GetSinglePost";
import { UpdatePostFunction } from "../controllers/Post/UpdatePost";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/").post(LoginRequired, CreatePostFunction).get(GetPostsFunction);

router
  .route("/:id")
  .get(GetSinglePostFunction)
  .patch(LoginRequired, UpdatePostFunction)
  .delete(LoginRequired, DeletePostFunction);

export default router;

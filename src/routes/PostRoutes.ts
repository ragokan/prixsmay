import express from "express";
import { CreatePostFunction } from "../controllers/Post/CreatePostController";
import { DeletePostFunction } from "../controllers/Post/DeletePostController";
import { GetPostsFunction } from "../controllers/Post/GetPostsController";
import { GetSinglePostFunction } from "../controllers/Post/GetSinglePostController";
import { UpdatePostFunction } from "../controllers/Post/UpdatePostController";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/").post(LoginRequired, CreatePostFunction).get(GetPostsFunction);

router
  .route("/:id")
  .get(GetSinglePostFunction)
  .patch(LoginRequired, UpdatePostFunction)
  .delete(LoginRequired, DeletePostFunction);

export default router;

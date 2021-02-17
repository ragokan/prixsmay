import express from "express"
import { CreateCommentFunction } from "../controllers/Post/Comment/CreateCommentController"
import { DeleteCommentFunction } from "../controllers/Post/Comment/DeleteCommentController"
import { CreatePostFunction } from "../controllers/Post/CreatePostController"
import { DeletePostFunction } from "../controllers/Post/DeletePostController"
import { GetPostsFunction } from "../controllers/Post/GetPostsController"
import { GetSinglePostFunction } from "../controllers/Post/GetSinglePostController"
import { UpdatePostFunction } from "../controllers/Post/UpdatePostController"
import { VotePostFunction } from "../controllers/Post/Vote/VoteController"
import { LoginRequired } from "../middleware/Authentication"

const router = express.Router()

router.route("/").post(LoginRequired, CreatePostFunction).get(GetPostsFunction)

router
  .route("/:id")
  .get(GetSinglePostFunction)
  .patch(LoginRequired, UpdatePostFunction)
  .delete(LoginRequired, DeletePostFunction)

router.route("/vote").post(LoginRequired, VotePostFunction)

router.route("/comment").post(LoginRequired, CreateCommentFunction)
router.route("/comment/:id").delete(LoginRequired, DeleteCommentFunction)

export default router

import express from "express";
import { CreatePostFunction } from "../controllers/Post/CreatePost";
import { GetPostsFunction } from "../controllers/Post/GetPosts";
import { GetSinglePostFunction } from "../controllers/Post/GetSinglePost";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/").post(LoginRequired, CreatePostFunction).get(GetPostsFunction);
router.route("/:id").get(GetSinglePostFunction);

export default router;

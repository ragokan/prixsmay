import express from "express";
import { CreatePostFunction } from "../controllers/Post/CreatePost";
import { GetPostsFunction } from "../controllers/Post/GetPosts";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/").post(LoginRequired, CreatePostFunction).get(GetPostsFunction);

export default router;

import express from "express";
import { CreatePostFunction } from "../controllers/Post/CreatePost";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/").post(LoginRequired, CreatePostFunction);

export default router;

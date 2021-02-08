import express from "express";
import { AddProfileFunction } from "../controllers/User/AddProfileController";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/addProfile").post(LoginRequired, AddProfileFunction);

export default router;

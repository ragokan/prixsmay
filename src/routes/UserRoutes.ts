import express from "express";
import { AddProfileFunction } from "../controllers/User/AddProfileController";
import { LoginRequired } from "../middleware/Authentication";
import { GetUserFunction } from "../controllers/User/GetUserController";

const router = express.Router();

router.route("/addProfile").post(LoginRequired, AddProfileFunction);
router.route("").get(LoginRequired, GetUserFunction);

export default router;

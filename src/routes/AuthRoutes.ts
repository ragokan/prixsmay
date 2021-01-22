import express from "express";
import { Register } from "../controllers/Auth";
// import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/register").post(Register);
// router.route("/login").post(Login);
// router.route("/logout").post(LoginRequired, Logout);

export default router;

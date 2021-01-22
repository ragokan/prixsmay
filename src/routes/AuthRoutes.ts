import express from "express";
import { Register, ConfirmEmail } from "../controllers/Auth";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/register").post(Register);
router.route("/confirmEmail").post(ConfirmEmail);
// router.route("/login").post(Login);
// router.route("/logout").post(LoginRequired, Logout);

export default router;

import express from "express";
import {
  Register,
  ConfirmEmail,
  Login,
  GetUser,
  ResetPassword,
  SendPasswordResetMail,
  Logout,
} from "../controllers/Auth";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/register").post(Register);
router.route("/confirmEmail").post(ConfirmEmail);
router.route("/login").post(Login);
router.route("/user").get(LoginRequired, GetUser);
router.route("/resetPassword").post(ResetPassword);
router.route("/sendPasswordResetMail").post(SendPasswordResetMail);
router.route("/logout").post(LoginRequired, Logout);

export default router;

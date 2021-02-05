import express from "express";
import { CheckAuthFunction } from "../controllers/Auth/CheckAuthController";
import { ConfirmEmailFunction } from "../controllers/Auth/ConfirmEmailController";
import { ResetPasswordFunction, SendPasswordResetMailFunction } from "../controllers/Auth/ForgotPassword";
import { GetUserFunction } from "../controllers/Auth/GetUserController";
import { LoginFunction } from "../controllers/Auth/LoginController";
import { LogoutFunction } from "../controllers/Auth/LogoutController";
import { RegisterFunction } from "../controllers/Auth/RegisterController";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/register").post(RegisterFunction);
router.route("/confirmEmail").post(ConfirmEmailFunction);
router.route("/login").post(LoginFunction);
router.route("/user").get(LoginRequired, GetUserFunction);
router.route("/resetPassword").post(ResetPasswordFunction);
router.route("/sendPasswordResetMail").post(SendPasswordResetMailFunction);
router.route("/logout").post(LoginRequired, LogoutFunction);
router.route("/check").get(CheckAuthFunction);

export default router;

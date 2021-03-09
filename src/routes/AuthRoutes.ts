import express from "express";
import { CheckAuthFunction } from "../controllers/Auth/CheckAuthController";
import { ConfirmEmailFunction } from "../controllers/Auth/ConfirmEmailController";
import { ResetPasswordFunction, SendPasswordResetMailFunction } from "../controllers/Auth/ForgotPassword";
import { LoginFunction } from "../controllers/Auth/LoginController";
import { LogoutFunction } from "../controllers/Auth/LogoutController";
import { RegisterFunction } from "../controllers/Auth/RegisterController";
import { SendEmailVerificationCodeFunction } from "../controllers/Auth/SendEmailVerificationCodeController";
import { LoginRequired } from "../middleware/Authentication";

const router = express.Router();

router.route("/login").post(LoginFunction);
router.route("/check").get(CheckAuthFunction);
router.route("/register").post(RegisterFunction);
router.route("/confirmEmail").post(ConfirmEmailFunction);
router.route("/resetPassword").post(ResetPasswordFunction);
router.route("/logout").post(LoginRequired, LogoutFunction);
router.route("/sendPasswordResetMail").post(SendPasswordResetMailFunction);
router.route("/sendEmailVerificationCode").post(SendEmailVerificationCodeFunction);

export default router;

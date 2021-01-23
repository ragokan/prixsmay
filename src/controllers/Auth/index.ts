import { RegisterFunction } from "./RegisterController";
import { LoginFunction } from "./LoginController";
import { LogoutFunction } from "./LogoutController";
import { ConfirmEmailFunction } from "./ConfirmEmailController";
import { GetUserFunction } from "./GetUserController";
import { ResetPasswordFunction, SendPasswordResetMailFunction } from "./ForgotPassword";

export {
  RegisterFunction as Register,
  LoginFunction as Login,
  LogoutFunction as Logout,
  GetUserFunction as GetUser,
  ConfirmEmailFunction as ConfirmEmail,
  ResetPasswordFunction as ResetPassword,
  SendPasswordResetMailFunction as SendPasswordResetMail,
};

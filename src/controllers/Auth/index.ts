import { RegisterFunction } from "./RegisterController";
import { LoginFunction } from "./LoginController";
import { ConfirmEmailFunction } from "./ConfirmEmailController";
import { GetUserFunction } from "./GetUserController";
import { ResetPasswordFunction, SendPasswordResetMailFunction } from "./ForgotPassword";

export {
  RegisterFunction as Register,
  ConfirmEmailFunction as ConfirmEmail,
  LoginFunction as Login,
  GetUserFunction as GetUser,
  ResetPasswordFunction as ResetPassword,
  SendPasswordResetMailFunction as SendPasswordResetMail,
};

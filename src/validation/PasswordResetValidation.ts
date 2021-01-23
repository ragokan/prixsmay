import Joi from "joi";

export interface PasswordResetMailBodyType {
  email: string;
}

export const PasswordResetMailValidation = (data: PasswordResetMailBodyType) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().messages({
      "any.required": "Please enter a valid email!",
      "string.min": "Please enter a valid email name!",
      "string.email": "Please enter a valid email",
    }),
  });
  return schema.validate(data);
};

export interface PasswordResetBodyType {
  token: string;
  password: string;
}

export const PasswordResetValidation = (data: PasswordResetBodyType) => {
  const schema = Joi.object({
    token: Joi.string().min(6).required().messages({
      "any.required": "Please enter a valid token!",
      "string.min": "Please enter a valid token!",
    }),
    password: Joi.string().min(5).required().messages({
      "any.required": "Please enter your password!",
      "string.min": "Please enter  a password that longer than 5 characters",
    }),
  });
  return schema.validate(data);
};

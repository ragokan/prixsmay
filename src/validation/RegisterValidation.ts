import Joi from "joi";

export interface RegisterBodyType {
  name: string;
  email: string;
  password: string;
}

export const RegisterValidation = (data: RegisterBodyType) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "any.required": "Please enter your name!",
      "string.min": "Please enter your name!",
    }),
    email: Joi.string().min(6).required().email().messages({
      "any.required": "Please enter a valid email!",
      "string.min": "Please enter a valid email name!",
      "string.email": "Please enter a valid email",
    }),
    password: Joi.string().min(5).required().messages({
      "any.required": "Please enter your password!",
      "string.min": "Please enter  a password that longer than 5 characters",
    }),
  });
  return schema.validate(data);
};
import Joi from "joi"

export interface EmailBodyType {
  email: string
}

export const EmailValidation = (data: EmailBodyType) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email().messages({
      "any.required": "Please enter a valid email!",
      "string.min": "Please enter a valid email!",
      "string.email": "Please enter a valid email",
    }),
  })
  return schema.validate(data)
}

import Joi from "joi"

export interface CommunityBodyType {
  name: string
  description: string
  pictureUrl?: string
}

export const CommunityValidation = (data: CommunityBodyType) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required().messages({
      "any.required": "Please provide a name for your community!",
      "string.min": "Please provide a name for your community!",
    }),
    description: Joi.string().min(1).required().messages({
      "any.required": "Please provide a description for your community!",
      "string.min": "Please provide a description for your community!",
    }),
    pictureUrl: Joi.string().optional(),
  })
  return schema.validate(data)
}

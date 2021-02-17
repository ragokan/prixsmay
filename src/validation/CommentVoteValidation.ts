import Joi from "joi"

export interface CommentVoteBodyType {
  commentId: number
  type: "up" | "down"
}

export const CommentVoteValidation = (data: CommentVoteBodyType) => {
  const schema = Joi.object({
    commentId: Joi.number().required().messages({
      "any.required": "Please provide a commentId for your vote!",
      "any.messages": "Please provide a commentId for your vote!",
    }),
    type: Joi.string().required().valid("up", "down").messages({
      "any.required": "Please provide a type!",
      "any.only": "Please provide a type that only 'up' or 'down'.",
    }),
  })
  return schema.validate(data)
}

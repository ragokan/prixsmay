import Joi from "joi";

export interface VoteBodyType {
  postId: number;
  type: "up" | "down";
}

export const VoteValidation = (data: VoteBodyType) => {
  const schema = Joi.object({
    postId: Joi.number().required().messages({
      "any.required": "Please provide a postId for your vote!",
      "any.messages": "Please provide a postId for your vote!",
    }),
    type: Joi.string().required().valid("up", "down").messages({
      "any.required": "Please provide a type!",
      "any.only": "Please provide a type that only 'up' or 'down'.",
    }),
  });
  return schema.validate(data);
};

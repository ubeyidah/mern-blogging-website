import Joi from "joi";

export const blogSchema = Joi.object({
  title: Joi.string().required(),
  banner: Joi.string().required(),
  content: Joi.object().required(),
  des: Joi.string().max(200).required(),
  tags: Joi.array().items(Joi.string().trim()).min(1).max(10).required(),
  blocks: Joi.array().required().min(1),
});

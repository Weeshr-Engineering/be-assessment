import Joi from "joi";

export const validateCreateCategory = Joi.object({
     name : Joi.string().required(),
     description : Joi.string().optional()
})
export const validateUpdateCategory = Joi.object({
     name : Joi.string().required(),
     description : Joi.string().optional()
})

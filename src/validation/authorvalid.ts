import Joi from "joi";

export const validateCreateAuthor = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().max(20).required(),
  bio: Joi.string().optional(),
  password: Joi.string().min(6).max(20).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const validateLoginAuthor = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().max(6).max(20).required(),
});

export const validateGetAuthor = Joi.object({
  id: Joi.string().required(),
});

export const validateUpdateAuthor = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  bio: Joi.string().optional(),
});

export const refreshTokenValidate = Joi.object({
  refreshToken: Joi.string().required().label("Refresh Token"),
});

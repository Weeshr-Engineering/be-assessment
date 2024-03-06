import Joi from "joi";

export const validateCreateBook = Joi.object({
  title: Joi.string().required(),
  categoryId: Joi.string().required(),
  publicationYear: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear())
    .required(),
  ISBN: Joi.string().required().length(13),
});


export const validateUpdateBookData = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  category: Joi.string(),
  publicationYear: Joi.number()
    .integer()
    .min(1000)
    .max(new Date().getFullYear()),
  ISBN: Joi.string().length(13),
});

export const validateGetBookByIdParams = Joi.object({
  bookId: Joi.string().required(),
});

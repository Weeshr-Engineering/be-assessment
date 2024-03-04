const { z } = require("zod");

const authorCreateSchema = z.object({
  email: z.string().email(),
  fullname: z.string(),
  password: z.string().min(6),
  bio: z.string().optional(),
});
const authorUpdateSchema = z.object({
  email: z.string().email(),
  fullname: z.string(),
  bio: z.string().optional(),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { authorCreateSchema, authorUpdateSchema, loginSchema };

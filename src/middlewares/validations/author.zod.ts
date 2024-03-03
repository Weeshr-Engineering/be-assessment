const { z } = require("zod");

const authorSchema = z.object({
  email: z.string().email(),
  fullname: z.string(),
  password: z.string().min(6),
  bio: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export { authorSchema, loginSchema };

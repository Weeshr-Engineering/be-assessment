const { z } = require("zod");

export const bookCreateSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string().optional(),
  category: z.string(),
  publicationYear: z.string(),
  isbn: z.string()
});

export const bookUpdateSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  publicationYear: z.string().optional(),
  isbn: z.string().optional(),
});

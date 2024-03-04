import { z } from "zod";

const bookCreateSchema = z.object({
  title: z.string(),
  authorId: z.number().int(),
  publication_year: z.string().optional(),
  isbn: z.string(),
  categoryId: z.number().int(),
});

const bookUpdateSchema = z.object({
  title: z.string().optional(),
  authorId: z.number().int().optional(),
  publication_year: z.string().optional(),
  isbn: z.string().optional(),
  categoryId: z.number().int().optional(),
});

export { bookCreateSchema, bookUpdateSchema };

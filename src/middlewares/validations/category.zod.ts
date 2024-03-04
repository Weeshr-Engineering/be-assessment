import { z } from "zod";

const categoryCreateSchema = z.object({
  name: z.string(),
  tags: z.array(z.string()),
});

const categoryUpdateSchema = z.object({
  name: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export { categoryCreateSchema, categoryUpdateSchema };

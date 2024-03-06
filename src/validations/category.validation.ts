const { z } = require("zod");

export const categoryCreateSchema = z.object({
  name: z.string(),
});

export const categoryUpdateSchema = z.object({
  name: z.string(),
});

const { z } = require("zod");

export const categoryCreateSchema = z.object({
  name: z.string(),
});

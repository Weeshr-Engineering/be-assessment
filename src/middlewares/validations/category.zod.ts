import { z } from "zod";

const CategorySchema = z.object({
  name: z.string(),
  tags: z.array(z.string()),
});

export { CategorySchema };

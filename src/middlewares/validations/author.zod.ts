const { z } = require("zod");

// Define validation schema for Author
const AuthorSchema = z.object({
  email: z.string().email(),
  fullname: z.string(),
  password: z.string().min(6),
  bio: z.string().optional(),
});

// Export validation schemas
export { AuthorSchema };

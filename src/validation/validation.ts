import zod from "zod";

const authorSchema = zod
  .object({
    fullName: zod
      .string({
        required_error: "Full name is required.",
        invalid_type_error: "Full name must be a string.",
      })
      .min(4),

    email: zod
      .string({
        required_error: "Kindly provide your email.",
        invalid_type_error: "Email must be a string.",
      })
      .email(),

    password: zod
      .string({
        required_error: "Kindly provide your password.",
      })
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      ),

    confirmPassword: zod.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const bookSchema = zod.object({
  title: zod.string().min(5),

  author: zod.string().min(5),

  category: zod.string(),

  publicationYear: zod.number().max(new Date().getFullYear()),

  ISBN: zod.string().min(10),

  // authorId: zod.string()
});

const categorySchema = zod.object({
  description: zod.string({
    required_error: "Kindly provide a category description.",
    invalid_type_error: "Category description must be a string.",
  }).min(10),
  genre: zod.string(),
});

export { authorSchema, bookSchema, categorySchema };

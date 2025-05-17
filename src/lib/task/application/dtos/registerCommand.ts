import { z } from "zod";

export const registerCommandTaskSchema = z.object({
  id: z.string().optional(),
  userId: z.string({ message: "User id is required" }), // uuid .uuid()
  title: z
    .string({ message: "Title is required" })
    .min(4, "Title must be at least 4 characters long")
    .max(35, "Title must be at most 35 characters long"),
  description: z
    .string({ message: "Description is required" })
    .min(4, "Description must be at least 4 characters long")
    .max(255, "Description must be at most 255 characters long"),
  completed: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type RegisterCommandTask = z.infer<typeof registerCommandTaskSchema>;

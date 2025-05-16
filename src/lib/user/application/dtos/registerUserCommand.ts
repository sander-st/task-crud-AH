import { z } from "zod";

export const RegisterUserCommandSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ message: "Name must be a string" })
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
});

export type RegisterUserCommand = z.infer<typeof RegisterUserCommandSchema>;

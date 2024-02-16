import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be atleast 6 characters"),
});

export const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must me atleast 6 characters"),
    confirmPassword: z.string().min(6, "Password must me atleast 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, "Password must be atleast 4 characters"),
});

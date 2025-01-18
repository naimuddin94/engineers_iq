import { z } from "zod";

const signinSchema = z.object({
  identity: z
    .string()
    .trim()
    .min(3, "Must be at least 3 characters long")
    .max(80, "Must shorter than 80 characters"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at lest 6 character")
    .max(20, { message: "Password no longer that 20 characters" }),
});

const signupSchema = z.object({
  image: z.any({ message: "Image is required" }).refine(
    (file) => {
      return file && file.size <= 500 * 1024;
    },
    {
      message: "Image size must be under 500 KB",
    },
  ),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be string",
    })
    .min(2)
    .max(30),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email format" }),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must shorter than 20 characters"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password no longer that 20 characters" }),
});

export const AuthValidation = {
  signinSchema,
  signupSchema,
};

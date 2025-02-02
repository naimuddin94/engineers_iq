import { z } from "zod";

const signinSchema = z.object({
  identity: z
    .string()
    .trim()
    .min(3, "Must be at least 3 characters long")
    .max(80, "Must shorter than 80 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

const signupSchema = z.object({
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
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

const passwordChangeSchema = z
  .object({
    oldPassword: z.string().nonempty("Old Password is required"),

    newPassword: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),

    newPassword2: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.newPassword2, {
    path: ["newPassword2"],
    message: "Passwords do not match",
  });

export const AuthValidation = {
  signinSchema,
  signupSchema,
  passwordChangeSchema,
};

// image: z.any({ message: "Image is required" }).refine(
//     (file) => {
//       return file && file.size <= 500 * 1024;
//     },
//     {
//       message: "Image size must be under 500 KB",
//     },
//   ),

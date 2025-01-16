import { z } from "zod";

export const userRegistrationValidationSchema = z.object({
    name: z.string().nonempty("Name is required"),
    username: z.string()
        .nonempty("Username is required")
        .min(5, "Username must be at least 5 characters long") // Minimum of 5 characters
        .max(15, "Username must be at most 15 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores") // No special characters except underscore
        .transform((val) => val.trim()), // Trim whitespace
    email: z.string()
        .nonempty("Email is required")
        .email("Invalid email format"),
    password: z.string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),
    password2: z.string()
        .nonempty("Please confirm your password"),
}).refine(data => data.password === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
});

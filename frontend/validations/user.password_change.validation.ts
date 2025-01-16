import { z } from "zod";

export const userPasswordChangeValidationSchema = z.object({
    oldPassword: z.string()
        .nonempty('Old Password is required'),

    newPassword: z.string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[\W_]/, "Password must contain at least one special character"),

    newPassword2: z.string()
        .nonempty('Please confirm your password')
}).refine(data => data.newPassword === data.newPassword2, {
    path: ['newPassword2'],
    message: "Passwords do not match",
})
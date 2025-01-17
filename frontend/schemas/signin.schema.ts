import { z } from "zod";

const signinValidationSchema = z.object({
  identity: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(6, "Password needs to be at lest 6 character"),
});

export default signinValidationSchema;

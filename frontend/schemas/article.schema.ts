/* eslint-disable prettier/prettier */
import { z } from "zod";

/* eslint-disable prettier/prettier */
const createSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be under 100 characters"),
  category: z
    .string({
      required_error: "Category is required",
    })
    .min(1, "Category is required"),
  topics: z.preprocess(
    (arg) => {
      if (typeof arg === "string") {
        return arg.split(",");
      }

      return arg;
    },
    z
      .array(z.string().min(1, "Topic name must have at least 1 character"))
      .min(1, "At least one topic is required")
      .max(10, "You can only specify up to 10 topics"),
  ),
  image: z.any({ message: "Image is required" }).refine(
    (file) => {
      if (!file || typeof file === "string") {
        // here off validation for when update article
        return true;
      }

      return file && file.size <= 1024 * 1024;
    },
    {
      message: "Please insert an image that is under 1MB in size.",
    },
  ),
});

export const ArticleValidation = {
  createSchema,
};

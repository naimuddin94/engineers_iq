/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { createArticle } from "@/services/ArticleService";

export const useCreateArticle = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_ARTICLE"],
    mutationFn: async (articleData) => await createArticle(articleData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

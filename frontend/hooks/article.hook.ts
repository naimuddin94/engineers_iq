/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { createArticle, fetchArticles } from "@/services/ArticleService";
import { IFilterOptions } from "@/types";

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

export const useGetArticles = (params: IFilterOptions) => {
  return useQuery({
    queryKey: ["GET_ARTICLES", params],
    queryFn: () => fetchArticles(params),
  });
};

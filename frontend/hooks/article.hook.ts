/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addComment,
  clapOnArticle,
  createArticle,
  deleteComment,
  fetchArticle,
  fetchArticles,
} from "@/services/ArticleService";
import { IArticle, IFilterOptions, IResponse } from "@/types";

export const useCreateArticle = () => {
  return useMutation<any, Error, FormData>({
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
    queryKey: ["GET_ARTICLES"],
    queryFn: () => fetchArticles(params),
  });
};

export const useGetArticle = (articleId: string) => {
  return useQuery({
    queryKey: ["GET_ARTICLE"],
    queryFn: () => fetchArticle(articleId),
  });
};

export const useClapOmArticle = () => {
  return useMutation<IResponse<IArticle>, Error, string>({
    mutationKey: ["CLAP"],
    mutationFn: async (articleId) => await clapOnArticle(articleId),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddComment = () => {
  return useMutation<
    IResponse<IArticle>,
    Error,
    { articleId: string; content: string }
  >({
    mutationKey: ["COMMENTS"],
    mutationFn: async ({ articleId, content }) =>
      await addComment(articleId, content),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useRemoveComment = () => {
  const queryClient = useQueryClient();

  return useMutation<IResponse<IArticle>, Error, string>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (commentId) => await deleteComment(commentId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["COMMENTS"] });
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

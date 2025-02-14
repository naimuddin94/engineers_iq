/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addComment,
  clapOnArticle,
  clapOnComment,
  createArticle,
  deleteArticle,
  deleteComment,
  fetchArticle,
  fetchArticles,
  updateArticle,
  updateComment,
} from "@/services/ArticleService";
import { IArticle, IComment, IFilterOptions, IResponse } from "@/types";

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

export const useUpdateArticle = () => {
  return useMutation<any, Error, { articleId: string; updateData: FormData }>({
    mutationKey: ["UPDATE_ARTICLE"],
    mutationFn: async ({ articleId, updateData }) =>
      await updateArticle(articleId, updateData),
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

export const useGetAuthorArticles = (params: IFilterOptions) => {
  return useQuery({
    queryKey: ["GET_AUTHOR_ARTICLES"],
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
      toast.success(data?.message, {
        position: "bottom-left",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-left",
      });
    },
  });
};

export const useRemoveComment = () => {
  const queryClient = useQueryClient();

  return useMutation<IResponse<IArticle>, Error, string>({
    mutationKey: ["COMMENTS"],
    mutationFn: async (commentId) => await deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["COMMENTS"] });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IResponse<IComment>,
    Error,
    { commentId: string; content: string }
  >({
    mutationKey: ["COMMENTS"],
    mutationFn: async (payload) =>
      await updateComment(payload.commentId, payload.content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["COMMENTS"] });
    },
  });
};

export const useClapOnComment = () => {
  return useMutation<IResponse<IComment>, Error, string>({
    mutationKey: ["COMMENT_CLAP"],
    mutationFn: async (articleId) => await clapOnComment(articleId),
  });
};

export const useRemoveArticle = () => {
  const queryClient = useQueryClient();

  return useMutation<IResponse<null>, Error, string>({
    mutationKey: ["DELETE_ARTICLE"],
    mutationFn: async (articleId) => await deleteArticle(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ARTICLES"] });
    },
  });
};

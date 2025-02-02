/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";

import { fetchAPI } from "@/lib/fetch";
import {
  IArticle,
  IComment,
  IFilterOptions,
  IResponse,
  IResponseWithMetadata,
} from "@/types";

export const createArticle = async (articleData: FormData) => {
  try {
    const data = await fetchAPI<IResponse<IArticle>>("/articles", {
      method: "POST",
      body: articleData,
    });

    if (data?.success) {
      revalidateTag(`articles-${data?.data?._id}`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const fetchArticles = async (params: IFilterOptions) => {
  try {
    // Build query string dynamically
    const queryParams = new URLSearchParams(
      Object.entries(params).filter(([_, value]) => value !== undefined),
    ).toString();
    const data = await fetchAPI<IResponseWithMetadata<IArticle[]>>(
      `/articles?${queryParams}`,
      {
        next: {
          tags: ["articles"],
        },
      },
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const fetchArticle = async (articleId: string) => {
  try {
    const data = await fetchAPI<IResponse<IArticle>>(`/articles/${articleId}`, {
      next: {
        tags: [`article-${articleId}`],
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const clapOnArticle = async (articleId: string) => {
  try {
    const data = await fetchAPI<IResponse<IArticle>>(
      `/articles/claps/${articleId}`,
      {
        method: "PATCH",
      },
    );

    if (data?.success) {
      revalidateTag(`article-${articleId}`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const addComment = async (articleId: string, content: string) => {
  try {
    const data = await fetchAPI<IResponse<IArticle>>(`/comments/${articleId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (data?.success) {
      revalidateTag(`article-${articleId}`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const data = await fetchAPI<IResponse<IArticle>>(
      `/comments/remove/${commentId}`,
      {
        method: "DELETE",
      },
    );

    if (data?.success) {
      revalidateTag(`article-${data?.data?._id}`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updateComment = async (commentId: string, content: string) => {
  try {
    const data = await fetchAPI<IResponse<IComment>>(
      `/comments/edit/${commentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      },
    );

    if (data?.success) {
      revalidateTag(`article-${data?.data?.article}`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

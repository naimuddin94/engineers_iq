/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FieldValues } from "react-hook-form";

import axiosInstance from "@/lib/axiosInstance";
import { IFilterOptions } from "@/types";

export const createArticle = async (articleData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/articles", articleData);

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
    const { data } = await axiosInstance.get("/articles");

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

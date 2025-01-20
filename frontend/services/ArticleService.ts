/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FieldValues } from "react-hook-form";

import axiosInstance from "@/lib/axiosInstance";

export const createArticle = async (articleData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/articles", articleData);

    return data;
  } catch (error: any) {
    console.log(error?.response?.data?.errorMessages);
    throw new Error(error?.response?.data?.message);
  }
};

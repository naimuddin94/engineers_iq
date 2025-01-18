/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import axiosInstance from "../lib/axiosInstance";

export const signupUser = async (userData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const { data } = await axiosInstance.post("/auth/signup", userData);

    if (data?.success) {
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const signinUser = async (userData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const { data } = await axiosInstance.post("/auth/signin", userData);

    if (data?.success) {
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    // return error?.response?.data;
    throw new Error(error?.response?.data?.message);
  }
};

export const signout = async () => {
  try {
    const cookieStore = await cookies();

    await axiosInstance.post("/auth/signout");

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      id: decodedToken.id,
      name: decodedToken.name,
      username: decodedToken.username,
      email: decodedToken.email,
      role: decodedToken.role,
      image: decodedToken.image,
    };
  }

  return decodedToken;
};

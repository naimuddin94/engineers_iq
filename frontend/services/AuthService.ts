/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import { fetchAPI } from "@/lib/fetch";
import { IAnalytics, IResponse, IUser } from "@/types";

export const signupUser = async (userData: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const data = await fetchAPI<
      IResponse<IUser & { accessToken: string; refreshToken: string }>
    >("/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (data?.success) {
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const signinUser = async (credentials: FieldValues) => {
  try {
    const cookieStore = await cookies();
    const data = await fetchAPI<
      IResponse<IUser & { accessToken: string; refreshToken: string }>
    >("/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (data?.success) {
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const signout = async () => {
  try {
    const cookieStore = await cookies();

    await fetchAPI<null>("/auth/signout");

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const changeFullname = async (name: string) => {
  try {
    const data = await fetchAPI<IResponse<IUser>>("/auth/change-name", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const changePassword = async (payload: FieldValues) => {
  try {
    const data = await fetchAPI<IResponse<IUser>>("/auth/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const changeProfileImage = async (payload: FormData) => {
  try {
    const data = await fetchAPI<IResponse<IUser>>("/auth/change-image", {
      method: "PATCH",
      body: payload,
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getProfile = async (
  username: string,
): Promise<IResponse<IUser>> => {
  try {
    const data = await fetchAPI<IResponse<IUser>>(`/auth/profile/${username}`, {
      next: {
        tags: ["PROFILE"],
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const userAnalytics = async (userId: string) => {
  try {
    const data = await fetchAPI<IResponse<IAnalytics>>(
      `/auth/analytics/${userId}`,
      {
        next: {
          tags: ["ANALYTICS"],
        },
      },
    );

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const toggleFollowing = async (userId: string) => {
  try {
    const data = await fetchAPI<IResponse<IUser>>(`/auth/following/${userId}`, {
      method: "PATCH",
    });

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
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

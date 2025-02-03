/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  changeFullname,
  changePassword,
  changeProfileImage,
  getProfile,
  signinUser,
  signupUser,
  toggleFollowing,
  userAnalytics,
} from "../services/AuthService";

import { IAnalytics, IResponse, IUser } from "@/types";

// User Signup Mutation
export const useUserSignup = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_SIGNUP"],
    mutationFn: async (userData) => await signupUser(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// User Signin Mutation
export const useUserSignin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_SIGNIN"],
    mutationFn: async (userData) => await signinUser(userData),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Change Fullname Mutation
export const useChangeFullname = () => {
  return useMutation<IResponse<IUser>, Error, string>({
    mutationKey: ["CHANGE_FULLNAME"],
    mutationFn: async (name) => await changeFullname(name),
  });
};

// Change Password Mutation
export const useChangePassword = () => {
  return useMutation<IResponse<IUser>, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (payload) => await changePassword(payload),
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// Change Profile Image Mutation
export const useChangeProfileImage = () => {
  return useMutation<IResponse<IUser>, Error, FormData>({
    mutationKey: ["CHANGE_PHOTO"],
    mutationFn: async (payload) => await changeProfileImage(payload),
  });
};

// Toggle Following Mutation
export const useToggleFollowing = () => {
  const queryClient = useQueryClient();

  return useMutation<IResponse<IUser>, Error, string>({
    mutationKey: ["FOLLOWING"],
    mutationFn: async (userId) => await toggleFollowing(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PROFILE"] });
    },
  });
};

// Fetch User Profile Query
export const useUserProfile = (username: string) => {
  return useQuery<IResponse<IUser>>({
    queryKey: ["PROFILE"],
    queryFn: () => getProfile(username),
  });
};

export const useAnalytics = (userId: string) => {
  return useQuery<IResponse<IAnalytics>>({
    queryKey: ["GET_ANALYTICS"],
    queryFn: () => userAnalytics(userId),
  });
};

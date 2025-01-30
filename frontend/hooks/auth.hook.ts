/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  changeFullname,
  changePassword,
  changeProfileImage,
  getProfile,
  signinUser,
  signupUser,
} from "../services/AuthService";

import { IResponse, IUser } from "@/types";

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

export const useChangeFullname = () => {
  return useMutation<IResponse<IUser>, Error, string>({
    mutationKey: ["CHANGE_FULLNAME"],
    mutationFn: async (name) => await changeFullname(name),
  });
};

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

export const useChangeProfileImage = () => {
  return useMutation<IResponse<IUser>, Error, FormData>({
    mutationKey: ["CHANGE_PHOTO"],
    mutationFn: async (payload) => await changeProfileImage(payload),
  });
};

export const useUserProfile = (username: string) => {
  return useQuery({
    queryKey: ["PROFILE"],
    queryFn: () => getProfile(username),
  });
};

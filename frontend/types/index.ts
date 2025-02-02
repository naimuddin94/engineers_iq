import { ReactNode, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TChildrenProps = {
  children: ReactNode;
};

export interface IInputProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: "text" | "password" | "file";
  label: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  defaultValue?: string | null;
  className?: string;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  role: string;
  image: string;
  name: string;
  premium: boolean;
}

export interface IFilterOptions {
  page?: string;
  limit?: string;
  searchTerm?: string;
  fields?: string;
  sort?: string;
  category?: string;
  topics?: string;
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface IResponseWithMetadata<T> extends IResponse<T> {
  meta: IMeta;
}

export interface IArticle {
  _id: string;
  author: IUser;
  title: string;
  textarea: string;
  image: string;
  category: string;
  topics: string[];
  claps: string[];
  comments: IComment[];
  views: number;
  shares: number;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  user: IUser;
  article: string;
  content: string;
  claps: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  image: string;
  role: string;
  premium: boolean;
  followers: Pick<IUser, "_id" | "name" | "image" | "username" | "premium">[];
  following: Pick<IUser, "_id" | "name" | "image" | "username" | "premium">[];
}

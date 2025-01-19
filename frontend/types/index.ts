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
  endContent?: ReactNode;
  defaultValue?: string | null;
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

"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

import { IInputProps } from "@/types";

export default function IQInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  endContent,
  startContent,
}: IInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      endContent={endContent}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isInvalid={!!errors[name]}
      isRequired={required}
      label={label}
      size={size}
      startContent={startContent}
      type={type}
      variant={variant}
    />
  );
}

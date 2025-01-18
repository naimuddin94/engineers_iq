import { Textarea } from "@heroui/input";
import { useFormContext, useWatch } from "react-hook-form";

import { IInputProps } from "@/types";

export default function IQTextarea({
  name,
  label,
  variant = "bordered",
}: IInputProps) {
  const { register } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      label={label}
      minRows={6}
      value={currentValue || ""}
      variant={variant}
    />
  );
}

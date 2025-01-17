import { Textarea } from "@heroui/input";
import { useFormContext, useWatch } from "react-hook-form";

import { IInputProps } from "@/types";

interface IProps extends IInputProps {
  type?: string;
}

export default function IQTextarea({
  name,
  label,
  variant = "bordered",
}: IProps) {
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

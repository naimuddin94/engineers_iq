import { Textarea } from "@heroui/input";
import { useFormContext, useWatch } from "react-hook-form";

import { IInputProps } from "@/types";

interface IProps extends IInputProps {
  row?: number;
}

export default function IQTextarea({
  name,
  label,
  variant = "bordered",
  className,
  row = 6,
}: IProps) {
  const { register } = useFormContext();

  const currentValue = useWatch({ name });

  return (
    <Textarea
      {...register(name)}
      className={className}
      label={label}
      minRows={row}
      value={currentValue || ""}
      variant={variant}
    />
  );
}

import { DatePicker } from "@heroui/date-picker";
import { Controller } from "react-hook-form";

import { IInputProps } from "@/types";

export default function IQDatePicker({
  label,
  name,
  variant = "bordered",
}: IInputProps) {
  return (
    <Controller
      name={name}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          label={label}
          variant={variant}
          {...fields}
        />
      )}
    />
  );
}

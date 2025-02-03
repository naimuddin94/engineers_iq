import { Select, SelectItem } from "@heroui/select";
import { useFormContext } from "react-hook-form";

import { IInputProps } from "@/types";

interface IProps extends IInputProps {
  options: {
    key: string;
    label: string;
  }[];
  multiple?: "multiple";
}

export default function IQSelect({
  options,
  name,
  label,
  variant = "bordered",
  disabled,
  multiple,
  defaultValue,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Select
      {...register(name)}
      className="min-w-full sm:min-w-[225px]"
      defaultSelectedKeys={defaultValue}
      errorMessage={errors[name] ? (errors[name]?.message as string) : ""}
      isDisabled={disabled}
      isInvalid={errors[name] ? true : false}
      label={label}
      selectionMode={multiple}
      variant={variant}
    >
      {options.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}

"use client";

import { ChangeEvent } from "react";

interface IProps {
  multiple?: boolean;
  value?: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const IQFileInput = ({ onChange, multiple, value }: IProps) => {
  let displayValue = "Upload image";

  if (value && value.length > 30) {
    const valueArray = value.split(".");
    const fileExtension = valueArray.pop();
    const fileName = valueArray.join(".");

    displayValue = `${fileName.slice(0, 30)}....${fileExtension}`;
  } else if (value) {
    displayValue = value;
  }

  return (
    <div className="min-w-fit flex-1">
      <label
        className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400 text-center"
        htmlFor="image"
      >
        {displayValue}
      </label>
      <input
        className="hidden"
        id="image"
        multiple={multiple}
        type="file"
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default IQFileInput;

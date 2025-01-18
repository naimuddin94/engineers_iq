/* eslint-disable prettier/prettier */
"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  name: string;
}

const IQFileInput = ({ name }: IProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue(name, file); // Store the file itself in the form state
      const reader = new FileReader();

      reader.onload = () => {
        setImagePreview(reader.result as string); // Display the image preview
      };

      reader.readAsDataURL(file); // Convert the file to a data URL for preview
    }
  };

  return (
    <div className="min-w-fit flex-1">
      {imagePreview && (
        <div className="mb-4 flex justify-center">
          <Image
            alt="Preview"
            className="h-28 w-28 rounded-full object-cover"
            height={112}
            src={imagePreview}
            width={112}
          />
        </div>
      )}
      <label
        className={`flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400 text-center ${errors[name] ? "border-[#F31260]" : "border-default-200 "}`}
        htmlFor={name}
      >
        {imagePreview ? "Change image" : "Upload image"}
      </label>
      <input
        className="hidden"
        id={name}
        type="file"
        onChange={handleImageChange}
      />
      {errors[name] && (
        <span className="text-xs text-[#F31260]">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default IQFileInput;

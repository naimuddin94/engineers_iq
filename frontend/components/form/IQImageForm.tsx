/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import noimage from "@/public/no-photo.avif";
import { IInputProps } from "@/types";

export default function IQImageForm({
  name,
  label,
  placeholder,
  defaultValue,
}: IInputProps) {
  const {
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    defaultValue as null | string,
  );

  useEffect(() => {
    if (defaultValue) {
      setPreviewUrl(defaultValue);
    } else {
      setPreviewUrl(null);
    }
  }, [isSubmitSuccessful]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setValue(name, file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="col-span-2 lg:col-span-1">
      <Card className="p-3">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-foreground-400 font-semibold">{label}</h2>
          <p className="text-foreground-300 text-xs">{placeholder}</p>
        </CardHeader>
        <CardBody>
          <div className="grid gap-4">
            <div className="aspect-video bg-gray-800 rounded-md overflow-hidden">
              {previewUrl ? (
                <Image
                  alt="Product Image"
                  className="object-cover w-full h-full"
                  height={100}
                  src={previewUrl as string}
                  width={100}
                />
              ) : (
                <Image
                  alt="Product Image"
                  className="object-cover w-full h-full"
                  height={100}
                  src={noimage}
                  width={100}
                />
              )}
            </div>
            <input
              accept="image/*"
              id="file-input"
              style={{ display: "none" }}
              type="file"
              onChange={handleImageChange}
            />
            <Button
              className="justify-center"
              type="button"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            {errors[name] && (
              <span className="text-primary text-xs">
                {errors[name].message as string}
              </span>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

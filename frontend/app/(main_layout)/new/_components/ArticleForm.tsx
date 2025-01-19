/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

import ArticleInfoForm from "./ArticleInfoForm";

import IQForm from "@/components/form/IQForm";
import IQImageForm from "@/components/form/IQImageForm";

export default function ArticleForm() {
  const [content, setContent] = useState("");

  // Save a new product to the database
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <IQForm onSubmit={onSubmit}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <IQImageForm
          label="Article image"
          name="image"
          placeholder="Upload an image for your article."
        />
        <ArticleInfoForm />
      </div>
      <div className="flex justify-end mt-5">
        <Button className="min-w-28" type="submit">
          Save Article
        </Button>
      </div>
    </IQForm>
  );
}

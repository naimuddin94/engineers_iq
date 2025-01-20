/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

import ArticleInfoForm from "./ArticleInfoForm";

import IQForm from "@/components/form/IQForm";
import IQImageForm from "@/components/form/IQImageForm";
import Editor from "@/components/module/new/Editor";
// Import the Quill Snow theme

export default function ArticleForm() {
  const [content, setContent] = useState(
    "Write details description for your article.......",
  );
  // Save a new product to the database
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <IQForm onSubmit={onSubmit}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <IQImageForm
            label="Article image"
            name="image"
            placeholder="Upload an image for your article."
          />
          <ArticleInfoForm />
        </div>
        <Editor content={content} />
        <div className="flex justify-end mt-5">
          <Button size="lg" variant="faded">
            Save Article
          </Button>
        </div>
      </IQForm>
    </>
  );
}

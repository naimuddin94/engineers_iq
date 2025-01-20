/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import ArticleInfoForm from "./ArticleInfoForm";

import IQForm from "@/components/form/IQForm";
import IQImageForm from "@/components/form/IQImageForm";
import Editor from "@/components/module/new/Editor";
import { ArticleValidation } from "@/schemas/article.schema";
// Import the Quill Snow theme

export default function ArticleForm() {
  const [content, setContent] = useState(
    "Write details description for your article.......",
  );
  // Save a new product to the database
  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();

    console.log("textarea", content);
    console.log("data", data);

    if (content?.length < 500) {
      return toast.error("Description is too short");
    }
  };

  return (
    <>
      <IQForm resolver={ArticleValidation.createSchema} onSubmit={onSubmit}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <IQImageForm
            label="Article image"
            name="image"
            placeholder="Upload an image for your article."
          />
          <ArticleInfoForm />
        </div>
        <Editor content={content} setContent={setContent} />
        <div className="flex justify-end mt-5">
          <Button size="lg" type="submit" variant="faded">
            Save Article
          </Button>
        </div>
      </IQForm>
    </>
  );
}

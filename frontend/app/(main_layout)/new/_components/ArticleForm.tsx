/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import ArticleInfoForm from "./ArticleInfoForm";

import IQForm from "@/components/form/IQForm";
import IQImageForm from "@/components/form/IQImageForm";
import Loading from "@/components/loading";
import Editor from "@/components/module/new/Editor";
import { useCreateArticle } from "@/hooks/article.hook";
import { ArticleValidation } from "@/schemas/article.schema";
// Import the Quill Snow theme

export default function ArticleForm() {
  const [content, setContent] = useState(
    "Write details description for your article.......",
  );
  const router = useRouter();
  const {
    mutate: createArticleFN,
    isPending,
    error,
    isSuccess,
  } = useCreateArticle();

  // Save a new product to the database
  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();

    // Check if the content length is valid
    if (content?.length < 500) {
      return toast.error("Description is too short");
    }

    // Append content as a string to formData
    formData.append("textarea", content);

    // Loop over topics array and append each topic separately
    if (Array.isArray(data.topics)) {
      data.topics.forEach((topic: string) => {
        formData.append("topics[]", topic);
      });
    }

    // Append other form data
    for (const key in data) {
      if (key !== "topics") {
        // Avoid appending topics again
        formData.append(key, data[key]);
      }
    }

    // Send the form data to the backend
    createArticleFN(formData);
  };


  useEffect(() => {
    if (!error && isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <>
      {isPending && <Loading />}
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

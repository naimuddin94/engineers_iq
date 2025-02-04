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
import { IArticle } from "@/types";
// Import the Quill Snow theme

export default function ArticleForm({
  article,
}: {
  article: IArticle | undefined;
}) {
  const [content, setContent] = useState(
    article?.textarea || "Write details description for your article.......",
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
    if (!content || content.length < 500) {
      return toast.error("Description is too short");
    }

    const formData = new FormData();

    if (article?.textarea !== content) {
      formData.append("textarea", content);
    }

    // Append topics as individual formData entries
    data.topics?.forEach((topic: string) => formData.append("topics[]", topic));

    // Append all other fields, skipping image if it's a string
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "topics" && !(key === "image" && typeof value === "string")) {
        formData.append(key, value);
      }
    });

    // Send to backend
    // await createArticleFN(formData);

    console.log({ data, formData: Object.fromEntries(formData.entries()) });
  };

  useEffect(() => {
    if (!error && isSuccess) {
      router.push("/");
    }
  }, [isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <IQForm
        defaultValues={article}
        resolver={ArticleValidation.createSchema}
        onSubmit={onSubmit}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <IQImageForm
            defaultValue={article?.image}
            label="Article image"
            name="image"
            placeholder="Upload an image for your article."
          />
          <ArticleInfoForm article={article} />
        </div>
        <Editor content={content} setContent={setContent} />
        <div className="flex justify-end mt-5">
          <Button size="lg" type="submit" variant="faded">
            {article ? "Update" : "Save Article"}
          </Button>
        </div>
      </IQForm>
    </>
  );
}

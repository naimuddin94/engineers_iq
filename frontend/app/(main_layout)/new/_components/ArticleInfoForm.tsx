/* eslint-disable prettier/prettier */
"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";

import IQInput from "@/components/form/IQInput";
import IQSelect from "@/components/form/IQSelect";
import { categoriesData } from "@/const/article/categories";
import { topicsOptions } from "@/const/article/topics";

export default function ArticleInfoForm() {
  return (
    <div className="col-span-2 lg:col-span-2">
      <Card className="p-3 h-full">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-foreground-400 font-semibold">Article Details</h2>
          <p className="text-foreground-300 text-xs">
            Fill in the details for your new article.
          </p>
        </CardHeader>
        <CardBody>
          <div className="grid gap-6">
            <IQInput label="Title" name="title" />
            <div className="grid sm:grid-cols-2 gap-2">
              <IQSelect
                label="Category"
                name="category"
                options={categoriesData}
              />
            </div>
            <IQSelect
              label="Topics"
              multiple="multiple"
              name="topics"
              options={topicsOptions}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

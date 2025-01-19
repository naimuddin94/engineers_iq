/* eslint-disable prettier/prettier */
"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";

import IQInput from "@/components/form/IQInput";
import IQTextarea from "@/components/form/IQTextArea";

export default function ArticleInfoForm() {
  return (
    <div className="col-span-2 lg:col-span-2">
      <Card className="p-3">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-foreground-400 font-semibold">
            Article Details
          </h2>
          <p className="text-foreground-300 text-xs">
            Fill in the details for your new article.
          </p>
        </CardHeader>
        <CardBody>
          <div className="grid gap-6">
            <IQInput label="Title" name="title" />
            <IQTextarea label="Description" name="description" />
            <div className="grid sm:grid-cols-2 gap-2">
              <IQInput
                label="Price"
                name="price"
                placeholder="Enter product price"
              />
              <IQInput
                label="Stock"
                name="stock"
                placeholder="Enter product stock"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

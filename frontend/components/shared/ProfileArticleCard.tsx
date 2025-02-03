/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useUser } from "@/context/user.provider";
import { IArticle } from "@/types";
import calculateReadTime from "@/utils/calculate_read_time";
import formatDateReadable from "@/utils/format_date_readable";

interface IProps {
  article: IArticle;
}

export default function ProfileArticleCard({ article }: IProps) {
  const router = useRouter();

  const { user } = useUser();

  function updateArticle() {
    router.push(`/new?article=${article._id}`);
  }

  return (
    <Card className="mb-6 px-2 relative overflow-hidden group">
      <CardBody className={article.isPremium ? "blur-sm" : ""}>
        <Chip className="mb-2" size="sm" variant="dot">
          {article.category}
        </Chip>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-grow pr-0 md:pr-4">
            <h2 className="text-xl font-bold mb-2">{article.title}</h2>
            <div className="flex flex-wrap text-default-400 items-center gap-2 mb-4">
              <span className="text-small">
                {formatDateReadable(article.createdAt)}
              </span>
              ·
              <span className="text-small ">
                {calculateReadTime(article.textarea)} min read
              </span>
              ·<span className="text-small ">{article.views} views</span>
              {article.topics.map((tag, index) => (
                <Chip key={index} size="sm" variant="flat">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
          {article?.image && (
            <div className="w-full md:w-80 h-40 md:h-32 mb-4 md:mb-0">
              <Image
                alt={article.title}
                className="w-full h-full object-cover rounded group-hover:scale-105 duration-400"
                height={100}
                src={article?.image}
                width={100}
              />
            </div>
          )}
        </div>
      </CardBody>
      {user?.id === article?.author?._id && (
        <CardFooter className="flex gap-2">
          <Button isIconOnly size="sm" onPress={updateArticle}>
            <Edit className="text-primary" size={18} />
          </Button>
          <Button isIconOnly size="sm">
            <Trash className="text-danger" size={18} />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

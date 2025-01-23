/* eslint-disable prettier/prettier */
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import Image from "next/image";
import Link from "next/link";

import UserName from "../premium_acc_badge";

import { IArticle } from "@/types";
import calculateReadTime from "@/utils/calculate_read_time";
import formatDateReadable from "@/utils/format_date_readable";

interface IProps {
  article: IArticle;
}

export default function ArticleCard({ article }: IProps) {
  return (
    <Card className="mb-6 px-2 relative overflow-hidden">
      <CardBody className={article.isPremium ? "blur-sm" : ""}>
        <Link
          className="flex items-center mb-2 hover:underline"
          href={`/profile/${article.author.username}`}
        >
          <Avatar className="mr-2" size="sm" src={article.author.image} />
          <UserName
            isPremium={article.author.premium}
            name={article.author.name}
          />
        </Link>
        <Link href={`/articles/${article._id}`}>
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
            <div className="w-full md:w-80 h-40 md:h-24 mb-4 md:mb-0">
              <Image
                alt={article.title}
                className="w-full h-full object-cover rounded"
                height={100}
                src={article.image}
                width={100}
              />
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  );
}

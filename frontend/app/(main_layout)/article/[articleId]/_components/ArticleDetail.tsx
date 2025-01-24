/* eslint-disable prettier/prettier */
"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { Bookmark, Heart, MessageCircle, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import UserName from "@/components/premium_acc_badge";
import { IArticle } from "@/types";
import formatDateReadable from "@/utils/format_date_readable";

export default function ArticleDetail({ article }: { article: IArticle }) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={contentRef} className="mx-auto relative" id="content">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          {article?.title}
        </h1>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar name={article?.author.name} src={article?.author?.image} />
          <div>
            <Link
              className="hover:underline"
              href={`/profile/${article?.author.username}`}
            >
              <UserName
                isPremium={article?.author.premium}
                name={article?.author?.name}
              />
            </Link>
            <p className="text-sm text-gray-500">
              Published in {formatDateReadable(article?.createdAt as string)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-gray-500">
          <Button
            className={`mt-2 p-0`}
            size="sm"
            startContent={<Heart className={`w-5 h-5`} />}
            variant="light"
          >
            {article?.claps.length}
          </Button>

          <Button
            size="sm"
            startContent={<MessageCircle className="w-5 h-5" />}
            variant="light"
          >
            {article?.comments.length}
          </Button>

          <Button size="sm" variant="light">
            <Share className="w-5 h-5" />
          </Button>

          <Button
            size="sm"
            startContent={<Bookmark className="w-5 h-5" />}
            variant="light"
          />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          alt={article?.title as string}
          className="w-full h-60 md:h-[500px] object-cover mb-8 rounded-lg"
          height={300}
          src={article.image || ""}
          width={700}
        />
      </motion.div>

      <motion.div
        animate={{ opacity: 1 }}
        className={`prose max-w-none`}
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="article-content">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article?.textarea as string),
            }}
          />
        </div>
      </motion.div>

      <Card
        isBlurred
        className={`fixed bottom-1 left-1 right-1 md:left-16 md:right-16 bg-background/60 dark:bg-default-100/50 z-[100] transition-opacity duration-300`}
        shadow="sm"
      >
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Button
                className={`mt-2 p-0`}
                size="sm"
                startContent={<Heart className={`w-6 h-6`} />}
                variant="light"
              >
                {article?.claps.length}
              </Button>

              <Button
                size="sm"
                startContent={<MessageCircle className="w-6 h-6" />}
                variant="light"
              >
                {article?.comments.length}
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                size="sm"
                startContent={<Bookmark className="w-6 h-6" />}
                variant="light"
              />
              <Button isIconOnly size="sm" variant="light">
                <Share className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

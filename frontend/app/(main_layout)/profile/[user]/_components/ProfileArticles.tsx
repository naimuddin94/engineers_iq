/* eslint-disable prettier/prettier */
"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { Analytics } from "./Analytics";

import ArticleNotFound from "@/components/module/home/ArticleNotFound";
import ProfileArticleCard from "@/components/shared/ProfileArticleCard";
import CardSkeleton from "@/components/shared/Skeleton";
import { useGetAuthorArticles } from "@/hooks/article.hook";
import { IUser } from "@/types";

export default function ProfileArticles({ user }: { user: IUser }) {
  const { data, isLoading, error, refetch, isRefetching } =
    useGetAuthorArticles({
      author: user?._id,
    });

  useEffect(() => {
    refetch();
  }, [user.username]);

  return (
    <div className="lg:order-1 lg:col-span-2 order-2">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="articles" title="Articles">
            {(isLoading || isRefetching) &&
              Array.from({ length: 3 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            {data?.data &&
              data?.data?.length > 0 &&
              data?.data?.map((article, idx) => (
                <motion.div
                  key={article._id}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{
                    duration: 0.3,
                    delay: (idx + 1) * 0.2,
                  }}
                >
                  <ProfileArticleCard article={article} />
                </motion.div>
              ))}

            {data?.data?.length === 0 && <ArticleNotFound />}
            {error && (
              <div className="flex justify-center items-center h-[50vh]">
                <h1>Something happened when fetched articles</h1>
              </div>
            )}
          </Tab>
          <Tab key="analytics" title="Analytics">
            <Analytics userId={user._id} />
          </Tab>
          <Tab key="payout" isDisabled title="Payout" />
        </Tabs>
      </div>
    </div>
  );
}

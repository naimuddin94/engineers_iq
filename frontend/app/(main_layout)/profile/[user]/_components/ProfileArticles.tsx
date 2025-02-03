/* eslint-disable prettier/prettier */
"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { motion } from "framer-motion";
import { FileX } from "lucide-react";
import { useState } from "react";

import { Analytics } from "./Analytics";

import ArticleCard from "@/components/shared/ArticleCard";
import CardSkeleton from "@/components/shared/Skeleton";
import { useUser } from "@/context/user.provider";
import { useGetArticles } from "@/hooks/article.hook";
import { IUser } from "@/types";

export default function ProfileArticles({ user }: { user: IUser }) {
  const { user: currentUser } = useUser();
  const [render, setRender] = useState<
    "home" | "analytics" | "user" | "payout"
  >("home");
  const [selectedCategory, setCategory] = useState<string>("");
  const [isWonProfile, setIsWonProfile] = useState<boolean>(
    currentUser?.id === user?._id,
  );

  const { data, isLoading, error } = useGetArticles({ author: user?._id });

  return (
    <div className="lg:order-1 lg:col-span-2 order-2">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="articles" title="Articles">
            {!error && isLoading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))
            ) : data?.data && data?.data?.length > 0 ? (
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
                  <ArticleCard article={article} />
                </motion.div>
              ))
            ) : (
              <div className="min-h-[50vh] flex flex-col justify-center items-center text-center space-y-4">
                <FileX className="w-16 h-16 text-gray-400" />
                <h1 className="text-2xl font-semibold text-gray-600">
                  No articles found!
                </h1>
                <p className="text-gray-500">
                  Try searching for something else or check back later.
                </p>
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

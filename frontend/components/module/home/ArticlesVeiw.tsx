/* eslint-disable prettier/prettier */
"use client";

import { AnimatePresence, motion } from "framer-motion";

import ArticleCard from "@/components/shared/ArticleCard";
import CardSkeleton from "@/components/shared/Skeleton";
import { useGetArticles } from "@/hooks/article.hook";

export default function ArticlesView() {
  const { data, isLoading, error } = useGetArticles({});

  return (
    <>
      <AnimatePresence>
        {error && (
          <div className="flex justify-center items-center h-[50vh]">
            <h1>Something happened when fetched articles</h1>
          </div>
        )}
        {!error && isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <CardSkeleton key={idx} />
            ))
          : Array.isArray(data?.data) &&
            !isLoading &&
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
            ))}
      </AnimatePresence>
    </>
  );
}

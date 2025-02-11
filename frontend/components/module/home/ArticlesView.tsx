/* eslint-disable prettier/prettier */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import ArticleNotFound from "./ArticleNotFound";

import ArticleCard from "@/components/shared/ArticleCard";
import CardSkeleton from "@/components/shared/Skeleton";
import { useGetArticles } from "@/hooks/article.hook";
import { IFilterOptions } from "@/types";

interface IProps {
  filterData: {
    selectedCategory: string;
    selectedTopic: string;
    searchTerm: string;
  };
}

export default function ArticlesView({ filterData }: IProps) {
  const params: IFilterOptions = {};

  if (filterData?.selectedCategory?.length) {
    params.category = filterData.selectedCategory;
  }

  if (filterData?.searchTerm?.trim().length) {
    params.searchTerm = filterData.searchTerm;
  }

  if (filterData?.selectedTopic) {
    params.topics = filterData.selectedTopic;
  }

  const { data, isLoading, error, refetch, isRefetching } =
    useGetArticles(params);

  useEffect(() => {
    refetch();
  }, [filterData]);

  return (
    <>
      <AnimatePresence>
        {error && (
          <div className="flex justify-center items-center h-[50vh]">
            <h1>Something happened when fetched articles</h1>
          </div>
        )}
        {/* For loading capture in UI */}
        {isLoading &&
          Array.from({ length: 3 }).map((_, idx) => <CardSkeleton key={idx} />)}

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
              <ArticleCard article={article} />
            </motion.div>
          ))}
        {data?.data?.length === 0 && <ArticleNotFound />}
      </AnimatePresence>
    </>
  );
}

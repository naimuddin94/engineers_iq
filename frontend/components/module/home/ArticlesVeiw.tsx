/* eslint-disable prettier/prettier */
"use client";

import { AnimatePresence, motion } from "framer-motion";

import ArticleCard from "@/components/shared/ArticleCard";
import { useGetArticles } from "@/hooks/article.hook";

export default function ArticlesView() {
  const { data, isLoading, error } = useGetArticles({});

  console.log(data?.data);

  return (
    <>
      <AnimatePresence>
        {Array.isArray(data?.data) &&
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

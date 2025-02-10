/* eslint-disable prettier/prettier */
"use client";

import { Chip } from "@nextui-org/chip";
import { motion } from "framer-motion";
import { FileX } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Analytics } from "./Analytics";
import Users from "./Users";

import ArticleCard from "@/components/shared/ArticleCard";
import CardSkeleton from "@/components/shared/Skeleton";
import { categoriesData } from "@/const/article/categories";
import { useUser } from "@/context/user.provider";
import { useGetArticles } from "@/hooks/article.hook";
import { IUser } from "@/types";

export default function ProfileArticlesSection({ user }: { user: IUser }) {
  const { user: currentUser, isLoading: userLoading } = useUser();
  const [render, setRender] = useState<
    "home" | "analytics" | "user" | "payout"
  >("home");
  const [selectedCategory, setCategory] = useState<string>("");
  const [isWonProfile, setIsWonProfile] = useState<boolean>(
    currentUser?.id === user?._id,
  );
  const { data, isLoading, error } = useGetArticles({});

  useEffect(() => {
    if (currentUser?.id === user?._id) {
      setIsWonProfile(true);
    }
  }, [userLoading]);

  return (
    <div className="lg:order-1 lg:col-span-2 order-2">
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          {user?.name}
        </h1>
        <div className="flex mt-4 space-x-4 flex-wrap">
          <button
            className={`${render === "home" ? "font-medium underline" : null} cursor-pointer`}
            color="foreground"
            onClick={() => setRender("home")}
          >
            Home
          </button>
          {isWonProfile ? (
            <>
              <button
                className="cursor-pointer"
                color="foreground"
                onClick={() => toast.info("Feature Not Ready Yet!")}
              >
                Draft
              </button>
              <button
                className={`${render === "analytics" ? "font-medium underline" : null} cursor-pointer`}
                color="foreground"
                onClick={() => setRender("analytics")}
              >
                Analytics
              </button>
              {user?.role === "admin" && (
                <>
                  <button
                    className={`${render === "user" ? "font-medium underline" : null} cursor-pointer`}
                    color="foreground"
                    onClick={() => setRender("user")}
                  >
                    Users
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <button
                className="cursor-pointer"
                color="foreground"
                onClick={() => toast.info("Feature Not Ready Yet!")}
              >
                Lists
              </button>
              <button
                className="cursor-pointer"
                color="foreground"
                onClick={() => toast.info("Feature Not Ready Yet!")}
              >
                About
              </button>
            </>
          )}
        </div>
      </div>

      {/* conditional rendering */}

      {render === "home" ? (
        Array.isArray(data) && (
          <>
            <div className="mb-6 flex space-x-2 overflow-x-auto">
              <Chip className="hover:cursor-pointer" variant="flat">
                Latest
              </Chip>
              {categoriesData.slice(0, 5).map((category, indx) => (
                <Chip
                  key={indx}
                  className="hover:cursor-pointer"
                  color={selectedCategory === category ? "primary" : "default"}
                  variant="flat"
                  onClick={() =>
                    setCategory(category === selectedCategory ? "" : category)
                  }
                >
                  {category}
                </Chip>
              ))}
            </div>

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
          </>
        )
      ) : render === "analytics" ? (
        <Analytics userId={user?._id} />
      ) : (
        render === "user" && <Users />
      )}
    </div>
  );
}

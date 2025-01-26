/* eslint-disable prettier/prettier */
"use client";

import { Card, CardBody } from "@nextui-org/card";
import DOMPurify from "dompurify";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { SidebarSection } from "./sidebar_section";

import { useGetArticles } from "@/hooks/article.hook";

const fadeInUp = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function SystemPicks() {
  const { data, isLoading, error } = useGetArticles({});

  return (
    <SidebarSection title="System Picks">
      <AnimatePresence>
        {Array.isArray(data?.data) &&
          data?.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            ?.map((article) => (
              <motion.div key={article._id} variants={fadeInUp}>
                <Link
                  href={`/articles/${article.author.username}/${article._id}`}
                >
                  <Card className="mb-2 hover:scale-[102%] duration-400">
                    <CardBody>
                      <h4 className="font-semibold text-lg">{article.title}</h4>
                    </CardBody>
                  </Card>
                </Link>
              </motion.div>
            ))}
      </AnimatePresence>
    </SidebarSection>
  );
}

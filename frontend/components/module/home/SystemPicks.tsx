/* eslint-disable prettier/prettier */
"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import { SidebarSection } from "./sidebar_section";

import { useGetArticles } from "@/hooks/article.hook";
import calculateReadTime from "@/utils/calculate_read_time";
import formatDateReadable from "@/utils/format_date_readable";

const fadeInUp = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function SystemPicks() {
  const { data } = useGetArticles({});

  return (
    <SidebarSection title="System Picks">
      <AnimatePresence>
        {Array.isArray(data?.data) &&
          data?.data
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            ?.map((article) => (
              <motion.div key={article._id} variants={fadeInUp}>
                <Link href={`/article/${article._id}`}>
                  <Card className="mb-2 hover:scale-[102%] duration-400">
                    <CardBody>
                      <Chip size="sm" variant="flat">
                        {article.category}
                      </Chip>
                      <h4 className="font-semibold text-lg mt-2">{article.title}</h4>
                      <div className="flex flex-wrap text-default-400 items-center gap-2">
                        <span className="text-small">
                          {formatDateReadable(article.createdAt)}
                        </span>
                        ·
                        <span className="text-small ">
                          {calculateReadTime(article.textarea)} min read
                        </span>
                        ·
                        <span className="text-small ">
                          {article.views} views
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </motion.div>
            ))}
      </AnimatePresence>
    </SidebarSection>
  );
}

"use client";

import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useRef, useState } from "react";

import ArticlesView from "@/components/module/home/ArticlesVeiw";
import { SidebarSection } from "@/components/module/home/sidebar_section";
import Container from "@/components/shared/Container";
import { categoriesData } from "@/const/article/categories";
import { topicsData } from "@/const/article/topics";
import useDebounce from "@/hooks/debounce";

const fadeInUp = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setCategory] = useState<string>("");
  const [selectedTopic, setTopic] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <Container>
      <motion.div
        animate="animate"
        exit="exit"
        initial="initial"
        variants={fadeInUp}
      >
        <div
          className={`transition-all duration-200 ease-in-out ${isFocused ? "scale-[102%]" : "scale-100"}`}
        >
          <Input
            ref={searchInputRef}
            aria-label="Search"
            className="focus:ring-0"
            endContent={
              <>
                <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd>
              </>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
        </div>

        <motion.div
          className="min-h-screen bg-background mt-10"
          variants={fadeInUp}
        >
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div
                className="w-full lg:w-2/3"
                variants={staggerChildren}
              >
                <motion.div
                  className="mb-6 flex space-x-2 overflow-x-auto"
                  variants={fadeInUp}
                >
                  <AnimatePresence mode="sync">
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      initial={{ opacity: 0, x: -50 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.2,
                      }}
                    >
                      <Chip
                        className="hover:cursor-pointer"
                        color={!selectedCategory ? "primary" : "default"}
                        variant="flat"
                        onClick={() => setCategory("")}
                      >
                        For you
                      </Chip>
                    </motion.div>
                    {categoriesData.slice(0, 5).map((category, indx) => (
                      <motion.div
                        key={indx}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        initial={{ opacity: 0, x: -50 }}
                        transition={{
                          duration: 0.3,
                          delay: (indx + 1) * 0.2,
                        }}
                      >
                        <Chip
                          className="hover:cursor-pointer"
                          color={
                            selectedCategory === category.key
                              ? "primary"
                              : "default"
                          }
                          variant="flat"
                          onClick={() =>
                            setCategory(
                              category.key === selectedCategory
                                ? ""
                                : category.key,
                            )
                          }
                        >
                          {category.label}
                        </Chip>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                <ArticlesView />
              </motion.div>

              <motion.div className="w-full lg:w-1/3" variants={fadeInUp}>
                <div className="sticky top-20">
                  {/* <SidebarSection title="System Picks">
                    <AnimatePresence>
                      {Array.isArray(data) &&
                        data
                          .sort(() => 0.5 - Math.random())
                          .slice(0, 3)
                          ?.map((article) => (
                            <motion.div key={article._id} variants={fadeInUp}>
                              <Link
                                href={`/articles/${article.author.username}/${article._id}`}
                              >
                                <Card className="mb-2">
                                  <CardBody>
                                    <h4 className="font-semibold">
                                      {article.title}
                                    </h4>
                                    <p className="text-small text-default-500">
                                      {article.textArea.slice(0, 40)} ...
                                    </p>
                                  </CardBody>
                                </Card>
                              </Link>
                            </motion.div>
                          ))}
                    </AnimatePresence>
                  </SidebarSection> */}

                  <SidebarSection title="Recommended topics">
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={staggerChildren}
                    >
                      <AnimatePresence>
                        {topicsData
                          .slice(0, topicsData.length / 2)
                          .reverse()
                          .map((topic) => (
                            <motion.div key={topic.key} variants={fadeInUp}>
                              <Chip
                                className="hover:cursor-pointer"
                                color={
                                  selectedTopic === topic.key
                                    ? "primary"
                                    : "default"
                                }
                                variant="flat"
                                onClick={() =>
                                  setTopic(
                                    topic.key === selectedTopic
                                      ? ""
                                      : topic.key,
                                  )
                                }
                              >
                                {topic.label}
                              </Chip>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </motion.div>
                  </SidebarSection>
                  {/* {currentUser && (
                    <SidebarSection title="Who to follow">
                      <motion.div
                        className="space-y-4"
                        variants={staggerChildren}
                      >
                        <AnimatePresence>
                          {whoToFollow?.map(
                            (user: IWhoToFollowResponse, indx) => (
                              <motion.div
                                key={user._id}
                                className="flex items-center justify-between"
                                variants={fadeInUp}
                              >
                                <Link
                                  className="flex items-center"
                                  href={`/profile/${user.username}`}
                                >
                                  <Avatar
                                    className="mr-2"
                                    size="sm"
                                    src={user?.profileImg}
                                  />
                                  <div>
                                    <UserName
                                      isPremium={user.isPremiumMember}
                                      name={user.name}
                                    />
                                    <p className="text-small text-default-500">
                                      @{user.username}
                                    </p>
                                  </div>
                                </Link>
                                <Button
                                  isLoading={loading === indx}
                                  size="sm"
                                  variant="flat"
                                  onClick={() =>
                                    handleFollowNewPerson(user, indx)
                                  }
                                >
                                  Follow
                                </Button>
                              </motion.div>
                            ),
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </SidebarSection>
                  )} */}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
}

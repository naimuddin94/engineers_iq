"use client";

import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { categoriesData } from "@/const/article/categories";
import useDebounce from "@/hooks/debounce";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setCategory] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // setCurrentPage(1);
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <motion.div
      animate="animate"
      className="-mt-14"
      exit="exit"
      initial="initial"
      variants={fadeInUp}
    >
      <div
        className={`transition-all duration-200 ease-in-out ${isFocused ? "scale-105" : "scale-100"}`}
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
            <motion.div className="w-full lg:w-2/3" variants={staggerChildren}>
              <motion.div
                className="mb-6 flex space-x-2 overflow-x-auto"
                variants={fadeInUp}
              >
                <AnimatePresence>
                  <motion.div key="latest" variants={fadeInUp}>
                    <Chip
                      className="hover:cursor-pointer"
                      color={!selectedCategory ? "primary" : "default"}
                      variant="flat"
                      onClick={() => setCategory("")}
                    >
                      For You
                    </Chip>
                  </motion.div>
                  {categoriesData.slice(0, 5).map((category, indx) => (
                    <motion.div key={indx} variants={fadeInUp}>
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
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

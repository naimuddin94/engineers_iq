/* eslint-disable prettier/prettier */
"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
//@ts-ignore
import html2pdf from "html2pdf.js";
import {
  Bookmark,
  Clipboard,
  ClipboardCheck,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

// static img ofr sharing
import { toast } from "sonner";

import UserName from "@/components/premium_acc_badge";
import { useUser } from "@/context/user.provider";
import { useClapOmArticle } from "@/hooks/article.hook";
import facebook from "@/public/share/facebook.png";
import linkedin from "@/public/share/linkedin.png";
import mail from "@/public/share/mail.png";
import twitter from "@/public/share/twitter.png";
import wp from "@/public/share/wp.png";
import { IArticle } from "@/types";
import formatDateReadable from "@/utils/format_date_readable";

export default function ArticleDetail({ article }: { article: IArticle }) {
  const [coped, setCoped] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { user } = useUser();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function handleDownload() {
    const element = contentRef.current;

    if (!element) return;

    const options = {
      margin: 0.5,
      filename: `${article?.title}-offline-engineersiq.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        backgroundColor: "#000",
        useCORS: true,
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  }

  // copy link
  function handleCopyLink() {
    const url = window.location.href;

    navigator.clipboard.writeText(url);
    setCoped(true);

    setTimeout(() => {
      setCoped(false);
    }, 1000);
  }

  function handleSocialShare(media: string) {
    if (media === "facebook") {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href,
      )}`;

      window.open(url, "_blank", "width=700,height=500");
    } else if (media === "mail") {
      const subject = `Check out ${article?.title}`;
      const body = `I thought you might be interested in this article: ${window.location.href}`;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
    } else if (media === "linkedin") {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href,
      )}`;

      window.open(url, "_blank");
    } else if (media === "twitter") {
      const text = `Check out ${article?.title}`;
      const url = encodeURIComponent(window.location.href);
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&url=${url}`;

      window.open(twitterUrl, "_blank", "width=600,height=400");
    } else if (media === "whatsapp") {
      const text = `Check out ${article?.title}` + " " + window.location.href;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

      window.open(whatsappUrl, "_blank");
    }
  }

  // For claps on article
  const { mutate: clapFN } = useClapOmArticle();

  function handleClap() {
    if (!user) {
      return toast.error("You must be logged in");
    }
    clapFN(article._id);
  }

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        placement="auto"
        size="lg"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Share <span className="text-sm font-light">{article?.title}</span>{" "}
            </ModalHeader>
            <ModalBody>
              <div className="flex gap-4 justify-center items-center mt-8">
                <Image
                  alt="Facebook icon"
                  className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                  quality={100}
                  src={facebook}
                  onClick={() => handleSocialShare("facebook")}
                />
                <Image
                  alt="Email icon"
                  className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                  quality={100}
                  src={mail}
                  onClick={() => handleSocialShare("mail")}
                />
                <Image
                  alt="Linkedin icon"
                  className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                  quality={100}
                  src={linkedin}
                  onClick={() => handleSocialShare("linkedin")}
                />
                <Image
                  alt="twitter icon"
                  className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                  quality={100}
                  src={twitter}
                  onClick={() => handleSocialShare("twitter")}
                />
                <Image
                  alt="wp icon"
                  className="w-10 transition-all hover:scale-110 hover:cursor-pointer"
                  quality={100}
                  src={wp}
                  onClick={() => handleSocialShare("whatsapp")}
                />
              </div>
              <div className="mt-7 mb-2 flex justify-center items-center ">
                <Button
                  color="primary"
                  variant="bordered"
                  onClick={handleCopyLink}
                >
                  Copy Link{" "}
                  {!coped ? (
                    <Clipboard size={20} />
                  ) : (
                    <ClipboardCheck size={20} />
                  )}
                </Button>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
      <div ref={contentRef} className="mx-auto relative" id="content">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            {article?.title}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar name={article?.author.name} src={article?.author?.image} />
            <div>
              <Link
                className="hover:underline"
                href={`/profile/${article?.author.username}`}
              >
                <UserName
                  isPremium={article?.author.premium}
                  name={article?.author?.name}
                />
              </Link>
              <p className="text-sm text-gray-500">
                Published in {formatDateReadable(article?.createdAt as string)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-500">
            <Button
              className={`mt-2 p-0`}
              size="sm"
              startContent={<Heart className={`w-5 h-5`} />}
              variant="light"
            >
              {article?.claps.length}
            </Button>

            <Button
              size="sm"
              startContent={<MessageCircle className="w-5 h-5" />}
              variant="light"
            >
              {article?.comments.length}
            </Button>

            <Button size="sm" variant="light">
              <Share className="w-5 h-5" />
            </Button>

            <Button
              size="sm"
              startContent={<Bookmark className="w-5 h-5" />}
              variant="light"
            />
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            alt={article?.title as string}
            className="w-full h-60 md:h-[500px] object-cover mb-8 rounded-lg"
            height={300}
            src={article.image || ""}
            width={700}
          />
        </motion.div>

        <motion.div
          animate={{ opacity: 1 }}
          className={`prose max-w-none`}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="article-content">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(article?.textarea as string),
              }}
            />
          </div>
        </motion.div>

        <Card
          isBlurred
          className={`fixed bottom-1 left-1 right-1 md:left-16 md:right-16 bg-background/60 dark:bg-default-100/50 z-[100] transition-opacity duration-300`}
          shadow="sm"
        >
          <CardBody>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  className={`mt-2 p-0`}
                  size="sm"
                  startContent={<Heart className={`w-6 h-6`} />}
                  variant="light"
                  onPress={handleClap}
                >
                  {article?.claps.length}
                </Button>

                <Button
                  size="sm"
                  startContent={<MessageCircle className="w-6 h-6" />}
                  variant="light"
                >
                  {article?.comments.length}
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  size="sm"
                  startContent={<Bookmark className="w-6 h-6" />}
                  variant="light"
                  onPress={handleDownload}
                />
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => onOpen()}
                >
                  <Share className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

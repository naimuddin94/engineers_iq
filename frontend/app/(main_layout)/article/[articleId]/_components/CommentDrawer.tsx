import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, Heart, Save, Send, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import IQForm from "@/components/form/IQForm";
import IQTextarea from "@/components/form/IQTextArea";
import UserName from "@/components/premium_acc_badge";
import { useUser } from "@/context/user.provider";
import {
  useAddComment,
  useClapOnComment,
  useRemoveComment,
  useUpdateComment,
} from "@/hooks/article.hook";
import { IComment } from "@/types";
import formatDateReadable from "@/utils/format_date_readable";

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: IComment[];
  articleId: string;
  author: string;
}

export default function CommentDrawer({
  isOpen,
  onClose,
  comments,
  articleId,
  author,
}: CommentDrawerProps) {
  const { user } = useUser();
  const [commentUpdateAction, setCommentUpdateAction] = useState<number | null>(
    null,
  );
  const [commentUpdatedContent, setCommentUpdatedContent] = useState<
    string | null
  >(null);

  // For add new comments
  const { mutate: addCommentFN, isPending } = useAddComment();

  const handleAddComment = async (data: FieldValues) => {
    if (!user) {
      toast.error("You are not logged in", {
        position: "bottom-left",
      });

      return;
    }
    addCommentFN({ content: data.content, articleId });
  };

  // For edit comments
  const { mutate: commentUpdateFN } = useUpdateComment();

  const handleEditComment = async (commentId: string) => {
    if (!commentUpdatedContent) {
      setCommentUpdateAction(null);

      return;
    }

    const toastId = toast.loading("Updating comment....", {
      position: "bottom-left",
    });

    commentUpdateFN(
      { commentId, content: commentUpdatedContent },
      {
        onSuccess: function (data) {
          toast.success(data?.message, {
            id: toastId,
            position: "bottom-left",
          });
          // Reset edit state
          setCommentUpdateAction(null);
          setCommentUpdatedContent(null);
        },
        onError: function (error) {
          toast.error(error?.message, { id: toastId, position: "bottom-left" });
        },
      },
    );
  };

  // For liked comment
  const { mutate: commentClapFN } = useClapOnComment();

  const handleLikeComment = async (commentId: string) => {
    if (!user) {
      toast.error("You are not logged in", {
        position: "bottom-left",
      });

      return;
    }

    commentClapFN(commentId);
  };

  // For removing comment

  const { mutate: commentRemoveFN } = useRemoveComment();

  const handelDeleteComment = async (commentId: string) => {
    const toastId = toast.loading("Remove comment....", {
      position: "bottom-left",
    });

    commentRemoveFN(commentId, {
      onSuccess: function (data) {
        toast.success(data?.message, { id: toastId, position: "bottom-left" });
      },
      onError: function (error) {
        toast.error(error?.message, { id: toastId, position: "bottom-left" });
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black mb-12 md:mb-0 bg-opacity-50 md:z-[90000000000000]"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            animate={{ x: 0 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-black shadow-lg"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">
                Responses ({comments.length})
              </h2>
              <Button isIconOnly variant="light" onPress={onClose}>
                <X size={24} />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-70px)]">
              <IQForm onSubmit={handleAddComment}>
                <IQTextarea
                  className="mb-2"
                  label="What are your thoughts?"
                  name="content"
                  row={3}
                  variant="flat"
                />
                <Button
                  endContent={<Send className="w-4 h-4" />}
                  isLoading={isPending}
                  type="submit"
                  variant="flat"
                >
                  Respond
                </Button>
              </IQForm>
              <div className="space-y-4 mt-2">
                {comments
                  .slice()
                  .reverse()
                  .map((comment, index) => {
                    const hasClapped = comment.claps?.some(
                      (id) => id === user?.id,
                    );
                    const hasWonComment = comment.user._id === user?.id;

                    return (
                      <motion.div
                        key={index}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex space-x-3"
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div>
                          <Avatar
                            name={comment.user.name}
                            src={comment.user.image}
                          />
                        </div>
                        <div className="flex-grow text-sm">
                          <UserName
                            isPremium={comment.user.premium}
                            name={comment.user.name}
                          />
                          {/* <p className="font-semibold">{comment.user.name}</p> */}
                          <p className="text-sm text-gray-500">
                            {comment.updatedAt
                              ? "Edited" +
                                " " +
                                formatDateReadable(comment.updatedAt)
                              : formatDateReadable(comment.createdAt)}
                          </p>

                          {commentUpdateAction === index ? (
                            <input
                              className="border mt-1 border-gray-500 block rounded-md py-1 px-2"
                              defaultValue={comment.content}
                              type="text"
                              onChange={(e) =>
                                setCommentUpdatedContent(e.target.value)
                              }
                            />
                          ) : (
                            <p className="mt-1">{comment.content}</p>
                          )}

                          {!hasWonComment ? (
                            <>
                              <Button
                                className={`mt-2 p-0 ${hasClapped ? "text-danger" : "text-gray-500"}`}
                                size="sm"
                                startContent={
                                  <Heart
                                    className={`w-4 h-4 ${hasClapped ? "fill-current text-danger" : ""}`}
                                  />
                                }
                                variant="light"
                                onPress={() => handleLikeComment(comment._id)}
                              >
                                {comment.claps.length}
                              </Button>
                              {user?.id === author && (
                                <Button
                                  isIconOnly
                                  className={`mt-2 p-0 text-danger`}
                                  size="sm"
                                  startContent={<Trash className={`w-4 h-4`} />}
                                  variant="light"
                                  onPress={() =>
                                    handelDeleteComment(comment._id)
                                  }
                                />
                              )}
                            </>
                          ) : commentUpdateAction !== index ? (
                            <>
                              <Button
                                className={`mt-2 p-0 text-gray-500`}
                                size="sm"
                                startContent={<Heart className={`w-4 h-4`} />}
                                variant="light"
                                onPress={() => {
                                  toast.error(
                                    "You cannot applaud your won comments!",
                                    {
                                      position: "bottom-left",
                                    },
                                  );
                                }}
                              >
                                {comment.claps.length}
                              </Button>

                              <Button
                                isIconOnly
                                className={`mt-2 p-0 text-gray-500`}
                                size="sm"
                                startContent={<Edit className={`w-4 h-4`} />}
                                variant="light"
                                onPress={() => setCommentUpdateAction(index)}
                              />
                              <Button
                                isIconOnly
                                className={`mt-2 p-0 text-danger`}
                                size="sm"
                                startContent={<Trash className={`w-4 h-4`} />}
                                variant="light"
                                onPress={() => handelDeleteComment(comment._id)}
                              />
                            </>
                          ) : (
                            <>
                              <Button
                                isIconOnly
                                className={`mt-2 p-0 text-gray-500`}
                                size="sm"
                                startContent={<Save className={`w-4 h-4`} />}
                                variant="light"
                                onPress={() => handleEditComment(comment._id)}
                              />

                              <Button
                                isIconOnly
                                className={`mt-2 p-0 text-gray-500`}
                                size="sm"
                                startContent={<X className={`w-4 h-4`} />}
                                variant="light"
                                onPress={() => setCommentUpdateAction(null)}
                              />
                            </>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

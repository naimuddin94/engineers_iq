/* eslint-disable prettier/prettier */
"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { Trash2 } from "lucide-react";

import { useRemoveArticle } from "@/hooks/article.hook";

interface IProps {
  articleId: string;
}

export default function DeleteModal({ articleId }: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { mutate: deleteArticle, isPending } = useRemoveArticle();

  const handleDelete = (onClose: () => void) => {
    deleteArticle(articleId);
    onClose();
  };

  return (
    <>
      <Button isIconOnly size="sm" onPress={onOpen}>
        <Trash2 className="text-danger" size={18} />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to delete this article?
              </ModalHeader>
              <ModalBody>
                <p>
                  This action cannot be undone, and you will lose all related
                  data.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancel</Button>
                <Button
                  color="danger"
                  isLoading={isPending}
                  onPress={() => handleDelete(onClose)}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

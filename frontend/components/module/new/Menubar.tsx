/* eslint-disable prettier/prettier */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useCurrentEditor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CircleXIcon,
  CodeXmlIcon,
  CornerDownLeftIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Highlighter,
  ItalicIcon,
  LinkIcon,
  List,
  ListOrderedIcon,
  MinusIcon,
  PaletteIcon,
  RedoIcon,
  StrikethroughIcon,
  TextQuoteIcon,
  TypeIcon,
  UndoIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MenuBar() {
  const { editor } = useCurrentEditor();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [link, setLink] = useState("");

  if (!editor) {
    return null;
  }

  const handleApplyLink = (onClose: () => void) => {
    if (!link.includes("http")) {
      return toast.error("Please enter valid link");
    }

    if (link.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      toast.success("Link removed!");
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: link.trim() })
        .run();
      toast.success("Link applied!");
    }
    onClose();
  };

  return (
    <div className="mb-4">
      <div className="border-2 border-foreground-100 p-3 flex gap-1 flex-wrap rounded-xl">
        <Button
          isIconOnly
          className={editor.isActive("bold") ? "bg-cyan-600" : ""}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon size={15} />
        </Button>
        <Button
          isIconOnly
          className={editor.isActive("italic") ? "bg-cyan-600" : ""}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon size={15} />
        </Button>
        <Button
          isIconOnly
          className={editor.isActive("strike") ? "bg-cyan-600" : ""}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon size={15} />
        </Button>
        <Button
          isIconOnly
          className={editor.isActive("code") ? "bg-cyan-600" : ""}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Highlighter size={15} />
        </Button>
        <Button
          isIconOnly
          className={
            editor.isActive({ textAlign: "left" }) ? "bg-cyan-600" : ""
          }
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeftIcon size={15} />
        </Button>
        <Button
          isIconOnly
          className={
            editor.isActive({ textAlign: "center" }) ? "bg-cyan-600" : ""
          }
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={15} />
        </Button>
        <Button
          isIconOnly
          className={
            editor.isActive({ textAlign: "right" }) ? "bg-cyan-600" : ""
          }
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRightIcon size={15} />
        </Button>
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <CircleXIcon size={15} />
        </Button>
        <Button
          isIconOnly
          className={editor.isActive("paragraph") ? "bg-cyan-600" : ""}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <TypeIcon size={15} />
        </Button>
        <Button
          isIconOnly
          className={
            editor.isActive("heading", { level: 1 }) ? "bg-cyan-600" : ""
          }
          size="sm"
          variant="flat"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1Icon size={15} />
        </Button>
        <Button
          isIconOnly
          className={
            editor.isActive("heading", { level: 2 }) ? "bg-cyan-600" : ""
          }
          size="sm"
          variant="flat"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2Icon size={15} />
        </Button>
        <Button
          isIconOnly
          className={
            editor.isActive("heading", { level: 3 }) ? "bg-cyan-600" : ""
          }
          size="sm"
          variant="flat"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3Icon size={15} />
        </Button>
        <Button
          isIconOnly
          className={editor.isActive("bulletList") ? "bg-cyan-600" : ""}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={15} />
        </Button>
        <Button
          isIconOnly
          className={editor.isActive("orderedList") ? "bg-cyan-600" : ""}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrderedIcon size={15} />
        </Button>
        <Button
          isIconOnly
          className={editor.isActive("codeBlock") ? "bg-cyan-600" : ""}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <CodeXmlIcon size={15} />
        </Button>
        <Button
          isIconOnly
          className={editor.isActive("blockquote") ? "bg-cyan-600" : ""}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <TextQuoteIcon size={15} />
        </Button>
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MinusIcon size={15} />
        </Button>
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <CornerDownLeftIcon size={15} />
        </Button>
        <Button
          isIconOnly
          disabled={!editor.can().chain().focus().undo().run()}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon size={15} />
        </Button>
        <Button
          isIconOnly
          disabled={!editor.can().chain().focus().redo().run()}
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon size={15} />
        </Button>
        <Button
          isIconOnly
          className={
            editor.isActive("textStyle", { color: "#FF204E" })
              ? "bg-cyan-600"
              : ""
          }
          size="sm"
          variant="flat"
          onClick={() => editor.chain().focus().setColor("#FF204E").run()}
        >
          <PaletteIcon size={15} />
        </Button>

        <Button
          isIconOnly
          className={editor.isActive("link") ? "bg-cyan-600" : ""}
          size="sm"
          variant="flat"
          onPress={onOpen}
        >
          <LinkIcon size={15} />
        </Button>
      </div>

      {/* NextUI Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Enter URL here
              </ModalHeader>
              <ModalBody>
                <Input
                  fullWidth
                  className="rounded-md"
                  placeholder="Enter URL"
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => handleApplyLink(onClose)}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

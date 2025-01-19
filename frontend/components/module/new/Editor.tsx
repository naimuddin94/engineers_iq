/* eslint-disable prettier/prettier */

import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="border-2 border-foreground-100 p-3 flex gap-1 flex-wrap rounded-xl">
        <Button
          className={editor.isActive("bold") ? "bg-orange-700" : ""}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>
        <Button
          className={editor.isActive("italic") ? "bg-orange-700" : ""}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>
        <Button
          className={editor.isActive("strike") ? "bg-orange-700" : ""}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          Strike
        </Button>
        <Button
          className={editor.isActive("code") ? "bg-orange-700" : ""}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          Code
        </Button>
        <Button
          className={
            editor.isActive({ textAlign: "left" }) ? "bg-orange-700" : ""
          }
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          Left
        </Button>
        <Button
          className={
            editor.isActive({ textAlign: "center" }) ? "bg-orange-700" : ""
          }
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center
        </Button>
        <Button
          className={
            editor.isActive({ textAlign: "right" }) ? "bg-orange-700" : ""
          }
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right
        </Button>
        <Button
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Clear marks
        </Button>
        <Button
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Clear nodes
        </Button>
        <Button
          className={editor.isActive("paragraph") ? "bg-orange-700" : ""}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          Paragraph
        </Button>
        <Button
          className={
            editor.isActive("heading", { level: 1 }) ? "bg-orange-700" : ""
          }
          size="sm"
          variant="bordered"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </Button>
        <Button
          className={
            editor.isActive("heading", { level: 2 }) ? "bg-orange-700" : ""
          }
          size="sm"
          variant="bordered"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Button>
        <Button
          className={
            editor.isActive("heading", { level: 3 }) ? "bg-orange-700" : ""
          }
          size="sm"
          variant="bordered"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </Button>
        <Button
          className={
            editor.isActive("heading", { level: 4 }) ? "bg-orange-700" : ""
          }
          size="sm"
          variant="bordered"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
        >
          H4
        </Button>
        <Button
          className={
            editor.isActive("heading", { level: 5 }) ? "bg-orange-700" : ""
          }
          size="sm"
          variant="bordered"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
        >
          H5
        </Button>
        <Button
          className={
            editor.isActive("heading", { level: 6 }) ? "bg-orange-700" : ""
          }
          size="sm"
          variant="bordered"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
        >
          H6
        </Button>
        <Button
          className={editor.isActive("bulletList") ? "bg-orange-700" : ""}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet list
        </Button>
        <Button
          className={editor.isActive("orderedList") ? "bg-orange-700" : ""}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          Ordered list
        </Button>
        <Button
          className={editor.isActive("codeBlock") ? "bg-orange-700" : ""}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code block
        </Button>
        <Button
          className={editor.isActive("blockquote") ? "bg-orange-700" : ""}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Blockquote
        </Button>
        <Button
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </Button>
        <Button
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Hard break
        </Button>
        <Button
          disabled={!editor.can().chain().focus().undo().run()}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </Button>
        <Button
          disabled={!editor.can().chain().focus().redo().run()}
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </Button>
        <Button
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "bg-orange-700"
              : ""
          }
          size="sm"
          variant="bordered"
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
        >
          Purple
        </Button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  //@ts-ignore
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    heading: { levels: [1, 2, 3, 4, 5, 6] },
    bulletList: {
      keepMarks: true,
      keepAttributes: true,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: true,
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

export default function Editor({ content }: { content: string }) {
  return (
    <Card className="p-5">
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-foreground-400 font-semibold">
          Article Description
        </h2>
        <p className="text-foreground-300 text-xs">
          Fill in the details for your new article.
        </p>
      </CardHeader>
      <EditorProvider
        content={content}
        editorProps={{
          attributes: {
            class:
              "border-2 p-3 rounded-xl border-foreground-200 min-h-72 focus:outline-none focus:border-[#71717A]",
          },
        }}
        extensions={extensions}
        slotBefore={<MenuBar />}
      />
    </Card>
  );
}

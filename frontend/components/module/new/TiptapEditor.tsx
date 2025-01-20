/* eslint-disable prettier/prettier */
import RichTextEditor, { BaseKit } from "reactjs-tiptap-editor";

interface IProps {
  content: string;
  setContent: (value: any) => void;
}

const extensions = [
  BaseKit.configure({
    // Show placeholder
    placeholder: {
      showOnlyCurrent: true,
    },

    // Character count
    characterCount: {
      limit: 50_000,
    },
  }),
];

export default function TiptapEditor({ content, setContent }: IProps) {
  return (
    <RichTextEditor
      content={content}
      extensions={extensions}
      output="html"
      onChangeContent={(value) => setContent(value)}
    />
  );
}

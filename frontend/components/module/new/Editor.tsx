/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
"use client";

import { Card, CardHeader } from "@nextui-org/card";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction } from "react";

const EditorProvider = dynamic(
  () => import("@tiptap/react").then((mod) => mod.EditorProvider),
  { ssr: false },
);

const MenuBar = dynamic(() => import("./Menubar"), { ssr: false });

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
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme,
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          "example-phishing.com",
          "malicious-site.net",
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          "example-no-autolink.com",
          "another-no-autolink.com",
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
];

interface IProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

export default function Editor({ content, setContent }: IProps) {
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
              "border-2 p-3 rounded-xl border-foreground-200 min-h-72 focus:outline-none dark:focus:border-gray-300 focus:border-gray-700",
          },
        }}
        extensions={extensions}
        slotBefore={<MenuBar />}
        onUpdate={({ editor }) => setContent(editor.getHTML())}
      />
    </Card>
  );
}

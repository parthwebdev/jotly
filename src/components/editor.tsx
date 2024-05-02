"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

type EditorProps = {
  initialContent: string;
  // onChange: () => void;
};

const Editor = ({ initialContent }: EditorProps) => {
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  return <BlockNoteView editor={editor} editable theme="dark" />;
};

export default Editor;

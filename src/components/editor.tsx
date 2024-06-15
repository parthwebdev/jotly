"use client";

import { type BlockNoteEditor, type PartialBlock } from "@blocknote/core";
import { useCreateBlockNote, BlockNoteView } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { updateDocument } from "@/lib/supabase/queries";
import { useAppState } from "./providers/state-provider";
import { useParams } from "next/navigation";

type EditorProps = {
  initialContent: string;
  documentId: string;
  // onChange: (content: string) => void;
};

const Editor = ({ initialContent, documentId }: EditorProps) => {
  const { dispatch } = useAppState();
  const { workspaceId } = useParams();

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
  });

  const onChange = async (content: string) => {
    // update server state
    await updateDocument(documentId, { data: content });

    // Update local state
    dispatch({
      type: "UPDATE_DOCUMENT",
      payload: {
        workspaceId: workspaceId as string,
        documentId,
        document: { data: content },
      },
    });
  };

  return (
    <BlockNoteView
      editor={editor}
      editable
      theme="dark"
      data-theming
      onChange={() => onChange(JSON.stringify(editor.document))}
    />
  );
};

export default Editor;

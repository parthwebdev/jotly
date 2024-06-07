"use client";

import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { createDocument } from "@/lib/supabase/queries";
import { useAppState } from "@/components/providers/state-provider";
import { SelectDocument } from "@/lib/supabase/schema";

const CreateDocument = ({ workspaceId }: { workspaceId: string }) => {
  const { dispatch } = useAppState();
  const handleCreate = async () => {
    const newDocument: SelectDocument = {
      id: uuidv4(),
      workspaceId,
      title: "Untitled",
      icon: "📄",
      data: null,
      banner: null,
      inTrash: false,
      createdAt: new Date().toISOString(),
      parentId: null,
    };

    dispatch({
      type: "ADD_DOCUMENT",
      payload: {
        workspaceId,
        document: newDocument,
      },
    });

    const { error } = await createDocument(newDocument);

    if (error) toast.error("Cannot create document.");

    toast.success("New document created!");

    // TODO: Navigate to the newly created document page
  };

  return (
    <button
      onClick={handleCreate}
      className="
        w-full py-1 px-4 flex items-center gap-2
        text-muted-foreground text-sm hover:bg-secondary/60
      "
    >
      <PlusCircle className="size-4" />
      <span>New Document</span>
    </button>
  );
};
export default CreateDocument;

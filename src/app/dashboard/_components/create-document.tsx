"use client";

import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { createDocument } from "@/lib/supabase/queries";

const CreateDocument = ({ workspaceId }: { workspaceId: string }) => {
  const handleCreate = async () => {
    // TODO: Update local state

    const { error } = await createDocument(workspaceId);

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

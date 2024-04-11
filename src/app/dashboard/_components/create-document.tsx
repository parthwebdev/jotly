"use client";

import { createDocument } from "@/lib/supabase/queries";
import { PlusCircle } from "lucide-react";

const CreateDocument = ({ workspaceId }: { workspaceId: string }) => {
  const handleCreate = async () => {
    await createDocument(workspaceId);

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

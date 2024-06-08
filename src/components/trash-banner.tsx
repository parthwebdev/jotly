"use client";

import { Button } from "./ui/button";
import { deleteDocument } from "@/lib/supabase/queries";
import { useAppState } from "./providers/state-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const TrashBanner = ({
  workspaceId,
  documentId,
}: {
  workspaceId: string;
  documentId: string;
}) => {
  const { state, dispatch } = useAppState();
  const router = useRouter();

  const currentDoc = useMemo(() => {
    return state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.documents.find((doc) => doc.id === documentId);
  }, [workspaceId, documentId, state.workspaces]);

  const handleRestore = () => {};

  const handleDelete = async () => {
    const { error } = await deleteDocument(documentId);

    dispatch({
      type: "DELETE_DOCUMENT",
      payload: { workspaceId, documentId: documentId },
    });

    if (error) toast.error("Failed to delete document.");
    else toast.success("Document Deleted!");

    router.replace(`/dashboard/${workspaceId}`);
  };

  return (
    <>
      {currentDoc?.inTrash && (
        <article className="py-2 z-40 bg-[#EB5757] flex  md:flex-row flex-col justify-center items-center gap-4 flex-wrap">
          <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
            <span className="text-white">This document is in the trash.</span>
            <Button
              size="sm"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-[#EB5757]"
              onClick={handleRestore}
            >
              Restore
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white
             hover:text-[#EB5757]"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </article>
      )}
    </>
  );
};
export default TrashBanner;

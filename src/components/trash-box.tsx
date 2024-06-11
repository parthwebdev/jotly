"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FolderIcon } from "lucide-react";

import { useAppState } from "./providers/state-provider";

interface TrashBoxProps {
  workspaceId: string;
  onOpenChange?: () => void;
}

const TrashBox = ({ workspaceId, onOpenChange }: TrashBoxProps) => {
  const router = useRouter();
  const { state } = useAppState();

  const documents = useMemo(() => {
    return state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.documents.filter((doc) => doc.inTrash === true);
  }, [workspaceId, state.workspaces]);

  return (
    <section>
      {!!documents?.length ? (
        <>
          {documents.map((document) => (
            <button
              className="hover:bg-muted rounded-md p-2 flex item-center justify-between w-full"
              onClick={() => {
                router.replace(`/dashboard/${workspaceId}/${document?.id}`);
                onOpenChange?.();
              }}
              key={document?.id}
            >
              <article>
                <aside className="flex items-center gap-2">
                  <FolderIcon />
                  {document?.title}
                </aside>
              </article>
            </button>
          ))}
        </>
      ) : (
        <div
          className="
          text-muted-foreground
          absolute
          top-[50%]
          left-[50%]
          transform
          -translate-x-1/2
          -translate-y-1/2

      "
        >
          No Items in trash
        </div>
      )}
    </section>
  );
};
export default TrashBox;

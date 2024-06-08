"use client";

import { useMemo } from "react";
import Link from "next/link";

import { FolderIcon } from "lucide-react";

import { useAppState } from "./providers/state-provider";

const TrashBox = ({ workspaceId }: { workspaceId: string }) => {
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
            <Link
              className="hover:bg-muted
                rounded-md
                p-2
                flex
                item-center
                justify-between"
              href={`/dashboard/${workspaceId}/${document?.id}`}
              key={document?.id}
            >
              <article>
                <aside className="flex items-center gap-2">
                  <FolderIcon />
                  {document?.title}
                </aside>
              </article>
            </Link>
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
      {/* {!!files.length && (
        <>
          <h3>Files</h3>
          {files.map((file) => (
            <Link
              key={file.id}
              className=" hover:bg-muted rounded-md p-2 flex items-center justify-between"
              href={`/dashboard/${file.workspaceId}/${file.folderId}/${file.id}`}
            >
              <article>
                <aside className="flex items-center gap-2">
                  <FileIcon />
                  {file.title}
                </aside>
              </article>
            </Link>
          ))}
        </>
      )} */}
    </section>
  );
};
export default TrashBox;

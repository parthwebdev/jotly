"use client";

import { MouseEvent, useMemo, useState } from "react";

import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { v4 } from "uuid";

import { SelectDocument } from "@/lib/supabase/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { createDocument, deleteDocument } from "@/lib/supabase/queries";
import { useAppState } from "@/components/providers/state-provider";
import { useRouter } from "next/navigation";

interface DocumentItemProps {
  document: SelectDocument;
  level?: number;
  workspaceId: string;
}

const DocumentItem = ({
  document,
  level = 0,
  workspaceId,
}: DocumentItemProps) => {
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});
  const { state, dispatch } = useAppState();
  const router = useRouter();

  const childDocuments = useMemo(() => {
    return state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.documents.filter((doc) => doc.parentId === document.id);
  }, [document.id, workspaceId, state.workspaces]);

  const onExpand = (event: MouseEvent<HTMLDivElement>, docuemntId: string) => {
    event.stopPropagation();

    setIsExpanded((prev) => ({
      ...prev,
      [docuemntId]: !prev[docuemntId],
    }));
  };

  const handleCreate = async (
    event: MouseEvent<HTMLDivElement>,
    documentId: string
  ) => {
    event.stopPropagation();

    const newDocument: SelectDocument = {
      id: v4(),
      workspaceId,
      title: "Untitled",
      icon: "📄",
      data: null,
      banner: null,
      inTrash: null,
      createdAt: new Date().toISOString(),
      parentId: document.id,
    };

    dispatch({
      type: "ADD_DOCUMENT",
      payload: {
        workspaceId,
        document: newDocument,
      },
    });

    const { error } = await createDocument(newDocument, documentId);

    if (error) toast.error("Cannot create document.");
    else toast.success("New document created!");
  };

  const handleDelete = async (
    event: MouseEvent<HTMLDivElement>,
    documentId: string
  ) => {
    event.stopPropagation();

    const { error } = await deleteDocument(documentId);

    dispatch({ type: "DELETE_DOCUMENT", payload: { documentId, workspaceId } });

    if (error) toast.error("Cannot delete document.");
    else toast.success("Document successfully deleted!");
  };

  const navigatePage = (
    event: MouseEvent<HTMLDivElement>,
    documentId: string
  ) => {
    event.stopPropagation();
    router.push(`/dashboard/${workspaceId}/${documentId}`);
  };

  return (
    <>
      <div
        key={document.id}
        role="button"
        onClick={(event) => navigatePage(event, document.id)}
        style={{
          paddingLeft: level ? `${level * 12 + 12}px` : "12px",
        }}
        className="py-1 pr-3 flex items-center hover:bg-primary/10 group"
      >
        <div
          role="button"
          className="h-full rounded-sm hover:bg-muted mr-1"
          onClick={(event) => onExpand(event, document.id)}
        >
          {isExpanded[document.id] ? (
            <ChevronDown className="size-[18px] text-muted-foreground/60" />
          ) : (
            <ChevronRight className="size-[18px] text-muted-foreground/60" />
          )}
        </div>

        <div className="mr-2">{document.icon}</div>
        <span className="text-muted-foreground">{document.title}</span>

        <div className="ml-auto flex gap-1">
          <div
            role="button"
            className="h-full p-[1px] ml-auto rounded-sm hover:bg-muted mr-1 opacity-0 group-hover:opacity-100 transition"
            onClick={(event) => handleDelete(event, document.id)}
          >
            <Trash2 className="size-4 text-muted-foreground/100" />
          </div>
          <div
            role="button"
            className="h-full p-[1px] rounded-sm hover:bg-muted mr-1"
            onClick={(event) => handleCreate(event, document.id)}
          >
            <Plus className="size-4 text-muted-foreground/80 hover:text-muted-foreground/100" />
          </div>
        </div>
      </div>
      {isExpanded[document.id] ? (
        childDocuments && childDocuments.length > 0 ? (
          childDocuments?.map((doc) => (
            <DocumentItem
              key={doc.id}
              document={doc}
              level={level + 1}
              workspaceId={workspaceId}
            />
          ))
        ) : (
          <p
            style={{
              paddingLeft: `${(level + 1) * 12 + 25}px`,
            }}
            className="text-muted-foreground"
          >
            No pages found
          </p>
        )
      ) : null}
    </>
  );
};

export default DocumentItem;

DocumentItem.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[60%]" />
    </div>
  );
};

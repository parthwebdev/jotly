"use client";

import { useMemo, useState } from "react";

import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import { v4 } from "uuid";

import { SelectDocument } from "@/lib/supabase/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { createDocument } from "@/lib/supabase/queries";
import { useAppState } from "@/components/providers/state-provider";

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

  const childDocuments = useMemo(() => {
    return state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.documents.filter((doc) => doc.parentId === document.id);
  }, [document.id, workspaceId, state.workspaces]);

  const onExpand = (docuemntId: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [docuemntId]: !prev[docuemntId],
    }));
  };

  const handleCreate = async (documentId: string) => {
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

  return (
    <>
      <div
        key={document.id}
        role="button"
        style={{
          paddingLeft: level ? `${level * 12 + 12}px` : "12px",
        }}
        className="py-1 pr-3 flex items-center hover:bg-primary/10"
      >
        <div
          role="button"
          className="h-full rounded-sm hover:bg-muted mr-1"
          onClick={() => onExpand(document.id)}
        >
          {isExpanded[document.id] ? (
            <ChevronDown className="size-[18px] text-muted-foreground/60" />
          ) : (
            <ChevronRight className="size-[18px] text-muted-foreground/60" />
          )}
        </div>

        <div className="mr-2">{document.icon}</div>
        <span className="text-muted-foreground">{document.title}</span>

        <div
          role="button"
          className="h-full p-[1px] ml-auto rounded-sm hover:bg-muted mr-1"
          onClick={() => handleCreate(document.id)}
        >
          <Plus className="size-4 text-muted-foreground" />
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

"use client";

import { useEffect, useState } from "react";

import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";

import { SelectDocument } from "@/lib/supabase/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { createDocument, getChildDocuments } from "@/lib/supabase/queries";
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
  const [childDocuments, setChildDocuments] = useState<SelectDocument[] | []>();
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { state, dispatch } = useAppState();

  useEffect(() => {
    const getChildData = async () => {
      setIsLoading(true);
      const { data, error } = await getChildDocuments(document.id);
      setChildDocuments(data);

      if (error) return;

      dispatch({
        type: "SET_CHILD_DOCUMENTS",
        payload: {
          workspaceId,
          documentId: document.id,
          documents: data.map((doc) => ({ ...doc, childDocuments: [] })),
        },
      });

      setIsLoading(false);
    };

    getChildData();
  }, [document.id, workspaceId]);

  const childDocs =
    state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.documents.find((doc) => doc.id === document.id)?.childDocuments || [];

  const onExpand = (docuemntId: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [docuemntId]: !prev[docuemntId],
    }));
  };

  const handleCreate = async (documentId: string) => {
    // TODO: Update local state

    const { error } = await createDocument(workspaceId, documentId);

    if (error) toast.error("Cannot create document.");

    toast.success("New document created!");
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
      {isExpanded[document.id] &&
        (childDocs.length > 0 ? (
          childDocs.map((doc) => (
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
        ))}
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

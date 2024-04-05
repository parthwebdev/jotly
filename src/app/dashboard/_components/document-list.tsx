"use client";

import React, { useEffect, useState } from "react";

import { SelectDocument } from "@/lib/supabase/schema";
import { getChildDocuments } from "@/lib/supabase/queries";
import DocumentItem from "./document-item";

interface DocumentListProps {
  documents?: SelectDocument[];
  parentId?: string;
  level?: number;
}

const DocumentList = ({
  documents,
  parentId,
  level = 0,
}: DocumentListProps) => {
  const [isExpanded, setIsExpanded] = useState<Record<string, boolean>>({});
  const [documentsData, setDocumentsData] = useState<SelectDocument[]>(
    documents || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onExpand = (docuemntId: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [docuemntId]: !prev[docuemntId],
    }));
  };

  useEffect(() => {
    if (parentId) {
      const getChildData = async () => {
        setIsLoading(true);
        const { data, error } = await getChildDocuments(parentId);
        if (error) {
          console.log(error);
          return;
        }
        setDocumentsData(data);
        setIsLoading(false);
      };

      getChildData();
    }
  }, [parentId]);

  if (isLoading) {
    return (
      <>
        <DocumentItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <DocumentItem.Skeleton level={level} />
            <DocumentItem.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {documentsData.map((document) => (
        <React.Fragment key={document.id}>
          <DocumentItem document={document} onExpand={onExpand} level={level} />
          {isExpanded[document.id] && (
            <DocumentList parentId={document.id} level={level + 1} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};
export default DocumentList;

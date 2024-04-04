"use client";

import { SelectDocument } from "@/lib/supabase/schema";

import DocumentItem from "./document-item";
import { useEffect, useState } from "react";
import { getChildDocuments } from "@/lib/supabase/queries";

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

  const onExpand = (docuemntId: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [docuemntId]: !prev[docuemntId],
    }));
  };

  useEffect(() => {
    if (parentId) {
      const getData = async () => {
        getChildDocuments(parentId).then((response) => {
          if (response.data) {
            setDocumentsData(response.data);
            console.log(response.data);
          }
        });
      };

      getData();
    }
  }, [parentId, documents]);

  return (
    <>
      {documentsData.map((document) => (
        <div key={document.id}>
          <DocumentItem document={document} onExpand={onExpand} level={level} />
          {isExpanded[document.id] && (
            <DocumentList parentId={document.id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
export default DocumentList;

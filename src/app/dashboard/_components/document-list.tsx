"use client";

import React, { useEffect, useState } from "react";

import { SelectDocument } from "@/lib/supabase/schema";
import useSupabaseRealtime from "@/hooks/useSupabaseRealtime";

import { useAppState } from "@/components/providers/state-provider";
import DocumentItem from "./document-item";

interface DocumentListProps {
  documents?: SelectDocument[];
  workspaceId: string;
}

const DocumentList = ({ documents = [], workspaceId }: DocumentListProps) => {
  // useSupabaseRealtime(); // Listen to Realtime Database changes using supabase

  const [documentsData, setDocumentsData] = useState(documents);
  const { state, dispatch } = useAppState();

  useEffect(() => {
    if (documents?.length > 0) {
      dispatch({
        type: "SET_DOCUMENTS",
        payload: {
          workspaceId,
          documents:
            documents?.map((document) => ({
              ...document,
              childDocuments:
                state.workspaces
                  .find((workspace) => workspace.id === workspaceId)
                  ?.documents.find((doc) => doc.id === document.id)
                  ?.childDocuments || [],
            })) || [],
        },
      });
    }
  }, [documents, dispatch, workspaceId]);

  useEffect(() => {
    setDocumentsData(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.documents || []
    );
  }, [state, workspaceId]);

  return (
    <>
      {documentsData.map((document) => (
        <DocumentItem
          key={document.id}
          document={document}
          workspaceId={workspaceId}
        />
      ))}
    </>
  );
};

export default DocumentList;

"use client";

import React, { useEffect, useMemo, useState } from "react";

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
  const { state, dispatch } = useAppState();

  useEffect(() => {
    if (documents?.length > 0) {
      dispatch({
        type: "SET_DOCUMENTS",
        payload: {
          workspaceId,
          documents: documents || [],
        },
      });
    }
  }, [documents, workspaceId, dispatch]);

  const parentDocuments = useMemo(() => {
    return state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.documents.filter((doc) => doc.workspaceId === workspaceId)
      ?.filter((doc) => doc.parentId === null);
  }, [workspaceId, state.workspaces]);

  return (
    <>
      {parentDocuments?.map((document) => (
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

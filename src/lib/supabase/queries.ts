"use server";

import { and, eq } from "drizzle-orm";

import db from "./db";
import { InsertDocument, documents, workspaces } from "./schema";

export const getWorkspaces = async (userId: string) => {
  try {
    const workspace = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.workspaceOwner, userId));

    return { data: workspace, error: null };
  } catch (error) {
    console.log("🔴 Error:", error);
    return { data: [], error };
  }
};

export const getDocuments = async (workspaceId: string) => {
  try {
    const data = await db
      .select()
      .from(documents)
      .where(and(eq(documents.workspaceId, workspaceId)));

    return { data, error: null };
  } catch (error) {
    console.log("🔴 Error: ", error);
    return { data: [], error };
  }
};

export const createDocument = async (
  document: InsertDocument,
  parentId?: string
) => {
  try {
    await db.insert(documents).values({
      ...document,
      ...(parentId && { parentId }),
    });

    return { data: null, error: null };
  } catch (error) {
    console.log("🔴 Error:", error);
    return { data: null, error };
  }
};

export const deleteDocument = async (documentId: string) => {
  try {
    await db.delete(documents).where(eq(documents.id, documentId));

    return { data: null, error: null };
  } catch (error) {
    console.log("🔴 Error:", error);
    return { data: null, error };
  }
};

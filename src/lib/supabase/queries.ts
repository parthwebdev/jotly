"use server";

import { eq } from "drizzle-orm";

import db from "./db";
import {
  InsertDocument,
  SelectDocument,
  documents,
  workspaces,
} from "./schema";
import { validate } from "uuid";

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
      .where(eq(documents.workspaceId, workspaceId));

    return { data, error: null };
  } catch (error) {
    console.log("🔴 Error: ", error);
    return { data: [], error };
  }
};

export const getDocument = async (documentId: string) => {
  const isValid = validate(documentId);

  if (!isValid)
    return {
      data: [],
      error: "Error",
    };

  try {
    const data: SelectDocument[] = await db
      .select()
      .from(documents)
      .where(eq(documents.id, documentId))
      .limit(1);

    return {
      data,
      error: null,
    };
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

export const updateDocument = async (
  documentId: string,
  content: Partial<InsertDocument>
) => {
  try {
    await db.update(documents).set(content).where(eq(documents.id, documentId));
    return { data: null, error: null };
  } catch (error) {
    console.log(error);
    return { data: null, error: "Error" };
  }
};

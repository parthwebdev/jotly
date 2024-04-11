"use server";

import { and, eq, isNull } from "drizzle-orm";

import db from "./db";
import { documents, workspaces } from "./schema";
import { revalidatePath } from "next/cache";

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
    console.log("🟢 Fetching Documents....");
    const data = await db
      .select()
      .from(documents)
      .where(
        and(eq(documents.workspaceId, workspaceId), isNull(documents.parentId))
      );

    return { data, error: null };
  } catch (error) {
    console.log("🔴 Error: ", error);
    return { data: [], error };
  }
};

export const getChildDocuments = async (parentId: string) => {
  try {
    const data = await db
      .select()
      .from(documents)
      .where(eq(documents.parentId, parentId));

    return { data, error: null };
  } catch (error) {
    console.log("🔴 Error: ", error);
    return { data: [], error };
  }
};

export const createDocument = async (workspaceId: string) => {
  try {
    await db.insert(documents).values({
      title: "Untitled",
      icon: "📄",
      workspaceId,
    });

    revalidatePath(`/dashboard/${workspaceId}`);
    return { data: null, error: null };
  } catch (error) {
    console.log("🔴 Error:", error);
    return { data: [], error };
  }
};

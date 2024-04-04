"use server";

import { and, eq, isNull } from "drizzle-orm";

import db from "./db";
import { documents, workspaces } from "./schema";

// export const getWorkspace = async (workspaceId: string) => {
//   try {
//     const workspace = await db
//       .select()
//       .from(workspaces)
//       .where(eq(workspaces.id, workspaceId))
//       .limit(1);

//     return { data: workspace, error: null };
//   } catch (error) {
//     console.log("🔴 Error:", error);
//     return { data: [], error: error };
//   }
// };

export const getWorkspaces = async (userId: string) => {
  try {
    const workspace = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.workspaceOwner, userId));

    return { data: workspace, error: null };
  } catch (error) {
    console.log("🔴 Error:", error);
    return { data: [], error: error };
  }
};

export const getDocuments = async (workspaceId: string) => {
  try {
    const data = await db
      .select()
      .from(documents)
      .where(
        and(eq(documents.workspaceId, workspaceId), isNull(documents.parentId))
      );

    return { data, error: null };
  } catch (error) {
    console.log("🔴 Error: ", error);
    return { data: [], erorr: error };
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
    return { data: [], erorr: error };
  }
};

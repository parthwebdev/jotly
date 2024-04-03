"use server";

import { eq } from "drizzle-orm";

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
    const notes = await db
      .select()
      .from(documents)
      .where(eq(documents.workspaceId, workspaceId));

    return { data: notes, error: null };
  } catch (error) {
    console.log("🔴 Error: ", error);
    return { data: [], erorr: error };
  }
};

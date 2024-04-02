"use server";

import { eq } from "drizzle-orm";
import db from "./db";
import { InsertWorkspace, workspaces } from "./schema";

export const createWorkspace = (workspace: InsertWorkspace) => {};

export const getWorkspace = async (workspaceId: string) => {
  try {
    const workspace = await db
      .select()
      .from(workspaces)
      .where(eq(workspaces.id, workspaceId))
      .limit(1);

    return { data: workspace, error: null };
  } catch (error) {
    console.log("🔴 Error:", error);
    return { data: [], error: error };
  }
};

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

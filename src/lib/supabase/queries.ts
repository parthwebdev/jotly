"use server";

import { and, eq, isNull } from "drizzle-orm";

import db from "./db";
import {
  InsertDocument,
  SelectDocument,
  documents,
  workspaces,
} from "./schema";
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
    const data = await db
      .select()
      .from(documents)
      .where(and(eq(documents.workspaceId, workspaceId)));
    console.log(data);

    return { data, error: null };
  } catch (error) {
    console.log("🔴 Error: ", error);
    return { data: [], error };
  }
};

// export const getChildDocuments = async (parentId: string) => {
//   try {
//     const data = (await db
//       .select()
//       .from(documents)
//       .where(eq(documents.parentId, parentId))) as SelectDocument[] | [];

//     return { data, error: null };
//   } catch (error) {
//     console.log("🔴 Error: ", error);
//     return { data: [], error };
//   }
// };

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
    return { data: [], error };
  }
};

"use client";

import { useEffect } from "react";
import Image from "next/image";

import { PlusCircleIcon } from "lucide-react";
import { toast } from "sonner";
import { v4 } from "uuid";

import { SelectDocument } from "@/lib/supabase/schema";
import { createDocument } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/components/providers/state-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseUser } from "@/components/providers/user-provider";

const Page = ({ params }: { params: { workspaceId: string } }) => {
  const { dispatch } = useAppState();
  const { user } = useSupabaseUser();
  console.log(user);

  const handleCreate = async () => {
    const newDocument: SelectDocument = {
      id: v4(),
      workspaceId: params.workspaceId,
      title: "Untitled",
      icon: "📄",
      data: null,
      banner: null,
      inTrash: false,
      createdAt: new Date().toISOString(),
      parentId: null,
    };

    dispatch({
      type: "ADD_DOCUMENT",
      payload: {
        workspaceId: params.workspaceId,
        document: newDocument,
      },
    });

    const { error } = await createDocument(newDocument);

    if (error) toast.error("Cannot create document.");
    else toast.success("New document created!");
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/illustration.svg"
        height="400"
        width="400"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/illustration-dark.svg"
        height="400"
        width="400"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.user_metadata.name.split(" ")[1]}&apos;s Jotly
      </h2>

      <Button onClick={() => handleCreate()}>
        <PlusCircleIcon className="h-4 w-4 mr-2" /> Create a note
      </Button>
    </div>
  );
};
export default Page;

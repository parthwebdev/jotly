"use client";

import { useMemo } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { useAppState } from "./providers/state-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface BannerProps {
  workspaceId: string;
  documentId: string;
}

const Banner = ({ workspaceId, documentId }: BannerProps) => {
  const supabase = createClientComponentClient();
  const { state } = useAppState();

  const path = useMemo(() => {
    return state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.documents.find((document) => document.id === documentId)?.banner;
  }, [documentId, workspaceId, state.workspaces]);

  return (
    <div
      className={cn(
        "w-full h-[35vh] relative",
        path && "bg-muted",
        !path && "h-[20vh]"
      )}
    >
      {!!path ? (
        <Image
          src={
            supabase.storage.from("banners").getPublicUrl(path).data.publicUrl
          }
          fill
          priority
          alt="Cover"
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-muted"></div>
      )}
    </div>
  );
};

export default Banner;

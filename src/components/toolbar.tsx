"use client";

import { ChangeEvent, useMemo, useRef } from "react";

import { ImageIcon, Smile } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { SelectDocument } from "@/lib/supabase/schema";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";
import { updateDocument } from "@/lib/supabase/queries";
import { useAppState } from "./providers/state-provider";
import { useParams } from "next/navigation";

const Toolbar = ({ initialData }: { initialData: SelectDocument }) => {
  const supabase = createClientComponentClient();
  const { state, dispatch } = useAppState();
  const { workspaceId } = useParams();
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const icon = useMemo(() => {
    return state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.documents.find((document) => document.id === initialData.id)?.icon;
  }, [workspaceId, state.workspaces, initialData.id]);

  const uploadBanner = async () => {
    bannerInputRef.current?.click();
  };

  const handleBannerInput = async (event: ChangeEvent<HTMLInputElement>) => {
    let filePath;
    const file = event.target.files?.[0];
    console.log(file);

    if (!file) return;

    const { data, error } = await supabase.storage
      .from("banners")
      .upload(`banner-${initialData.id}?bust=${Date.now()}`, file, {
        cacheControl: "0",
        upsert: true,
      });

    if (error) throw new Error(error.message);

    filePath = data.path;

    dispatch({
      type: "UPDATE_DOCUMENT",
      payload: {
        workspaceId: workspaceId as string,
        documentId: initialData.id,
        document: { banner: filePath },
      },
    });

    await updateDocument(initialData.id, { banner: filePath });
  };

  const handleIconChange = async (emoji: string) => {
    dispatch({
      type: "UPDATE_DOCUMENT",
      payload: {
        workspaceId: workspaceId as string,
        documentId: initialData.id,
        document: { icon: emoji },
      },
    });

    await updateDocument(initialData.id, { icon: emoji });
  };

  return (
    <div className="px-[54px]">
      {/* Icon */}
      {!!icon && <p className="text-6xl pt-6">{icon}</p>}

      {/* Buttons for adding icon and banner */}
      <div className="flex items-center gap-x-1 py-4">
        <IconPicker onChange={(emoji) => handleIconChange(emoji)}>
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <Smile className="h-4 w-4 mr-2" />
            {icon ? <span>Change icon</span> : <span>Add icon</span>}
          </Button>
        </IconPicker>
        <Button
          onClick={() => uploadBanner()}
          className="text-muted-foreground text-xs relative"
          variant="outline"
          size="sm"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          {initialData.banner ? (
            <span>Change banner</span>
          ) : (
            <span>Add banner</span>
          )}
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={bannerInputRef}
          onChange={handleBannerInput}
          id="bannerImage"
          className="invisible"
        />
      </div>

      {/* Title */}
      <div
        // onClick={enableInput}
        className="pb-4 text-5xl font-bold break-words outline-none text-card-foreground"
      >
        {initialData.title}
      </div>
    </div>
  );
};

export default Toolbar;

"use client";

import { ChangeEvent, useRef } from "react";

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
  const { dispatch } = useAppState();
  const { workspaceId } = useParams();
  const bannerInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="px-[54px]">
      {/* Icon */}
      {!!initialData.icon && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      {/* Buttons for adding icon and banner */}
      <div className="flex items-center gap-x-1 py-4">
        <IconPicker onChange={() => {}}>
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <Smile className="h-4 w-4 mr-2" />
            Add icon
          </Button>
        </IconPicker>
        <Button
          onClick={() => uploadBanner()}
          className="text-muted-foreground text-xs relative"
          variant="outline"
          size="sm"
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Add cover
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

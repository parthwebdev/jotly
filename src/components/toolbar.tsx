"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { ImageIcon, Smile } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

import { SelectDocument } from "@/lib/supabase/schema";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";
import { updateDocument } from "@/lib/supabase/queries";
import { useAppState } from "./providers/state-provider";

const Toolbar = ({ initialData }: { initialData: SelectDocument }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const { state, dispatch } = useAppState();
  const { workspaceId } = useParams();
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const document = useMemo(() => {
    return state.workspaces
      .find((workspace) => workspace.id === workspaceId)
      ?.documents.find((document) => document.id === initialData.id);
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

  const onTitleClick = () => {
    setIsEditing(true);
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_DOCUMENT",
      payload: {
        workspaceId: workspaceId as string,
        documentId: initialData.id,
        document: { title: e.target.value },
      },
    });
  };

  const onBlur = async () => {
    if (!isEditing) return;
    setIsEditing(false);

    const { error } = await updateDocument(initialData.id, {
      title: document?.title,
    });
    if (error) {
      toast.error("Cannot change document title");
    }
    toast.success("Successfully changed document title");
  };

  return (
    <div className="px-[54px]">
      {/* Icon */}
      {!!document?.icon && <p className="text-6xl pt-6">{document?.icon}</p>}

      {/* Buttons for adding icon and banner */}
      <div className="flex items-center gap-x-1 py-4">
        <IconPicker onChange={(emoji) => handleIconChange(emoji)}>
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <Smile className="h-4 w-4 mr-2" />
            {document?.icon ? <span>Change icon</span> : <span>Add icon</span>}
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
      {/* <div
        // onClick={enableInput}
        className="pb-4 text-5xl font-bold break-words outline-none text-card-foreground"
      >
        {initialData.title}
      </div> */}
      <input
        type="text"
        value={document?.title}
        readOnly={!isEditing}
        onClick={onTitleClick}
        onChange={onTitleChange}
        onBlur={onBlur}
        className="mb-4 outline-none bg-transparent text-card-foreground text-5xl font-bold"
      />
    </div>
  );
};

export default Toolbar;

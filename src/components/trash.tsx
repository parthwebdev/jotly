"use client";

import { useState } from "react";

import CustomDialogTrigger from "./custom-dialog-trigger";
import TrashBox from "./trash-box";

const Trash = ({
  workspaceId,
  children,
}: {
  children?: React.ReactNode;
  workspaceId: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpenChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CustomDialogTrigger
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      header="Trash"
      content={
        <TrashBox workspaceId={workspaceId} onOpenChange={onOpenChange} />
      }
      className="w-full"
    >
      {children}
    </CustomDialogTrigger>
  );
};
export default Trash;

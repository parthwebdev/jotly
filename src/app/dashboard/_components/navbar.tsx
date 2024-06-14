"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useAppState } from "@/components/providers/state-provider";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useMobileContext } from "@/components/providers/mobile-provider";

const Navbar = () => {
  const params = useParams();
  const { state } = useAppState();
  const { setIsOpen } = useMobileContext();

  const document = useMemo(() => {
    return state.workspaces
      .find((workspace) => workspace.id === params.workspaceId)
      ?.documents.find((document) => document.id === params.documentId);
  }, [state.workspaces, params.workspaceId, params.documentId]);

  return (
    <nav className="px-3 py-2 w-full flex items-center">
      <MenuIcon
        role="button"
        onClick={() => setIsOpen(true)}
        className="hidden max-lg:block h-6 w-6 text-muted-foreground mr-1"
      />
      <div className="flex items-center justify-between w-full">
        {/* Left Side Nav items */}
        <Button
          variant="ghost"
          className="text-card-foreground text-base font-normal px-2 py-0 flex gap-1"
        >
          <span className="text-base">{document?.icon}</span>
          {document?.title}
        </Button>

        {/* Right Side Nav items */}
        <div className="flex items-center">
          {/* <Publish initialData={document} />
          <Menu documentId={document._id} /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

"use client";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMobileContext } from "@/components/providers/mobile-provider";
import Logo from "@/components/logo";

const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useMobileContext();

  return (
    isOpen && (
      <>
        <div
          className="
            hidden max-lg:flex max-lg:flex-col min-w-[240px] h-screen
            absolute top-0 left-0 bottom-0 z-50
            bg-background border-r-2
          "
        >
          <div className="w-full flex justify-between items-center py-5 px-4">
            <Logo />

            <div
              onClick={() => setIsOpen(false)}
              role="button"
              className={cn(
                "h-6 w-6 text-muted-foreground rounded-sm hover:bg-secondary transition"
              )}
            >
              <X className="h-6 w-6" />
            </div>
          </div>

          {children}
        </div>
      </>
    )
  );
};

export default MobileSidebar;

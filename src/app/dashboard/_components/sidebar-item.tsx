import { Command, LucideIcon } from "lucide-react";

interface SidebarProps {
  icon: LucideIcon;
  label: string;
  isSearch?: boolean;
}

const SidebarItem = ({ icon: Icon, label, isSearch }: SidebarProps) => {
  return (
    <button
      className="
        w-full py-1 px-4 flex items-center gap-2
        text-muted-foreground text-sm hover:bg-secondary/60
      "
    >
      <Icon className="size-4" />
      <span>{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span>
            <Command className="size-[10px]" />
          </span>
          K
        </kbd>
      )}
    </button>
  );
};

export default SidebarItem;

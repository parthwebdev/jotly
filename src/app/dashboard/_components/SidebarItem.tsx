import { LucideIcon } from "lucide-react";

interface SidebarProps {
  icon: LucideIcon;
  label: string;
}

const SidebarItem = ({ icon: Icon, label }: SidebarProps) => {
  return (
    <button
      className="
      w-full py-1 px-4 flex items-center gap-2
      text-muted-foreground text-sm hover:bg-secondary/60
    "
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </button>
  );
};
export default SidebarItem;

import { LucideIcon } from "lucide-react";

interface SidebarProps {
  icon: LucideIcon;
  label: string;
}

const SidebarItem = ({ icon: Icon, label }: SidebarProps) => {
  return (
    <div className="flex gap-2 hover:bg-primary/5">
      <Icon />
      <span>{label}</span>
    </div>
  );
};
export default SidebarItem;

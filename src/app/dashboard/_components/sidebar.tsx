import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { getWorkspaces } from "@/lib/supabase/queries";
import WorkspaceDropdown from "./workspace-dropdown";
import SidebarItem from "./SidebarItem";
import { PlusCircle, Search, Settings } from "lucide-react";

const Sidebar = async ({ params }: { params: { workspaceId: string } }) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: workspaces, error } = await getWorkspaces(user.id);

  return (
    <aside className="h-screen flex flex-col gap-5 py-5 w-[240px] border border-r-2">
      {/* Workspace Dropdown */}
      <div className="px-4">
        <p className="text-sm text-muted-foreground mb-3">
          Select or Create a workspace
        </p>
        <WorkspaceDropdown
          defaultValue={workspaces.find(
            (workspace) => workspace.id === params.workspaceId
          )}
          workspaces={workspaces}
        />
      </div>

      {/* Sidebar Items */}
      <div className="w-full">
        <SidebarItem icon={Search} label="Search" />
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={PlusCircle} label="New Page" />
      </div>

      {/* FOLDERS for selected Workspace */}
      <div></div>
    </aside>
  );
};

export default Sidebar;

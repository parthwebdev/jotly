import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { ChevronRight, Plus, PlusCircle, Search, Settings } from "lucide-react";

import { getDocuments, getWorkspaces } from "@/lib/supabase/queries";
import WorkspaceDropdown from "./workspace-dropdown";
import SidebarItem from "./sidebar-item";

const Sidebar = async ({ params }: { params: { workspaceId: string } }) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Get the User's Workspaces
  const { data: workspaces, error: workspaceError } = await getWorkspaces(
    user.id
  );

  // Get the Documents for the selected Workspace
  const { data: documents, error: documentsError } = await getDocuments(
    params.workspaceId
  );

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
      <div>
        <SidebarItem icon={Search} label="Search" isSearch />
        <SidebarItem icon={Settings} label="Settings" />
        <SidebarItem icon={PlusCircle} label="New Document" />
      </div>

      {/* DOCUMENTS for selected Workspace */}
      <div className="text-sm font-medium">
        {documents.map((document) => (
          <div
            key={document.id}
            role="button"
            className="py-1 px-3 flex items-center hover:bg-primary/10"
          >
            <div className="h-full rounded-sm hover:bg-muted mr-1">
              <ChevronRight className="size-[18px] text-muted-foreground/60" />
            </div>

            <div className="mr-2">{document.icon}</div>
            <span className="text-muted-foreground">{document.title}</span>

            <div
              role="button"
              className="h-full p-[1px] ml-auto rounded-sm hover:bg-muted mr-1"
            >
              <Plus className="size-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

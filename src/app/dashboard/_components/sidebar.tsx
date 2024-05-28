import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Search, Settings } from "lucide-react";

import { getDocuments, getWorkspaces } from "@/lib/supabase/queries";
import WorkspaceDropdown from "./workspace-dropdown";
import SidebarItem from "./sidebar-item";
import DocumentList from "./document-list";
import CreateDocument from "./create-document";

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

  if (documentsError || workspaceError) return;

  return (
    <aside className="h-screen flex flex-col gap-5 py-5 w-[240px] border border-r-2">
      {/* Workspace Dropdown */}
      <div className="px-4">
        <p className="text-sm text-muted-foreground mb-3">
          Select or Create a workspace
        </p>
        <WorkspaceDropdown
          workspaces={workspaces}
          defaultValue={workspaces.find(
            (workspace) => workspace.id === params.workspaceId
          )}
        />
      </div>

      {/* Sidebar Items */}
      <div>
        <SidebarItem icon={Search} label="Search" isSearch />
        <SidebarItem icon={Settings} label="Settings" />
        <CreateDocument workspaceId={params.workspaceId} />
      </div>

      {/* DOCUMENTS for selected Workspace */}
      <div className="text-sm font-medium">
        <DocumentList documents={documents} workspaceId={params.workspaceId} />
      </div>
    </aside>
  );
};

export default Sidebar;

import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { getWorkspaces } from "@/lib/supabase/queries";
import WorkspaceDropdown from "./workspace-dropdown";

const Sidebar = async ({ params }: { params: { workspaceId: string } }) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: workspaces, error } = await getWorkspaces(user.id);
  console.log(workspaces);

  return (
    <aside className="h-screen flex flex-col gap-7 py-5 w-[240px] border border-r-2">
      <div className="px-3">
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

      <div></div>
    </aside>
  );
};

export default Sidebar;

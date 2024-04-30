export const dynamic = "force-dynamic";

import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string };
}) => {
  return (
    <div className="flex">
      <Sidebar params={params} />

      <div className="flex flex-col">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;

import Navbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workspaceId: string; documentId: string };
}) => {
  return (
    <div className="h-full flex">
      <Sidebar params={params} />

      <div className="w-full flex flex-col">
        <Navbar />
        <main className="h-full overflow-y-scroll no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

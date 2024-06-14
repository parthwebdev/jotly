import MobileProvider from "@/components/providers/mobile-provider";
import MobileSidebar from "../_components/mobile-sidebar";
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
    <MobileProvider>
      <div className="h-full flex">
        <Sidebar params={params} />

        <MobileSidebar>
          <Sidebar
            params={params}
            classNames="flex-1 w-full max-lg:flex max-lg:flex-col hidden py-0 border-r-0"
          />
        </MobileSidebar>

        <div className="w-full flex flex-col">
          <Navbar />
          <main className="h-full overflow-y-scroll no-scrollbar">
            {children}
          </main>
        </div>
      </div>
    </MobileProvider>
  );
};

export default Layout;

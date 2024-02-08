import Navbar from "./_components/navbar";

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default LandingLayout;

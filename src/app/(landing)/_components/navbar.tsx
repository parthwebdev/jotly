import Logo from "@/components/ui/logo";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="px-10 py-6 flex justify-between items-center">
      <Logo />

      <div className="flex items-center gap-3">
        <ModeToggle />
        <Button
          variant="link"
          size="sm"
          className="text-foreground light:text-background"
          asChild
        >
          <Link href="/login">Log in</Link>
        </Button>
        <Button size="sm" className="max-sm:hidden" asChild>
          <Link href="/signup">Get Notion free</Link>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;

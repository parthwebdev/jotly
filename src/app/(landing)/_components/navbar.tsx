import Logo from "@/components/ui/logo";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

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
        >
          Log in
        </Button>
        <Button size="sm" className="max-sm:hidden">
          Get Notion free
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;

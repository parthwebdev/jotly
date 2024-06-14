import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowRight } from "lucide-react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import avatar from "../../../../public/avatar.webp";

async function Navbar() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="px-10 py-6 flex justify-between items-center">
      <Logo />

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.user_metadata.avatar_url} />
              <AvatarFallback>
                <Image src={avatar} alt="Avatar" />
              </AvatarFallback>
            </Avatar>
            <Button size="sm" className="flex gap-1">
              <Link href="/dashboard">Enter Notion</Link>
              <ArrowRight className="w-4" />
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

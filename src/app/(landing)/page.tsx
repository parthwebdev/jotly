import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

async function LandingPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col justify-center items-center pt-8 px-8">
      <div className="max-w-3xl text-center space-y-4">
        <h1 className="text-6xl font-bold max-lg:text-5xl max-sm:text-3xl">
          Your 📝wiki, 📄docs, & 🎯projects. Together.
        </h1>
        <p className="text-xl font-medium max-lg:text-lg max-md:text-base">
          Notion is the connected workspace where <br />
          better, faster work happens.
        </p>

        {user ? (
          <Button asChild>
            <Link href="/dashboard" className="flex gap-1 mx-auto">
              Enter Notion
              <ArrowRight className="w-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/signup">Get Notion free</Link>
          </Button>
        )}
      </div>

      <div className="flex justify-center items-center gap-16 pt-10 px-6">
        <div className="relative w-[400px] h-[400px] max-sm:h-[300px] max-sm:w-[300px]">
          <Image
            src="/illustration-dark.svg"
            fill
            className="object-contain w-auto h-auto hidden dark:block"
            alt="Hero Illustration"
          />
          <Image
            src="/illustration.svg"
            fill
            className="object-contain w-auto h-auto dark:hidden"
            alt="Hero Illustration"
          />
        </div>
        <div className="relative w-[500px] h-[400px] max-lg:hidden">
          <Image
            src="/illustration2-dark.svg"
            fill
            className="object-contain w-auto h-auto hidden dark:block"
            alt="Hero Illustration"
          />
          <Image
            src="/illustration2.svg"
            fill
            className="object-contain w-auto h-auto dark:hidden"
            alt="Hero Illustration"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

"use server";

import { cookies } from "next/headers";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { z } from "zod";

import { formSchema } from "@/lib/types";

export const logInUser = async ({
  email,
  password,
}: z.infer<typeof formSchema>) => {
  const supabase = createRouteHandlerClient({ cookies });

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return response;
};

export const signUpUser = async ({
  email,
  password,
}: z.infer<typeof formSchema>) => {
  const supabase = createRouteHandlerClient({ cookies });

  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:3000/api/auth/callback",
    },
  });

  return response;
};

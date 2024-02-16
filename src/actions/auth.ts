"use server";

import { formSchema, signupSchema } from "@/lib/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

export const logInUser = async ({
  email,
  password,
}: z.infer<typeof formSchema>) => {
  const supabase = createRouteHandlerClient({ cookies });

  const response = supabase.auth.signInWithPassword({
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

  // const { data } = supabase.from("profiles").select("*").eq("email", email);
  // if (data?.length) return { error: {
  //   message: 'User already exists'
  // } };

  const response = supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  });

  return response;
};

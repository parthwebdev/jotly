"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LogIn } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Loader from "@/components/loader";
import { formSchema } from "@/lib/types";
import { logInUser } from "@/actions/auth";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const LoginPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>("");
  const supabase = createClientComponentClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({
    email,
    password,
  }) => {
    const { error } = await logInUser({ email, password });

    if (error) {
      form.reset();
      setSubmitError(error.message);
      return;
    }

    router.replace("/dashboard");
  };

  const handleSignInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/api/auth/callback`,
      },
    });

    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-4 w-full max-w-[400px] flex flex-col space-y-6"
      >
        <div className="flex flex-col gap-2">
          <Link href="/">
            <Logo />
          </Link>
          <FormDescription className="text-lg">
            Login to your account
          </FormDescription>
        </div>

        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    type="email"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter password"
                    {...field}
                    type="password"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {submitError && <FormMessage>{submitError}</FormMessage>}

        <div className="flex flex-col space-y-4">
          <Button type="submit" disabled={isLoading}>
            {!isLoading ? "Log in" : <Loader />}
          </Button>
          <span className="text-center text-sm">OR</span>
          <Button
            type="button"
            variant="secondary"
            className="gap-2"
            onClick={handleSignInWithGoogle}
          >
            <LogIn className="w-5" />
            Log in with Google
          </Button>
          <span>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:border-b-2 border-primary"
            >
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};

export default LoginPage;

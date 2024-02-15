"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { formSchema } from "@/lib/types";

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
import Logo from "@/components/ui/logo";
import { LogIn } from "lucide-react";

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async ({
    email,
    password,
  }) => {
    console.log(email, password);
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

        <div className="flex flex-col gap-3">
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

        <div className="flex flex-col space-y-4">
          <Button type="submit">Log in</Button>
          <span className="text-center text-sm">OR</span>
          <Button variant="secondary" className="gap-2">
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

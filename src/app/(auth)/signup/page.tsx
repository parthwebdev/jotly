"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LogIn } from "lucide-react";
import { formSchema, signupSchema } from "@/lib/types";
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
import { signUpUser } from "@/actions/auth";
import { useState } from "react";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string>("");

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
    const { error, data } = await signUpUser({ email, password });

    if (error) {
      form.reset();
      setSubmitError(error.message);
      return;
    }

    router.replace("/dashboard");
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
            Signup for a new account
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirm password"
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
          <Button type="submit">{!isLoading ? "Sign up" : <Loader />}</Button>
          <span className="text-center text-sm">OR</span>
          <Button variant="secondary" className="gap-2">
            <LogIn className="w-5" />
            Log in with Google
          </Button>
          <span>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:border-b-2 border-primary"
            >
              Login
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};
export default SignupPage;

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SocialProviders from "./SocialProviders";
import { Loader } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { signInForm } from "@/lib/zod-schemas";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInForm>>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (data: z.infer<typeof signInForm>) => {
    setIsLoading(true);
    const response = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });
    if (response.error) {
      form.setError("email", { message: response.error.message });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <div className="flex justify-between items-center">
                <FormLabel>Password</FormLabel>
                <Link
                  href="#"
                  className="text-xs italic hover:text-blue-600 hover:underline underline-offset-4 transition-all font-extralight"
                >
                  Forgot Password?
                </Link>
              </div>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full font-semibold"
        >
          {isLoading ? <Loader className="animate-spin" /> : "Sign In"}
        </Button>

        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="hover:text-blue-600 hover:underline underline-offset-4 transition-all font-extralight"
          >
            Sign Up
          </Link>
        </p>

        <SocialProviders />
      </form>
    </Form>
  );
}

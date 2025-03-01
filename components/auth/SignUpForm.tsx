"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import SocialProviders from "./SocialProviders";
import { Loader } from "lucide-react";
import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import { useEmail } from "./EmailContext";
import { signUpForm } from "@/lib/zod-schemas";

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signUpForm>>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setEmail } = useEmail();

  const handleSubmit = async (data: z.infer<typeof signUpForm>) => {
    setIsLoading(true);
    const response = await signUp.email({
      name: data.fullName,
      email: data.email,
      password: data.password,
    });
    if (response.error) {
      form.setError("email", { message: response.error.message });
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setEmail(data.email);
    router.push("/sign-up/verify-email");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
              <FormLabel>Password</FormLabel>
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
          {isLoading ? <Loader className="animate-spin" /> : "Sign Up"}
        </Button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="hover:text-blue-600 hover:underline underline-offset-4 transition-all font-extralight"
          >
            Sign In
          </Link>
        </p>

        <SocialProviders />
      </form>
    </Form>
  );
}

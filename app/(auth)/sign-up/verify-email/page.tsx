"use client";

import { useEmail } from "@/components/auth/EmailContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function VerifyEmail() {
  const { email } = useEmail();
  return (
    <div className="w-full min-h-svh flex justify-center items-center text-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            You need to verify your email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            An email has been sent to{" "}
            <span className="font-semibold">{email}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Please click the link in the email to verify your account. If you
            don&apos;t see the email, check your spam folder or try signing up
            again.
          </p>
          <Button className="w-full font-semibold">
            <Link href="/sign-up">Back to Sign Up page</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

import SignInForm from "@/components/auth/SignInForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function SignIn() {
  return (
    <div className="w-full min-h-svh flex justify-center items-center">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-normal">
            Sign In to{" "}
            <span className="text-primary tracking-wide font-semibold">
              SNEAKERS
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}

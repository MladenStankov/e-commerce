import SignUpForm from "@/components/auth/SignUpForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function SignUp() {
  return (
    <div className="w-full min-h-svh flex justify-center items-center">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-normal">
            Sign Up for{" "}
            <span className="text-primary tracking-wide font-semibold">
              SNEAKERS
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}

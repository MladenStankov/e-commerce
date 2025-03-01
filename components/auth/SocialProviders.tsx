import React from "react";
import SocialButton from "./SocialButton";

export default function SocialProviders() {
  return (
    <>
      <div
        className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2
             after:z-0 after:flex after:items-center after:border-t after:border-border"
      >
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          Or
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <SocialButton provider="google" />
        <SocialButton provider="github" />
      </div>
    </>
  );
}

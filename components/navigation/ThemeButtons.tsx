"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

export default function ThemeButtons() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-full gap-2">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        className="w-full"
        onClick={() => setTheme("light")}
      >
        <Sun />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        className="w-full"
        onClick={() => setTheme("dark")}
      >
        <Moon />
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        className="w-full"
        onClick={() => setTheme("system")}
      >
        <Laptop />
      </Button>
    </div>
  );
}

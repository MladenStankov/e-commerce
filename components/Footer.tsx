import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";

export default function Footer() {
  return (
    <footer>
      <Card className="rounded-none w-full bg-background/80 border-r-0 border-l-0">
        <CardContent>
          <div className="w-full p-5 space-y-4 max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex flex-col items-center gap-4 md:items-start">
                <h3 className="text-lg font-semibold text-primary">SNEAKERS</h3>
                <p className="text-sm text-muted-foreground">
                  Built with Next.js and Shadcn UI
                </p>
              </div>

              <nav className="flex gap-4">
                <Button variant="ghost" size="sm">
                  About
                </Button>
                <Button variant="ghost" size="sm">
                  Blog
                </Button>
                <Button variant="ghost" size="sm">
                  Contact
                </Button>
              </nav>
            </div>

            <Separator />

            <div className="flex items-center justify-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} SNEAKERS. All rights reserved.
            </div>
          </div>
        </CardContent>
      </Card>
    </footer>
  );
}

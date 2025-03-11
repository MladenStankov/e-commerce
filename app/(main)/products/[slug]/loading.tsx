import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto mt-10 space-y-10">
      <div className="flex w-full h-[70svh] gap-5 max-md:flex-col">
        <div className="w-full h-full flex gap-4">
          <div className="flex flex-col gap-2 w-24 h-full">
            <Skeleton className="w-24 h-20 rounded-lg" />
            <Skeleton className="w-24 h-20 rounded-lg" />
            <Skeleton className="w-24 h-20 rounded-lg" />
            <Skeleton className="w-24 h-20 rounded-lg" />
            <Skeleton className="w-24 h-20 rounded-lg" />
            <Skeleton className="w-24 h-20 rounded-lg" />
            <Skeleton className="w-24 h-20 rounded-lg" />
            <Skeleton className="w-24 h-20 rounded-lg" />
          </div>
          <div className="w-full h-full">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        </div>
        <ScrollArea className="w-1/2">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-3/4 rounded-md" />
            <Skeleton className="h-6 w-1/2 rounded-md" />
            <Skeleton className="h-8 w-1/4 rounded-md" />
            <div className="mt-4">
              <Skeleton className="h-6 w-24 mb-2 rounded-md" />
              <div className="flex flex-wrap gap-2">
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-10 w-14 rounded-md" />
                  ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="flex flex-col gap-2 justify-between items-center my-4">
                <Skeleton className="h-6 w-1/2 mb-2 rounded-md" />
                <Skeleton className="h-6 w-1/2 mb-2 rounded-md" />
              </div>
              <Skeleton className="h-4 w-full rounded-md mb-2" />
              <Skeleton className="h-4 w-full rounded-md mb-2" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

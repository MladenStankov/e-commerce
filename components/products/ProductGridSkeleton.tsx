import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function ProductGridSkeleton() {
  return (
    <section>
      <Skeleton className="w-32 h-8" />
      <div className="grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-10">
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    </section>
  );
}

function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-40" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-1/2 h-5" />
      <Skeleton className="w-10 h-5" />
    </div>
  );
}

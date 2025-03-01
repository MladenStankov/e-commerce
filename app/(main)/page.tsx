import NewestArrivals from "@/components/products/NewestArrivals";
import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";
import React, { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto w-full mt-6">
      <Suspense fallback={<ProductGridSkeleton />}>
        <NewestArrivals />
      </Suspense>
    </div>
  );
}

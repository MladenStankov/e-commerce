import React from "react";
import ProductsTable from "@/components/admin/ProductsTable";
import prisma from "@/lib/prisma";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      priceInEuroCents: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          productStocks: true,
        },
      },
    },
  });

  // Transform products to include the missing fields
  const productsWithRequiredFields = products.map((product) => ({
    ...product,
    // Ensure dates are properly serialized as ISO strings
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    availableInStock: product._count.productStocks,
    numberOfOrders: 0,
  }));

  return (
    <div className="flex flex-col h-full space-y-4 mx-5 ">
      <ProductsTable products={productsWithRequiredFields} />
    </div>
  );
}

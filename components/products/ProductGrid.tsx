import React from "react";
import ProductCard from "./ProductCard";

export interface IProduct {
  title: string;
  slug: string;
  priceInEuroCents: number;
  productImages: {
    imagePath: string;
  }[];
  _count: {
    productStocks: number;
  };
}

interface IProps {
  title?: string;
  products: IProduct[];
}

export default function ProductGrid({ title, products }: IProps) {
  return (
    <section id={title} className="mx-2">
      <h2 className="text-2xl">{title}</h2>
      <div className="grid max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 grid-cols-6  gap-3 mt-10 mx-2">
        {products.map((product) => {
          return <ProductCard key={product.slug} product={product} />;
        })}
      </div>
    </section>
  );
}

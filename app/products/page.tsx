// app/products/page.tsx
import ProductCard from "@/app/components/products/ProductCard";
import { productApi } from "@/app/lib/product.api";

export default async function ProductsPage() {
  // 1. Fetch data
  const products = await productApi.getAllProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 text-white">
      <h1 className="mb-10 text-3xl font-bold">Our Watches</h1>

      {/* 2. Render Grid */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}
import { productApi } from "@/app/lib/product.api";
import ProductCard from "./ProductCard";

export default async function ProductsGrid() {
  // Fetching products from your API
  const products = await productApi.getAllProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
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
import ProductCard from "@/app/components/products/ProductCard";
import { api } from "@/app/lib/api";

export default async function ProductsPage() {
  // ✅ correct API call
  const products = await api.product.getAllProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 text-white">
      <h1 className="mb-8 text-3xl font-bold">Our Watches</h1>

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

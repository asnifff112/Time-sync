import ProductsHeader from "@/app/components/products/ProductsHeader";
import ProductsGrid from "@/app/components/products/ProductsGrid";

export default function ProductsPage() {
  return (
    <main className="bg-buttercream pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <ProductsHeader />
        <ProductsGrid />
      </div>
    </main>
  );
}

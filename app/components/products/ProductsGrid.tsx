import ProductCard from "@/app/components/products/ProductCard";

/* ---------- Product Type ---------- */
export type Product = {
  id: string;
  name: string;
  price: string;
  description?: string;
};

/* ---------- Mock Data ---------- */
const mockProducts: Product[] = [
  {
    id: "1",
    name: "TimeSync Classic",
    price: "₹12,999",
    description: "Minimal classic design watch",
  },
  {
    id: "2",
    name: "TimeSync Pro",
    price: "₹18,999",
    description: "Professional premium smartwatch",
  },
  {
    id: "3",
    name: "TimeSync Elite",
    price: "₹24,999",
    description: "Luxury elite edition watch",
  },
];

/* ---------- Component ---------- */
export default function ProductsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

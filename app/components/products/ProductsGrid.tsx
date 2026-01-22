import ProductCard from "@/app/components/products/ProductCard";

/* ---------- Product Type ---------- */
export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

/* ---------- Mock Data ---------- */
const mockProducts: Product[] = [
  {
    id: "1",
    name: "TimeSync Classic",
    price: 12999,
    image: "/images/classic.jpg",
    description: "Minimal classic design watch",
  },
  {
    id: "2",
    name: "TimeSync Pro",
    price: 18999,
    image: "/images/pro.jpg",
    description: "Professional premium smartwatch",
  },
  {
    id: "3",
    name: "TimeSync Elite",
    price: 24999,
    image: "/images/elite.jpg",
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

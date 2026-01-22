import Link from "next/link";
// Define Product type here if '@/lib/types' does not exist
type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="cursor-pointer rounded-xl border border-white/10 p-4 transition hover:border-white/30">
        <img
          src={product.image}
          alt={product.name}
          className="mb-4 rounded-lg"
        />

        <h3 className="text-lg font-semibold text-white">
          {product.name}
        </h3>

        <p className="text-white/70">
          ₹{product.price.toLocaleString("en-IN")}
        </p>
      </div>
    </Link>
  );
}

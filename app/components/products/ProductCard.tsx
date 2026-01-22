import Link from "next/link";
import { Product } from "@/app/lib/product.api";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20 transition hover:border-white/30">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <p className="mt-1 text-yellow-200">
            ₹{product.price.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Link>
  );
}
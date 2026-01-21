import { Product } from "./ProductsGrid";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{product.name}</h3>

      <p className="mt-2 text-gray-600 text-sm">
        {product.description}
      </p>

      <p className="mt-4 text-xl font-bold text-black">
        {product.price}
      </p>

      <button className="mt-5 w-full rounded-lg bg-black py-2 text-white hover:bg-gray-800">
        View Details
      </button>
    </div>
  );
}

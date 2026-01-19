type Product = {
  id: number;
  name: string;
  price: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-lg border border-border bg-white p-6 transition hover:shadow-md">
      {/* Image placeholder */}
      <div className="mb-6 h-44 rounded-md bg-gray-100" />

      <h3 className="text-sm font-medium text-midnight">
        {product.name}
      </h3>

      <p className="mt-1 text-sm text-midnight/70">
        {product.price}
      </p>
    </div>
  );
}

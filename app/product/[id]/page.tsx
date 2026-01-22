import { notFound } from "next/navigation";
import { getProductById } from "@/app/lib/product.api";



interface Props {
  params: { id: string };
}

export default function ProductDetailsPage({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) return notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-white">
      <div className="grid gap-12 md:grid-cols-2">

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl border border-white/10"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl font-semibold">{product.name}</h1>

          <p className="mt-4 text-xl text-buttercream">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <p className="mt-6 text-white/70">
            {product.description}
          </p>

          {/* COLORS */}
          <div className="mt-6 flex gap-3">
            {product.colors.map((color) => (
              <span
                key={color}
                className="rounded-full border border-white/20 px-4 py-1 text-sm"
              >
                {color}
              </span>
            ))}
          </div>

          {/* ACTION */}
          <button className="mt-10 rounded-full bg-buttercream px-8 py-3 text-midnight hover:opacity-90 transition">
            Add to Cart
          </button>
        </div>

      </div>
    </section>
  );
}

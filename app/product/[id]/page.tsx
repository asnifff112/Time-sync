// app/product/[id]/page.tsx
import { notFound } from "next/navigation";
import { productApi } from "@/app/lib/product.api";

interface Props {
  params: Promise<{ id: string }>; 
}

export default async function ProductDetailsPage({ params }: Props) {
  
  const { id } = await params;

  
  const product = await productApi.getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 text-white">
      <div className="grid gap-12 md:grid-cols-2">

        {/* IMAGE */}
        <div className="overflow-hidden rounded-xl border border-white/10">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl font-semibold">{product.name}</h1>

          <p className="mt-4 text-2xl text-yellow-200">
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

          {/* ACTIONS */}
          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-yellow-200 px-8 py-3 text-black font-bold">
              Add to Cart
            </button>
            <button className="rounded-full border border-white/30 px-8 py-3">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
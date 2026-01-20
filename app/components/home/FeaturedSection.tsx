export default function FeaturedSection() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-3xl font-semibold">
          Featured Timepieces
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          {["Classic", "Heritage", "Elite"].map((name) => (
            <div
              key={name}
              className="rounded-xl border border-white/10 p-10 hover:border-white/30 transition"
            >
              <div className="h-40 bg-white/5 rounded-md mb-6" />
              <h3 className="text-lg">{name}</h3>
              <p className="mt-2 text-sm text-[#9CA3AF]">
                Designed for everyday precision.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

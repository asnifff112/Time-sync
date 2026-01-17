export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center bg-midnight">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Time, Perfected.
          </h1>

          <p className="mt-6 max-w-md text-buttercream/80">
            Discover premium watches crafted with precision,
            elegance, and timeless design.
          </p>

          <div className="mt-10">
            <button className="rounded-full bg-buttercream px-8 py-3 text-sm font-medium text-midnight hover:opacity-90 transition">
              Explore Watches
            </button>
          </div>
        </div>

        {/* Right – 3D Placeholder */}
        <div className="relative flex items-center justify-center">
          <div className="h-[420px] w-[420px] rounded-full border border-white/10 bg-black/20">
            {/* Three.js Canvas will go here */}
            <p className="flex h-full items-center justify-center text-sm text-white/40">
              3D Watch Scene
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0B1220] to-[#020617] text-white">
      <div className="mx-auto max-w-6xl px-6 py-28">

        {/* HERO */}
        <section className="mb-24 text-center">
          <h1 className="text-5xl font-semibold tracking-tight">
            About <span className="text-buttercream">TimeSync</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Where precision meets design.  
            TimeSync is not just a watch store — it’s a statement of craftsmanship and time.
          </p>
        </section>

        {/* STORY */}
        <section className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold">Our Story</h2>
            <p className="mt-6 text-white/70 leading-relaxed">
              TimeSync was built with one belief —  
              **time deserves respect**.
              <br /><br />
              Every watch we curate represents engineering excellence,
              timeless aesthetics, and reliability you can feel on your wrist.
              <br /><br />
              Inspired by precision mechanics and modern minimalism,
              TimeSync blends tradition with technology.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur">
            <h3 className="text-2xl font-medium">What Makes Us Different</h3>
            <ul className="mt-6 space-y-4 text-white/70">
              <li>• Premium mechanical & automatic watches</li>
              <li>• Precision-focused engineering</li>
              <li>• Clean, modern design philosophy</li>
              <li>• Hand-picked collections</li>
              <li>• Built for professionals & enthusiasts</li>
            </ul>
          </div>
        </section>

        {/* VALUES */}
        <section className="mt-32">
          <h2 className="mb-12 text-center text-3xl font-semibold">
            Our Core Values
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Precision",
                desc: "Every second matters. Our watches are engineered for accuracy and consistency."
              },
              {
                title: "Design",
                desc: "Timeless aesthetics that never go out of style."
              },
              {
                title: "Performance",
                desc: "Built to perform — whether daily wear or special occasions."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition hover:bg-white/10"
              >
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="mt-4 text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-32 text-center">
          <h2 className="text-3xl font-semibold">
            Crafted for Those Who Value Time
          </h2>
          <p className="mt-4 text-white/70">
            Discover watches that move with precision — just like you.
          </p>

          <a
            href="/products"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-medium text-black transition hover:scale-105"
          >
            Explore Collection
          </a>
        </section>

      </div>
    </main>
  );
}

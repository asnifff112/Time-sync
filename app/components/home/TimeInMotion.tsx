"use client";

import ModelViewer from "@/app/effects/ModelViewer";

export default function TimeInMotion() {
  return (
    <section className="relative bg-midnight py-32 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-16">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-5xl md:text-6xl font-semibold leading-tight text-buttercream">
            Time in Motion
          </h2>

          <p className="mt-6 max-w-md text-white/70 leading-relaxed">
            Every second matters. Engineered with precision mechanics,
            TimeSync watches move in perfect harmony with time itself.
          </p>

          <ul className="mt-10 space-y-4 text-sm text-white/80">
            <li>• Automatic self-winding movement</li>
            <li>• Sapphire crystal protection</li>
            <li>• Smooth continuous motion</li>
          </ul>

          <button className="mt-12 rounded-full border border-buttercream/40 px-8 py-3 text-sm hover:bg-buttercream hover:text-midnight transition">
            Explore Collection
          </button>
        </div>

        {/* RIGHT – 3D WATCH */}
        <div className="relative flex justify-center">
          <div className="rounded-full border border-white/10 bg-black/20 p-6 backdrop-blur">
            <ModelViewer
             url="/models/aiwatch/model.glb"
             
            
             
            
           
             
             
              autoRotate
              autoRotateSpeed={0.35}
              
             />
          </div>
        </div>

      </div>
    </section>
  );
}

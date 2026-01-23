'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const watches = [
  { src: '/products/watch1.jpg', name: 'Chronograph Silver', price: '₹24,999', category: 'Heritage' },
  { src: '/products/watch2.jpg', name: 'Midnight Pro', price: '₹18,500', category: 'Sport' },
  { src: '/products/watch3.jpg', name: 'Elite Gold Edition', price: '₹42,000', category: 'Luxury' }
]

export default function GallerySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Animation
      gsap.from('.gallery-title', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: '.gallery-title',
          start: 'top 90%',
        }
      });

      // 2. Parallax Effect on Grid Items
      gsap.utils.toArray<HTMLElement>('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
          y: 150,
          opacity: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        });

        // Mouse Move Tilt Effect (Premium feel without Three.js)
        item.addEventListener('mousemove', (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = item.getBoundingClientRect();
          const x = (clientX - left) / width - 0.5;
          const y = (clientY - top) / height - 0.5;

          gsap.to(item.querySelector('.image-container'), {
            rotateY: x * 15,
            rotateX: -y * 15,
            transformPerspective: 1000,
            duration: 0.5,
            ease: "power2.out"
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item.querySelector('.image-container'), {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [])

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[#030712] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Part */}
        <div className="text-center mb-24 space-y-4">
          <h2 className="gallery-title text-6xl md:text-8xl font-light tracking-tighter text-white uppercase italic">
            Pure <span className="font-serif font-black text-cyan-500">Precision</span>
          </h2>
          <p className="gallery-title text-gray-500 tracking-[0.4em] text-xs uppercase">
            Curated Excellence — Since 1994
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-3 gap-12">
          {watches.map((watch, i) => (
            <div key={i} className="gallery-item relative">
              <div className="image-container relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0B1220] border border-white/5 transition-all duration-500">
                
                {/* Product Numbering */}
                <span className="absolute top-6 left-6 z-10 text-white/20 font-mono text-sm">0{i+1}</span>
                
                {/* Image */}
                <Image 
                  src={watch.src} 
                  alt={watch.name} 
                  fill
                  className="object-contain p-12 drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Text Info - Separate from Tilt to maintain readability */}
              <div className="mt-8 space-y-2 text-center">
                <p className="text-cyan-500 text-[10px] tracking-widest font-bold uppercase">{watch.category}</p>
                <h3 className="text-2xl font-light text-white tracking-wide">{watch.name}</h3>
                <p className="text-gray-400 font-mono">{watch.price}</p>
                <div className="w-12 h-[1px] bg-cyan-500 mx-auto mt-4 scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
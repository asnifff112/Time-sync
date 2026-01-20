'use client'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = ['/watches/watch1.jpg', '/watches/watch2.jpg', '/watches/watch3.jpg'] // Your watch images

export default function GallerySection() {
  useEffect(() => {
    gsap.from('.gallery-item', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <section className="py-32 px-8 bg-gray text-dark">
      <h2 className="text-5xl font-bold text-center mb-16">Our Collection</h2>
      <div className="gallery-grid max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {images.map((src, i) => (
          <div key={i} className="gallery-item group cursor-pointer overflow-hidden rounded-xl shadow-2xl">
            <img src={src} alt="Watch" className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="p-6 bg-primary text-light">
              <h3 className="text-2xl font-bold">Model {i+1}</h3>
              <p>$999</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

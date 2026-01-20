'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const scene = new THREE.Scene()
    sceneRef.current = scene
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const loader = new GLTFLoader()
    loader.load('/models/watch.gltf', (gltf) => { // Add your watch GLTF model
      scene.add(gltf.scene)
      gltf.scene.rotation.y = Math.PI
    })

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      const watch = scene.children[1]
      if (watch) watch.rotation.y += 0.01 // Rotate like Lando helmet
      renderer.render(scene, camera)
    }
    animate()

    // GSAP scroll parallax
    gsap.to(camera.position, {
      z: 2,
      scrollTrigger: {
        trigger: mountRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section className="h-screen w-full relative overflow-hidden bg-gradient-to-b from-primary to-dark flex items-center justify-center text-light">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="z-10 text-center p-8">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 animate-slide-in">Premium Watches</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">Precision timing, dynamic performance</p>
      </div>
    </section>
  )
}

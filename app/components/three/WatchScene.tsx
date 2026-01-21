"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function WatchScene({
  onUpdate,
}: {
  onUpdate?: (watch: THREE.Object3D) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(420, 420);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // LIGHTS
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(5, 5, 5);
    scene.add(dir);

    // MODEL
    const loader = new GLTFLoader();
    loader.load("/models/watch.gltf", (gltf) => {
      watchRef.current = gltf.scene;
      gltf.scene.rotation.y = Math.PI;
      scene.add(gltf.scene);
      onUpdate?.(gltf.scene);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      if (watchRef.current) {
        watchRef.current.rotation.y += 0.002; // idle rotation
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [onUpdate]);

  return <div ref={mountRef} />;
}

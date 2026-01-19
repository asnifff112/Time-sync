"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/* ---------------------------------
   Watch Placeholder (Cylinder)
---------------------------------- */
function WatchModel() {
  const ref = useRef<THREE.Mesh>(null);

  // Very slow rotation (premium feel)
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={ref}>
      {/* Watch body */}
      <cylinderGeometry args={[1.4, 1.4, 0.4, 64]} />
      <meshStandardMaterial
        color="#D1CFC9"
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}

/* ---------------------------------
   Main Hero Scene
---------------------------------- */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Lighting – soft & luxury */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <pointLight position={[-3, -2, 2]} intensity={0.6} />

      {/* Watch */}
      <WatchModel />

      {/* Controls (limited) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
}

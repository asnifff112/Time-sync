"use client";

import { FC, Suspense, useRef, useLayoutEffect, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

interface ModelViewerProps {
  url: string;
  width?: number;
  height?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

const Loader = () => (
  <Html center className="text-white/70 text-sm">
    Loading…
  </Html>
);

function WatchModel({
  url,
  autoRotate,
  autoRotateSpeed = 0.4,
}: {
  url: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    scene.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    // Normalize size (VERY IMPORTANT for watches)
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3()).length();
    const scale = 1.2 / size;
    scene.scale.setScalar(scale);
    scene.position.set(0, -0.3, 0);
  }, [scene]);

  useFrame((_, delta) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += delta * autoRotateSpeed;
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

const ModelViewer: FC<ModelViewerProps> = ({
  url,
  width = 420,
  height = 420,
  autoRotate = true,
  autoRotateSpeed = 0.4,
}) => {
  return (
    <div style={{ width, height }}>
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        shadows
      >
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-5, 3, 2]} intensity={0.6} />

          <Environment preset="studio" />

          <WatchModel
            url={url}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;

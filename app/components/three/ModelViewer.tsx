"use client";

import { FC, Suspense, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";
import * as THREE from "three";

interface ModelViewerProps {
  url: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

const Loader = () => (
  <Html center className="text-white/60 text-sm">
    Loading watch…
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
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3()).length();
    const scale = 1.5 / size;

    scene.scale.setScalar(scale);
    scene.position.set(0, -0.25, 0);

    scene.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
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
  autoRotate = true,
  autoRotateSpeed = 0.35,
}) => {
  return (
    <div className="h-[420px] w-[420px]">
      <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }} shadows>
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

          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;

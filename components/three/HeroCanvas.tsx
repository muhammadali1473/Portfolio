"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Shape() {
  const ref = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame(({ mouse, clock }) => {
    if (!ref.current) return;
    target.current.x = THREE.MathUtils.lerp(target.current.x, mouse.y * 0.35, 0.05);
    target.current.y = THREE.MathUtils.lerp(target.current.y, mouse.x * 0.6, 0.05);
    ref.current.rotation.x = target.current.x + clock.getElapsedTime() * 0.05;
    ref.current.rotation.y = target.current.y + clock.getElapsedTime() * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.35, 1]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#3b82f6"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.35}
          distort={0.38}
          speed={1.6}
        />
      </Icosahedron>
    </Float>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 3, 5]} intensity={1.4} color="#a78bfa" />
        <pointLight position={[-4, -2, -3]} intensity={1.6} color="#22d3ee" />
        <Shape />
        <Sparkles count={60} scale={6} size={2.2} speed={0.35} color="#93c5fd" opacity={0.7} />
      </Suspense>
    </Canvas>
  );
}

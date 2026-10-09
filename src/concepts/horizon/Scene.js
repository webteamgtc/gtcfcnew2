"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const gold = { color: "#d8b56e", metalness: 1, roughness: 0.22 };

function Knot() {
  const ref = useRef();
  useFrame((state, dt) => {
    ref.current.rotation.x += dt * 0.12;
    ref.current.rotation.y += dt * 0.18;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.3, 200, 32, 2, 3]} />
      <meshStandardMaterial {...gold} />
    </mesh>
  );
}

function Shards() {
  const items = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({
      pos: [Math.cos(i * 0.9) * (2.6 + (i % 3) * 0.5), Math.sin(i * 1.7) * 1.6, Math.sin(i * 0.9) * 1.6 - 0.8],
      s: 0.08 + ((i * 37) % 10) / 60,
      geo: i % 3,
    })),
    []
  );
  return items.map((it, i) => (
    <Float key={i} speed={1.5 + (i % 4) * 0.4} rotationIntensity={2} floatIntensity={1.5}>
      <mesh position={it.pos} scale={it.s}>
        {it.geo === 0 ? <octahedronGeometry /> : it.geo === 1 ? <icosahedronGeometry /> : <sphereGeometry args={[1, 32, 32]} />}
        <meshStandardMaterial {...gold} roughness={it.geo === 2 ? 0.05 : 0.3} />
      </mesh>
    </Float>
  ));
}

function Rig({ children }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.35, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.2, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

export default function HorizonScene({ scale = 1, paused = false }) {
  return (
    <Canvas frameloop={paused ? "never" : "always"} camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#fff3d6" />
      <Rig>
        <group scale={scale}>
          <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
            <Knot />
          </Float>
          <mesh rotation={[Math.PI / 2.3, 0, 0]}>
            <torusGeometry args={[2.3, 0.012, 16, 200]} />
            <meshStandardMaterial {...gold} />
          </mesh>
          <Shards />
        </group>
      </Rig>
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, -6]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2} color="#7aa2ff" position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffe2a8" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="ring" intensity={4} position={[0, 0, 6]} scale={3} />
      </Environment>
    </Canvas>
  );
}

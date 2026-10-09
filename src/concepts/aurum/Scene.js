"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const R = 1.6;
const DUBAI = [25.2, 55.27];
const CITIES = [[51.5, -0.12], [40.7, -74], [35.7, 139.7], [1.35, 103.8], [22.3, 114.2], [47.4, 8.5]];

function toVec([lat, lon], r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
}

function Dots() {
  const geo = useMemo(() => {
    const n = 3600;
    const pos = new Float32Array(n * 3);
    const col = new Float32Array(n * 3);
    const a = new THREE.Color("#fff1c9");
    const b = new THREE.Color("#a87a35");
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = i * 2.399963;
      pos.set([Math.cos(t) * r * R, y * R, Math.sin(t) * r * R], i * 3);
      const c = a.clone().lerp(b, Math.random());
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, []);
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.95} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Arc({ to, delay }) {
  const ref = useRef();
  const { line, count } = useMemo(() => {
    const s = toVec(DUBAI);
    const e = toVec(to);
    const mid = s.clone().add(e).multiplyScalar(0.5);
    mid.setLength(R + s.distanceTo(e) * 0.45);
    const pts = new THREE.QuadraticBezierCurve3(s, mid, e).getPoints(80);
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = new THREE.LineBasicMaterial({ color: "#f3dca4", transparent: true, opacity: 0.85 });
    return { line: new THREE.Line(g, m), count: pts.length };
  }, [to]);
  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime - delay) % 6) / 6;
    const p = clock.elapsedTime < delay ? 0 : t;
    const start = p < 0.5 ? 0 : Math.floor(((p - 0.5) / 0.5) * count);
    const end = Math.min(count, Math.floor((p / 0.5) * count));
    line.geometry.setDrawRange(start, Math.max(0, end - start));
  });
  return <primitive ref={ref} object={line} />;
}

function Globe() {
  const spin = useRef();
  const tilt = useRef();
  const sat = useRef();
  useFrame((state, dt) => {
    spin.current.rotation.y += dt * 0.07;
    tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, 0.25 + state.pointer.y * 0.15, 0.04);
    tilt.current.rotation.z = THREE.MathUtils.lerp(tilt.current.rotation.z, -state.pointer.x * 0.12, 0.04);
    const t = state.clock.elapsedTime * 0.35;
    sat.current.position.set(Math.cos(t) * 2.25, Math.sin(t) * 0.5, Math.sin(t) * 2.25);
  });
  const dubai = toVec(DUBAI, R + 0.01);
  return (
    <group ref={tilt}>
      <group ref={spin} rotation={[0, -1.1, 0]}>
        <mesh>
          <sphereGeometry args={[R * 0.985, 64, 64]} />
          <meshBasicMaterial color="#081022" />
        </mesh>
        <Dots />
        {CITIES.map((c, i) => <Arc key={i} to={c} delay={i * 0.9} />)}
        <mesh position={dubai}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#fff6dc" />
        </mesh>
      </group>
      <mesh rotation={[Math.PI / 2.2, 0, 0.3]}>
        <torusGeometry args={[2.25, 0.004, 8, 256]} />
        <meshBasicMaterial color="#c9a35b" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, 0.4, -0.5]}>
        <torusGeometry args={[2.6, 0.003, 8, 256]} />
        <meshBasicMaterial color="#c9a35b" transparent opacity={0.3} />
      </mesh>
      <mesh ref={sat}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#f3dca4" />
      </mesh>
    </group>
  );
}

function Stars() {
  const geo = useMemo(() => {
    const n = 500;
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n * 3; i++) p[i] = (Math.random() - 0.5) * 22;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return g;
  }, []);
  const ref = useRef();
  useFrame((_, dt) => (ref.current.rotation.y += dt * 0.01));
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.02} color="#c9a35b" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function AurumScene({ paused = false }) {
  return (
    <Canvas frameloop={paused ? "never" : "always"} camera={{ position: [0, 0, 5.6], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <Stars />
      <Globe />
    </Canvas>
  );
}

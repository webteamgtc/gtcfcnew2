"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vH;
  varying float vD;
  void main() {
    vec3 p = position;
    float d = distance(p.xz, uMouse * vec2(9.0, 5.0));
    float h = sin(p.x * 0.55 + uTime * 0.8) * 0.35
            + cos(p.z * 0.45 + uTime * 0.6) * 0.35
            + sin((p.x + p.z) * 0.25 + uTime * 0.4) * 0.5
            + exp(-d * 0.6) * 0.9;
    p.y += h;
    vH = h;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vD = -mv.z;
    gl_PointSize = clamp(42.0 / vD, 1.0, 5.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  varying float vH;
  varying float vD;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (length(c) > 0.5) discard;
    vec3 white = vec3(0.92);
    vec3 gold = vec3(0.86, 0.71, 0.43);
    vec3 col = mix(white, gold, smoothstep(0.4, 1.2, vH));
    float fade = smoothstep(26.0, 6.0, vD);
    gl_FragColor = vec4(col, fade * 0.85);
  }
`;

function Field() {
  const mat = useRef();
  const geo = useMemo(() => {
    const nx = 160, nz = 90, w = 36, d = 20;
    const p = new Float32Array(nx * nz * 3);
    let k = 0;
    for (let i = 0; i < nx; i++)
      for (let j = 0; j < nz; j++) {
        p[k++] = (i / (nx - 1) - 0.5) * w;
        p[k++] = 0;
        p[k++] = (j / (nz - 1) - 0.5) * d;
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return g;
  }, []);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() } }), []);
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.lerp(new THREE.Vector2(state.pointer.x, -state.pointer.y), 0.05);
  });
  return (
    <points geometry={geo}>
      <shaderMaterial ref={mat} vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} transparent depthWrite={false} />
    </points>
  );
}

export default function MonolithScene({ paused = false }) {
  return (
    <Canvas frameloop={paused ? "never" : "always"} camera={{ position: [0, 3.2, 9], fov: 50 }} onCreated={({ camera }) => camera.lookAt(0, -0.5, 0)} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <Field />
    </Canvas>
  );
}

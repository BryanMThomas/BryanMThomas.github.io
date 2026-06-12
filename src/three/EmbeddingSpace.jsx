import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Line, OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import data from '../data.js';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js';

const byId = Object.fromEntries(data.nodes.map((n) => [n.id, n]));
const colorOf = (n) => data.clusters[n.cluster].color;

// anchor labels shown when nothing is active (keeps the cloud uncluttered)
const PRIMARY = new Set([
  'openclaw',
  'triphelm',
  'bryxbids',
  'eve',
  'hilo',
  'suns',
  'dirtbike',
  'rag',
]);

// faint ambient starfield for depth
function Starfield() {
  const positions = useMemo(() => {
    const n = 700;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 14 + Math.random() * 16;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(p) * Math.cos(t);
      arr[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      arr[i * 3 + 2] = r * Math.cos(p);
    }
    return arr;
  }, []);
  const ref = useRef();
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.01;
  });
  return (
    <group ref={ref}>
      <Points positions={positions} stride={3}>
        <PointMaterial transparent color="#2a4a63" size={0.06} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

function Node({ node, hovered, selected, dimmed, showLabel, onOver, onOut, onClick }) {
  const ref = useRef();
  const halo = useRef();
  // per-node phase so the cloud breathes organically, not in lockstep
  const phase = useMemo(() => node.x * 5.1 + node.y * 3.7, [node]);
  const active = hovered || selected;
  const color = colorOf(node);
  useFrame((state) => {
    if (!ref.current) return;
    const target = active ? 1.7 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    if (halo.current) {
      const base = active ? 2.8 : 2.1;
      const s = base + Math.sin(state.clock.elapsedTime * 1.4 + phase) * 0.22;
      halo.current.scale.setScalar(s);
    }
  });
  const opacity = dimmed ? 0.18 : 1;
  return (
    <group position={[node.x, node.y, node.z]}>
      <mesh
        ref={ref}
        onPointerOver={(e) => {
          e.stopPropagation();
          onOver(node.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onOut();
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(node.id);
        }}
      >
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} />
      </mesh>
      {/* glow halo */}
      <mesh ref={halo} scale={active ? 2.8 : 2.1}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={(dimmed ? 0.04 : 0.12) * (active ? 1.8 : 1)}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      {showLabel && (
        <Html center distanceFactor={11} zIndexRange={[20, 0]} pointerEvents="none">
          <div
            style={{
              transform: 'translateY(-26px)',
              fontFamily: 'Inter, sans-serif',
              fontSize: active ? '13px' : '11px',
              fontWeight: active ? 700 : 500,
              color: active ? '#ffffff' : '#cfe0ec',
              opacity: active ? 1 : 0.72,
              whiteSpace: 'nowrap',
              textShadow: '0 1px 6px rgba(0,0,0,0.9)',
              pointerEvents: 'none',
              transition: 'font-size .15s, opacity .15s',
            }}
          >
            {node.label}
          </div>
        </Html>
      )}
    </group>
  );
}

function Edges({ activeId }) {
  return data.edges.map((e, i) => {
    const a = byId[e.a];
    const b = byId[e.b];
    const isActive = activeId === e.a || activeId === e.b;
    return (
      <Line
        key={i}
        points={[
          [a.x, a.y, a.z],
          [b.x, b.y, b.z],
        ]}
        color={isActive ? '#9fe9f3' : '#2f5870'}
        lineWidth={isActive ? 1.6 : 0.6}
        transparent
        opacity={activeId ? (isActive ? 0.9 : 0.05) : 0.18}
      />
    );
  });
}

const INTRO_FROM = 30; // camera distance the dolly-in starts from
const INTRO_TO = 15.2; // resting distance (matches the original framing)
const INTRO_SECS = 2.6;

function Rig() {
  const reducedMotion = usePrefersReducedMotion();
  const { camera } = useThree();
  const start = useRef(null);
  const done = useRef(false);
  useFrame((state) => {
    if (done.current) return;
    if (reducedMotion) {
      camera.position.setLength(INTRO_TO);
      done.current = true;
      return;
    }
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = Math.min((state.clock.elapsedTime - start.current) / INTRO_SECS, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    camera.position.setLength(INTRO_FROM - (INTRO_FROM - INTRO_TO) * eased);
    if (t >= 1) done.current = true;
  });
  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableZoom={false}
      autoRotate={!reducedMotion}
      autoRotateSpeed={0.35}
      enableDamping
      dampingFactor={0.08}
    />
  );
}

export default function EmbeddingSpace({ selected, setSelected, setHovered, hovered }) {
  const activeId = hovered || selected;
  return (
    <>
      <color attach="background" args={['#0a1622']} />
      <fog attach="fog" args={['#0a1622', 16, 30]} />
      <ambientLight intensity={0.6} />
      <Starfield />
      <Edges activeId={activeId} />
      {data.nodes.map((n) => {
        const isActive = activeId === n.id;
        const neighbor = !!activeId && isNeighbor(activeId, n.id);
        const showLabel = activeId ? isActive || neighbor : PRIMARY.has(n.id);
        return (
          <Node
            key={n.id}
            node={n}
            hovered={hovered === n.id}
            selected={selected === n.id}
            dimmed={!!activeId && !isActive && !neighbor}
            showLabel={showLabel}
            onOver={setHovered}
            onOut={() => setHovered(null)}
            onClick={setSelected}
          />
        );
      })}
      <Rig />
    </>
  );
}

function isNeighbor(a, b) {
  return data.edges.some((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a));
}

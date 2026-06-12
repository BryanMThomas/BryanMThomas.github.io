import React from 'react';
import { Canvas } from '@react-three/fiber';
import EmbeddingSpace from './EmbeddingSpace.jsx';

// loaded lazily from Hero so three.js ships as its own chunk
export default function HeroCanvas({ selected, setSelected, hovered, setHovered }) {
  return (
    <Canvas
      camera={{ position: [0, 2, 15], fov: 55 }}
      dpr={[1, 2]}
      onPointerMissed={() => setSelected(null)}
    >
      <EmbeddingSpace
        selected={selected}
        setSelected={setSelected}
        hovered={hovered}
        setHovered={setHovered}
      />
    </Canvas>
  );
}

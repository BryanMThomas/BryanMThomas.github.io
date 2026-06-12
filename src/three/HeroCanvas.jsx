import React from 'react';
import { Canvas } from '@react-three/fiber';
import EmbeddingSpace from './EmbeddingSpace.jsx';

// loaded lazily from Hero so three.js ships as its own chunk
export default function HeroCanvas({ selected, setSelected, hovered, setHovered }) {
  return (
    <Canvas
      // starts pulled back; Rig dollies in to the resting framing on load
      camera={{ position: [0, 4, 29.7], fov: 55 }}
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

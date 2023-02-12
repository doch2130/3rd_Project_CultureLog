import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function Threejs() {
  return (
    <>
      <Canvas>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
      </Canvas>
    </>
  );
}

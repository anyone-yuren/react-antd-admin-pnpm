import React from 'react';
import { InstancedPoints } from 'ui';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const InstancedMeshDemo = () => {
  return (
    <div style={{ height: 600, width: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 150], fov: 60 }}>
        <color attach="background" args={['#111']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <InstancedPoints 
          count={100000} 
          color="#5E72E4" 
          selectedColor="#fb6340"
        />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default InstancedMeshDemo;

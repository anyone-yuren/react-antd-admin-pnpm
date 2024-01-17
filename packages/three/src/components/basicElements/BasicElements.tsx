import { Grid, OrbitControls, PerformanceMonitor, useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import type { FC } from 'react';
import React, { memo, useRef } from 'react';
import type { DirectionalLight, OrthographicCamera } from 'three';
import * as THREE from 'three';
// import Particles from './particles/Particles'

const BasicElements: FC = () => {
  // 平行光调试
  const directionalLightRef = useRef<DirectionalLight>(null!);
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 2);
  const { showAxes, showGrid } = useControls({
    showGrid: true,
    showAxes: false,
  });
  const directionLightControls = useControls('directionLight', {
    position: [100, 100, -100],
    intensity: 1.5,
  });
  // 平行光阴影调试
  const directionLightCameraRef = useRef<OrthographicCamera>(null!);
  // useHelper(directionLightCameraRef, THREE.CameraHelper)

  return (
    <group>
      {/* 网格 */}
      {showGrid && (
        <Grid
          args={[500, 500]}
          fadeDistance={300}
          sectionColor="#9299a0"
          sectionSize={10}
          position={[0, -0.05, 0]}
        />
      )}
      {/* 轨道控制器 */}
      <OrbitControls
        makeDefault
        minDistance={5}
        maxDistance={200}
        maxPolarAngle={(Math.PI * 75) / 180}
      />
      {showAxes && <axesHelper args={[100]} />}

      {/* 灯光 */}
      <ambientLight color="#fff" intensity={0.5} />
      <directionalLight
        castShadow
        ref={directionalLightRef}
        color="#fff"
        intensity={directionLightControls.intensity}
        position={directionLightControls.position}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          ref={directionLightCameraRef}
          attach="shadow-camera"
          left={-100}
          right={100}
          top={100}
          bottom={-100}
          near={30}
          far={300}
        ></orthographicCamera>
      </directionalLight>
      <PerformanceMonitor />
      {/* <Particles count={100} /> */}
    </group>
  );
};

export default memo(BasicElements);

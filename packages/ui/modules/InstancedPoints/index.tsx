import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface InstancedPointsProps {
  count?: number;
  color?: string;
  selectedColor?: string;
  enableSelection?: boolean;
}

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();
const tempVec = new THREE.Vector3();

export default function InstancedPoints({
  count = 100000,
  color = '#4CAF50',
  selectedColor = '#F44336',
  enableSelection = true,
}: InstancedPointsProps) {

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera, gl, size } = useThree();
  const [selectionBox, setSelectionBox] = useState<{ start: { x: number; y: number } | null; current: { x: number; y: number } | null }>({ start: null, current: null });

  // Generate random positions
  const particles = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      data[i * 3] = (Math.random() - 0.5) * 100;
      data[i * 3 + 1] = (Math.random() - 0.5) * 100;
      data[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return data;
  }, [count]);

  // Initial setup
  useEffect(() => {
    if (!meshRef.current) return;

    const baseColor = new THREE.Color(color);
    
    for (let i = 0; i < count; i++) {
      tempObject.position.set(
        particles[i * 3],
        particles[i * 3 + 1],
        particles[i * 3 + 2]
      );
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
      meshRef.current.setColorAt(i, baseColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [particles, count, color]);

  // Selection Logic
  const handlePointerDown = useCallback((e: PointerEvent) => {
    if (!enableSelection || e.button !== 0) return; 
    if (!e.shiftKey) return;

    e.stopPropagation(); // Stop OrbitControls
    
    const rect = gl.domElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelectionBox({ start: { x, y }, current: { x, y } });
  }, [enableSelection, gl.domElement]);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!selectionBox.start) return;
    
    const rect = gl.domElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setSelectionBox(prev => ({ ...prev, current: { x, y } }));
  }, [selectionBox.start, gl.domElement]);

  const handlePointerUp = useCallback(() => {
    if (!selectionBox.start || !selectionBox.current || !meshRef.current) {
        setSelectionBox({ start: null, current: null });
        return;
    }

    const startX = Math.min(selectionBox.start.x, selectionBox.current.x);
    const endX = Math.max(selectionBox.start.x, selectionBox.current.x);
    const startY = Math.min(selectionBox.start.y, selectionBox.current.y);
    const endY = Math.max(selectionBox.start.y, selectionBox.current.y);

    const baseColor = new THREE.Color(color);
    const selColor = new THREE.Color(selectedColor);

    const width = size.width;
    const height = size.height;

    let selectedCount = 0;

    for (let i = 0; i < count; i++) {
        tempVec.set(
            particles[i * 3],
            particles[i * 3 + 1],
            particles[i * 3 + 2]
        );

        tempVec.project(camera);

        // Convert NDC to screen coordinates to match selection box
        const sx = (tempVec.x * .5 + .5) * width;
        const sy = (-(tempVec.y * .5) + .5) * height;

        if (sx >= startX && sx <= endX && sy >= startY && sy <= endY) {
            meshRef.current.setColorAt(i, selColor);
            selectedCount++;
        } else {
            meshRef.current.setColorAt(i, baseColor);
        }
    }
    
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    
    console.log(`Selected ${selectedCount} points`);
    setSelectionBox({ start: null, current: null });

  }, [selectionBox, count, particles, camera, size, color, selectedColor]);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerDown, handlePointerMove, handlePointerUp, gl.domElement]);


  // Selection Box Style
  const boxStyle: React.CSSProperties = selectionBox.start && selectionBox.current ? {
    position: 'absolute',
    left: Math.min(selectionBox.start.x, selectionBox.current.x),
    top: Math.min(selectionBox.start.y, selectionBox.current.y),
    width: Math.abs(selectionBox.current.x - selectionBox.start.x),
    height: Math.abs(selectionBox.current.y - selectionBox.start.y),
    border: '1px solid #fff',
    backgroundColor: 'rgba(0, 150, 255, 0.3)',
    pointerEvents: 'none',
    zIndex: 10
  } : { display: 'none' };

  return (
    <>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial />
      </instancedMesh>
      
      <Html fullscreen style={{ pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={boxStyle} />
        <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', background: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: 4 }}>
          按住Shift键并拖拽来框选点
        </div>
      </Html>
    </>
  );
};

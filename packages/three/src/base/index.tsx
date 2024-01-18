import { Canvas, Props as CanvasProps } from '@react-three/fiber';
import * as React from 'react';
import { Vector3 } from 'three';
import BasicElements from '../components/basicElements/BasicElements';

type Props = React.PropsWithChildren<
  CanvasProps & {
    cameraFov?: number;
    cameraPosition?: Vector3;
  }
>;

/**
 * 渲染3D基础场景
 * @param {Props} props - The props for the component.
 * @param {Props} children - The child elements to be rendered within the component.
 * @param {...any} restProps - The rest of the props to be spread onto the Canvas element.
 * @return {JSX.Element} - The rendered Setup component.
 */
export const Setup = ({ children, ...restProps }: Props) => (
  <Canvas
    style={{ height: '450px' }}
    dpr={[1, 2]}
    shadows={'soft'}
    camera={{ position: [5, 5, 5], fov: 25, far: 2000 }}
    gl={{ logarithmicDepthBuffer: true, antialias: true }}
    {...restProps}
  >
    <color attach="background" args={['#17171b']} />
    {children}
    <BasicElements />
  </Canvas>
);

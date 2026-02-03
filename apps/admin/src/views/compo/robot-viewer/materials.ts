import * as THREE from 'three';

type ShaderSource = {
  vertex: string;
  fragment: string;
};

export const SHADER_SOURCES: Record<'fresnel' | 'grid' | 'scanline', ShaderSource> = {
  fresnel: {
    vertex: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPos.xyz);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragment: `
      uniform vec3 uColor;
      uniform float uIntensity;
      uniform float uPower;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), uPower);
        vec3 color = uColor * (0.2 + fresnel * uIntensity);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },
  grid: {
    vertex: `
      varying vec3 vWorldPos;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragment: `
      uniform vec3 uColor;
      uniform float uScale;
      uniform float uThickness;
      varying vec3 vWorldPos;
      void main() {
        vec2 coord = vWorldPos.xz * uScale;
        vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
        float line = min(grid.x, grid.y);
        float alpha = 1.0 - smoothstep(uThickness, uThickness + 0.5, line);
        vec3 color = uColor;
        gl_FragColor = vec4(color, alpha);
      }
    `,
  },
  scanline: {
    vertex: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragment: `
      uniform vec3 uColor;
      uniform float uTime;
      uniform float uSpeed;
      varying vec2 vUv;
      void main() {
        float scan = sin((vUv.y + uTime * uSpeed) * 60.0) * 0.5 + 0.5;
        float intensity = mix(0.3, 1.0, scan);
        gl_FragColor = vec4(uColor * intensity, 1.0);
      }
    `,
  },
};

export const materialPresets = {
  'builtin-basic': {
    name: '基础材质',
    materialType: 'basic',
    color: '#808080',
  },
  'builtin-metal': {
    name: '金属材质',
    materialType: 'standard',
    color: '#c0c0c0',
    metalness: 1,
    roughness: 0.2,
  },
  'builtin-glass': {
    name: '玻璃材质',
    materialType: 'physical',
    color: '#ffffff',
    metalness: 0,
    roughness: 0,
    transparent: true,
    opacity: 0.3,
  },
  'builtin-phong': {
    name: '高光材质',
    materialType: 'phong',
    color: '#ffffff',
    shininess: 30,
  },
  'pbr-machined-steel': {
    name: '机床钢',
    materialType: 'standard',
    color: '#9aa3ad',
    metalness: 0.9,
    roughness: 0.28,
  },
  'pbr-brushed-aluminum': {
    name: '拉丝铝',
    materialType: 'standard',
    color: '#c7cdd4',
    metalness: 0.85,
    roughness: 0.35,
  },
  'pbr-industrial-paint': {
    name: '工业涂装',
    materialType: 'standard',
    color: '#2f87ff',
    metalness: 0.15,
    roughness: 0.55,
  },
  'pbr-rubber': {
    name: '橡胶防护',
    materialType: 'standard',
    color: '#1f2937',
    metalness: 0.0,
    roughness: 0.85,
  },
  'shader-fresnel': {
    name: 'Fresnel',
    materialType: 'shader',
    shaderId: 'fresnel',
    color: '#38bdf8',
    intensity: 1.4,
    power: 2.5,
  },
  'shader-grid': {
    name: 'Grid',
    materialType: 'shader',
    shaderId: 'grid',
    color: '#22c55e',
    scale: 2.5,
    thickness: 1.0,
  },
  'shader-scanline': {
    name: 'Scanline',
    materialType: 'shader',
    shaderId: 'scanline',
    color: '#f59e0b',
    speed: 0.6,
  },
} as const;

export type MaterialPresetId = keyof typeof materialPresets;

export function createMaterialFromPreset(
  presetId: MaterialPresetId,
  colorOverride: string | undefined,
  animatedShaderMaterials: Set<THREE.ShaderMaterial>,
) {
  const preset = materialPresets[presetId] ?? materialPresets['builtin-basic'];
  const color = new THREE.Color(colorOverride ?? preset.color);

  if (preset.materialType === 'shader') {
    const source = SHADER_SOURCES[preset.shaderId as keyof typeof SHADER_SOURCES];
    const uniforms = {
      uColor: { value: color },
      uIntensity: { value: preset.intensity ?? 1.0 },
      uPower: { value: preset.power ?? 2.0 },
      uScale: { value: preset.scale ?? 2.0 },
      uThickness: { value: preset.thickness ?? 1.0 },
      uTime: { value: 0.0 },
      uSpeed: { value: preset.speed ?? 1.0 },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: source.vertex,
      fragmentShader: source.fragment,
      transparent: preset.shaderId === 'grid',
      depthWrite: preset.shaderId !== 'grid',
    });
    animatedShaderMaterials.add(mat);
    return mat;
  }

  if (preset.materialType === 'phong') {
    return new THREE.MeshPhongMaterial({
      color,
      shininess: preset.shininess ?? 30,
      transparent: preset.transparent ?? false,
      opacity: preset.opacity ?? 1,
    });
  }

  if (preset.materialType === 'physical') {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: preset.metalness ?? 0,
      roughness: preset.roughness ?? 0.5,
      transparent: preset.transparent ?? false,
      opacity: preset.opacity ?? 1,
      clearcoat: 0.1,
      clearcoatRoughness: 0.1,
    });
  }

  if (preset.materialType === 'basic') {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: preset.transparent ?? false,
      opacity: preset.opacity ?? 1,
    });
  }

  return new THREE.MeshStandardMaterial({
    color,
    metalness: preset.metalness ?? 0,
    roughness: preset.roughness ?? 0.5,
    transparent: preset.transparent ?? false,
    opacity: preset.opacity ?? 1,
  });
}

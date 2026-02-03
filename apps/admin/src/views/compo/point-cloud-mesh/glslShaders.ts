/**
 * GLSL 着色器模块
 *
 * 包含点云渲染所需的顶点和片段着色器
 */

// 点云顶点着色器 - 在 GPU 上计算位置
export const pointCloudVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uAnimSpeed;
  uniform int uShape;
  uniform int uColorScheme;

  attribute vec3 aBasePosition;
  attribute float aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  #define PI 3.14159265359
  #define TAU 6.28318530718

  // HSV to RGB 转换
  vec3 hsv2rgb(float h, float s, float v) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + K.xyz) * 6.0 - K.www);
    return v * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), s);
  }

  // 简单哈希函数
  float simpleHash(float n) {
    return fract(sin(n) * 43758.5453);
  }

  // 球面坐标转换
  vec3 spherical(float theta, float phi, float r) {
    float sinPhi = sin(phi);
    return vec3(
      r * sinPhi * cos(theta),
      r * cos(phi),
      r * sinPhi * sin(theta)
    );
  }

  // 球体形态
  vec3 generateSphere(vec3 base, float time) {
    float theta = base.x * TAU;
    float phi = acos(base.y * 2.0 - 1.0);
    float radius = 50.0 * pow(base.z, 0.333);
    vec3 pos = spherical(theta, phi, radius);
    float breath = 1.0 + 0.1 * sin(time * 2.0 + radius * 0.1);
    return pos * breath;
  }

  // 立方体形态
  vec3 generateCube(vec3 base, float time) {
    vec3 pos = (base - 0.5) * 100.0;
    float pulse = 1.0 + 0.05 * sin(time * 3.0 + length(pos) * 0.05);
    return pos * pulse;
  }

  // 波浪形态
  vec3 generateWave(vec3 base, float time) {
    float x = (base.x - 0.5) * 100.0;
    float z = (base.y - 0.5) * 100.0;
    float y = sin(x * 0.1 + time) * 10.0 + cos(z * 0.1 + time * 0.7) * 10.0;
    y += (base.z - 0.5) * 5.0;
    return vec3(x, y, z);
  }

  // 星系形态
  vec3 generateGalaxy(vec3 base, float time) {
    float arm = floor(base.x * 4.0);
    float t = base.y;
    float baseAngle = arm * PI * 0.5 + t * TAU + t * t * PI;
    float angle = baseAngle + time * 0.2;
    float radius = t * 50.0 + base.z * 10.0;
    float hashVal = simpleHash(base.x * 10.0 + base.y * 57.0);
    float height = (hashVal - 0.5) * 10.0 * (1.0 - t);
    return vec3(cos(angle) * radius, height, sin(angle) * radius);
  }

  // 计算颜色
  vec3 computeColor(vec3 pos, int scheme) {
    vec3 normalizedPos = normalize(pos);
    float len = length(pos);

    if (scheme == 0) {
      // 位置映射
      return normalizedPos * 0.5 + 0.5;
    } else if (scheme == 1) {
      // 法线映射
      return normalizedPos * 0.5 + 0.5;
    } else if (scheme == 2) {
      // 高度映射
      float h = (pos.y + 50.0) / 100.0;
      return hsv2rgb(0.6 - h * 0.4, 0.8, 0.9);
    } else if (scheme == 3) {
      // 径向渐变
      float d = len / 60.0;
      return hsv2rgb(0.8 - d * 0.3, 0.7, 0.9);
    } else {
      // 彩虹
      float angle = atan(pos.z, pos.x) / TAU + 0.5;
      return hsv2rgb(angle, 0.8, 0.9);
    }
  }

  void main() {
    float time = uTime * uAnimSpeed;

    // 根据形态选择生成位置
    vec3 pos;
    if (uShape == 0) {
      pos = generateSphere(aBasePosition, time);
    } else if (uShape == 1) {
      pos = generateCube(aBasePosition, time);
    } else if (uShape == 2) {
      pos = generateWave(aBasePosition, time);
    } else {
      pos = generateGalaxy(aBasePosition, time);
    }

    // 计算颜色
    vColor = computeColor(pos, uColorScheme);
    vAlpha = 1.0;

    // 变换到裁剪空间
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // 点大小 - 距离衰减
    float dist = -mvPosition.z;
    gl_PointSize = clamp(uSize * 300.0 / dist, 1.0, 50.0);
  }
`;

// 点云片段着色器
export const pointCloudFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // 圆形点
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    // 柔和边缘
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(vColor, alpha * vAlpha);
  }
`;

---
title: 点云网格化
atomId: PointCloudMesh
package: three
description: 基于 Marching Cubes 算法的点云网格重建组件，支持 GPU 点云渲染与 CPU 网格重建
group:
  title: 3D可视化
---

# 点云网格化

> 基于 Three.js ShaderMaterial 的 GPU 点云渲染，结合 CPU Marching Cubes 算法进行网格重建，将离散点云转换为连续三角网格。

## 功能特性

- 🎨 **GPU 着色器渲染**：使用 GLSL 在 GPU 上实时计算点云位置和颜色
- 🔷 **多种形态**：支持球体、立方体、波浪、星系四种点云形态
- 🌈 **多种配色**：火焰、海洋、极光、日落、彩虹五种颜色方案
- 🧊 **Marching Cubes**：CPU 实现的经典网格重建算法
- 🎛️ **参数可调**：体素分辨率、等值面阈值、散射半径等参数可配置
- 🔄 **实时动画**：支持点云动画，可调节动画速度
- 📊 **性能统计**：显示 FPS、点数、三角形数、重建耗时等

## 技术架构

```txt
┌─────────────────────────────────────────────────────────┐
│                    PointCloudMesh                        │
├─────────────────────────────────────────────────────────┤
│  ├── GPU Pipeline (WebGL)                                │
│  │   ├── Vertex Shader   // 计算点位置                   │
│  │   │   ├── 球体：球面分布                              │
│  │   │   ├── 立方体：立方体表面                          │
│  │   │   ├── 波浪：正弦波变换                            │
│  │   │   └── 星系：螺旋臂分布                            │
│  │   └── Fragment Shader // 计算点颜色                   │
│  │       └── 5 种配色方案                                │
│  ├── CPU Marching Cubes                                  │
│  │   ├── buildDensityField()  // 构建密度场             │
│  │   ├── march()              // 遍历体素               │
│  │   └── interpolateVertex()  // 插值顶点               │
│  └── Three.js Scene                                      │
│      ├── Points (ShaderMaterial)                         │
│      └── Mesh (MeshPhysicalMaterial)                     │
└─────────────────────────────────────────────────────────┘
```

## Marching Cubes 算法

```txt
1. 构建 3D 密度场（voxel grid）
   - 将空间划分为 N×N×N 体素
   - 每个顶点累加附近点的密度贡献

2. 遍历每个体素
   - 计算 8 个顶点的密度值
   - 与 isoValue 比较，生成 8-bit 索引
   - 查表获取三角形配置

3. 生成三角形顶点
   - 在体素边上插值计算精确位置
   - 插值计算顶点法线和颜色
```

## 参数说明

### 点云参数

| 参数 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| shape | 点云形态 | `'sphere' \| 'cube' \| 'wave' \| 'galaxy'` | `'sphere'` |
| colorScheme | 颜色方案 | `0-4` | `0` |
| pointCount | 点数量 | `number` | `500,000` |
| pointSize | 点大小 | `number` | `2.0` |
| animSpeed | 动画速度 | `number` | `0` |

### 网格重建参数

| 参数 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gridResolution | 体素分辨率 | `number` | `64` |
| isoValue | 等值面阈值 | `number` | `0.5` |
| splatRadius | 散射半径 | `number` | `1.5` |
| meshOpacity | 网格透明度 | `number` | `0.8` |

## 颜色方案

| 编号 | 名称 | 色彩特点 |
| --- | --- | --- |
| 0 | 🔥 火焰 | 红-橙-黄渐变 |
| 1 | 🌊 海洋 | 深蓝-青-白渐变 |
| 2 | 🌌 极光 | 绿-青-紫渐变 |
| 3 | 🌅 日落 | 粉-紫-蓝渐变 |
| 4 | 🌈 彩虹 | HSV 全色谱 |

## 使用示例

```tsx | pure
import PointCloudMesh from '@/views/compo/point-cloud-mesh';

// 基本用法 - 直接路由访问
// 路由：/compo/point-cloud-mesh

// 操作流程：
// 1. 选择形态和颜色方案
// 2. 调整点数量和动画速度
// 3. 点击"网格"按钮执行 Marching Cubes
// 4. 调整体素分辨率和阈值重建
```

## 交互说明

| 操作 | 说明 |
| --- | --- |
| 左键拖拽 | 旋转视角 |
| 右键拖拽 | 平移视角 |
| 滚轮 | 缩放 |
| 点云/网格按钮 | 切换视图模式 |
| 重建网格按钮 | 执行 Marching Cubes |

## 性能指标

| 点数 | 分辨率 | 重建耗时 | 三角形数 |
| --- | --- | --- | --- |
| 50 万 | 64³ | ~200ms | ~50K |
| 50 万 | 96³ | ~800ms | ~150K |
| 100 万 | 64³ | ~400ms | ~80K |
| 100 万 | 128³ | ~3s | ~400K |

> 测试环境：i7-8700K / Chrome 120

## 技术选型说明

| 技术点 | 选型 | 原因 |
| --- | --- | --- |
| 点云渲染 | GPU (GLSL) | 并行计算，高性能 |
| 网格重建 | CPU (JS) | 浏览器兼容性好，无需 WebGPU |
| 算法 | Marching Cubes | 经典稳定，适合等值面提取 |

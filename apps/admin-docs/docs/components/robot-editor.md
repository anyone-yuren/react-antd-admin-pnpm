---
title: 机器人编辑器
atomId: RobotViewer
package: three
description: 基于 Three.js 的 3D 机器人模型编辑器，支持节点变换、材质编辑和层级管理
group:
  title: 3D可视化
---

# 机器人编辑器

> 基于 Three.js 的交互式 3D 机器人模型编辑器，支持加载 FBX 模型、节点选择、变换控制、材质编辑等功能。

## 功能特性

- 📦 **FBX 模型加载**：支持加载 FBX 格式的 3D 机器人模型
- 🎯 **节点选择**：支持点击选择模型中的任意节点
- 🔄 **变换控制**：支持平移、旋转、缩放三种变换模式
- 🎨 **材质编辑**：提供多种预设材质和自定义颜色
- 📋 **层级管理**：可视化显示模型节点层级结构
- 🔧 **编辑模式**：支持整体模型编辑和单节点编辑两种模式
- ↩️ **撤销重置**：支持重置变换到初始状态

## 技术架构

```txt
┌─────────────────────────────────────────────────────────┐
│                     RobotViewer                          │
├─────────────────────────────────────────────────────────┤
│  ├── SceneSetup          // 场景配置                     │
│  │   ├── WebGLRenderer                                   │
│  │   ├── PerspectiveCamera                               │
│  │   ├── OrbitControls                                   │
│  │   └── Environment Lighting                            │
│  ├── ModelUtils          // 模型工具                     │
│  │   ├── loadFBXModel()      // 加载 FBX               │
│  │   ├── centerModel()       // 居中模型               │
│  │   ├── scaleModelToFit()   // 缩放适配               │
│  │   └── dumpHierarchy()     // 导出层级               │
│  ├── TransformManager    // 变换控制器                   │
│  │   ├── TransformControls                               │
│  │   ├── translate / rotate / scale                      │
│  │   └── 变换回调                                        │
│  ├── MaterialUtils       // 材质工具                     │
│  │   ├── captureOriginalMaterials()                      │
│  │   ├── applyCurrentMaterial()                          │
│  │   └── restoreOriginalMaterials()                      │
│  └── Selection           // 选择管理                     │
│      ├── Raycaster                                       │
│      └── BoxHelper                                       │
└─────────────────────────────────────────────────────────┘
```

## 预设材质

| 材质 ID | 名称 | 描述 |
| --- | --- | --- |
| `builtin-basic` | 基础材质 | MeshBasicMaterial |
| `builtin-standard` | 标准材质 | MeshStandardMaterial |
| `builtin-physical` | 物理材质 | MeshPhysicalMaterial |
| `builtin-toon` | 卡通材质 | MeshToonMaterial |
| `builtin-normal` | 法线材质 | MeshNormalMaterial |
| `builtin-wireframe` | 线框材质 | wireframe: true |
| `builtin-matcap-gold` | 金属球帽 | MatcapMaterial |
| `shader-hologram` | 全息投影 | 自定义 ShaderMaterial |
| `shader-fresnel` | 菲涅尔 | 边缘发光效果 |
| `shader-dissolve` | 溶解效果 | 动画溶解材质 |

## 编辑模式

### 整体模型模式

- 选择目标：整个模型根节点
- 变换影响：所有子节点同步变换
- 适用场景：调整模型整体位置、朝向、大小

### 单节点模式

- 选择目标：点击选中的具体节点
- 变换影响：仅影响选中节点及其子节点
- 适用场景：调整机械臂关节、零部件位置

## 变换控制

| 模式 | 快捷键 | 操作 |
| --- | --- | --- |
| 平移 | T | 沿 X/Y/Z 轴移动 |
| 旋转 | R | 绕 X/Y/Z 轴旋转 |
| 缩放 | S | 沿 X/Y/Z 轴缩放 |

## 使用示例

```tsx | pure
import RobotViewer from '@/views/compo/robot-viewer';

// 基本用法 - 直接路由访问
// 路由：/compo/robot-viewer

// 操作流程：
// 1. 页面加载后自动加载默认机器人模型
// 2. 点击模型节点进行选择（显示蓝色边框）
// 3. 使用变换控制器调整位置/旋转/缩放
// 4. 在材质面板选择预设材质或自定义颜色
// 5. 切换"整体/节点"模式控制编辑范围
```

## 交互说明

| 操作 | 说明 |
| --- | --- |
| 左键拖拽（空白处） | 旋转视角 |
| 右键拖拽 | 平移视角 |
| 滚轮 | 缩放 |
| 左键点击（模型） | 选择节点 |
| 拖拽变换控制器 | 平移/旋转/缩放 |

## 面板说明

### 状态面板

显示当前选中节点的变换信息：
- 位置 (X, Y, Z)
- 旋转 (°)
- 缩放

### 层级面板

- 展示模型完整节点树
- 点击节点名称可快速选中
- 显示每个节点的类型标识

### 材质面板

- 材质预设下拉选择
- 颜色拾取器
- 一键恢复原始材质

### 变换面板

- 位置/旋转/缩放数值输入
- 支持精确数值调整
- 重置按钮恢复初始状态


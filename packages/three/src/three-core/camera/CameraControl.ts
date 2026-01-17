import { OrbitControls } from 'three/examples/jsm/Addons.js';

import type { PerspectiveCamera } from 'three';

export class CameraControl {
  setting = {
    enableDamping: true,
    enablePan: false,
    maxDistance: 980,
  };

  instance: OrbitControls;

  constructor({ canvas, camera }: { canvas: HTMLCanvasElement; camera: PerspectiveCamera }) {
    this.instance = new OrbitControls(camera, canvas);
    this.instance.enableDamping = this.setting.enableDamping;
    this.instance.enablePan = this.setting.enablePan;
    this.instance.maxDistance = this.setting.maxDistance;
  }
}

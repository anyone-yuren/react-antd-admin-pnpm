import { PerspectiveCamera } from 'three';

import type { Sizes } from '../sizes/Sizes';

export class Camera {
  setting = {
    fov: 45,
    near: 1,
    far: 1000,
    position: {
      x: 0,
      y: 0,
      z: 100,
    },
  };

  instance: PerspectiveCamera;

  private sizes: Sizes;

  constructor({ sizes }: { sizes: Sizes }) {
    this.sizes = sizes;
    this.instance = this.createPerspectiveCamera();
    this.bindEvents();
  }

  private createPerspectiveCamera() {
    const { fov, near, far, position } = this.setting;
    const aspect = this.sizes.width / this.sizes.height;

    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(position.x, position.y, position.z);
    return camera;
  }

  private bindEvents() {
    this.sizes.on('resize', this.handleResize);
  }

  private unbindEvents() {
    this.sizes.off('resize', this.handleResize);
  }

  private handleResize = () => {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  };

  destroy() {
    this.unbindEvents();
  }
}
